import { VillaPageTemplate } from "@/components/templates/VillaPageTemplate";
import { NonBlogPageStructuredData } from "@/components/seo/NonBlogPageStructuredData";
import { villaRaffaelliPage } from "@/content/pages/villa-raffaelli";
import { getExpandedStoryCardsBySlugs } from "@/lib/content/storyCards";
import { buildPageMetadata, resolvePageMetadataImage } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata(villaRaffaelliPage);

export default async function VillaRaffaelliPageRoute() {
  const stories = await getExpandedStoryCardsBySlugs(
    villaRaffaelliPage.stories,
  );
  const image = resolvePageMetadataImage(villaRaffaelliPage);

  return (
    <>
      <NonBlogPageStructuredData
        title={villaRaffaelliPage.seo.title}
        description={villaRaffaelliPage.seo.description}
        path={villaRaffaelliPage.seo.path}
        pageType="service"
        image={image}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Villa Raffaelli", path: "/villa-raffaelli" },
        ]}
        faqItems={villaRaffaelliPage.faqs}
      />
      <VillaPageTemplate
        page={villaRaffaelliPage}
        stories={stories}
      />
    </>
  );
}
