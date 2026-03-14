import { tuscanyElopementLanding } from "@/content/landings/tuscany-elopement-photographer";
import { LandingPageTemplate } from "@/components/templates/LandingPageTemplate";
import { getStoryCardsBySlugs } from "@/lib/content/storyCards";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata(tuscanyElopementLanding.seo);

export default async function TuscanyElopementLandingPage() {
  const stories = await getStoryCardsBySlugs(tuscanyElopementLanding.featuredStorySlugs);
  return <LandingPageTemplate landing={tuscanyElopementLanding} stories={stories} />;
}
