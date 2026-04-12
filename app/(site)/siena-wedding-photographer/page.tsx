import { sienaLanding } from "@/content/landings/siena-wedding-photographer";
import { LandingPageTemplate } from "@/components/templates/LandingPageTemplate";
import { getExpandedStoryCardsBySlugs } from "@/lib/content/storyCards";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata(sienaLanding.seo);

export default async function SienaLandingPage() {
  const stories = await getExpandedStoryCardsBySlugs(sienaLanding.featuredStorySlugs);
  return <LandingPageTemplate landing={sienaLanding} stories={stories} />;
}
