import { weddingsPage } from "@/content/pages/weddings";
import { getStoryCardsBySlugs } from "@/lib/content/storyCards";
import { SitePageTemplate } from "@/components/templates/SitePageTemplate";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata(weddingsPage.seo);

export default async function WeddingsPage() {
  const stories = await getStoryCardsBySlugs(weddingsPage.stories);

  return <SitePageTemplate page={weddingsPage} stories={stories} />;
}
