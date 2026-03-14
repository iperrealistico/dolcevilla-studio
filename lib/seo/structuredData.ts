import { absoluteUrl } from "@/lib/seo/canonical";
import { siteSettings } from "@/content/site/settings";
import type { FAQItem } from "@/types/content";

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteSettings.siteName,
    url: siteSettings.siteUrl,
    image: absoluteUrl(siteSettings.defaultOgImage),
    email: siteSettings.contactEmail,
    areaServed: "Tuscany, Italy",
    sameAs: [siteSettings.instagramUrl],
  };
}

export function buildFaqJsonLd(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
