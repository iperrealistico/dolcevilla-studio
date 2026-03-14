import { elopementsPage } from "@/content/pages/elopements";
import { getStoryCardsBySlugs } from "@/lib/content/storyCards";
import { SitePageTemplate } from "@/components/templates/SitePageTemplate";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata(elopementsPage.seo);

export default async function ElopementsPage() {
  const stories = await getStoryCardsBySlugs(elopementsPage.stories);

  return <SitePageTemplate page={elopementsPage} stories={stories} />;
}
