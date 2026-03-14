import { intimateWeddingLanding } from "@/content/landings/intimate-wedding-in-tuscany";
import { LandingPageTemplate } from "@/components/templates/LandingPageTemplate";
import { getStoryCardsBySlugs } from "@/lib/content/storyCards";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata(intimateWeddingLanding.seo);

export default async function IntimateWeddingLandingPage() {
  const stories = await getStoryCardsBySlugs(intimateWeddingLanding.featuredStorySlugs);
  return <LandingPageTemplate landing={intimateWeddingLanding} stories={stories} />;
}
