import { compileMDX } from "next-mdx-remote/rsc";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { CTASection } from "@/components/blocks/CTASection";
import { RelatedStories } from "@/components/blocks/RelatedStories";
import { StoryGallery } from "@/components/galleries/StoryGallery";
import { Container } from "@/components/ui/Container";
import { RichText } from "@/components/ui/RichText";
import { formatDate } from "@/lib/utils/formatDate";
import type { StoryCard } from "@/types/content";
import type { GalleryItem } from "@/types/gallery";

type JournalEntryTemplateProps = {
  entry: {
    title: string;
    location: string;
    excerpt: string;
    publishedAt: string;
    source: string;
  };
  gallery: GalleryItem[];
  relatedStories: StoryCard[];
};

export async function JournalEntryTemplate({
  entry,
  gallery,
  relatedStories,
}: JournalEntryTemplateProps) {
  const { content } = await compileMDX({
    source: entry.source,
    options: {
      parseFrontmatter: false,
    },
  });

  return (
    <div className="space-y-10 pt-8 pb-16 md:space-y-14 md:pt-10 md:pb-20">
      <Container className="space-y-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Journal", href: "/journal" },
            { label: entry.title, href: "#" },
          ]}
        />
        <div className="space-y-4">
          <p className="text-xs font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
            {entry.location} · {formatDate(entry.publishedAt)}
          </p>
          <h1 className="font-display-face max-w-4xl text-5xl leading-[0.92] tracking-[-0.05em] md:text-7xl">
            {entry.title}
          </h1>
          <p className="max-w-2xl text-base leading-8 text-[var(--color-mist)]">
            {entry.excerpt}
          </p>
        </div>
      </Container>
      <Container>
        <StoryGallery items={gallery} />
      </Container>
      <Container>
        <RichText className="max-w-3xl">{content}</RichText>
      </Container>
      <RelatedStories stories={relatedStories} />
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
    </div>
  );
}
