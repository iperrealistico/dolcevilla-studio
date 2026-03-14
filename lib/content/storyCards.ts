import type { StoryCard } from "@/types/content";
import { getJournalEntries } from "@/lib/content/getJournalEntries";

export async function getStoryCardsBySlugs(slugs: string[]): Promise<StoryCard[]> {
  const entries = await getJournalEntries();
  const map = new Map(entries.map((entry) => [entry.slug, entry]));

  return slugs.flatMap((slug) => {
    const entry = map.get(slug);
    if (!entry) {
      return [];
    }

    return [
      {
        slug: entry.slug,
        title: entry.title,
        excerpt: entry.excerpt,
        location: entry.location,
        celebrationType: entry.celebrationType ?? entry.serviceType ?? entry.category,
        heroImage: entry.heroImage,
        publishedAt: entry.publishedAt,
        updatedAt: entry.updatedAt,
        tags: entry.tags,
        featured: entry.featured,
        category: entry.category,
      },
    ];
  });
}

export async function getFeaturedStoryCards(limit = 6): Promise<StoryCard[]> {
  const entries = await getJournalEntries();

  return entries
    .filter((entry) => entry.featured)
    .slice(0, limit)
    .map((entry) => ({
      slug: entry.slug,
      title: entry.title,
      excerpt: entry.excerpt,
      location: entry.location,
      celebrationType: entry.celebrationType ?? entry.serviceType ?? entry.category,
      heroImage: entry.heroImage,
      publishedAt: entry.publishedAt,
      updatedAt: entry.updatedAt,
      tags: entry.tags,
      featured: entry.featured,
      category: entry.category,
    }));
}
