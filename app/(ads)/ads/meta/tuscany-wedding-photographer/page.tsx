import { metaTuscanyAdsLanding } from "@/content/ads/meta/tuscany-wedding-photographer";
import { AdsLandingTemplate } from "@/components/templates/AdsLandingTemplate";
import { getStoryCardsBySlugs } from "@/lib/content/storyCards";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata(metaTuscanyAdsLanding.seo);

export default async function MetaTuscanyAdsPage() {
  const [story] = await getStoryCardsBySlugs([metaTuscanyAdsLanding.caseStudySlug]);
  return <AdsLandingTemplate landing={metaTuscanyAdsLanding} story={story} />;
}
