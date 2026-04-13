import Image from "next/image";
import Link from "next/link";
import { MapPinned, NotebookText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { LinkButton } from "@/components/ui/LinkButton";
import { FloatIn } from "@/components/motion/FloatIn";
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
  showMoreLabel = "See more stories",
}: StoryCardGridProps) {
  if (!stories.length) {
    return null;
  }

  const previewStories = maxItems ? stories.slice(0, maxItems) : stories;

  return (
    <Container className="space-y-8">
      <FloatIn from="left">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow className="inline-flex items-center gap-2">
              <NotebookText size={14} strokeWidth={1.8} aria-hidden="true" />
              <span>Selected stories</span>
            </Eyebrow>
            <Heading className="text-3xl md:text-5xl">
              Proof with atmosphere, not filler.
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
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {previewStories.map((story, index) => (
          <FloatIn
            key={story.slug}
            className="h-full"
            from={index % 2 === 0 ? "bottom" : "right"}
            delay={index * 0.06}
          >
            <Link
              href={`/journal/${story.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[var(--color-line)] bg-[rgb(255_255_255_/_0.78)] shadow-[0_22px_44px_rgba(30,20,12,0.08)] transition duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_30px_60px_rgba(30,20,12,0.12)]"
            >
              <Image
                src={story.heroImage.src}
                alt={story.heroImage.alt}
                width={story.heroImage.width}
                height={story.heroImage.height}
                className="aspect-[4/5] w-full shrink-0 object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="flex max-h-[14.5rem] min-h-[14.5rem] flex-1 flex-col gap-3 p-5 md:max-h-[15.5rem] md:min-h-[15.5rem] lg:max-h-[18rem] lg:min-h-[18rem] xl:max-h-[15.5rem] xl:min-h-[15.5rem]">
                <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.24em] text-[var(--color-mist)] uppercase">
                  <MapPinned size={13} strokeWidth={1.8} aria-hidden="true" />
                  <span>{story.location}</span>
                </p>
                <h3 className="font-display-face text-2xl leading-[1.04] tracking-[-0.03em] text-pretty">
                  {story.title}
                </h3>
                <p className="text-sm leading-7 text-pretty text-[var(--color-mist)]">
                  {story.excerpt}
                </p>
              </div>
            </Link>
          </FloatIn>
        ))}
      </div>
    </Container>
  );
}
