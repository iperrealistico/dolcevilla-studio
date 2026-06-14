import { StudioPageTemplate } from "@/components/templates/StudioPageTemplate";
import { NonBlogPageStructuredData } from "@/components/seo/NonBlogPageStructuredData";
import { studioPage } from "@/content/pages/studio";
import { getExpandedStoryCardsBySlugs } from "@/lib/content/storyCards";
import { buildPageMetadata, resolvePageMetadataImage } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata(studioPage);

export default async function StudioPageRoute() {
  const stories = await getExpandedStoryCardsBySlugs(studioPage.stories);
  const image = resolvePageMetadataImage(studioPage);

  return (
    <>
      <NonBlogPageStructuredData
        title={studioPage.seo.title}
        description={studioPage.seo.description}
        path={studioPage.seo.path}
        pageType="service"
        image={image}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Studio", path: "/studio" },
        ]}
        faqItems={studioPage.faqs}
      />
      <StudioPageTemplate page={studioPage} stories={stories} />
    </>
  );
}
