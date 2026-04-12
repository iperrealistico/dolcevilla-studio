import type { StoryCard } from "@/types/content";
import { getJournalEntries } from "@/lib/content/getJournalEntries";

function toStoryCard(entry: Awaited<ReturnType<typeof getJournalEntries>>[number]): StoryCard {
  return {
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
  };
}

export async function getStoryCardsBySlugs(slugs: string[]): Promise<StoryCard[]> {
  const entries = await getJournalEntries();
  const map = new Map(entries.map((entry) => [entry.slug, entry]));

  return slugs.flatMap((slug) => {
    const entry = map.get(slug);
    if (!entry) {
      return [];
    }

    return [toStoryCard(entry)];
  });
}

export async function getFeaturedStoryCards(limit = 6): Promise<StoryCard[]> {
  const entries = await getJournalEntries();

  return entries
    .filter((entry) => entry.featured)
    .slice(0, limit)
    .map(toStoryCard);
}

export async function getAllStoryCards(): Promise<StoryCard[]> {
  const entries = await getJournalEntries();

  return entries.map(toStoryCard);
}

export async function getExpandedStoryCardsBySlugs(
  slugs: string[],
  limit = 3,
): Promise<StoryCard[]> {
  const entries = await getJournalEntries();
  const map = new Map(entries.map((entry) => [entry.slug, entry]));
  const seen = new Set<string>();
  const ordered: StoryCard[] = [];

  slugs.forEach((slug) => {
    const entry = map.get(slug);

    if (!entry || seen.has(slug)) {
      return;
    }

    seen.add(slug);
    ordered.push(toStoryCard(entry));
  });

  if (ordered.length >= limit) {
    return ordered.slice(0, limit);
  }

  const supplemental = [
    ...entries.filter((entry) => entry.featured && !seen.has(entry.slug)),
    ...entries.filter((entry) => !entry.featured && !seen.has(entry.slug)),
  ];

  for (const entry of supplemental) {
    ordered.push(toStoryCard(entry));
    seen.add(entry.slug);

    if (ordered.length >= limit) {
      break;
    }
  }

  return ordered;
}
