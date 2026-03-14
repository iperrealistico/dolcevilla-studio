import { tuscanyLanding } from "@/content/landings/tuscany-wedding-photographer";
import { LandingPageTemplate } from "@/components/templates/LandingPageTemplate";
import { getStoryCardsBySlugs } from "@/lib/content/storyCards";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata(tuscanyLanding.seo);

export default async function TuscanyLandingPage() {
  const stories = await getStoryCardsBySlugs(tuscanyLanding.featuredStorySlugs);
  return <LandingPageTemplate landing={tuscanyLanding} stories={stories} />;
}
