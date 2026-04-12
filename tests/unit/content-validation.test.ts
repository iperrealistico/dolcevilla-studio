import { describe, expect, it } from "vitest";
import { getJournalEntries } from "@/lib/content/getJournalEntries";
import { validateContent } from "@/lib/content/validateContent";

describe("content system", () => {
  it("validates all structured content and journal references", async () => {
    await expect(validateContent()).resolves.toMatchObject({
      pageCount: 11,
      landingCount: 8,
      journalCount: 8,
    });
  });

  it("returns journal entries sorted by publish date descending", async () => {
    const entries = await getJournalEntries();

    expect(entries[0]?.slug).toBe("why-we-photograph-weddings-on-film-and-digital");
    expect(entries[entries.length - 1]?.slug).toBe("quarry-elopement");
  });
});
