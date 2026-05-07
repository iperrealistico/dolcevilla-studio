import Image from "next/image";
import Link from "next/link";
import { MapPinned, NotebookText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { LinkButton } from "@/components/ui/LinkButton";
import { FloatIn } from "@/components/motion/FloatIn";
import { siteUi } from "@/content/site/ui";
import type { StoryCard } from "@/types/content";

type StoryCardGridProps = {
  stories: StoryCard[];
  maxItems?: number;
  showMoreHref?: string;
  showMoreLabel?: string;
};

export function StoryCardGrid({
  stories,
  maxItems,
  showMoreHref,
  showMoreLabel = siteUi.sections.storyGrid.showMoreLabel,
}: StoryCardGridProps) {
  if (!stories.length) {
    return null;
  }

  const previewStories = maxItems ? stories.slice(0, maxItems) : stories;

  return (
    <Container className="max-w-[var(--gallery-max)] space-y-8">
      <FloatIn from="left">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow className="inline-flex items-center gap-2">
              <NotebookText size={14} strokeWidth={1.8} aria-hidden="true" />
              <span>{siteUi.sections.storyGrid.eyebrow}</span>
            </Eyebrow>
            <Heading className="text-3xl md:text-5xl">
              {siteUi.sections.storyGrid.heading}
            </Heading>
          </div>
          {showMoreHref ? (
            <LinkButton
              href={showMoreHref}
              variant="secondary"
              className="self-start"
            >
              {showMoreLabel}
            </LinkButton>
          ) : null}
        </div>
      </FloatIn>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {previewStories.map((story, index) => (
          <FloatIn
            key={story.slug}
            className="h-full"
            from={index % 2 === 0 ? "bottom" : "right"}
            delay={index * 0.06}
          >
            <Link
              href={`/journal/${story.slug}`}
              className="group relative flex h-full min-h-[21rem] overflow-hidden rounded-[var(--radius-card)] border border-[rgb(255_255_255_/_0.18)] bg-[rgb(34_27_21_/_0.9)] shadow-[0_18px_42px_rgba(30,20,12,0.14)] transition duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_26px_56px_rgba(30,20,12,0.2)]"
            >
              <Image
                src={story.heroImage.src}
                alt={story.heroImage.alt}
                fill
                sizes="(min-width: 1280px) 24rem, (min-width: 768px) 44vw, 92vw"
                placeholder={story.heroImage.blurDataURL ? "blur" : "empty"}
                blurDataURL={story.heroImage.blurDataURL}
                className="object-cover blur-[1px] saturate-[0.92] transition duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,13,10,0.22)_0%,rgba(17,13,10,0.4)_26%,rgba(17,13,10,0.76)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_38%)]" />
              <div className="relative z-10 grid min-h-[21rem] w-full place-items-center p-4.5 md:p-5">
                <div className="w-full overflow-hidden rounded-[var(--radius-panel)] border border-[rgb(255_255_255_/_0.16)] bg-[rgb(255_255_255_/_0.11)] p-4.5 shadow-[0_16px_34px_rgba(10,7,5,0.18)] backdrop-blur-xl">
                  <div className="space-y-4">
                    <p className="inline-flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.24em] text-[rgb(246_237_227_/_0.8)] uppercase">
                      <MapPinned
                        size={13}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                      <span>{story.location}</span>
                    </p>
                    <div className="space-y-3">
                      <h3 className="font-display-face line-clamp-4 text-[1.75rem] leading-[0.96] tracking-[-0.04em] text-pretty text-[var(--color-paper)]">
                        {story.title}
                      </h3>
                      <p className="line-clamp-4 text-sm leading-7 text-pretty text-[rgb(246_237_227_/_0.82)]">
                        {story.excerpt}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </FloatIn>
        ))}
      </div>
    </Container>
  );
}
