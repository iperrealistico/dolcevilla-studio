import type { MetadataRoute } from "next";
import { siteSettings } from "@/content/site/settings";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteSettings.siteName,
    short_name: siteSettings.siteName.replace(/\s+Studio$/, ""),
    start_url: "/",
    display: "standalone",
    background_color: "#f5f1eb",
    theme_color: "#191612",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
