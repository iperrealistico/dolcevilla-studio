import { absoluteUrl } from "@/lib/seo/canonical";
import { siteSettings } from "@/content/site/settings";
import type { FAQItem, ImageAsset } from "@/types/content";

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@id": `${absoluteUrl("/")}#organization`,
    "@type": "ProfessionalService",
    name: siteSettings.siteName,
    url: siteSettings.siteUrl,
    image: absoluteUrl(siteSettings.defaultOgImage),
    description: siteSettings.defaultDescription,
    email: siteSettings.contactEmail,
    areaServed: {
      "@type": "Place",
      name: "Tuscany, Italy",
    },
    serviceType: [
      "Tuscany wedding photography",
      "Film wedding photography",
      "Destination wedding photography",
    ],
    sameAs: [siteSettings.instagramUrl],
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@id": `${absoluteUrl("/")}#website`,
    "@type": "WebSite",
    name: siteSettings.siteName,
    url: siteSettings.siteUrl,
    description: siteSettings.defaultDescription,
    inLanguage: "en",
    publisher: {
      "@id": `${absoluteUrl("/")}#organization`,
    },
  };
}

export type StructuredBreadcrumbItem = {
  name: string;
  path: string;
};

export type NonBlogStructuredPageType =
  | "home"
  | "service"
  | "experience"
  | "about"
  | "contact"
  | "journal";

type NonBlogPageJsonLdInput = {
  title: string;
  description: string;
  path: string;
  pageType: NonBlogStructuredPageType;
  image?: ImageAsset | null;
  hasBreadcrumbs?: boolean;
};

function resolvePageSchemaType(pageType: NonBlogStructuredPageType) {
  switch (pageType) {
    case "about":
      return "AboutPage";
    case "contact":
      return "ContactPage";
    case "journal":
      return "CollectionPage";
    default:
      return "WebPage";
  }
}

export function buildNonBlogPageJsonLd({
  title,
  description,
  path,
  pageType,
  image,
  hasBreadcrumbs = false,
}: NonBlogPageJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@id": `${absoluteUrl(path)}#webpage`,
    "@type": resolvePageSchemaType(pageType),
    url: absoluteUrl(path),
    name: title,
    description,
    inLanguage: "en",
    isPartOf: {
      "@id": `${absoluteUrl("/")}#website`,
    },
    about: {
      "@id": `${absoluteUrl("/")}#organization`,
    },
    ...(hasBreadcrumbs
      ? {
          breadcrumb: {
            "@id": `${absoluteUrl(path)}#breadcrumb`,
          },
        }
      : {}),
    ...(image
      ? {
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: absoluteUrl(image.src),
            description: image.alt,
          },
        }
      : {}),
  };
}

export function buildFaqJsonLd(items: FAQItem[], path: string) {
  return {
    "@context": "https://schema.org",
    "@id": `${absoluteUrl(path)}#faq`,
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

export function buildBreadcrumbJsonLd(
  items: StructuredBreadcrumbItem[],
  path: string,
) {
  return {
    "@context": "https://schema.org",
    "@id": `${absoluteUrl(path)}#breadcrumb`,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
