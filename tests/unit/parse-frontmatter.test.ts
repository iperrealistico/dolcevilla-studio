import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { parseFrontmatter } from "@/lib/content/parseFrontmatter";

describe("parseFrontmatter", () => {
  it("normalizes YAML dates into strings", async () => {
    const filePath = join(
      process.cwd(),
      "content",
      "journal",
      "stories-of-place",
      "villa-raffaelli-mornings.mdx",
    );

    const parsed = await parseFrontmatter(filePath);

    expect(parsed.frontmatter.publishedAt).toBe("2026-02-12");
    expect(typeof parsed.frontmatter.publishedAt).toBe("string");
  });
});
