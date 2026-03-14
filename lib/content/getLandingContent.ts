import { landings } from "@/content/landings";

export function getLandingContent(slug: keyof typeof landings) {
  return landings[slug];
}
