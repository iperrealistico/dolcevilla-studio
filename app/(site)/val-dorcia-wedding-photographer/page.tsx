import { valDorciaLanding } from "@/content/landings/val-dorcia-wedding-photographer";
import { LandingPageTemplate } from "@/components/templates/LandingPageTemplate";
import { getExpandedStoryCardsBySlugs } from "@/lib/content/storyCards";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata(valDorciaLanding.seo);

export default async function ValDorciaLandingPage() {
  const stories = await getExpandedStoryCardsBySlugs(valDorciaLanding.featuredStorySlugs);
  return <LandingPageTemplate landing={valDorciaLanding} stories={stories} />;
}
