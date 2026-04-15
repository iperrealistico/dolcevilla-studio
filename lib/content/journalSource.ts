const INLINE_IMAGE_COMPONENT_PATTERN = /<JournalInlineImage\b/g;
const PHOTOGRAPHER_SEGUE_COMPONENT_PATTERN = /<JournalPhotographerSegue\b/g;
const INLINE_SLOT_ATTRIBUTE_PATTERN =
  /<JournalInlineImage\b[^>]*\bslot=(?:"([^"]+)"|'([^']+)')[^>]*\/?>/g;

const LEGACY_INLINE_INSERTION_PARAGRAPHS = [2, 5, 8] as const;

function countMatches(pattern: RegExp, source: string) {
  return source.match(pattern)?.length ?? 0;
}

function isParagraphBlock(block: string) {
  const trimmed = block.trim();

  if (!trimmed) {
    return false;
  }

  if (
    trimmed.startsWith("#") ||
    trimmed.startsWith(">") ||
    trimmed.startsWith("<") ||
    trimmed.startsWith("```") ||
    trimmed.startsWith("- ") ||
    trimmed.startsWith("* ") ||
    /^\d+\.\s/.test(trimmed)
  ) {
    return false;
  }

  return true;
}

export function analyzeJournalSource(source: string) {
  return {
    photographerSegueCount: countMatches(
      PHOTOGRAPHER_SEGUE_COMPONENT_PATTERN,
      source,
    ),
    explicitInlineImageCount: countMatches(INLINE_IMAGE_COMPONENT_PATTERN, source),
    inlineSlotIds: Array.from(extractInlineSlotIds(source)),
  };
}

export function extractInlineSlotIds(source: string) {
  const slotIds = new Set<string>();

  for (const match of source.matchAll(INLINE_SLOT_ATTRIBUTE_PATTERN)) {
    const slotId = match[1] ?? match[2];

    if (slotId) {
      slotIds.add(slotId);
    }
  }

  return slotIds;
}

export function prepareJournalSource(
  source: string,
  galleryImageIds: string[],
) {
  if (countMatches(INLINE_IMAGE_COMPONENT_PATTERN, source) > 0) {
    return source;
  }

  return injectLegacyInlineImages(source, galleryImageIds);
}

export function injectLegacyInlineImages(
  source: string,
  galleryImageIds: string[],
) {
  const imageIdsToInsert = galleryImageIds.slice(0, 3);

  if (!imageIdsToInsert.length) {
    return source;
  }

  const blocks = source.split(/\n{2,}/);
  const output: string[] = [];
  let paragraphCount = 0;
  let imageIndex = 0;

  for (const block of blocks) {
    output.push(block);

    if (isParagraphBlock(block)) {
      paragraphCount += 1;
    }

    while (
      imageIndex < imageIdsToInsert.length &&
      paragraphCount >= LEGACY_INLINE_INSERTION_PARAGRAPHS[imageIndex]
    ) {
      output.push(
        `<JournalInlineImage imageId="${imageIdsToInsert[imageIndex]}" />`,
      );
      imageIndex += 1;
    }
  }

  while (imageIndex < imageIdsToInsert.length) {
    output.push(
      `<JournalInlineImage imageId="${imageIdsToInsert[imageIndex]}" />`,
    );
    imageIndex += 1;
  }

  return output.join("\n\n");
}

export function journalSourceContainsPath(source: string, path: string) {
  return source.includes(path);
}
