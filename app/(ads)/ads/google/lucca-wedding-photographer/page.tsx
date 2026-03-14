import { googleLuccaAdsLanding } from "@/content/ads/google/lucca-wedding-photographer";
import { AdsLandingTemplate } from "@/components/templates/AdsLandingTemplate";
import { getStoryCardsBySlugs } from "@/lib/content/storyCards";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata(googleLuccaAdsLanding.seo);

export default async function GoogleLuccaAdsPage() {
  const [story] = await getStoryCardsBySlugs([googleLuccaAdsLanding.caseStudySlug]);
  return <AdsLandingTemplate landing={googleLuccaAdsLanding} story={story} />;
}
