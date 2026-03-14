import { privacyPage } from "@/content/pages/privacy";
import { SitePageTemplate } from "@/components/templates/SitePageTemplate";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata(privacyPage.seo);

export default function PrivacyPageRoute() {
  return <SitePageTemplate page={privacyPage} />;
}
