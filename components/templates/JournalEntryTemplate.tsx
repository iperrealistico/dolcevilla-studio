import { compileMDX } from "next-mdx-remote/rsc";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JournalEntryHero } from "@/components/journal/JournalEntryHero";
import { CTASection } from "@/components/blocks/CTASection";
import { RelatedStories } from "@/components/blocks/RelatedStories";
import { journalMdxComponents } from "@/components/journal/journalMdxComponents";
import { Container } from "@/components/ui/Container";
import { RichText } from "@/components/ui/RichText";
import { journalEntryTemplateContent } from "@/content/journal/template";
import {
  analyzeJournalSource,
  prepareJournalSource,
} from "@/lib/content/journalSource";
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
  const preparedSource = prepareJournalSource(
    entry.source,
    entry.galleryImageIds,
  );
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
            { label: journalEntryTemplateContent.breadcrumbs.home, href: "/" },
            {
              label: journalEntryTemplateContent.breadcrumbs.journal,
              href: "/journal",
            },
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
        <RichText className="mx-auto w-full">{content}</RichText>
      </Container>
      <RelatedStories stories={relatedStories} />
      {sourceAnalysis.photographerSegueCount === 0 ? (
        <CTASection section={journalEntryTemplateContent.fallbackCta} />
      ) : null}
    </div>
  );
}
