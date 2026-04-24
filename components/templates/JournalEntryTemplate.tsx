import { compileMDX } from "next-mdx-remote/rsc";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { RelatedStories } from "@/components/blocks/RelatedStories";
import { CTASection } from "@/components/blocks/CTASection";
import { FloatIn } from "@/components/motion/FloatIn";
import { JournalAmbientOrnaments } from "@/components/journal/JournalAmbientOrnaments";
import { JournalEntryHero } from "@/components/journal/JournalEntryHero";
import { JournalReadingChrome } from "@/components/journal/JournalReadingChrome";
import { JournalStickyBannerCTA } from "@/components/journal/JournalStickyBannerCTA";
import { createJournalMdxComponents } from "@/components/journal/journalMdxComponents";
import { Container } from "@/components/ui/Container";
import { RichText } from "@/components/ui/RichText";
import { journalEntryTemplateContent } from "@/content/journal/template";
import {
  analyzeJournalSource,
  buildJournalSectionSnippet,
  splitJournalSourceIntoSections,
} from "@/lib/content/journalSource";
import { cn } from "@/lib/utils/cn";
import type { StoryCard } from "@/types/content";
import type { CTASection as CTASectionContent } from "@/types/content";
import type { ImageAsset } from "@/types/gallery";

type JournalEntryTemplateProps = {
  entry: {
    slug: string;
    articleTemplate: "legacy" | "v3";
    title: string;
    location: string;
    excerpt: string;
    publishedAt: string;
    source: string;
    chapterShortTitles?: string[];
    articleCtas?: {
      sticky: CTASectionContent;
      segue: CTASectionContent;
    };
    coverAsset: ImageAsset;
    ornamentWashAsset: ImageAsset | null;
    ornamentOrbitAsset: ImageAsset | null;
  };
  relatedStories: StoryCard[];
};

