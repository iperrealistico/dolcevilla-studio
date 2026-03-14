import { chiantiLanding } from "@/content/landings/chianti-wedding-photographer";
import { LandingPageTemplate } from "@/components/templates/LandingPageTemplate";
import { getStoryCardsBySlugs } from "@/lib/content/storyCards";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata(chiantiLanding.seo);

export default async function ChiantiLandingPage() {
  const stories = await getStoryCardsBySlugs(chiantiLanding.featuredStorySlugs);
  return <LandingPageTemplate landing={chiantiLanding} stories={stories} />;
}
