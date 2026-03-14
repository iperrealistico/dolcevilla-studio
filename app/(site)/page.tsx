import { homePage } from "@/content/pages/home";
import { getStoryCardsBySlugs } from "@/lib/content/storyCards";
import { SitePageTemplate } from "@/components/templates/SitePageTemplate";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata(homePage.seo);

export default async function HomePage() {
  const stories = await getStoryCardsBySlugs(homePage.stories);

  return <SitePageTemplate page={homePage} stories={stories} />;
}
