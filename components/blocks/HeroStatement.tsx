import { HeroSequence } from "../galleries/HeroSequence";
import { FloatIn } from "../motion/FloatIn";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { LinkButton } from "../ui/LinkButton";
import { getImageAsset } from "../../lib/images/imageManifest";
import { cn } from "../../lib/utils/cn";
import type { HeroContent } from "../../types/content";

type HeroVariantStyle = {
  frameClassName: string;
  mediaHeightClassName: string;
  contentClassName: string;
  titleClassName: string;
  copyClassName: string;
  overlayClassName: string;
  imageClassName: string;
};

const HERO_VARIANT_STYLES: Record<HeroContent["variant"], HeroVariantStyle> = {
  home: {
    frameClassName: "",
    mediaHeightClassName:
      "min-h-[clamp(14rem,42vw,23rem)] md:min-h-[clamp(18rem,34vw,26rem)]",
    contentClassName: "max-w-[44rem]",
    titleClassName:
      "max-w-[12ch] text-[2.5rem] md:text-[4.1rem] xl:text-[5rem]",
    copyClassName: "max-w-[42rem]",
    overlayClassName:
      "bg-[linear-gradient(180deg,rgba(9,7,6,0.08)_0%,rgba(9,7,6,0.2)_48%,rgba(9,7,6,0.34)_100%),radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.18),transparent_28%)]",
    imageClassName: "object-[58%_center] md:object-center",
  },
  service: {
    frameClassName: "",
    mediaHeightClassName:
      "min-h-[clamp(13rem,39vw,21rem)] md:min-h-[clamp(16rem,30vw,22rem)]",
    contentClassName: "max-w-[40rem]",
    titleClassName:
      "max-w-[12ch] text-[2.25rem] md:text-[3.65rem] xl:text-[4.3rem]",
    copyClassName: "max-w-[38rem]",
    overlayClassName:
      "bg-[linear-gradient(180deg,rgba(10,8,7,0.1)_0%,rgba(10,8,7,0.22)_50%,rgba(10,8,7,0.36)_100%),radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.14),transparent_26%)]",
    imageClassName: "object-[60%_center] md:object-center",
  },
  editorial: {
    frameClassName: "",
    mediaHeightClassName:
      "min-h-[clamp(13rem,39vw,20rem)] md:min-h-[clamp(15.5rem,29vw,21rem)]",
    contentClassName: "max-w-[39rem]",
    titleClassName:
      "max-w-[12ch] text-[2.15rem] md:text-[3.35rem] xl:text-[4rem]",
    copyClassName: "max-w-[36rem]",
    overlayClassName:
      "bg-[linear-gradient(180deg,rgba(11,9,8,0.08)_0%,rgba(11,9,8,0.18)_48%,rgba(11,9,8,0.3)_100%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.14),transparent_24%)]",
    imageClassName: "object-[60%_center] md:object-center",
  },
  landing: {
    frameClassName: "",
    mediaHeightClassName:
      "min-h-[clamp(12.5rem,36vw,19rem)] md:min-h-[clamp(15rem,28vw,20rem)]",
    contentClassName: "max-w-[37rem]",
    titleClassName: "max-w-[13ch] text-[2rem] md:text-[3rem] xl:text-[3.6rem]",
    copyClassName: "max-w-[34rem]",
    overlayClassName:
      "bg-[linear-gradient(180deg,rgba(10,9,8,0.08)_0%,rgba(10,9,8,0.18)_46%,rgba(10,9,8,0.28)_100%),radial-gradient(circle_at_16%_18%,rgba(255,255,255,0.14),transparent_24%)]",
    imageClassName: "object-[62%_center] md:object-center",
  },
  ads: {
    frameClassName: "",
    mediaHeightClassName:
      "min-h-[clamp(12rem,34vw,18rem)] md:min-h-[clamp(14.5rem,27vw,19rem)]",
    contentClassName: "max-w-[35rem]",
    titleClassName:
      "max-w-[13ch] text-[1.95rem] md:text-[2.8rem] xl:text-[3.3rem]",
    copyClassName: "max-w-[33rem]",
    overlayClassName:
      "bg-[linear-gradient(180deg,rgba(10,8,7,0.08)_0%,rgba(10,8,7,0.17)_46%,rgba(10,8,7,0.28)_100%),radial-gradient(circle_at_80%_18%,rgba(255,255,255,0.12),transparent_24%)]",
    imageClassName: "object-[64%_center] md:object-center",
  },
};

