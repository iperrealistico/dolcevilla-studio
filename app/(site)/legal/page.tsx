import { legalPage } from "@/content/pages/legal";
import { SitePageTemplate } from "@/components/templates/SitePageTemplate";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata(legalPage.seo);

export default function LegalPageRoute() {
  return <SitePageTemplate page={legalPage} />;
}
