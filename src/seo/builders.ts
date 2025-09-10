// src/seo/builders.ts
import { SEO_DEFAULTS } from "@/config/seo";
import type { Qualification } from "@/data/qualifications";

const base = SEO_DEFAULTS.siteUrl.replace(/\/$/, "");

export const absUrl = (pathOrUrl?: string) => {
  if (!pathOrUrl) return undefined;
  try { return new URL(pathOrUrl).toString(); } catch (err) {console.log(err);
  }
  return new URL(pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`, base).toString();
};

export const websiteJSONLD = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SEO_DEFAULTS.siteName,
  url: base,
  potentialAction: {
    "@type": "SearchAction",
    target: `${base}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

export const organizationJSONLD = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SEO_DEFAULTS.siteName,
  url: base,
  logo: absUrl(SEO_DEFAULTS.image || "/og-default.jpg"),
});

export const breadcrumbJSONLD = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: absUrl(it.url),
  })),
});

export const webpageJSONLD = (name: string, urlPath: string) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name,
  url: absUrl(urlPath),
});

export const courseJSONLD = (q: Qualification) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  name: q.qualificationCode ? `${q.tradeTitle} (${q.qualificationCode})` : q.tradeTitle,
  description: q.overview || q.shortDescription,
  courseCode: q.qualificationCode,
  provider: {
    "@type": "Organization",
    name: SEO_DEFAULTS.siteName,
    url: base,
  },
  image: q.image ? [q.image] : undefined,
});

export const faqPageJSONLD = (faqs: Array<{ q: string; a: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});

export const contactPageJSONLD = () => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact",
  url: absUrl("/contact"),
});
