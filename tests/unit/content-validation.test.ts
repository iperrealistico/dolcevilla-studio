import { describe, expect, it } from "vitest";
import { getJournalEntries } from "@/lib/content/getJournalEntries";
import { validateContent } from "@/lib/content/validateContent";

describe("content system", () => {
  it("validates all structured content and journal references", async () => {
    await expect(validateContent()).resolves.toMatchObject({
      pageCount: 10,
      landingCount: 8,
      journalCount: 5,
    });
  });

  it("returns journal entries sorted by publish date descending", async () => {
    const entries = await getJournalEntries();

    expect(entries[0]?.slug).toBe("weekend-timeline-notes");
    expect(entries[entries.length - 1]?.slug).toBe("quarry-elopement");
  });
});
