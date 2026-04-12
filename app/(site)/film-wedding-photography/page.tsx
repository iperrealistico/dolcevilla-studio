import { FilmPageTemplate } from "@/components/templates/FilmPageTemplate";
import {
  filmWeddingPhotographyDetails,
  filmWeddingPhotographyPage,
} from "@/content/pages/film-wedding-photography";
import { getExpandedStoryCardsBySlugs } from "@/lib/content/storyCards";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata(filmWeddingPhotographyPage.seo);

export default async function FilmWeddingPhotographyPageRoute() {
  const stories = await getExpandedStoryCardsBySlugs(filmWeddingPhotographyPage.stories);

  return (
    <FilmPageTemplate
      page={filmWeddingPhotographyPage}
      stories={stories}
      details={filmWeddingPhotographyDetails}
    />
  );
}
