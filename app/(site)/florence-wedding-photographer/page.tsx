import { florenceLanding } from "@/content/landings/florence-wedding-photographer";
import { LandingPageTemplate } from "@/components/templates/LandingPageTemplate";
import { getStoryCardsBySlugs } from "@/lib/content/storyCards";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata(florenceLanding.seo);

export default async function FlorenceLandingPage() {
  const stories = await getStoryCardsBySlugs(florenceLanding.featuredStorySlugs);
  return <LandingPageTemplate landing={florenceLanding} stories={stories} />;
}
