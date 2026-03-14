import { contactPage } from "@/content/pages/contact";
import { SitePageTemplate } from "@/components/templates/SitePageTemplate";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata(contactPage.seo);

export default function ContactPageRoute() {
  return <SitePageTemplate page={contactPage} />;
}
