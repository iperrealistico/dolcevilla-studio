import { pages } from "@/content/pages";

export function getPageContent(slug: keyof typeof pages) {
  return pages[slug];
}
