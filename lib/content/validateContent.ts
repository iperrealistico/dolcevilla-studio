import { existsSync } from "node:fs";
import { join } from "node:path";
import { cache } from "react";
import { landings } from "@/content/landings";
import { pages } from "@/content/pages";
import { imageManifest } from "@/lib/images/imageManifest";
import { getJournalEntries } from "@/lib/content/getJournalEntries";
import { googleLuccaAdsLanding } from "@/content/ads/google/lucca-wedding-photographer";
import { googleTuscanyAdsLanding } from "@/content/ads/google/tuscany-wedding-photographer";
import { metaElopementAdsLanding } from "@/content/ads/meta/elopement-tuscany";
import { metaTuscanyAdsLanding } from "@/content/ads/meta/tuscany-wedding-photographer";

const imageIds = new Set(Object.keys(imageManifest));

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function assertPublicAsset(src: string) {
  const target = join(process.cwd(), "public", src);
  assert(existsSync(target), `Missing public asset: ${src}`);
}

function assertImageId(id: string) {
  assert(imageIds.has(id), `Unknown image id: ${id}`);
}

export const validateContent = cache(async () => {
  Object.values(imageManifest).forEach((image) => {
    assertPublicAsset(image.src);
  });

  const journalEntries = await getJournalEntries();
  const journalSlugs = new Set(journalEntries.map((entry) => entry.slug));

  Object.values(pages).forEach((page) => {
    page.hero?.imageIds.forEach(assertImageId);
    page.stories.forEach((slug) =>
      assert(journalSlugs.has(slug), `Page "${page.slug}" references unknown story slug "${slug}"`),
    );
  });

  Object.values(landings).forEach((landing) => {
    landing.hero.imageIds.forEach(assertImageId);
    landing.featuredStorySlugs.forEach((slug) =>
      assert(journalSlugs.has(slug), `Landing "${landing.slug}" references unknown story slug "${slug}"`),
    );
  });

  [googleTuscanyAdsLanding, googleLuccaAdsLanding, metaTuscanyAdsLanding, metaElopementAdsLanding].forEach(
    (landing) => {
      landing.hero.imageIds.forEach(assertImageId);
      assert(
        journalSlugs.has(landing.caseStudySlug),
        `Ads landing "${landing.slug}" references unknown case study "${landing.caseStudySlug}"`,
      );
    },
  );

  journalEntries.forEach((entry) => {
    assertImageId(entry.coverImage);
    entry.galleryImageIds.forEach(assertImageId);
    entry.relatedSlugs?.forEach((slug) =>
      assert(journalSlugs.has(slug), `Journal entry "${entry.slug}" references missing related slug "${slug}"`),
    );
  });

  return {
    pageCount: Object.keys(pages).length,
    landingCount: Object.keys(landings).length,
    journalCount: journalEntries.length,
    imageCount: Object.keys(imageManifest).length,
  };
});
