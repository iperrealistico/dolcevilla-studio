const INLINE_IMAGE_COMPONENT_PATTERN = /<JournalInlineImage\b/g;
const PHOTOGRAPHER_SEGUE_COMPONENT_PATTERN = /<JournalPhotographerSegue\b/g;
const APPROVED_EDITORIAL_BLOCK_PATTERN =
  /<(JournalQuickAnswer|JournalPlanningNote|JournalChecklist|JournalCommonMistake|JournalLocalInsight|JournalFilmNote|JournalPullQuote)\b/g;
const SECTION_HEADING_PATTERN = /^##\s+(.+)$/gm;

export const approvedJournalEditorialBlocks = [
  "JournalQuickAnswer",
  "JournalPlanningNote",
  "JournalChecklist",
  "JournalCommonMistake",
  "JournalLocalInsight",
  "JournalFilmNote",
  "JournalPullQuote",
] as const;

export type ApprovedJournalEditorialBlock =
  (typeof approvedJournalEditorialBlocks)[number];

export type JournalSourceSection = {
  id: string;
  title: string;
  source: string;
};

function countMatches(pattern: RegExp, source: string) {
  return source.match(pattern)?.length ?? 0;
}

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function buildJournalSlotIds(slug: string) {
  return {
    coverImage: `journal.${slug}.cover`,
    ornamentWashImage: `journal.${slug}.ornament.wash`,
    ornamentOrbitImage: `journal.${slug}.ornament.orbit`,
  };
}

export function splitJournalSourceIntoSections(source: string): {
  introSource: string;
  sections: JournalSourceSection[];
} {
  const trimmedSource = source.trim();

  if (!trimmedSource) {
    return {
      introSource: "",
      sections: [],
    };
  }

  const headingMatches = Array.from(trimmedSource.matchAll(SECTION_HEADING_PATTERN));

  if (!headingMatches.length) {
    return {
      introSource: trimmedSource,
      sections: [],
    };
  }

  const usedIds = new Map<string, number>();
  const firstHeadingIndex = headingMatches[0]?.index ?? 0;
  const introSource = trimmedSource.slice(0, firstHeadingIndex).trim();

  const sections = headingMatches.map((match, index) => {
    const rawTitle = (match[1] ?? "").trim();
    const bodyStart = (match.index ?? 0) + match[0].length;
    const bodyEnd = headingMatches[index + 1]?.index ?? trimmedSource.length;
    const sourceBody = trimmedSource.slice(bodyStart, bodyEnd).trim();
    const baseId = slugifyHeading(rawTitle) || `chapter-${index + 1}`;
    const seenCount = usedIds.get(baseId) ?? 0;

    usedIds.set(baseId, seenCount + 1);

    return {
      id: seenCount === 0 ? baseId : `${baseId}-${seenCount + 1}`,
      title: rawTitle || `Chapter ${index + 1}`,
      source: sourceBody,
    };
  });

  return {
    introSource,
    sections,
  };
}

export function analyzeJournalSource(source: string) {
  const editorialBlockNames = Array.from(
    source.matchAll(APPROVED_EDITORIAL_BLOCK_PATTERN),
    (match) => match[1] as ApprovedJournalEditorialBlock,
  );
  const uniqueEditorialBlockNames = Array.from(new Set(editorialBlockNames));
  const { sections } = splitJournalSourceIntoSections(source);

  return {
    photographerSegueCount: countMatches(
      PHOTOGRAPHER_SEGUE_COMPONENT_PATTERN,
      source,
    ),
    inlineImageCount: countMatches(INLINE_IMAGE_COMPONENT_PATTERN, source),
    editorialBlockCount: editorialBlockNames.length,
    editorialBlockNames: uniqueEditorialBlockNames,
    sectionCount: sections.length,
  };
}

export function journalSourceContainsPath(source: string, path: string) {
  return source.includes(path);
}
