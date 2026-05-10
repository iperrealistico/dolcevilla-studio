import { homePage } from "@/content/pages/home";
import { NonBlogPageStructuredData } from "@/components/seo/NonBlogPageStructuredData";
import { getExpandedStoryCardsBySlugs } from "@/lib/content/storyCards";
import { SitePageTemplate } from "@/components/templates/SitePageTemplate";
import { buildPageMetadata, resolvePageMetadataImage } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata(homePage);

export default async function HomePage() {
  const stories = await getExpandedStoryCardsBySlugs(homePage.stories);
  const image = resolvePageMetadataImage(homePage);

  return (
    <>
      <NonBlogPageStructuredData
        title={homePage.seo.title}
        description={homePage.seo.description}
        path={homePage.seo.path}
        pageType="home"
        image={image}
      />
      <SitePageTemplate page={homePage} stories={stories} />
    </>
  );
}
