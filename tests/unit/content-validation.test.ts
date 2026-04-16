import { describe, expect, it } from "vitest";
import { getJournalEntries } from "@/lib/content/getJournalEntries";
import { listContentFiles } from "@/lib/content/listContentFiles";
import { validateContent } from "@/lib/content/validateContent";

describe("content system", () => {
  it("validates all structured content and journal references", async () => {
    const contentFiles = await listContentFiles();

    await expect(validateContent()).resolves.toMatchObject({
      pageCount: 6,
      journalCount: contentFiles.length,
    });
  });

  it("returns journal entries sorted by publish date descending", async () => {
    const entries = await getJournalEntries();

    expect(entries.some((entry) => entry.slug === "how-much-does-a-tuscany-wedding-cost")).toBe(true);

    for (let index = 1; index < entries.length; index += 1) {
      expect(
        new Date(entries[index - 1]!.publishedAt).getTime(),
      ).toBeGreaterThanOrEqual(new Date(entries[index]!.publishedAt).getTime());
    }

    expect(entries[entries.length - 1]?.slug).toBe("quarry-elopement");
  });
});
