#!/usr/bin/env node
/**
 * Generate sitemap.xml (+ robots.txt if missing).
 * Priorities:
 * 1) SITE_URL from env (.env auto-loaded)
 * 2) SEO_DEFAULTS.siteUrl from src/config/seo.ts
 * Routes:
 * 1) STATIC_ROUTES from src/config/staticRoutes.ts (esbuild)
 * 2) Fallback: parse slugs from src/data/trades.* with regex => /services/${slug}
 * 3) If all fails, use ['/']
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "esbuild";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const TMP = path.join(ROOT, ".sitemap-tmp");
const DIST = path.join(ROOT, "dist");
const today = new Date().toISOString().slice(0, 10);

/* ------------ load .env if present (so SITE_URL in .env works) ------------ */
try {
  const dotenvPath = path.join(ROOT, ".env");
  await fs.access(dotenvPath);
  // lazy import to avoid hard dep
  const { config } = await import("dotenv");
  config({ path: dotenvPath });
} catch {}

/* ---------------- helpers ---------------- */
const ensureDir = (p) => fs.mkdir(p, { recursive: true });

const dynamicImport = async (outfile) => {
  const url = pathToFileURL(outfile).toString() + `?v=${Date.now()}`;
  return import(url);
};

const bundleTS = async (entry, outfile) => {
  await build({
    entryPoints: [entry],
    outfile,
    bundle: true,
    platform: "node",
    format: "esm",
    target: ["node18"],
    logLevel: "silent",
    absWorkingDir: ROOT,
    resolveExtensions: [".ts", ".tsx", ".js", ".jsx", ".mjs", ".json"],
    alias: {
      "@": path.join(ROOT, "src"), // supports "@/..."
    },
  });
  return dynamicImport(outfile);
};

const toAbs = (base, maybePath) => {
  if (!maybePath) return null;
  try {
    return new URL(maybePath).toString(); // already absolute
  } catch {
    return new URL(maybePath, base).toString(); // resolve against base
  }
};

async function readIfExists(...candidates) {
  for (const p of candidates) {
    try {
      const full = path.join(ROOT, p);
      const data = await fs.readFile(full, "utf8");
      return { data, full };
    } catch {}
  }
  return null;
}

/** Regex fallback to extract slug: "slug: 'abc' | "slug":"abc" | slug: `abc` */
function extractSlugsFromSource(src) {
  const slugs = [];
  const re = /slug\s*:\s*(['"`])([^'"`]+)\1/g;
  let m;
  while ((m = re.exec(src))) {
    slugs.push(m[2]);
  }
  return Array.from(new Set(slugs));
}

/* ---------------- main ---------------- */
(async () => {
  await ensureDir(TMP);
  await ensureDir(DIST);

  // 1) Load SEO_DEFAULTS
  const seoOut = path.join(TMP, "seo.mjs");
  let SEO_DEFAULTS = {};
  try {
    const seoMod = await bundleTS(path.join(ROOT, "src/config/seo.ts"), seoOut);
    SEO_DEFAULTS = seoMod.SEO_DEFAULTS || seoMod.default?.SEO_DEFAULTS || seoMod.default || {};
  } catch {
    console.warn("⚠️  Could not import src/config/seo.ts; continuing with env vars only.");
  }

  // 2) Resolve SITE_URL
  const ENV_SITE_URL =
    process.env.SITE_URL ??
    process.env.VITE_SITE_URL ??
    process.env.PUBLIC_SITE_URL ??
    null;

  const rawSiteUrl = ENV_SITE_URL ?? SEO_DEFAULTS?.siteUrl ?? "";
  const SITE_URL =
    typeof rawSiteUrl === "string" ? rawSiteUrl.trim().replace(/\/$/, "") : "";

  if (!SITE_URL) {
    console.error(
      "❌ Missing SITE_URL. Set env SITE_URL (or VITE_SITE_URL/PUBLIC_SITE_URL) or define SEO_DEFAULTS.siteUrl in src/config/seo.ts"
    );
    process.exit(1);
  }

  // 3) Try STATIC_ROUTES first
  const routesOut = path.join(TMP, "staticRoutes.mjs");
  let routes = null;
  try {
    const mod = await bundleTS(path.join(ROOT, "src/config/staticRoutes.ts"), routesOut);
    const STATIC_ROUTES =
      mod.STATIC_ROUTES || mod.default?.STATIC_ROUTES || mod.default || [];
    if (Array.isArray(STATIC_ROUTES) && STATIC_ROUTES.length) {
      routes = STATIC_ROUTES;
    } else {
      console.warn("⚠️  STATIC_ROUTES was empty; will try regex fallback from trades.");
    }
  } catch {
    console.warn("⚠️  Could not import src/config/staticRoutes.ts; will try regex fallback from trades.");
  }

  // 4) Fallback: parse slugs from src/data/trades.*
  if (!routes || routes.length === 0) {
    const candidateFiles = [
      "src/data/trades.ts",
      "src/data/trades.tsx",
      "src/data/trades.js",
      "src/data/trades.jsx",
      "src/data/trades.json",
    ];
    let serviceRoutes = [];
    const found = await readIfExists(...candidateFiles);
    if (found) {
      if (found.full.endsWith(".json")) {
        try {
          const arr = JSON.parse(found.data);
          const slugs = Array.isArray(arr)
            ? arr.map((t) => t?.slug).filter(Boolean)
            : [];
          serviceRoutes = slugs.map((s) => `/services/${s}`);
        } catch {
          console.warn("⚠️  trades.json present but not valid JSON; skipping.");
        }
      } else {
        const slugs = extractSlugsFromSource(found.data);
        serviceRoutes = slugs.map((s) => `/services/${s}`);
      }
      if (serviceRoutes.length) {
        console.log("ℹ️  Built service routes from regex fallback in src/data/trades.*");
      }
    } else {
      console.warn("⚠️  No src/data/trades.* file found for fallback.");
    }

    const baseRoutes = ["/", "/privacy", "/faq", "/terms", "/contact", "/whats-rpl", "/refunds"];
    routes = Array.from(new Set([...baseRoutes, ...serviceRoutes]));
  }

  // 5) Normalize/sort
  const uniqueRoutes = Array.from(new Set(routes.map((r) => (r || "/").trim())));
  uniqueRoutes.sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)));

  // 6) Build sitemap
  const urlEntries = uniqueRoutes.map((route) => {
    const loc = toAbs(SITE_URL + "/", route.startsWith("/") ? route : `/${route}`);
    const isHome = route === "/";
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${isHome ? "daily" : "weekly"}</changefreq>
    <priority>${isHome ? "1.0" : "0.8"}</priority>
  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join("\n")}
</urlset>
`;

  // 7) Write files
  const sitemapPath = path.join(DIST, "sitemap.xml");
  await fs.writeFile(sitemapPath, xml, "utf8");
  console.log(`✅ sitemap.xml -> ${path.relative(ROOT, sitemapPath)}`);

  // robots.txt (only if missing)
  const robotsPath = path.join(DIST, "robots.txt");
  try {
    await fs.access(robotsPath);
  } catch {
    const robots = `User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml
`;
    await fs.writeFile(robotsPath, robots, "utf8");
    console.log(`✅ robots.txt -> ${path.relative(ROOT, robotsPath)}`);
  }

  // 8) Cleanup
  try { await fs.rm(TMP, { recursive: true, force: true }); } catch {}
})().catch((e) => {
  console.error("❌ Failed to generate sitemap:", e);
  process.exit(1);
});
