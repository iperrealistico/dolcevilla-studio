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
  ornamentWashAsset: ImageAsset;
  ornamentOrbitAsset: ImageAsset;
  chapterCount: number;
  readingTimeLabel: string;
};

export function JournalEntryHero({
  title,
  excerpt,
  location,
  publishedAt,
  coverAsset,
  ornamentWashAsset,
  ornamentOrbitAsset,
  chapterCount,
  readingTimeLabel,
}: JournalEntryHeroProps) {
  const publishedLabel = formatDate(publishedAt);

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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,13,10,0.24)_0%,rgba(18,13,10,0.16)_18%,rgba(18,13,10,0.32)_42%,rgba(18,13,10,0.84)_100%)] md:bg-[linear-gradient(180deg,rgba(18,13,10,0.12),rgba(18,13,10,0.38)_36%,rgba(18,13,10,0.78))]" />
        <div
          aria-hidden="true"
          className="absolute -top-6 -right-12 h-[17rem] w-[17rem] opacity-60 mix-blend-screen md:top-8 md:right-[7%] md:h-[22rem] md:w-[22rem]"
        >
          <Image
            src={ornamentOrbitAsset.src}
            alt=""
            fill
            sizes="(min-width: 768px) 352px, 272px"
            className="object-contain"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute bottom-[-4rem] left-[-4rem] h-[17rem] w-[17rem] opacity-40 mix-blend-screen md:bottom-6 md:left-[3%] md:h-[24rem] md:w-[24rem]"
        >
          <Image
            src={ornamentWashAsset.src}
            alt=""
            fill
            sizes="(min-width: 768px) 384px, 272px"
            className="object-contain"
          />
        </div>
        <Container className="relative z-10 flex min-h-[clamp(32rem,134vw,38rem)] flex-col justify-between px-0 py-0 md:min-h-[78svh] md:justify-end md:py-12">
          <div className="flex min-h-[clamp(32rem,134vw,38rem)] flex-col justify-between px-5 pt-5 pb-6 md:min-h-[78svh] md:px-0 md:pt-0 md:pb-0">
            <div className="flex flex-wrap items-center gap-2 md:justify-end">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-[rgb(255_255_255_/_0.08)] px-3 py-2 text-[0.68rem] font-semibold tracking-[0.24em] text-[rgb(244_235_224_/_0.84)] uppercase shadow-[0_14px_36px_rgba(10,7,5,0.18)] backdrop-blur-sm">
                <MapPinned size={13} strokeWidth={1.8} aria-hidden="true" />
                <span>{location}</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-[rgb(255_255_255_/_0.08)] px-3 py-2 text-[0.68rem] font-semibold tracking-[0.24em] text-[rgb(244_235_224_/_0.84)] uppercase shadow-[0_14px_36px_rgba(10,7,5,0.18)] backdrop-blur-sm">
                <NotebookPen size={13} strokeWidth={1.8} aria-hidden="true" />
                <span>{chapterCount} chapters</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-[rgb(255_255_255_/_0.08)] px-3 py-2 text-[0.68rem] font-semibold tracking-[0.24em] text-[rgb(244_235_224_/_0.84)] uppercase shadow-[0_14px_36px_rgba(10,7,5,0.18)] backdrop-blur-sm">
                <Clock3 size={13} strokeWidth={1.8} aria-hidden="true" />
                <span>{readingTimeLabel}</span>
              </div>
            </div>
            <div className="max-w-5xl space-y-5 drop-shadow-[0_18px_38px_rgba(10,7,5,0.36)] md:space-y-6">
              <p className="text-[0.72rem] font-semibold tracking-[0.28em] text-[rgb(244_235_224_/_0.82)] uppercase [text-shadow:0_1px_2px_rgba(9,6,5,0.4),0_8px_22px_rgba(9,6,5,0.62)]">
                {publishedLabel}
              </p>
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
