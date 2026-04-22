import type { Metadata } from "next";
import { siteSettings } from "@/content/site/settings";
import { absoluteUrl } from "@/lib/seo/canonical";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
  keywords?: string[];
};

export function buildMetadata(seo: MetadataInput): Metadata {
  const url = absoluteUrl(seo.path);
  const image = absoluteUrl(seo.image ?? siteSettings.defaultOgImage);

  return {
    manifest: "/manifest.webmanifest",
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
          alt: seo.title,
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

export function buildDefaultMetadata(): Metadata {
  return buildMetadata({
    title: siteSettings.defaultTitle,
    description: siteSettings.defaultDescription,
    path: "/",
    image: siteSettings.defaultOgImage,
    keywords: [],
  });
}
