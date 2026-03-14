import type { MetadataRoute } from "next";
import { siteSettings } from "@/content/site/settings";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/ads/", "/thank-you"],
      },
    ],
    sitemap: `${siteSettings.siteUrl}/sitemap.xml`,
  };
}
