import { siteSettings } from "@/content/site/settings";

export function absoluteUrl(path = "/") {
  return new URL(path, siteSettings.siteUrl).toString();
}
