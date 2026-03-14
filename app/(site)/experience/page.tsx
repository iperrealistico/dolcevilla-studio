import { experiencePage } from "@/content/pages/experience";
import { SitePageTemplate } from "@/components/templates/SitePageTemplate";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata(experiencePage.seo);

export default function ExperiencePageRoute() {
  return <SitePageTemplate page={experiencePage} />;
}
