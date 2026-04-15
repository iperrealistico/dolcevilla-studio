import { compileMDX } from "next-mdx-remote/rsc";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JournalEntryHero } from "@/components/journal/JournalEntryHero";
import { CTASection } from "@/components/blocks/CTASection";
import { RelatedStories } from "@/components/blocks/RelatedStories";
import { journalMdxComponents } from "@/components/journal/journalMdxComponents";
import { Container } from "@/components/ui/Container";
import { RichText } from "@/components/ui/RichText";
import { analyzeJournalSource, prepareJournalSource } from "@/lib/content/journalSource";
import type { StoryCard } from "@/types/content";
import type { ImageAsset } from "@/types/gallery";

type JournalEntryTemplateProps = {
  entry: {
    slug: string;
    articleTemplate: "legacy" | "v2";
    title: string;
    location: string;
    excerpt: string;
    publishedAt: string;
    source: string;
    coverAsset: ImageAsset;
    galleryImageIds: string[];
  };
  relatedStories: StoryCard[];
};

export async function JournalEntryTemplate({
  entry,
  relatedStories,
}: JournalEntryTemplateProps) {
  const sourceAnalysis = analyzeJournalSource(entry.source);
  const preparedSource = prepareJournalSource(entry.source, entry.galleryImageIds);
  const { content } = await compileMDX({
    source: preparedSource,
    components: journalMdxComponents,
    options: {
      parseFrontmatter: false,
    },
  });

  return (
    <div className="space-y-10 pb-16 md:space-y-14 md:pb-20">
      <Container className="pt-8 md:pt-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Journal", href: "/journal" },
            { label: entry.title, href: `/journal/${entry.slug}` },
          ]}
        />
      </Container>
      <JournalEntryHero
        title={entry.title}
        excerpt={entry.excerpt}
        location={entry.location}
        publishedAt={entry.publishedAt}
        coverAsset={entry.coverAsset}
      />
      <Container>
        <RichText className="max-w-3xl">{content}</RichText>
      </Container>
      <RelatedStories stories={relatedStories} />
      {sourceAnalysis.photographerSegueCount === 0 ? (
        <CTASection
          section={{
            title: "Planning something with place and atmosphere at its center?",
            body: "Tell us about the world you’re building and we’ll take it from there.",
            primaryCta: {
              label: "Start your inquiry",
              href: "/contact",
              variant: "primary",
            },
          }}
        />
      ) : null}
    </div>
  );
}
