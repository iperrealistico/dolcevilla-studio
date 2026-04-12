import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { FloatIn } from "@/components/motion/FloatIn";
import type { StoryCard } from "@/types/content";

export function StoryCardGrid({ stories }: { stories: StoryCard[] }) {
  if (!stories.length) {
    return null;
  }

  return (
    <Container className="space-y-8">
      <FloatIn from="left">
        <div>
          <Eyebrow>Selected stories</Eyebrow>
          <Heading className="text-3xl md:text-5xl">
            Proof with atmosphere, not filler.
          </Heading>
        </div>
      </FloatIn>
      <div className="grid gap-5 md:grid-cols-3">
        {stories.map((story, index) => (
          <FloatIn key={story.slug} from={index % 2 === 0 ? "bottom" : "right"} delay={index * 0.06}>
            <Link
              href={`/journal/${story.slug}`}
              className="block overflow-hidden rounded-[1.75rem] border border-[var(--color-line)] bg-white/70 shadow-[0_24px_48px_rgba(30,20,12,0.08)] transition duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_30px_60px_rgba(30,20,12,0.12)]"
            >
              <Image
                src={story.heroImage.src}
                alt={story.heroImage.alt}
                width={story.heroImage.width}
                height={story.heroImage.height}
                className="aspect-[4/5] w-full object-cover transition duration-700 ease-out hover:scale-[1.04]"
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
          </FloatIn>
        ))}
      </div>
    </Container>
  );
}
