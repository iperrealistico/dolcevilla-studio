import Image from "next/image";
import { Clock3, MapPinned, NotebookPen } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { formatDate } from "@/lib/utils/formatDate";
import type { ImageAsset } from "@/types/gallery";

type JournalEntryHeroProps = {
  title: string;
  excerpt: string;
  location: string;
  publishedAt: string;
  coverAsset: ImageAsset;
  chapterCount: number;
  readingTimeLabel: string;
};

export function JournalEntryHero({
  title,
  excerpt,
  location,
  publishedAt,
  coverAsset,
  chapterCount,
  readingTimeLabel,
}: JournalEntryHeroProps) {
  const publishedLabel = formatDate(publishedAt);
  const heroMetaChipClassName =
    "inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-line)] bg-[var(--surface-badge)] px-3.5 py-2 text-[0.68rem] font-semibold tracking-[0.18em] text-[var(--color-ink)] uppercase shadow-[var(--shadow-soft)]";

  return (
    <section className="px-4 pt-4 pb-4 md:px-8 md:pt-5 lg:px-10">
      <div className="relative mx-auto max-w-[var(--journal-frame-max)] overflow-hidden rounded-[var(--radius-frame)] border border-[var(--color-line)] bg-[var(--surface-article-frame)] shadow-[var(--shadow-card)]">
        <div className="relative min-h-[clamp(14rem,52vw,20rem)] overflow-hidden border-b border-[var(--color-line)] md:min-h-[clamp(17rem,34vw,24rem)]">
          <Image
            src={coverAsset.src}
            alt={coverAsset.alt}
            fill
            priority
            sizes="(min-width: 1280px) 84rem, 100vw"
            placeholder="blur"
            blurDataURL={coverAsset.blurDataURL}
            className="object-cover object-center"
            style={
              coverAsset.focalPoint
                ? { objectPosition: coverAsset.focalPoint }
                : undefined
            }
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,8,7,0.08)_0%,rgba(10,8,7,0.18)_52%,rgba(10,8,7,0.34)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)] md:h-28" />
        </div>
        <Container className="px-0">
          <div className="space-y-5 px-5 py-6 md:px-8 md:py-8 lg:px-10 lg:py-9">
            <div className="flex flex-wrap items-start justify-between gap-3 md:gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <div className={heroMetaChipClassName}>
                  <span>{publishedLabel}</span>
                </div>
                <div className={heroMetaChipClassName}>
                  <MapPinned size={13} strokeWidth={1.8} aria-hidden="true" />
                  <span>{location}</span>
                </div>
                <div className={heroMetaChipClassName}>
                  <NotebookPen size={13} strokeWidth={1.8} aria-hidden="true" />
                  <span>{chapterCount} chapters</span>
                </div>
                <div className={heroMetaChipClassName}>
                  <Clock3 size={13} strokeWidth={1.8} aria-hidden="true" />
                  <span>{readingTimeLabel}</span>
                </div>
              </div>
            </div>
            <div className="max-w-4xl space-y-4 md:space-y-5">
              <h1 className="font-display-face max-w-[9.5ch] text-[2.45rem] leading-[0.92] tracking-[-0.06em] text-[var(--color-ink)] sm:text-[2.9rem] md:max-w-5xl md:text-[4.45rem] md:leading-[0.9]">
                {title}
              </h1>
              <p className="max-w-[24rem] text-[1rem] leading-7 text-[var(--color-mist)] md:max-w-2xl md:text-lg md:leading-8">
                {excerpt}
              </p>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
