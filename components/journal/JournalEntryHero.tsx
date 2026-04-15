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
  return (
    <section className="px-5 pt-2 pb-4 md:px-8 md:pt-4 lg:px-10">
      <div className="relative min-h-[62svh] overflow-hidden rounded-[2rem] border border-white/14 bg-[var(--color-shell)] shadow-[0_36px_100px_rgba(18,12,9,0.24)] md:min-h-[72svh]">
        <Image
          src={coverAsset.src}
          alt={coverAsset.alt}
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={coverAsset.blurDataURL}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,13,10,0.18),rgba(18,13,10,0.42)_38%,rgba(18,13,10,0.72))]" />
        <Container className="relative z-10 flex min-h-[62svh] flex-col justify-end px-0 py-8 md:min-h-[72svh] md:py-12">
          <div className="max-w-4xl space-y-4 drop-shadow-[0_18px_38px_rgba(10,7,5,0.36)] md:space-y-6">
            <p className="text-xs font-semibold tracking-[0.28em] text-[rgb(244_235_224_/_0.82)] uppercase [text-shadow:0_1px_2px_rgba(9,6,5,0.4),0_8px_22px_rgba(9,6,5,0.62)]">
              {location} · {formatDate(publishedAt)}
            </p>
            <h1 className="font-display-face max-w-5xl text-[3rem] leading-[0.9] tracking-[-0.06em] text-[var(--color-paper)] [text-shadow:0_2px_6px_rgba(9,6,5,0.36),0_18px_42px_rgba(9,6,5,0.74)] sm:text-[3.6rem] md:text-[6.2rem]">
              {title}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[rgb(244_235_224_/_0.84)] [text-shadow:0_2px_4px_rgba(9,6,5,0.34),0_10px_28px_rgba(9,6,5,0.58)] md:text-lg">
              {excerpt}
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}
