import { experiencePage } from "@/content/pages/experience";
import { getExpandedStoryCardsBySlugs } from "@/lib/content/storyCards";
import { SitePageTemplate } from "@/components/templates/SitePageTemplate";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata(experiencePage.seo);

export default async function ExperiencePageRoute() {
  const stories = await getExpandedStoryCardsBySlugs(experiencePage.stories);

  return <SitePageTemplate page={experiencePage} stories={stories} />;
}
