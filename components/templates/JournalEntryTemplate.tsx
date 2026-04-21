import { compileMDX } from "next-mdx-remote/rsc";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { RelatedStories } from "@/components/blocks/RelatedStories";
import { CTASection } from "@/components/blocks/CTASection";
import { ScrollParallax } from "@/components/motion/ScrollParallax";
import { JournalAmbientOrnaments } from "@/components/journal/JournalAmbientOrnaments";
import { JournalEntryHero } from "@/components/journal/JournalEntryHero";
import { JournalReadingChrome } from "@/components/journal/JournalReadingChrome";
import { journalMdxComponents } from "@/components/journal/journalMdxComponents";
import { Container } from "@/components/ui/Container";
import { RichText } from "@/components/ui/RichText";
import { journalEntryTemplateContent } from "@/content/journal/template";
import {
  analyzeJournalSource,
  splitJournalSourceIntoSections,
} from "@/lib/content/journalSource";
import { cn } from "@/lib/utils/cn";
import type { StoryCard } from "@/types/content";
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

async function renderMdxBlock(source: string) {
  if (!source.trim()) {
    return null;
  }

  const { content } = await compileMDX({
    source,
    components: journalMdxComponents,
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
  const sourceAnalysis = analyzeJournalSource(entry.source);
  const { introSource, sections } = splitJournalSourceIntoSections(entry.source);
  const ornamentWashAsset = entry.ornamentWashAsset ?? entry.coverAsset;
  const ornamentOrbitAsset = entry.ornamentOrbitAsset ?? entry.coverAsset;
  const introContent = await renderMdxBlock(introSource);
  const sectionContents = await Promise.all(
    sections.map(async (section) => ({
      ...section,
      content: await renderMdxBlock(section.source),
    })),
  );
  const readingTimeLabel = formatReadingTimeLabel(countWords(entry.source));

  return (
    <div id="top" className="relative pb-28 md:pb-20 xl:pb-24">
      <JournalReadingChrome
        chapters={sections.map((section) => ({
          id: section.id,
          title: section.title,
        }))}
      />

      <div className="space-y-8 pb-14 md:space-y-12 md:pb-20">
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
          ornamentWashAsset={ornamentWashAsset}
          ornamentOrbitAsset={ornamentOrbitAsset}
          chapterCount={sections.length}
          readingTimeLabel={readingTimeLabel}
        />

        <section
          id="journal-article"
          className="relative overflow-hidden px-4 md:px-8 lg:px-10"
        >
          <div className="relative rounded-[2.2rem] border border-[rgb(92_77_58_/_0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.74),rgba(246,241,235,0.92))] shadow-[0_30px_80px_rgba(25,19,14,0.08)]">
            <JournalAmbientOrnaments
              washAsset={ornamentWashAsset}
              orbitAsset={ornamentOrbitAsset}
            />

            <Container className="relative z-10 py-8 md:py-12 xl:px-20">
              {introContent ? (
                <ScrollParallax
                  className="relative mx-auto mb-14 max-w-4xl"
                  from="bottom"
                  intensity="md"
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
                </ScrollParallax>
              ) : null}

              <div className="space-y-10 md:space-y-14">
                {sectionContents.map((section, index) => {
                  const isLeftLead = index % 2 === 0;
                  const chapterLabel = String(index + 1).padStart(2, "0");

                  return (
                    <section
                      key={section.id}
                      id={section.id}
                      className="scroll-mt-28"
                    >
                      <div className="grid gap-5 lg:grid-cols-12 lg:gap-8">
                        <ScrollParallax
                          from={isLeftLead ? "left" : "right"}
                          intensity="md"
                          className={cn(
                            "lg:col-span-8",
                            isLeftLead ? "lg:col-start-1" : "lg:col-start-5",
                          )}
                        >
                          <div className="relative overflow-hidden rounded-[2rem] border border-[rgb(92_77_58_/_0.1)] bg-[rgb(255_255_255_/_0.82)] px-6 py-7 shadow-[0_26px_64px_rgba(25,19,14,0.08)] backdrop-blur-sm md:px-8 md:py-9">
                            <div
                              aria-hidden="true"
                              className={cn(
                                "pointer-events-none absolute -top-14 h-32 w-32 rounded-full blur-3xl",
                                isLeftLead
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
                        </ScrollParallax>

                        <ScrollParallax
                          from={isLeftLead ? "right" : "left"}
                          intensity="sm"
                          className={cn(
                            "hidden lg:col-span-4 lg:block",
                            isLeftLead ? "lg:col-start-9" : "lg:col-start-1",
                          )}
                        >
                          <div className="sticky top-28 space-y-4 rounded-[1.9rem] border border-[rgb(92_77_58_/_0.08)] bg-[rgb(255_255_255_/_0.58)] px-5 py-5 shadow-[0_22px_54px_rgba(25,19,14,0.06)] backdrop-blur-sm">
                            <p className="text-[0.68rem] font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
                              Section Rhythm
                            </p>
                            <p className="font-display-face text-[1.8rem] leading-[0.96] tracking-[-0.04em] text-[var(--color-ink)]">
                              {section.title}
                            </p>
                            <p className="text-sm leading-7 text-[var(--color-mist)]">
                              Move through this chapter, then continue the story
                              with the next marker in the reading rail.
                            </p>
                            <a
                              href="#top"
                              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] text-[var(--color-mist)] uppercase"
                            >
                              <span>Back to top</span>
                              <ArrowUpRight
                                size={14}
                                strokeWidth={1.85}
                                aria-hidden="true"
                              />
                            </a>
                          </div>
                        </ScrollParallax>
                      </div>
                    </section>
                  );
                })}
              </div>
            </Container>
          </div>
        </section>

        <RelatedStories stories={relatedStories} />
        {sourceAnalysis.photographerSegueCount === 0 ? (
          <CTASection section={journalEntryTemplateContent.fallbackCta} />
        ) : null}
      </div>
    </div>
  );
}
