import { ArrowDown } from "lucide-react";
import { FloatIn } from "@/components/motion/FloatIn";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LinkButton } from "@/components/ui/LinkButton";
import {
  HeroSequence,
  type HeroSequenceSlide,
} from "@/components/galleries/HeroSequence";
import { getImageAsset } from "@/lib/images/imageManifest";
import { cn } from "@/lib/utils/cn";
import { siteUi } from "@/content/site/ui";
import type { HeroContent } from "@/types/content";

type HeroVariantStyle = {
  desktopFrameClassName: string;
  desktopContentClassName: string;
  desktopTitleClassName: string;
  desktopCopyClassName: string;
  imageClassName: string;
  slideClassName: string;
  mobileTitleClassName: string;
  mobileCopyClassName: string;
  mobileImageHeightClassName: string;
};

function getMobileHeroContentId(hero: HeroContent) {
  const slug = hero.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 56);

  return `hero-intro-${hero.variant}-${slug || "content"}`;
}

const HERO_VARIANT_STYLES: Record<HeroContent["variant"], HeroVariantStyle> = {
  minimal: {
    desktopFrameClassName: "md:min-h-[min(72dvh,42rem)]",
    desktopContentClassName: "md:max-w-[38rem] xl:max-w-[42rem]",
    desktopTitleClassName: "md:max-w-[12ch] md:text-[3.7rem] xl:text-[4.25rem]",
    desktopCopyClassName: "md:max-w-[28rem]",
    imageClassName: "object-[60%_center] md:object-center",
    slideClassName:
      "min-w-[84vw] sm:min-w-[62vw] lg:min-w-[37vw] xl:min-w-[31vw]",
    mobileTitleClassName: "max-w-[11ch] text-[2.35rem] sm:text-[2.7rem]",
    mobileCopyClassName: "max-w-[34ch]",
    mobileImageHeightClassName: "min-h-[clamp(20rem,46svh,25rem)]",
  },
  home: {
    desktopFrameClassName: "md:min-h-[min(78dvh,47rem)]",
    desktopContentClassName: "md:max-w-[41rem] xl:max-w-[44rem]",
    desktopTitleClassName: "md:max-w-[12ch] md:text-[4rem] xl:text-[4.7rem]",
    desktopCopyClassName: "md:max-w-[29rem]",
    imageClassName: "object-[58%_center] md:object-center",
    slideClassName:
      "min-w-[84vw] sm:min-w-[62vw] lg:min-w-[38vw] xl:min-w-[32vw]",
    mobileTitleClassName: "max-w-[11ch] text-[2.5rem] sm:text-[2.9rem]",
    mobileCopyClassName: "max-w-[34ch]",
    mobileImageHeightClassName: "min-h-[clamp(24rem,58svh,31rem)]",
  },
  service: {
    desktopFrameClassName: "md:min-h-[min(72dvh,42rem)]",
    desktopContentClassName: "md:max-w-[38rem] xl:max-w-[42rem]",
    desktopTitleClassName: "md:max-w-[12ch] md:text-[3.7rem] xl:text-[4.25rem]",
    desktopCopyClassName: "md:max-w-[28rem]",
    imageClassName: "object-[60%_center] md:object-center",
    slideClassName:
      "min-w-[84vw] sm:min-w-[62vw] lg:min-w-[37vw] xl:min-w-[31vw]",
    mobileTitleClassName: "max-w-[11ch] text-[2.35rem] sm:text-[2.7rem]",
    mobileCopyClassName: "max-w-[34ch]",
    mobileImageHeightClassName: "min-h-[clamp(20rem,46svh,25rem)]",
  },
  editorial: {
    desktopFrameClassName: "md:min-h-[min(70dvh,41rem)]",
    desktopContentClassName: "md:max-w-[37rem] xl:max-w-[40rem]",
    desktopTitleClassName: "md:max-w-[12ch] md:text-[3.55rem] xl:text-[4.1rem]",
    desktopCopyClassName: "md:max-w-[27rem]",
    imageClassName: "object-[60%_center] md:object-center",
    slideClassName:
      "min-w-[84vw] sm:min-w-[62vw] lg:min-w-[36vw] xl:min-w-[30vw]",
    mobileTitleClassName: "max-w-[11ch] text-[2.2rem] sm:text-[2.55rem]",
    mobileCopyClassName: "max-w-[33ch]",
    mobileImageHeightClassName: "min-h-[clamp(19rem,44svh,24rem)]",
  },
  landing: {
    desktopFrameClassName: "md:min-h-[min(68dvh,39rem)]",
    desktopContentClassName: "md:max-w-[36rem] xl:max-w-[39rem]",
    desktopTitleClassName:
      "md:max-w-[13ch] md:text-[3.35rem] xl:text-[3.95rem]",
    desktopCopyClassName: "md:max-w-[26rem]",
    imageClassName: "object-[62%_center] md:object-center",
    slideClassName:
      "min-w-[84vw] sm:min-w-[62vw] lg:min-w-[36vw] xl:min-w-[30vw]",
    mobileTitleClassName: "max-w-[12ch] text-[2.1rem] sm:text-[2.45rem]",
    mobileCopyClassName: "max-w-[33ch]",
    mobileImageHeightClassName: "min-h-[clamp(18rem,42svh,23rem)]",
  },
  ads: {
    desktopFrameClassName: "md:min-h-[min(64dvh,37rem)]",
    desktopContentClassName: "md:max-w-[34rem] xl:max-w-[37rem]",
    desktopTitleClassName:
      "md:max-w-[13ch] md:text-[3.05rem] xl:text-[3.55rem]",
    desktopCopyClassName: "md:max-w-[24rem]",
    imageClassName: "object-[64%_center] md:object-center",
    slideClassName:
      "min-w-[84vw] sm:min-w-[62vw] lg:min-w-[35vw] xl:min-w-[29vw]",
    mobileTitleClassName: "max-w-[12ch] text-[2rem] sm:text-[2.3rem]",
    mobileCopyClassName: "max-w-[32ch]",
    mobileImageHeightClassName: "min-h-[clamp(17rem,40svh,22rem)]",
  },
};

