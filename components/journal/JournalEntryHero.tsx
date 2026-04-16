import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { formatDate } from "@/lib/utils/formatDate";
import type { ImageAsset } from "@/types/gallery";

type JournalEntryHeroProps = {
  title: string;
  excerpt: string;
  location: string;
  publishedAt: string;
  coverAsset: ImageAsset;
};

export function JournalEntryHero({
  title,
  excerpt,
  location,
  publishedAt,
  coverAsset,
}: JournalEntryHeroProps) {
  const publishedLabel = `${location} · ${formatDate(publishedAt)}`;

  return (
    <section className="px-4 pt-3 pb-5 md:px-8 md:pt-4 lg:px-10">
      <div className="relative min-h-[clamp(31rem,132vw,36rem)] overflow-hidden rounded-[2rem] border border-white/14 bg-[var(--color-shell)] shadow-[0_36px_100px_rgba(18,12,9,0.24)] md:min-h-[72svh]">
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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,13,10,0.48)_0%,rgba(18,13,10,0.18)_24%,rgba(18,13,10,0.24)_46%,rgba(18,13,10,0.82)_100%)] md:bg-[linear-gradient(180deg,rgba(18,13,10,0.18),rgba(18,13,10,0.42)_38%,rgba(18,13,10,0.72))]" />
        <Container className="relative z-10 flex min-h-[clamp(31rem,132vw,36rem)] flex-col justify-between px-0 py-0 md:min-h-[72svh] md:justify-end md:py-12">
          <div className="flex min-h-[clamp(31rem,132vw,36rem)] flex-col justify-between px-5 pt-5 pb-6 md:min-h-[72svh] md:px-0 md:pt-0 md:pb-0">
            <p className="text-[0.7rem] font-semibold tracking-[0.28em] text-[rgb(244_235_224_/_0.86)] uppercase [text-shadow:0_1px_2px_rgba(9,6,5,0.4),0_8px_22px_rgba(9,6,5,0.62)] md:hidden">
              {publishedLabel}
            </p>
            <div className="max-w-4xl space-y-4 drop-shadow-[0_18px_38px_rgba(10,7,5,0.36)] md:space-y-6">
              <p className="hidden text-xs font-semibold tracking-[0.28em] text-[rgb(244_235_224_/_0.82)] uppercase [text-shadow:0_1px_2px_rgba(9,6,5,0.4),0_8px_22px_rgba(9,6,5,0.62)] md:block">
                {publishedLabel}
              </p>
              <h1 className="font-display-face max-w-[9.5ch] text-[2.75rem] leading-[0.92] tracking-[-0.055em] text-[var(--color-paper)] [text-shadow:0_2px_6px_rgba(9,6,5,0.36),0_18px_42px_rgba(9,6,5,0.74)] sm:text-[3.15rem] md:max-w-5xl md:text-[6.2rem] md:leading-[0.9] md:tracking-[-0.06em]">
                {title}
              </h1>
              <p className="max-w-[19rem] text-[1rem] leading-7 text-[rgb(244_235_224_/_0.88)] [text-shadow:0_2px_4px_rgba(9,6,5,0.34),0_10px_28px_rgba(9,6,5,0.58)] md:max-w-2xl md:text-lg md:leading-8 md:text-[rgb(244_235_224_/_0.84)]">
                {excerpt}
              </p>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
