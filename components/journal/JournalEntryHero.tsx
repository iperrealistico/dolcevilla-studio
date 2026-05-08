import { Clock3, MapPinned, NotebookPen } from "lucide-react";
import { HeroSequence, type HeroSequenceSlide } from "@/components/galleries/HeroSequence";
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

function buildJournalHeroSlides(coverAsset: ImageAsset): HeroSequenceSlide[] {
  const basePosition = coverAsset.focalPoint ?? "50% 50%";

  return [
    { ...coverAsset, id: `${coverAsset.id}-origin`, objectPosition: basePosition },
    { ...coverAsset, id: `${coverAsset.id}-left`, objectPosition: "26% 50%" },
    { ...coverAsset, id: `${coverAsset.id}-center`, objectPosition: "50% 50%" },
    { ...coverAsset, id: `${coverAsset.id}-right`, objectPosition: "74% 50%" },
  ];
}

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
  const heroSlides = buildJournalHeroSlides(coverAsset);
  const heroMetaChipClassName =
    "inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-[rgb(255_255_255_/_0.16)] bg-[rgb(8_7_7_/_0.34)] px-3.5 py-2 text-[0.68rem] font-semibold tracking-[0.18em] text-[rgb(250_244_236)] uppercase shadow-[0_18px_42px_rgba(10,7,5,0.24)] ring-1 ring-[rgb(255_255_255_/_0.06)] backdrop-blur-md";

  return (
    <section className="pb-4">
      <div className="relative min-h-[clamp(31rem,118vw,37rem)] overflow-hidden border-y border-white/12 bg-[var(--color-shell)] shadow-[0_40px_110px_rgba(18,12,9,0.24)] md:min-h-[min(76svh,45rem)]">
        <HeroSequence
          images={heroSlides}
          imageClassName="object-center"
          slideClassName="min-w-[84vw] sm:min-w-[64vw] lg:min-w-[35vw] xl:min-w-[29vw]"
          overlayClassName="bg-[linear-gradient(180deg,rgba(10,7,5,0.3)_0%,rgba(10,7,5,0.16)_20%,rgba(10,7,5,0.22)_42%,rgba(10,7,5,0.82)_100%)] md:bg-[linear-gradient(180deg,rgba(10,7,5,0.22)_0%,rgba(10,7,5,0.12)_18%,rgba(10,7,5,0.18)_42%,rgba(10,7,5,0.78)_100%)]"
          autoScrollSpeedPxPerSecond={26}
          sizes="(min-width: 1536px) 28vw, (min-width: 1280px) 29vw, (min-width: 1024px) 35vw, (min-width: 640px) 64vw, 84vw"
        />
        <div className="absolute inset-x-0 top-0 h-[26%] bg-[linear-gradient(180deg,rgba(10,7,5,0.22),rgba(10,7,5,0.06),transparent)] md:h-[22%]" />
        <Container className="pointer-events-none relative z-10 flex min-h-[clamp(31rem,118vw,37rem)] flex-col justify-end py-5 md:min-h-[min(76svh,45rem)] md:py-10">
          <div className="pointer-events-none space-y-6 rounded-[var(--radius-frame)] border border-white/12 bg-[rgb(8_7_7_/_0.38)] px-5 py-5 shadow-[0_28px_76px_rgba(0,0,0,0.26)] backdrop-blur-md md:px-7 md:py-7">
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
              <h1 className="font-display-face max-w-[9.4ch] text-[2.75rem] leading-[0.91] tracking-[-0.06em] text-[var(--color-paper)] [text-shadow:0_2px_6px_rgba(9,6,5,0.36),0_18px_42px_rgba(9,6,5,0.76)] sm:text-[3.2rem] md:max-w-5xl md:text-[6.05rem] md:leading-[0.89] md:tracking-[-0.064em]">
                {title}
              </h1>
              <p className="max-w-[22rem] text-[1rem] leading-7 text-[rgb(244_235_224_/_0.88)] [text-shadow:0_2px_4px_rgba(9,6,5,0.34),0_10px_28px_rgba(9,6,5,0.58)] md:max-w-2xl md:text-lg md:leading-8 md:text-[rgb(244_235_224_/_0.84)]">
                {excerpt}
              </p>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