export function HeroStatement({ hero }: { hero: HeroContent }) {
  if (hero.variant === "minimal") {
    return (
      <section className="relative pt-10 md:pt-12">
        <Container>
          {hero.eyebrow ? (
            <FloatIn from="left">
              <p className="mb-3 text-xs font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
                {hero.eyebrow}
              </p>
            </FloatIn>
          ) : null}
          <FloatIn from="left" delay={0.08}>
            <h1 className="font-display-face max-w-4xl text-5xl leading-[0.94] tracking-[-0.05em] md:text-7xl">
              {hero.title}
            </h1>
          </FloatIn>
          <FloatIn delay={0.16}>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--color-mist)]">
              {hero.subtitle}
            </p>
          </FloatIn>
        </Container>
      </section>
    );
  }

  const heroSlides = hero.imageIds.map((id) => {
    const image = getImageAsset(id as never);

    return {
      ...image,
      objectPosition: image.focalPoint,
    } satisfies HeroSequenceSlide;
  });
  const styles = HERO_VARIANT_STYLES[hero.variant];
  const mobileContentId = getMobileHeroContentId(hero);

  return (
    <section className="relative pb-6 md:pb-10" data-hero-section="true">
      <div
        className={cn(
          "relative flex flex-col overflow-hidden border-y border-[var(--color-line)] bg-[var(--surface-hero-frame)] shadow-[var(--shadow-card)]",
          styles.desktopFrameClassName,
        )}
      >
        <div className="relative md:absolute md:inset-0">
          <div
            className={cn(
              "relative overflow-hidden md:h-full md:min-h-full",
              styles.mobileImageHeightClassName,
            )}
          >
            <HeroSequence
              images={heroSlides}
              imageClassName={styles.imageClassName}
              slideClassName={styles.slideClassName}
              autoScrollSpeedPxPerSecond={hero.variant === "home" ? 34 : 30}
            />
          </div>
          <a
            href={`#${mobileContentId}`}
            aria-label={siteUi.hero.scrollToIntroductionLabel}
            className="absolute inset-x-0 bottom-0 z-20 flex translate-y-1/2 flex-col items-center gap-2 md:hidden"
          >
            <span className="text-[0.58rem] font-medium tracking-[0.34em] text-[rgb(250_247_242_/_0.86)] uppercase drop-shadow-[0_2px_10px_rgba(28,22,18,0.28)]">
              {siteUi.hero.scrollLabel}
            </span>
            <span className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-control)] border border-[var(--color-line)] bg-[var(--surface-badge)] text-[var(--color-ink)] shadow-[var(--shadow-soft)] backdrop-blur-md">
              <ArrowDown size={18} strokeWidth={1.7} aria-hidden="true" />
            </span>
          </a>
        </div>
        <Container
          className={cn(
            "pointer-events-none relative z-10 w-full md:flex md:min-h-full md:items-end md:py-10 lg:py-12",
            styles.desktopFrameClassName,
          )}
        >
          <div
            id={mobileContentId}
            className="scroll-mt-20 pt-12 pb-7 md:pt-0 md:pb-0"
          >
            <div
              className={cn(
                "hero-title-box pointer-events-none relative space-y-5 border px-5 py-6 md:space-y-6 md:rounded-[var(--radius-frame)] md:px-7 md:py-7",
                styles.desktopContentClassName,
              )}
            >
              {hero.eyebrow ? (
                <FloatIn from="left">
                  <Eyebrow className="hero-eyebrow relative mb-0 inline-flex rounded-[var(--radius-pill)] border px-4 py-2">
                    {hero.eyebrow}
                  </Eyebrow>
                </FloatIn>
              ) : null}
              <FloatIn from="left" delay={0.08}>
                <h1
                  className={cn(
                    "hero-title font-display-face relative leading-[0.92] tracking-[-0.06em]",
                    styles.mobileTitleClassName,
                    styles.desktopTitleClassName,
                  )}
                >
                  {hero.title}
                </h1>
              </FloatIn>
              <FloatIn delay={0.16}>
                <p
                  className={cn(
                    "hero-copy relative text-[0.98rem] leading-7 md:text-lg md:leading-8",
                    styles.mobileCopyClassName,
                    styles.desktopCopyClassName,
                  )}
                >
                  {hero.subtitle}
                </p>
              </FloatIn>
              <FloatIn from="right" delay={0.22}>
                <div
                  className="pointer-events-auto relative flex flex-col gap-3 pt-1 md:flex-row md:flex-wrap md:items-center"
                  data-hero-cta-region="true"
                >
                  <LinkButton
                    href={hero.primaryCta.href}
                    className="min-h-[3.5rem] w-full px-6 text-[0.95rem] md:min-h-11 md:w-auto md:px-5 md:text-sm"
                  >
                    {hero.primaryCta.label}
                  </LinkButton>
                  {hero.secondaryCta ? (
                    <LinkButton
                      href={hero.secondaryCta.href}
                      variant="secondary"
                      className="hero-secondary-link min-h-[3.5rem] w-full px-6 text-[0.95rem] md:min-h-11 md:w-auto md:px-5 md:text-sm"
                    >
                      {hero.secondaryCta.label}
                    </LinkButton>
                  ) : null}
                </div>
              </FloatIn>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
