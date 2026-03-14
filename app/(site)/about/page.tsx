import { aboutPage } from "@/content/pages/about";
import { SitePageTemplate } from "@/components/templates/SitePageTemplate";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata(aboutPage.seo);

export default function AboutPageRoute() {
  return <SitePageTemplate page={aboutPage} />;
}
