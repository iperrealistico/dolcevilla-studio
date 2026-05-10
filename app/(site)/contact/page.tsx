import { contactPage } from "@/content/pages/contact";
import { NonBlogPageStructuredData } from "@/components/seo/NonBlogPageStructuredData";
import { SitePageTemplate } from "@/components/templates/SitePageTemplate";
import { buildPageMetadata, resolvePageMetadataImage } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata(contactPage);

export default function ContactPageRoute() {
  const image = resolvePageMetadataImage(contactPage);

  return (
    <>
      <NonBlogPageStructuredData
        title={contactPage.seo.title}
        description={contactPage.seo.description}
        path={contactPage.seo.path}
        pageType="contact"
        image={image}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <SitePageTemplate page={contactPage} />
    </>
  );
}
