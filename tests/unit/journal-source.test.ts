import { describe, expect, it } from "vitest";
import {
  analyzeJournalSource,
  buildJournalSectionSnippet,
  buildJournalSlotIds,
  splitJournalSourceIntoSections,
} from "@/lib/content/journalSource";

const validSource = `
Intro paragraph here.

<JournalQuickAnswer title="Quick answer">
  <p>Lead with the timing.</p>
</JournalQuickAnswer>

## First chapter

Some body copy with a natural link to /film-wedding-photography.

## Second chapter

Some body copy with a natural link to /villa-raffaelli.

<JournalPlanningNote title="Planning note">
  <p>Stay close to the light.</p>
</JournalPlanningNote>

<JournalPhotographerSegue />
`;

describe("journalSource", () => {
  it("splits intro copy and H2 chapters for the journal V3 layout", () => {
    const parsed = splitJournalSourceIntoSections(validSource);

    expect(parsed.introSource).toContain("Intro paragraph here.");
    expect(parsed.sections).toHaveLength(2);
    expect(parsed.sections[0]).toMatchObject({
      id: "first-chapter",
      title: "First chapter",
    });
    expect(parsed.sections[1]).toMatchObject({
      id: "second-chapter",
      title: "Second chapter",
    });
  });

  it("tracks photographer segue, editorial blocks, and forbids inline image reliance", () => {
    expect(analyzeJournalSource(validSource)).toMatchObject({
      photographerSegueCount: 1,
      inlineImageCount: 0,
      editorialBlockCount: 2,
      sectionCount: 2,
      editorialBlockNames: ["JournalQuickAnswer", "JournalPlanningNote"],
    });
  });

  it("builds deterministic cover and ornament slot ids from the slug", () => {
    expect(buildJournalSlotIds("chianti-wedding-photographer")).toEqual({
      coverImage: "journal.chianti-wedding-photographer.cover",
      ornamentWashImage: "journal.chianti-wedding-photographer.ornament.wash",
      ornamentOrbitImage: "journal.chianti-wedding-photographer.ornament.orbit",
    });
  });

  it("builds a usable desktop snippet from each section source", () => {
    const parsed = splitJournalSourceIntoSections(validSource);
    const snippet = buildJournalSectionSnippet(
      parsed.sections[0]!,
      0,
      "Legal first",
    );

    expect(snippet).toMatchObject({
      label: "Quick takeaway",
      title: "Legal first",
    });
    expect(snippet.summary).toContain("Some body copy");
    expect(snippet.summary).not.toContain("<Journal");
  });
});
