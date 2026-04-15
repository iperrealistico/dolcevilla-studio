import { VillaPageTemplate } from "@/components/templates/VillaPageTemplate";
import {
  villaRaffaelliDetails,
  villaRaffaelliPage,
} from "@/content/pages/villa-raffaelli";
import { getExpandedStoryCardsBySlugs } from "@/lib/content/storyCards";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata(villaRaffaelliPage.seo);

export default async function VillaRaffaelliPageRoute() {
  const stories = await getExpandedStoryCardsBySlugs(
    villaRaffaelliPage.stories,
  );

  return (
    <VillaPageTemplate
      page={villaRaffaelliPage}
      stories={stories}
      details={villaRaffaelliDetails}
    />
  );
}