function countWords(source: string) {
  return source
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*`[\]()-]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function formatReadingTimeLabel(wordCount: number) {
  return `${Math.max(4, Math.ceil(wordCount / 220))} min read`;
}

async function renderMdxBlock(
  source: string,
  components = createJournalMdxComponents({
    photographerSegue: journalEntryTemplateContent.fallbackArticleCtas.segue,
  }),
) {
  if (!source.trim()) {
    return null;
  }

  const { content } = await compileMDX({
    source,
    components,
    options: {
      parseFrontmatter: false,
    },
  });

  return content;
}

export async function JournalEntryTemplate({
  entry,
  relatedStories,
}: JournalEntryTemplateProps) {
  const bodyColumnId = `journal-body-column-${entry.slug}`;
  const sourceAnalysis = analyzeJournalSource(entry.source);
  const { introSource, sections } = splitJournalSourceIntoSections(
    entry.source,
  );
  const chapters = sections.map((section, index) => ({
    id: section.id,
    title: section.title,
    shortTitle: entry.chapterShortTitles?.[index] ?? section.title,
  }));
  const articleCtas =
    entry.articleCtas ?? journalEntryTemplateContent.fallbackArticleCtas;
  const mdxComponents = createJournalMdxComponents({
    photographerSegue: articleCtas.segue,
  });
  const ornamentWashAsset = entry.ornamentWashAsset ?? entry.coverAsset;
  const ornamentOrbitAsset = entry.ornamentOrbitAsset ?? entry.coverAsset;
  const introContent = await renderMdxBlock(introSource, mdxComponents);
  const sectionContents = await Promise.all(
    sections.map(async (section, index) => ({
      ...section,
      snippet: buildJournalSectionSnippet(
        section,
        index,
        entry.chapterShortTitles?.[index],
      ),
      shortTitle: entry.chapterShortTitles?.[index] ?? section.title,
      content: await renderMdxBlock(section.source, mdxComponents),
    })),
  );
  const readingTimeLabel = formatReadingTimeLabel(countWords(entry.source));

  return (
    <div
      id="top"
      className="relative pb-[14.75rem] md:pb-[15.25rem] xl:pb-[11.5rem]"
    >
      <div className="pb-14 md:pb-20">
        <Container className="pt-6 md:pt-8">
          <Breadcrumbs
            items={[
              {
                label: journalEntryTemplateContent.breadcrumbs.home,
                href: "/",
              },
              {
                label: journalEntryTemplateContent.breadcrumbs.journal,
                href: "/journal",
              },
              { label: entry.title, href: `/journal/${entry.slug}` },
            ]}
          />
        </Container>

        <div className="mt-3 md:mt-4">
          <JournalEntryHero
            title={entry.title}
            excerpt={entry.excerpt}
            location={entry.location}
            publishedAt={entry.publishedAt}
            coverAsset={entry.coverAsset}
            chapterCount={sections.length}
            readingTimeLabel={readingTimeLabel}
          />
        </div>

        <section
          id="journal-article"
          className="relative mt-8 overflow-hidden px-4 md:mt-12 md:px-8 lg:px-10"
        >
          <div className="relative rounded-[2.2rem] border border-[rgb(92_77_58_/_0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.74),rgba(246,241,235,0.92))] shadow-[0_30px_80px_rgba(25,19,14,0.08)]">
            <JournalAmbientOrnaments
              washAsset={ornamentWashAsset}
              orbitAsset={ornamentOrbitAsset}
            />

            <Container className="relative z-10 py-8 md:py-12 xl:px-16 2xl:px-20">
              <div className="xl:grid xl:grid-cols-[14.2rem_minmax(0,1fr)] xl:gap-6 2xl:grid-cols-[15rem_minmax(0,1fr)] 2xl:gap-7">
                <div className="relative xl:self-stretch">
                  <JournalReadingChrome
                    chapters={chapters}
                    stickyCta={articleCtas.sticky}
                  />
                </div>

                <div id={bodyColumnId}>
                  <div className="relative mx-auto mb-8 max-w-4xl px-1 xl:mx-0 xl:mb-10 xl:max-w-none">
                    <div className="flex items-center gap-3 pb-4 md:pb-5">
                      <span
                        aria-hidden="true"
                        className="h-px w-10 bg-[linear-gradient(90deg,rgba(29,25,22,0.78),rgba(167,139,104,0.16))]"
                      />
                      <span className="text-[0.66rem] font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
                        {journalEntryTemplateContent.articleIntro.label}
                      </span>
                    </div>
                    <p className="font-display-face max-w-4xl text-[2rem] leading-[0.96] tracking-[-0.045em] text-[var(--color-ink)] md:text-[2.9rem] xl:max-w-[16ch] 2xl:text-[3.2rem]">
                      {entry.title}
                    </p>
                  </div>

                  {introContent ? (
                    <FloatIn
                      className="relative mx-auto mb-14 max-w-4xl xl:mx-0 xl:max-w-none"
                      from="bottom"
                      distance={30}
                      amount={0.08}
                    >
                      <div className="relative overflow-hidden rounded-[2rem] border border-[rgb(92_77_58_/_0.1)] bg-[rgb(255_255_255_/_0.78)] px-6 py-7 shadow-[0_24px_64px_rgba(25,19,14,0.08)] backdrop-blur-sm md:px-10 md:py-10">
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute -top-10 right-10 h-24 w-24 rounded-full bg-[rgb(212_195_166_/_0.16)] blur-3xl"
                        />
                        <RichText className="max-w-none text-[1.02rem] leading-8 md:text-[1.08rem]">
                          {introContent}
                        </RichText>
                      </div>
                    </FloatIn>
                  ) : null}

                  <div className="space-y-10 md:space-y-14">
                    {sectionContents.map((section, index) => {
                      const hasEvenIndex = index % 2 === 0;
                      const chapterLabel = String(index + 1).padStart(2, "0");

                      return (
                        <section
                          key={section.id}
                          id={section.id}
                          style={{
                            scrollMarginTop:
                              "calc(var(--site-header-height, 76px) + 2rem)",
                          }}
                        >
                          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_16.5rem] xl:gap-5 2xl:grid-cols-[minmax(0,1fr)_17rem] 2xl:gap-6">
                            <FloatIn
                              from={hasEvenIndex ? "left" : "right"}
                              distance={30}
                              amount={0.08}
                              className={cn(
                                hasEvenIndex ? "2xl:mr-4" : "2xl:ml-4",
                              )}
                            >
                              <div className="relative overflow-hidden rounded-[2rem] border border-[rgb(92_77_58_/_0.1)] bg-[rgb(255_255_255_/_0.82)] px-6 py-7 shadow-[0_26px_64px_rgba(25,19,14,0.08)] backdrop-blur-sm md:px-8 md:py-9">
                                <div
                                  aria-hidden="true"
                                  className={cn(
                                    "pointer-events-none absolute -top-14 h-32 w-32 rounded-full blur-3xl",
                                    hasEvenIndex
                                      ? "right-8 bg-[rgb(212_195_166_/_0.2)]"
                                      : "left-8 bg-[rgb(167_139_104_/_0.16)]",
                                  )}
                                />
                                <div className="relative space-y-6">
                                  <div className="space-y-3">
                                    <p className="text-[0.68rem] font-semibold tracking-[0.3em] text-[var(--color-mist)] uppercase">
                                      Chapter {chapterLabel}
                                    </p>
                                    <h2 className="font-display-face max-w-[14ch] text-[2.2rem] leading-[0.94] tracking-[-0.048em] text-[var(--color-ink)] md:text-[3.2rem]">
                                      {section.title}
                                    </h2>
                                  </div>
                                  <RichText className="max-w-none text-[1rem] leading-8 md:text-[1.04rem]">
                                    {section.content}
                                  </RichText>
                                </div>
                              </div>
                            </FloatIn>

                            <FloatIn
                              from={hasEvenIndex ? "right" : "left"}
                              distance={20}
                              amount={0.1}
                              className="hidden xl:block"
                            >
                              <div
                                className="sticky rounded-[1.75rem] border border-[rgb(92_77_58_/_0.08)] bg-[rgb(255_255_255_/_0.62)] px-4.5 py-4.5 shadow-[0_22px_54px_rgba(25,19,14,0.06)] backdrop-blur-sm"
                                style={{
                                  top: "calc(var(--site-header-height, 76px) + 1.5rem)",
                                }}
                              >
                                <div className="space-y-4">
                                  <p className="text-[0.68rem] font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
                                    {section.snippet.label}
                                  </p>
                                  <div className="space-y-3">
                                    <p className="font-display-face text-[1.52rem] leading-[0.97] tracking-[-0.04em] text-[var(--color-ink)]">
                                      {section.snippet.title}
                                    </p>
                                    <p className="text-sm leading-7 text-[var(--color-mist)]">
                                      {section.snippet.summary}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </FloatIn>
                          </div>
                        </section>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </section>

        <RelatedStories stories={relatedStories} />
        {sourceAnalysis.photographerSegueCount === 0 ? (
          <CTASection section={journalEntryTemplateContent.fallbackCta} />
        ) : null}
      </div>
      <JournalStickyBannerCTA
        section={articleCtas.sticky}
        bodyColumnId={bodyColumnId}
      />
    </div>
  );
}
