// src/SEO.tsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { SEO_DEFAULTS } from "@/config/seo";

type Robots =
  | "index,follow" | "noindex,follow" | "index,nofollow" | "noindex,nofollow";

type Props = {
  title?: string;
  description?: string;
  canonical?: string;       // path or absolute URL
  image?: string;           // path or absolute URL
  imageAlt?: string;        // Alt text for the social share image
  imageWidth?: string;      // Recommended: 1200
  imageHeight?: string;     // Recommended: 630
  type?: "website" | "article";
  noindex?: boolean;
  robots?: Robots;
  keywords?: string | string[];
  jsonLd?: object | object[];
  lang?: string;
  twitterCreator?: string; // e.g., "@your_twitter_handle"
};

function resolveUrl(siteUrl: string, maybe: string | undefined) {
  if (!maybe) return undefined;
  try { return new URL(maybe).toString(); } catch { return new URL(maybe, siteUrl).toString(); }
}

export default function SEO({
  title,
  description,
  canonical,
  image,
  imageAlt,
  imageWidth = "1200",
  imageHeight = "630",
  type = "website",
  noindex = false,
  robots,
  keywords,
  jsonLd,
  lang,
  twitterCreator,
}: Props) {
  const { pathname, search } = useLocation();
  const site = SEO_DEFAULTS.siteName;
  const base = SEO_DEFAULTS.siteUrl.replace(/\/$/, "");
  const currentUrl = new URL(pathname + search, base).toString();
  const canonicalUrl = resolveUrl(base, canonical) ?? currentUrl;

  const desc = description ?? SEO_DEFAULTS.description;
  const ogImage = resolveUrl(base, image ?? SEO_DEFAULTS.image);
  const ogImageAlt = imageAlt ?? desc ?? SEO_DEFAULTS.title;
  const robotsContent: Robots = robots ?? (noindex ? "noindex,nofollow" : "index,follow");
  const jsonLdArr = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet
      // OPTIMIZATION: Use titleTemplate for cleaner title logic
      titleTemplate={`%s | ${site}`}
      defaultTitle={`${SEO_DEFAULTS.title} | ${site}`}
    >
      <html lang={lang ?? "en-AU"} />
      {/* The title is now managed by the props on Helmet itself */}
      <title>{title ?? SEO_DEFAULTS.title}</title>
      
      {desc && <meta name="description" content={desc} />}
      {keywords && (
        <meta name="keywords" content={Array.isArray(keywords) ? keywords.join(", ") : keywords} />
      )}
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content="index,follow,max-image-preview:large" />
      <meta name="theme-color" content={SEO_DEFAULTS.themeColor} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:site_name" content={site} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title ?? SEO_DEFAULTS.title} />
      {desc && <meta property="og:description" content={desc} />}
      <meta property="og:url" content={canonicalUrl} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {/* OPTIMIZATION: Add OG image dimensions and alt text for better sharing previews */}
      {ogImage && <meta property="og:image:width" content={imageWidth} />}
      {ogImage && <meta property="og:image:height" content={imageHeight} />}
      {ogImage && <meta property="og:image:alt" content={ogImageAlt} />}
      <meta property="og:locale" content={SEO_DEFAULTS.locale} />

      <meta name="twitter:card" content="summary_large_image" />
      {SEO_DEFAULTS.twitterHandle && <meta name="twitter:site" content={SEO_DEFAULTS.twitterHandle} />}
      {/* OPTIMIZATION: Add optional twitter:creator tag for articles/blogs */}
      {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}
      <meta name="twitter:title" content={title ?? SEO_DEFAULTS.title} />
      {desc && <meta name="twitter:description" content={desc} />}
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      {/* OPTIMIZATION: Add twitter:image:alt for accessibility */}
      {ogImage && <meta name="twitter:image:alt" content={ogImageAlt} />}

      {jsonLdArr.map((obj, i) => (
        <script key={i} type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}
    </Helmet>
  );
}