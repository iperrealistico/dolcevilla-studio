import { thankYouPage } from "@/content/pages/thank-you";
import { SitePageTemplate } from "@/components/templates/SitePageTemplate";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata(thankYouPage.seo);

export default function ThankYouPageRoute() {
  return <SitePageTemplate page={thankYouPage} />;
}
