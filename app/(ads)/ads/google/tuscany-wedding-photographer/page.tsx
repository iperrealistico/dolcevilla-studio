import { googleTuscanyAdsLanding } from "@/content/ads/google/tuscany-wedding-photographer";
import { AdsLandingTemplate } from "@/components/templates/AdsLandingTemplate";
import { getStoryCardsBySlugs } from "@/lib/content/storyCards";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata(googleTuscanyAdsLanding.seo);

export default async function GoogleTuscanyAdsPage() {
  const [story] = await getStoryCardsBySlugs([googleTuscanyAdsLanding.caseStudySlug]);
  return <AdsLandingTemplate landing={googleTuscanyAdsLanding} story={story} />;
}
