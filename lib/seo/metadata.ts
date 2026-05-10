import type { Metadata } from "next";
import { siteSettings } from "@/content/site/settings";
import { getImageAsset } from "@/lib/images/imageManifest";
import { absoluteUrl } from "@/lib/seo/canonical";
import type { ServicePageContent } from "@/types/content";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  keywords?: string[];
};

function resolvePrimaryPageImage(
  page: Pick<ServicePageContent, "hero" | "craft" | "villa" | "gallery">,
) {
  const heroImageId = page.hero?.imageIds[0];

  if (heroImageId) {
    return getImageAsset(heroImageId as keyof typeof import("@/lib/images/imageManifest").imageManifest);
  }

  if (page.craft?.imageId) {
    return getImageAsset(page.craft.imageId as keyof typeof import("@/lib/images/imageManifest").imageManifest);
  }

  if (page.villa?.imageId) {
    return getImageAsset(page.villa.imageId as keyof typeof import("@/lib/images/imageManifest").imageManifest);
  }

  return page.gallery[0]?.image ?? null;
}

export function buildMetadata(seo: MetadataInput): Metadata {
  const url = absoluteUrl(seo.path);
  const image = absoluteUrl(seo.image ?? siteSettings.defaultOgImage);
  const imageAlt = seo.imageAlt ?? seo.title;

  return {
    metadataBase: new URL(siteSettings.siteUrl),
    manifest: "/manifest.webmanifest",
    applicationName: siteSettings.siteName,
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
        { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    title: seo.title,
    description: seo.description,
    creator: siteSettings.siteName,
    publisher: siteSettings.siteName,
    alternates: {
      canonical: url,
    },
    robots: seo.noindex ? { index: false, follow: false } : { index: true, follow: true },
    keywords: seo.keywords ?? [],
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName: siteSettings.siteName,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: image,
          width: 1600,
          height: 900,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [image],
    },
  };
}

export function resolvePageMetadataImage(
  page: Pick<ServicePageContent, "hero" | "craft" | "villa" | "gallery">,
) {
  return resolvePrimaryPageImage(page);
}

export function buildPageMetadata(
  page: Pick<ServicePageContent, "seo" | "hero" | "craft" | "villa" | "gallery">,
): Metadata {
  const image = resolvePrimaryPageImage(page);

  return buildMetadata({
    ...page.seo,
    image: page.seo.image ?? image?.src,
    imageAlt: image?.alt,
  });
}

export function buildDefaultMetadata(): Metadata {
  return buildMetadata({
    title: siteSettings.defaultTitle,
    description: siteSettings.defaultDescription,
    path: "/",
    image: siteSettings.defaultOgImage,
    keywords: [],
  });
}
