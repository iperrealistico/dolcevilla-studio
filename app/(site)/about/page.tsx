import { aboutPage } from "@/content/pages/about";
import { getStoryCardsBySlugs } from "@/lib/content/storyCards";
import { SitePageTemplate } from "@/components/templates/SitePageTemplate";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata(aboutPage.seo);

export default async function AboutPageRoute() {
  const stories = await getStoryCardsBySlugs(aboutPage.stories);

  return <SitePageTemplate page={aboutPage} stories={stories} />;
}
