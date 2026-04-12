import { tuscanyElopementLanding } from "@/content/landings/tuscany-elopement-photographer";
import { LandingPageTemplate } from "@/components/templates/LandingPageTemplate";
import { getExpandedStoryCardsBySlugs } from "@/lib/content/storyCards";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata(tuscanyElopementLanding.seo);

export default async function TuscanyElopementLandingPage() {
  const stories = await getExpandedStoryCardsBySlugs(tuscanyElopementLanding.featuredStorySlugs);
  return <LandingPageTemplate landing={tuscanyElopementLanding} stories={stories} />;
}
