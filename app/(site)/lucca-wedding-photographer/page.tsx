import { luccaLanding } from "@/content/landings/lucca-wedding-photographer";
import { LandingPageTemplate } from "@/components/templates/LandingPageTemplate";
import { getExpandedStoryCardsBySlugs } from "@/lib/content/storyCards";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata(luccaLanding.seo);

export default async function LuccaLandingPage() {
  const stories = await getExpandedStoryCardsBySlugs(luccaLanding.featuredStorySlugs);
  return <LandingPageTemplate landing={luccaLanding} stories={stories} />;
}
