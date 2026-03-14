import { pricingPage } from "@/content/pages/pricing";
import { SitePageTemplate } from "@/components/templates/SitePageTemplate";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata(pricingPage.seo);

export default function PricingPageRoute() {
  return <SitePageTemplate page={pricingPage} />;
}
