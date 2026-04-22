import { existsSync } from "node:fs";
import { join } from "node:path";
import { cache } from "react";
import { pages } from "@/content/pages";
import type { JournalEntryFrontmatter } from "@/types/content";
import { getJournalEntries } from "@/lib/content/getJournalEntries";
import {
  analyzeJournalSource,
  buildJournalSlotIds,
  journalSourceContainsPath,
  splitJournalSourceIntoSections,
} from "@/lib/content/journalSource";
import { imageManifest } from "@/lib/images/imageManifest";

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

export function validateJournalV3Contract(
  entry: Pick<
    JournalEntryFrontmatter,
    | "slug"
    | "articleTemplate"
    | "coverImage"
    | "ornamentWashImage"
    | "ornamentOrbitImage"
    | "chapterShortTitles"
    | "articleCtas"
  > & {
    source: string;
  },
) {
  const sourceAnalysis = analyzeJournalSource(entry.source);
  const { sections } = splitJournalSourceIntoSections(entry.source);
  const expectedSlots = buildJournalSlotIds(entry.slug);

  assertImageId(entry.coverImage);
  assert(
    Boolean(entry.ornamentWashImage),
    `Journal entry "${entry.slug}" must define ornamentWashImage for the journal V3 template.`,
  );
  assert(
    Boolean(entry.ornamentOrbitImage),
    `Journal entry "${entry.slug}" must define ornamentOrbitImage for the journal V3 template.`,
  );

  assertImageId(entry.ornamentWashImage!);
  assertImageId(entry.ornamentOrbitImage!);

  assert(
    entry.coverImage === expectedSlots.coverImage,
    `Journal entry "${entry.slug}" must use deterministic cover slot "${expectedSlots.coverImage}".`,
  );
  assert(
    entry.ornamentWashImage === expectedSlots.ornamentWashImage,
    `Journal entry "${entry.slug}" must use deterministic ornament wash slot "${expectedSlots.ornamentWashImage}".`,
  );
  assert(
    entry.ornamentOrbitImage === expectedSlots.ornamentOrbitImage,
    `Journal entry "${entry.slug}" must use deterministic ornament orbit slot "${expectedSlots.ornamentOrbitImage}".`,
  );
  assert(
    Boolean(entry.articleCtas),
    `Journal entry "${entry.slug}" must define articleCtas for the journal V3 template.`,
  );
  assert(
    Boolean(entry.chapterShortTitles),
    `Journal entry "${entry.slug}" must define chapterShortTitles for the journal V3 template.`,
  );
  assert(
    entry.articleCtas?.sticky.primaryCta.href === "/contact",
    `Journal entry "${entry.slug}" must point articleCtas.sticky.primaryCta.href to "/contact".`,
  );
  assert(
    entry.articleCtas?.segue.primaryCta.href === "/",
    `Journal entry "${entry.slug}" must point articleCtas.segue.primaryCta.href to "/".`,
  );

  assert(
    sourceAnalysis.photographerSegueCount === 1,
    `Journal entry "${entry.slug}" must include exactly one <JournalPhotographerSegue /> block.`,
  );
  assert(
    sourceAnalysis.inlineImageCount === 0,
    `Journal entry "${entry.slug}" cannot use <JournalInlineImage /> in the journal V3 template.`,
  );
  assert(
    sourceAnalysis.editorialBlockCount >= 2 &&
      sourceAnalysis.editorialBlockCount <= 4,
    `Journal entry "${entry.slug}" must include between 2 and 4 approved editorial blocks.`,
  );
  assert(
    sections.length >= 2,
    `Journal entry "${entry.slug}" must include at least two H2 chapter sections.`,
  );
  assert(
    entry.chapterShortTitles?.length === sections.length,
    `Journal entry "${entry.slug}" must provide one chapterShortTitle for each H2 section.`,
  );
  assert(
    journalSourceContainsPath(entry.source, "/film-wedding-photography"),
    `Journal entry "${entry.slug}" must include a natural backlink to /film-wedding-photography.`,
  );
  assert(
    journalSourceContainsPath(entry.source, "/villa-raffaelli"),
    `Journal entry "${entry.slug}" must include a natural backlink to /villa-raffaelli.`,
  );

  return {
    sourceAnalysis,
    sections,
  };
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
      assert(
        journalSlugs.has(slug),
        `Page "${page.slug}" references unknown story slug "${slug}"`,
      ),
    );
  });

  journalEntries.forEach((entry) => {
    assertImageId(entry.coverImage);
    entry.relatedSlugs?.forEach((slug) =>
      assert(
        journalSlugs.has(slug),
        `Journal entry "${entry.slug}" references missing related slug "${slug}"`,
      ),
    );

    if (entry.articleTemplate === "v3") {
      validateJournalV3Contract(entry);
    }
  });

  return {
    pageCount: Object.keys(pages).length,
    journalCount: journalEntries.length,
    imageCount: Object.keys(imageManifest).length,
  };
});
