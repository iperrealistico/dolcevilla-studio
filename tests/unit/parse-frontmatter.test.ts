import { mkdtemp, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { describe, expect, it } from "vitest";
import { parseFrontmatter } from "@/lib/content/parseFrontmatter";

describe("parseFrontmatter", () => {
  it("normalizes YAML dates into strings", async () => {
    const directory = await mkdtemp(join(tmpdir(), "dolcevilla-frontmatter-"));
    const filePath = join(directory, "fixture.mdx");

    await writeFile(
      filePath,
      `---
slug: fixture
title: Fixture
excerpt: Fixture excerpt.
category: guides
location: Tuscany
coverImage: page.home.hero.primary
publishedAt: 2026-02-12
seoTitle: Fixture SEO Title
seoDescription: Fixture SEO Description
---

Body copy.
`,
      "utf8",
    );

    const parsed = await parseFrontmatter(filePath);

    expect(parsed.frontmatter.publishedAt).toBe("2026-02-12");
    expect(typeof parsed.frontmatter.publishedAt).toBe("string");
  });
});
