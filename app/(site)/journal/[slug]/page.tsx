import { notFound } from "next/navigation";
import { JournalEntryTemplate } from "@/components/templates/JournalEntryTemplate";
import { buildMetadata } from "@/lib/seo/metadata";
import { getEntryBySlug } from "@/lib/content/getEntryBySlug";
import { getJournalEntries } from "@/lib/content/getJournalEntries";
import { getExpandedStoryCardsBySlugs } from "@/lib/content/storyCards";
import { buildGallery } from "@/lib/images/imageManifest";

type JournalEntryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const entries = await getJournalEntries();
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: JournalEntryPageProps) {
  const { slug } = await params;
  const entry = await getEntryBySlug(slug);

  if (!entry) {
    return {};
  }

  return buildMetadata({
    title: entry.seoTitle,
    description: entry.seoDescription,
    path: `/journal/${entry.slug}`,
    noindex: entry.noindex,
    keywords: entry.tags,
  });
}

export default async function JournalEntryPage({ params }: JournalEntryPageProps) {
  const { slug } = await params;
  const entry = await getEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  const relatedStories = await getExpandedStoryCardsBySlugs(entry.relatedSlugs ?? []);
  const gallery = buildGallery(entry.galleryImageIds.map((id) => ({ id: id as never, layoutVariant: "portrait" })));

  return <JournalEntryTemplate entry={entry} gallery={gallery} relatedStories={relatedStories} />;
}
