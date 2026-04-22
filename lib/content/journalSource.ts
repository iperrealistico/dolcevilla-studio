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

export type JournalSectionSnippet = {
  label: string;
  title: string;
  summary: string;
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

function toPlainText(source: string) {
  return source
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/[*_`>]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function takeSentences(text: string, maxCount = 2) {
  const sentences = text.match(/[^.!?]+[.!?]+/g)?.map((sentence) => sentence.trim()) ?? [];

  if (!sentences.length) {
    return text;
  }

  return sentences.slice(0, maxCount).join(" ");
}

function shortenText(text: string, maxLength = 210) {
  if (text.length <= maxLength) {
    return text;
  }

  const shortened = text.slice(0, maxLength).trim();
  const lastSpaceIndex = shortened.lastIndexOf(" ");

  return `${shortened.slice(0, Math.max(lastSpaceIndex, 0)).trim()}…`;
}

function deriveSnippetTitle(title: string, index: number) {
  if (/what makes|distinct|setting|place/i.test(title)) {
    return "Why this place reads differently";
  }

  if (/what to look for|check|shortlist|book/i.test(title)) {
    return "What to check first";
  }

  if (/schedule|timeline|light|movement|pace/i.test(title)) {
    return "Timing is the real lever";
  }

  if (/judge|style|postcard|portfolio/i.test(title)) {
    return "Look past the obvious";
  }

  if (/choose|studio world|fit/i.test(title)) {
    return "The real decision";
  }

  if (/why|reference point|reference/i.test(title)) {
    return "Why it matters";
  }

  return `Quick takeaway ${String(index + 1).padStart(2, "0")}`;
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

export function buildJournalSectionSnippet(
  section: JournalSourceSection,
  index: number,
  shortTitle?: string,
): JournalSectionSnippet {
  const plainText = toPlainText(section.source);
  const summary = shortenText(takeSentences(plainText));

  return {
    label: "Quick takeaway",
    title: shortTitle ?? deriveSnippetTitle(section.title, index),
    summary: summary || "A concise read of what this section is covering.",
  };
}

export function journalSourceContainsPath(source: string, path: string) {
  return source.includes(path);
}
