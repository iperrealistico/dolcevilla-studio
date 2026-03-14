import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/canonical";
import { getJournalEntries } from "@/lib/content/getJournalEntries";
import { pageSlugs } from "@/content/pages";
import { landingSlugs } from "@/content/landings";

export async function buildSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const journalEntries = await getJournalEntries();

  const staticEntries = [
    "",
    "weddings",
    "elopements",
    "experience",
    "pricing",
    "about",
    "contact",
    "journal",
    "privacy",
    "legal",
    ...pageSlugs.filter((slug) => !["home"].includes(slug)),
    ...landingSlugs,
  ]
    .filter((value, index, array) => array.indexOf(value) === index)
    .map((path) => ({
      url: absoluteUrl(path ? `/${path}` : "/"),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    }));

  const journalUrls = journalEntries.map((entry) => ({
    url: absoluteUrl(`/journal/${entry.slug}`),
    lastModified: entry.updatedAt ?? entry.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticEntries, ...journalUrls];
}
