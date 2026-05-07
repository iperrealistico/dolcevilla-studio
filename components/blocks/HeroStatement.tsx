import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { HeroSequence } from "../galleries/HeroSequence";
import { FloatIn } from "../motion/FloatIn";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { LinkButton } from "../ui/LinkButton";
import { getImageAsset } from "../../lib/images/imageManifest";
import { cn } from "../../lib/utils/cn";
import { siteUi } from "../../content/site/ui";
import type { HeroContent } from "../../types/content";

type HeroVariantStyle = {
  desktopFrameClassName: string;
  desktopContentClassName: string;
  desktopTitleClassName: string;
  desktopCopyClassName: string;
  desktopOverlayClassName: string;
  imageClassName: string;
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

const MOBILE_HERO_OVERLAY_CLASS_NAME =
  "bg-[radial-gradient(circle_at_50%_16%,rgba(255,255,255,0.2),transparent_24%),linear-gradient(180deg,rgba(29,22,18,0.04),rgba(29,22,18,0.14)_58%,rgba(29,22,18,0.42)_100%)]";

const HERO_VARIANT_STYLES: Record<HeroContent["variant"], HeroVariantStyle> = {
  home: {
    desktopFrameClassName: "md:min-h-[min(58dvh,40rem)]",
    desktopContentClassName: "md:max-w-[40rem] xl:max-w-[43rem]",
    desktopTitleClassName:
      "md:max-w-[13ch] md:text-[3.65rem] xl:text-[4.45rem]",
    desktopCopyClassName: "md:max-w-[29rem]",
    desktopOverlayClassName:
      "bg-[linear-gradient(180deg,rgba(29,22,18,0.12),rgba(29,22,18,0.32))] md:bg-[radial-gradient(circle_at_80%_18%,rgba(244,235,224,0.18),transparent_18%),linear-gradient(90deg,rgba(10,8,7,0.84)_0%,rgba(10,8,7,0.58)_38%,rgba(10,8,7,0.22)_70%,rgba(10,8,7,0.04)_100%),linear-gradient(180deg,rgba(10,8,7,0.12)_0%,rgba(10,8,7,0.62)_100%)]",
    imageClassName: "object-[58%_center] md:object-center",
    mobileTitleClassName: "max-w-[11ch] text-[2.35rem] sm:text-[2.7rem]",
    mobileCopyClassName: "max-w-[35ch]",
    mobileImageHeightClassName: "min-h-[clamp(19rem,48svh,26rem)]",
  },
  service: {
    desktopFrameClassName: "md:min-h-[min(54dvh,35rem)]",
    desktopContentClassName: "md:max-w-[37rem] xl:max-w-[40rem]",
    desktopTitleClassName:
      "md:max-w-[12ch] md:text-[3.35rem] xl:text-[4.05rem]",
    desktopCopyClassName: "md:max-w-[27rem]",
    desktopOverlayClassName:
      "bg-[linear-gradient(180deg,rgba(29,22,18,0.1),rgba(29,22,18,0.3))] md:bg-[radial-gradient(circle_at_78%_20%,rgba(244,235,224,0.16),transparent_18%),linear-gradient(90deg,rgba(11,10,8,0.82)_0%,rgba(11,10,8,0.56)_40%,rgba(11,10,8,0.18)_72%,rgba(11,10,8,0.04)_100%),linear-gradient(180deg,rgba(11,10,8,0.12)_0%,rgba(11,10,8,0.58)_100%)]",
    imageClassName: "object-[60%_center] md:object-center",
    mobileTitleClassName: "max-w-[11ch] text-[2.2rem] sm:text-[2.5rem]",
    mobileCopyClassName: "max-w-[35ch]",
    mobileImageHeightClassName: "min-h-[clamp(16.5rem,38svh,21rem)]",
  },
  editorial: {
    desktopFrameClassName: "md:min-h-[min(54dvh,35rem)]",
    desktopContentClassName: "md:max-w-[36rem] xl:max-w-[39rem]",
    desktopTitleClassName:
      "md:max-w-[12ch] md:text-[3.25rem] xl:text-[3.95rem]",
    desktopCopyClassName: "md:max-w-[26rem]",
    desktopOverlayClassName:
      "bg-[linear-gradient(180deg,rgba(29,22,18,0.1),rgba(29,22,18,0.28))] md:bg-[radial-gradient(circle_at_82%_16%,rgba(244,235,224,0.14),transparent_16%),linear-gradient(90deg,rgba(12,10,9,0.8)_0%,rgba(12,10,9,0.52)_40%,rgba(12,10,9,0.16)_74%,rgba(12,10,9,0.04)_100%),linear-gradient(180deg,rgba(12,10,9,0.14)_0%,rgba(12,10,9,0.56)_100%)]",
    imageClassName: "object-[60%_center] md:object-center",
    mobileTitleClassName: "max-w-[11ch] text-[2.15rem] sm:text-[2.45rem]",
    mobileCopyClassName: "max-w-[34ch]",
    mobileImageHeightClassName: "min-h-[clamp(16rem,37svh,20rem)]",
  },
  landing: {
    desktopFrameClassName: "md:min-h-[min(52dvh,32rem)]",
    desktopContentClassName: "md:max-w-[35rem] xl:max-w-[38rem]",
    desktopTitleClassName:
      "md:max-w-[13ch] md:text-[3.05rem] xl:text-[3.65rem]",
    desktopCopyClassName: "md:max-w-[25rem]",
    desktopOverlayClassName:
      "bg-[linear-gradient(180deg,rgba(29,22,18,0.08),rgba(29,22,18,0.26))] md:bg-[radial-gradient(circle_at_82%_18%,rgba(244,235,224,0.14),transparent_18%),linear-gradient(90deg,rgba(12,10,9,0.78)_0%,rgba(12,10,9,0.5)_42%,rgba(12,10,9,0.16)_74%,rgba(12,10,9,0.04)_100%),linear-gradient(180deg,rgba(12,10,9,0.12)_0%,rgba(12,10,9,0.52)_100%)]",
    imageClassName: "object-[62%_center] md:object-center",
    mobileTitleClassName: "max-w-[12ch] text-[2rem] sm:text-[2.3rem]",
    mobileCopyClassName: "max-w-[33ch]",
    mobileImageHeightClassName: "min-h-[clamp(15.5rem,36svh,19.5rem)]",
  },
  ads: {
    desktopFrameClassName: "md:min-h-[min(50dvh,30rem)]",
    desktopContentClassName: "md:max-w-[33rem] xl:max-w-[36rem]",
    desktopTitleClassName:
      "md:max-w-[13ch] md:text-[2.85rem] xl:text-[3.35rem]",
    desktopCopyClassName: "md:max-w-[23rem]",
    desktopOverlayClassName:
      "bg-[linear-gradient(180deg,rgba(29,22,18,0.08),rgba(29,22,18,0.24))] md:bg-[radial-gradient(circle_at_80%_18%,rgba(244,235,224,0.12),transparent_16%),linear-gradient(90deg,rgba(12,10,9,0.76)_0%,rgba(12,10,9,0.48)_44%,rgba(12,10,9,0.14)_76%,rgba(12,10,9,0.04)_100%),linear-gradient(180deg,rgba(12,10,9,0.1)_0%,rgba(12,10,9,0.5)_100%)]",
    imageClassName: "object-[64%_center] md:object-center",
    mobileTitleClassName: "max-w-[12ch] text-[1.92rem] sm:text-[2.18rem]",
    mobileCopyClassName: "max-w-[32ch]",
    mobileImageHeightClassName: "min-h-[clamp(15rem,35svh,18.5rem)]",
  },
};

export function HeroStatement({ hero }: { hero: HeroContent }) {
  const images = hero.imageIds.map((id) => getImageAsset(id as never));
  const primaryImage = images[0];
  const styles = HERO_VARIANT_STYLES[hero.variant];
  const mobileContentId = getMobileHeroContentId(hero);
  const isHomeResponsiveSlideshow =
    hero.variant === "home" && images.length > 1;
  const slideIntervalMs = hero.variant === "home" ? 3000 : undefined;
  const responsiveOverlayClassName = cn(
    styles.desktopOverlayClassName,
    MOBILE_HERO_OVERLAY_CLASS_NAME,
  );

  return (
    <section
      className="relative px-4 pt-4 pb-6 md:px-8 md:pt-5 md:pb-10 lg:px-10"
      data-hero-section="true"
    >
      <div
        className={cn(
          "relative mx-auto flex max-w-[var(--hero-frame-max)] flex-col overflow-hidden rounded-[var(--radius-frame)] border border-[var(--color-line)] bg-[var(--surface-hero-frame)] shadow-[var(--shadow-card)]",
          styles.desktopFrameClassName,
        )}
      >
        <div className="relative md:absolute md:inset-0">
          <div
            className={cn(
              "relative overflow-hidden rounded-t-[var(--radius-frame)] rounded-b-[calc(var(--radius-frame)-0.2rem)] md:h-full md:min-h-full md:rounded-[var(--radius-frame)]",
              styles.mobileImageHeightClassName,
            )}
          >
            {isHomeResponsiveSlideshow ? (
              <HeroSequence
                images={images}
                imageClassName={styles.imageClassName}
                overlayClassName={responsiveOverlayClassName}
                slideIntervalMs={slideIntervalMs}
              />
            ) : (
              <>
                {primaryImage ? (
                  <Image
                    src={primaryImage.src}
                    alt={primaryImage.alt}
                    width={primaryImage.width}
                    height={primaryImage.height}
                    priority
                    loading="eager"
                    sizes="(max-width: 767px) 100vw, 0px"
                    placeholder="blur"
                    blurDataURL={primaryImage.blurDataURL}
                    className={cn(
                      "h-full w-full object-cover md:hidden",
                      styles.imageClassName,
                    )}
                  />
                ) : null}
                <HeroSequence
                  images={images}
                  className="hidden md:block"
                  imageClassName={styles.imageClassName}
                  overlayClassName={styles.desktopOverlayClassName}
                  slideIntervalMs={slideIntervalMs}
                />
                <div
                  className={cn(
                    "absolute inset-0 md:hidden",
                    MOBILE_HERO_OVERLAY_CLASS_NAME,
                  )}
                />
              </>
            )}
          </div>
          <a
            href={`#${mobileContentId}`}
            aria-label={siteUi.hero.scrollToIntroductionLabel}
            className="absolute inset-x-0 bottom-0 z-20 flex translate-y-1/2 flex-col items-center gap-2 md:hidden"
          >
            <span className="text-[0.58rem] font-medium tracking-[0.34em] text-[rgb(250_247_242_/_0.86)] uppercase drop-shadow-[0_2px_10px_rgba(28,22,18,0.28)]">
              {siteUi.hero.scrollLabel}
            </span>
            <span className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--color-line)] bg-[var(--surface-badge)] text-[var(--color-ink)] shadow-[var(--shadow-soft)] backdrop-blur-md">
              <ArrowDown size={18} strokeWidth={1.7} aria-hidden="true" />
            </span>
          </a>
        </div>
        <Container
          className={cn(
            "relative z-10 w-full px-0 md:flex md:items-end md:py-12 lg:py-14",
            styles.desktopFrameClassName,
          )}
        >
          <div
            id={mobileContentId}
            className="scroll-mt-20 border-t border-[var(--color-line)] px-6 pt-14 pb-7 md:border-t-0 md:px-0 md:pt-0 md:pb-0"
          >
            <div
              className={cn(
                "relative space-y-5 md:space-y-6",
                styles.desktopContentClassName,
              )}
            >
              <div className="pointer-events-none absolute inset-y-[-2.25rem] right-[-4rem] left-[-2rem] hidden rounded-[calc(var(--radius-frame)+0.35rem)] bg-[linear-gradient(135deg,rgba(15,12,10,0.42)_0%,rgba(15,12,10,0.18)_48%,rgba(15,12,10,0.04)_76%,rgba(15,12,10,0)_100%)] backdrop-blur-[2px] md:block" />
              {hero.eyebrow ? (
                <FloatIn from="left">
                  <Eyebrow className="relative mb-0 inline-flex rounded-[var(--radius-pill)] border border-[var(--color-line)] bg-[var(--surface-panel-soft)] px-4 py-2 text-[var(--color-mist)] shadow-[var(--shadow-soft)] md:border-white/16 md:bg-[rgb(255_255_255_/_0.08)] md:text-[rgb(244_235_224_/_0.84)] md:shadow-none md:backdrop-blur-sm">
                    {hero.eyebrow}
                  </Eyebrow>
                </FloatIn>
              ) : null}
              <FloatIn from="left" delay={0.08}>
                <h1
                  className={cn(
                    "font-display-face relative leading-[0.92] tracking-[-0.06em] text-[var(--color-ink)] md:text-[var(--color-paper)]",
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
                    "relative text-[0.98rem] leading-7 text-[var(--color-mist)] md:text-lg md:leading-8 md:text-[rgb(244_235_224_/_0.84)]",
                    styles.mobileCopyClassName,
                    styles.desktopCopyClassName,
                  )}
                >
                  {hero.subtitle}
                </p>
              </FloatIn>
              <FloatIn from="right" delay={0.22}>
                <div
                  className="relative flex flex-col gap-3 pt-1 md:flex-row md:flex-wrap md:items-center"
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
                      className="min-h-[3.5rem] w-full border-[var(--color-line)] bg-[var(--surface-panel-soft)] px-6 text-[0.95rem] md:min-h-11 md:w-auto md:border-white/14 md:bg-[rgb(255_255_255_/_0.12)] md:px-5 md:text-sm md:text-[var(--color-paper)] md:backdrop-blur-sm"
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
