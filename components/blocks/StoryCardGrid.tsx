import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import type { StoryCard } from "@/types/content";

export function StoryCardGrid({ stories }: { stories: StoryCard[] }) {
  if (!stories.length) {
    return null;
  }

  return (
    <Container className="space-y-8">
      <div>
        <Eyebrow>Selected stories</Eyebrow>
        <Heading className="text-3xl md:text-5xl">
          Proof with atmosphere, not filler.
        </Heading>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {stories.map((story) => (
          <Link
            key={story.slug}
            href={`/journal/${story.slug}`}
            className="overflow-hidden rounded-[1.75rem] border border-[var(--color-line)] bg-white/70"
          >
            <Image
              src={story.heroImage.src}
              alt={story.heroImage.alt}
              width={story.heroImage.width}
              height={story.heroImage.height}
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="space-y-2 p-5">
              <p className="text-xs font-semibold tracking-[0.24em] text-[var(--color-mist)] uppercase">
                {story.location}
              </p>
              <h3 className="font-display-face text-2xl tracking-[-0.03em]">
                {story.title}
              </h3>
              <p className="text-sm leading-7 text-[var(--color-mist)]">
                {story.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