export function HeroStatement({ hero }: { hero: HeroContent }) {
  const images = hero.imageIds.map((id) => getImageAsset(id as never));
  const styles = HERO_VARIANT_STYLES[hero.variant];
  const slideIntervalMs = hero.variant === "home" ? 3200 : 4200;

  return (
    <section
      className="relative px-4 pt-4 pb-6 md:px-8 md:pt-5 md:pb-10 lg:px-10"
      data-hero-section="true"
    >
      <div
        className={cn(
          "relative mx-auto max-w-[var(--hero-frame-max)] overflow-hidden rounded-[var(--radius-frame)] border border-[var(--color-line)] bg-[var(--surface-hero-frame)] shadow-[var(--shadow-card)]",
          styles.frameClassName,
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden border-b border-[var(--color-line)] bg-[var(--color-shell)]",
            styles.mediaHeightClassName,
          )}
        >
          <HeroSequence
            images={images}
            imageClassName={styles.imageClassName}
            overlayClassName={styles.overlayClassName}
            slideIntervalMs={slideIntervalMs}
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)] md:h-28",
            )}
          />
        </div>
        <Container className="relative z-10 w-full px-0">
          <div className="grid gap-7 px-6 py-6 md:px-8 md:py-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-8 xl:px-10 xl:py-9">
            <div
              className={cn(
                "relative space-y-5 md:space-y-6",
                styles.contentClassName,
              )}
            >
              {hero.eyebrow ? (
                <FloatIn from="left">
                  <Eyebrow className="relative mb-0 inline-flex rounded-[var(--radius-pill)] border border-[var(--color-line)] bg-[var(--surface-panel-soft)] px-4 py-2 text-[var(--color-mist)] shadow-[var(--shadow-soft)]">
                    {hero.eyebrow}
                  </Eyebrow>
                </FloatIn>
              ) : null}
              <FloatIn from="left" delay={0.08}>
                <h1
                  className={cn(
                    "font-display-face relative leading-[0.92] tracking-[-0.06em] text-[var(--color-ink)]",
                    styles.titleClassName,
                  )}
                >
                  {hero.title}
                </h1>
              </FloatIn>
              <FloatIn delay={0.16}>
                <p
                  className={cn(
                    "relative text-[0.98rem] leading-7 text-[var(--color-mist)] md:text-lg md:leading-8",
                    styles.copyClassName,
                  )}
                >
                  {hero.subtitle}
                </p>
              </FloatIn>
            </div>
            <FloatIn from="right" delay={0.22}>
              <div
                className="relative flex flex-col gap-3 lg:min-w-[15rem] lg:items-stretch"
                data-hero-cta-region="true"
              >
                <LinkButton
                  href={hero.primaryCta.href}
                  className="min-h-[3.35rem] w-full px-6 text-[0.95rem] md:min-h-11 md:px-5 md:text-sm"
                >
                  {hero.primaryCta.label}
                </LinkButton>
                {hero.secondaryCta ? (
                  <LinkButton
                    href={hero.secondaryCta.href}
                    variant="secondary"
                    className="min-h-[3.35rem] w-full border-[var(--color-line)] bg-[var(--surface-panel-soft)] px-6 text-[0.95rem] md:min-h-11 md:px-5 md:text-sm"
                  >
                    {hero.secondaryCta.label}
                  </LinkButton>
                ) : null}
              </div>
            </FloatIn>
          </div>
        </Container>
      </div>
    </section>
  );
}
