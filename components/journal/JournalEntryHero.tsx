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
    "inline-flex items-center gap-2 rounded-full border border-[rgb(255_255_255_/_0.18)] bg-[linear-gradient(145deg,rgba(16,12,9,0.42),rgba(16,12,9,0.24))] px-3.5 py-2 text-[0.68rem] font-semibold tracking-[0.18em] text-[rgb(250_244_236)] uppercase shadow-[0_18px_42px_rgba(10,7,5,0.24)] ring-1 ring-[rgb(255_255_255_/_0.06)] backdrop-blur-md";

  return (
    <section className="px-4 pt-3 pb-4 md:px-8 md:pt-4 lg:px-10">
      <div className="relative min-h-[clamp(32rem,134vw,38rem)] overflow-hidden rounded-[2.2rem] border border-white/16 bg-[var(--color-shell)] shadow-[0_40px_110px_rgba(18,12,9,0.24)] md:min-h-[78svh]">
        <Image
          src={coverAsset.src}
          alt={coverAsset.alt}
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={coverAsset.blurDataURL}
          className="object-cover object-[56%_center] md:object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,11,8,0.58)_0%,rgba(14,11,8,0.4)_18%,rgba(14,11,8,0.18)_34%,rgba(18,13,10,0.34)_54%,rgba(18,13,10,0.84)_100%)] md:bg-[linear-gradient(180deg,rgba(14,11,8,0.46)_0%,rgba(14,11,8,0.34)_16%,rgba(14,11,8,0.12)_32%,rgba(18,13,10,0.3)_56%,rgba(18,13,10,0.78)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-[34%] bg-[linear-gradient(180deg,rgba(10,7,5,0.24),rgba(10,7,5,0.12),transparent)] md:h-[28%]" />
        <div className="absolute inset-y-0 left-0 w-[68%] bg-[radial-gradient(circle_at_20%_56%,rgba(10,7,5,0.22),transparent_62%)] md:w-[58%]" />
        <Container className="relative z-10 flex min-h-[clamp(32rem,134vw,38rem)] flex-col justify-between px-0 py-0 md:min-h-[78svh] md:justify-end md:py-12">
          <div className="flex min-h-[clamp(32rem,134vw,38rem)] flex-col justify-between px-5 pt-5 pb-6 md:min-h-[78svh] md:px-0 md:pt-0 md:pb-0">
            <div className="flex flex-wrap items-start justify-between gap-3 md:gap-4">
              <div className={heroMetaChipClassName}>
                <span>{publishedLabel}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 md:justify-end">
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
            <div className="max-w-5xl space-y-5 drop-shadow-[0_18px_38px_rgba(10,7,5,0.36)] md:space-y-6">
              <h1 className="font-display-face max-w-[9.4ch] text-[2.85rem] leading-[0.91] tracking-[-0.06em] text-[var(--color-paper)] [text-shadow:0_2px_6px_rgba(9,6,5,0.36),0_18px_42px_rgba(9,6,5,0.76)] sm:text-[3.3rem] md:max-w-5xl md:text-[6.5rem] md:leading-[0.89] md:tracking-[-0.064em]">
                {title}
              </h1>
              <p className="max-w-[21rem] text-[1rem] leading-7 text-[rgb(244_235_224_/_0.88)] [text-shadow:0_2px_4px_rgba(9,6,5,0.34),0_10px_28px_rgba(9,6,5,0.58)] md:max-w-2xl md:text-lg md:leading-8 md:text-[rgb(244_235_224_/_0.84)]">
                {excerpt}
              </p>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
