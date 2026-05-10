import { aboutPage } from "@/content/pages/about";
import { NonBlogPageStructuredData } from "@/components/seo/NonBlogPageStructuredData";
import { getExpandedStoryCardsBySlugs } from "@/lib/content/storyCards";
import { SitePageTemplate } from "@/components/templates/SitePageTemplate";
import { buildPageMetadata, resolvePageMetadataImage } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata(aboutPage);

export default async function AboutPageRoute() {
  const stories = await getExpandedStoryCardsBySlugs(aboutPage.stories);
  const image = resolvePageMetadataImage(aboutPage);

  return (
    <>
      <NonBlogPageStructuredData
        title={aboutPage.seo.title}
        description={aboutPage.seo.description}
        path={aboutPage.seo.path}
        pageType="about"
        image={image}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <SitePageTemplate page={aboutPage} stories={stories} />
    </>
  );
}
