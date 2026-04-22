import { describe, expect, it } from "vitest";
import { journalEntryFrontmatterSchema } from "@/lib/content/schemas";

const validJournalV3Frontmatter = {
  slug: "journal-v3-fixture",
  articleTemplate: "v3" as const,
  title: "Journal V3 Fixture",
  excerpt: "A fixture used to validate journal CTA frontmatter.",
  category: "guides" as const,
  location: "Tuscany",
  coverImage: "journal.fixture.cover",
  ornamentWashImage: "journal.fixture.ornament.wash",
  ornamentOrbitImage: "journal.fixture.ornament.orbit",
  publishedAt: "2026-04-22",
  seoTitle: "Journal V3 Fixture | Dolcevilla Studio",
  seoDescription: "A fixture used to validate journal CTA frontmatter.",
  articleCtas: {
    sticky: {
      eyebrow: "Fixture sticky CTA",
      title: "Need the right photographer for this setting?",
      body: "Tell us what matters and we will tell you how we would approach it.",
      primaryCta: {
        label: "Ask about this wedding",
        href: "/contact",
        variant: "primary" as const,
      },
    },
    segue: {
      eyebrow: "Fixture segue CTA",
      title: "See the wider studio approach behind the article.",
      body: "If this place feels close to your world, start with the wider Dolcevilla approach.",
      primaryCta: {
        label: "Explore the studio approach",
        href: "/",
        variant: "secondary" as const,
      },
    },
  },
};

describe("journalEntryFrontmatterSchema", () => {
  it("accepts a journal V3 entry with sticky and segue CTA frontmatter", () => {
    const parsed = journalEntryFrontmatterSchema.safeParse(
      validJournalV3Frontmatter,
    );

    expect(parsed.success).toBe(true);
  });

  it("rejects journal V3 entries that do not define articleCtas", () => {
    const parsed = journalEntryFrontmatterSchema.safeParse({
      ...validJournalV3Frontmatter,
      articleCtas: undefined,
    });

    expect(parsed.success).toBe(false);
    expect(
      parsed.error?.issues.some(
        (issue) => issue.path.join(".") === "articleCtas",
      ),
    ).toBe(true);
  });

  it("rejects journal V3 entries whose sticky CTA does not point to /contact", () => {
    const parsed = journalEntryFrontmatterSchema.safeParse({
      ...validJournalV3Frontmatter,
      articleCtas: {
        ...validJournalV3Frontmatter.articleCtas,
        sticky: {
          ...validJournalV3Frontmatter.articleCtas.sticky,
          primaryCta: {
            ...validJournalV3Frontmatter.articleCtas.sticky.primaryCta,
            href: "/",
          },
        },
      },
    });

    expect(parsed.success).toBe(false);
    expect(
      parsed.error?.issues.some(
        (issue) =>
          issue.path.join(".") === "articleCtas.sticky.primaryCta.href",
      ),
    ).toBe(true);
  });

  it("rejects journal V3 entries whose segue CTA does not point to /", () => {
    const parsed = journalEntryFrontmatterSchema.safeParse({
      ...validJournalV3Frontmatter,
      articleCtas: {
        ...validJournalV3Frontmatter.articleCtas,
        segue: {
          ...validJournalV3Frontmatter.articleCtas.segue,
          primaryCta: {
            ...validJournalV3Frontmatter.articleCtas.segue.primaryCta,
            href: "/contact",
          },
        },
      },
    });

    expect(parsed.success).toBe(false);
    expect(
      parsed.error?.issues.some(
        (issue) => issue.path.join(".") === "articleCtas.segue.primaryCta.href",
      ),
    ).toBe(true);
  });
});
