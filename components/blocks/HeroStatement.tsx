import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LinkButton } from "@/components/ui/LinkButton";
import { HeroSequence } from "@/components/galleries/HeroSequence";
import { getImageAsset } from "@/lib/images/imageManifest";
import type { HeroContent } from "@/types/content";

export function HeroStatement({ hero }: { hero: HeroContent }) {
  const images = hero.imageIds.map((id) => getImageAsset(id as never));

  return (
    <section className="dvh-panel relative px-5 pt-6 pb-10 md:px-8 lg:px-10">
      <div className="relative min-h-[78dvh] overflow-hidden rounded-[2rem]">
        <HeroSequence images={images} />
        <Container className="relative z-10 flex min-h-[78dvh] flex-col justify-end px-0 py-10 md:py-14">
          <div className="max-w-4xl space-y-6">
            {hero.eyebrow ? (
              <Eyebrow className="text-[rgb(244_235_224_/_0.82)]">
                {hero.eyebrow}
              </Eyebrow>
            ) : null}
            <h1 className="font-display-face max-w-5xl text-[3.5rem] leading-[0.9] tracking-[-0.06em] text-[var(--color-paper)] md:text-[6.8rem]">
              {hero.title}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[rgb(244_235_224_/_0.82)] md:text-lg">
              {hero.subtitle}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <LinkButton href={hero.primaryCta.href}>
                {hero.primaryCta.label}
              </LinkButton>
              {hero.secondaryCta ? (
                <LinkButton href={hero.secondaryCta.href} variant="secondary">
                  {hero.secondaryCta.label}
                </LinkButton>
              ) : null}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
