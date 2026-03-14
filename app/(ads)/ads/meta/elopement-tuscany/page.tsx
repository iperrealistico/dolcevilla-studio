import { metaElopementAdsLanding } from "@/content/ads/meta/elopement-tuscany";
import { AdsLandingTemplate } from "@/components/templates/AdsLandingTemplate";
import { getStoryCardsBySlugs } from "@/lib/content/storyCards";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata(metaElopementAdsLanding.seo);

export default async function MetaElopementAdsPage() {
  const [story] = await getStoryCardsBySlugs([metaElopementAdsLanding.caseStudySlug]);
  return <AdsLandingTemplate landing={metaElopementAdsLanding} story={story} />;
}
