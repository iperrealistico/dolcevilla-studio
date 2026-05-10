import { FilmPageTemplate } from "@/components/templates/FilmPageTemplate";
import { NonBlogPageStructuredData } from "@/components/seo/NonBlogPageStructuredData";
import {
  filmWeddingPhotographyDetails,
  filmWeddingPhotographyPage,
} from "@/content/pages/film-wedding-photography";
import { getExpandedStoryCardsBySlugs } from "@/lib/content/storyCards";
import { buildPageMetadata, resolvePageMetadataImage } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata(filmWeddingPhotographyPage);

export default async function FilmWeddingPhotographyPageRoute() {
  const stories = await getExpandedStoryCardsBySlugs(filmWeddingPhotographyPage.stories);
  const image = resolvePageMetadataImage(filmWeddingPhotographyPage);

  return (
    <>
      <NonBlogPageStructuredData
        title={filmWeddingPhotographyPage.seo.title}
        description={filmWeddingPhotographyPage.seo.description}
        path={filmWeddingPhotographyPage.seo.path}
        pageType="service"
        image={image}
        breadcrumbs={[
          { name: "Home", path: "/" },
          {
            name: "Film Wedding Photography",
            path: "/film-wedding-photography",
          },
        ]}
        faqItems={filmWeddingPhotographyDetails.faqs}
      />
      <FilmPageTemplate
        page={filmWeddingPhotographyPage}
        stories={stories}
        details={filmWeddingPhotographyDetails}
      />
    </>
  );
}
