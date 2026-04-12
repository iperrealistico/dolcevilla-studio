import { homePage } from "@/content/pages/home";
import { getExpandedStoryCardsBySlugs } from "@/lib/content/storyCards";
import { SitePageTemplate } from "@/components/templates/SitePageTemplate";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata(homePage.seo);

export default async function HomePage() {
  const stories = await getExpandedStoryCardsBySlugs(homePage.stories);

  return <SitePageTemplate page={homePage} stories={stories} />;
}
