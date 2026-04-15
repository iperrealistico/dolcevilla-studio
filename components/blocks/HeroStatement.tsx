import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { HeroSequence } from "../galleries/HeroSequence";
import { FloatIn } from "../motion/FloatIn";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { LinkButton } from "../ui/LinkButton";
import { getImageAsset } from "../../lib/images/imageManifest";
import { cn } from "../../lib/utils/cn";
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

const HERO_VARIANT_STYLES: Record<HeroContent["variant"], HeroVariantStyle> = {
  home: {
    desktopFrameClassName: "md:min-h-[min(80dvh,58rem)]",
    desktopContentClassName: "md:max-w-[44rem] xl:max-w-[48rem]",
    desktopTitleClassName:
      "md:max-w-[13ch] md:text-[4.15rem] xl:text-[5.05rem]",
    desktopCopyClassName: "md:max-w-[31rem]",
    desktopOverlayClassName:
      "bg-[linear-gradient(180deg,rgba(29,22,18,0.12),rgba(29,22,18,0.32))] md:bg-[radial-gradient(circle_at_80%_18%,rgba(244,235,224,0.18),transparent_18%),linear-gradient(90deg,rgba(10,8,7,0.84)_0%,rgba(10,8,7,0.58)_38%,rgba(10,8,7,0.22)_70%,rgba(10,8,7,0.04)_100%),linear-gradient(180deg,rgba(10,8,7,0.12)_0%,rgba(10,8,7,0.62)_100%)]",
    imageClassName: "object-[58%_center] md:object-center",
    mobileTitleClassName: "max-w-[11ch] text-[2.55rem] sm:text-[2.95rem]",
    mobileCopyClassName: "max-w-[35ch]",
    mobileImageHeightClassName: "min-h-[clamp(18.5rem,44svh,26rem)]",
  },
  service: {
    desktopFrameClassName: "md:min-h-[min(78dvh,55rem)]",
    desktopContentClassName: "md:max-w-[40rem] xl:max-w-[44rem]",
    desktopTitleClassName: "md:max-w-[12ch] md:text-[3.85rem] xl:text-[4.6rem]",
    desktopCopyClassName: "md:max-w-[29rem]",
    desktopOverlayClassName:
      "bg-[linear-gradient(180deg,rgba(29,22,18,0.1),rgba(29,22,18,0.3))] md:bg-[radial-gradient(circle_at_78%_20%,rgba(244,235,224,0.16),transparent_18%),linear-gradient(90deg,rgba(11,10,8,0.82)_0%,rgba(11,10,8,0.56)_40%,rgba(11,10,8,0.18)_72%,rgba(11,10,8,0.04)_100%),linear-gradient(180deg,rgba(11,10,8,0.12)_0%,rgba(11,10,8,0.58)_100%)]",
    imageClassName: "object-[60%_center] md:object-center",
    mobileTitleClassName: "max-w-[11ch] text-[2.4rem] sm:text-[2.75rem]",
    mobileCopyClassName: "max-w-[35ch]",
    mobileImageHeightClassName: "min-h-[clamp(18rem,42svh,24rem)]",
  },
  editorial: {
    desktopFrameClassName: "md:min-h-[min(78dvh,55rem)]",
    desktopContentClassName: "md:max-w-[38rem] xl:max-w-[42rem]",
    desktopTitleClassName: "md:max-w-[12ch] md:text-[3.7rem] xl:text-[4.35rem]",
    desktopCopyClassName: "md:max-w-[28rem]",
    desktopOverlayClassName:
      "bg-[linear-gradient(180deg,rgba(29,22,18,0.1),rgba(29,22,18,0.28))] md:bg-[radial-gradient(circle_at_82%_16%,rgba(244,235,224,0.14),transparent_16%),linear-gradient(90deg,rgba(12,10,9,0.8)_0%,rgba(12,10,9,0.52)_40%,rgba(12,10,9,0.16)_74%,rgba(12,10,9,0.04)_100%),linear-gradient(180deg,rgba(12,10,9,0.14)_0%,rgba(12,10,9,0.56)_100%)]",
    imageClassName: "object-[60%_center] md:object-center",
    mobileTitleClassName: "max-w-[11ch] text-[2.3rem] sm:text-[2.65rem]",
    mobileCopyClassName: "max-w-[34ch]",
    mobileImageHeightClassName: "min-h-[clamp(17rem,40svh,23rem)]",
  },
  landing: {
    desktopFrameClassName: "md:min-h-[min(76dvh,53rem)]",
    desktopContentClassName: "md:max-w-[37rem] xl:max-w-[41rem]",
    desktopTitleClassName: "md:max-w-[13ch] md:text-[3.55rem] xl:text-[4.1rem]",
    desktopCopyClassName: "md:max-w-[27rem]",
    desktopOverlayClassName:
      "bg-[linear-gradient(180deg,rgba(29,22,18,0.08),rgba(29,22,18,0.26))] md:bg-[radial-gradient(circle_at_82%_18%,rgba(244,235,224,0.14),transparent_18%),linear-gradient(90deg,rgba(12,10,9,0.78)_0%,rgba(12,10,9,0.5)_42%,rgba(12,10,9,0.16)_74%,rgba(12,10,9,0.04)_100%),linear-gradient(180deg,rgba(12,10,9,0.12)_0%,rgba(12,10,9,0.52)_100%)]",
    imageClassName: "object-[62%_center] md:object-center",
    mobileTitleClassName: "max-w-[12ch] text-[2.2rem] sm:text-[2.5rem]",
    mobileCopyClassName: "max-w-[33ch]",
    mobileImageHeightClassName: "min-h-[clamp(16.5rem,38svh,22rem)]",
  },
  ads: {
    desktopFrameClassName: "md:min-h-[min(74dvh,50rem)]",
    desktopContentClassName: "md:max-w-[35rem] xl:max-w-[38rem]",
    desktopTitleClassName:
      "md:max-w-[13ch] md:text-[3.25rem] xl:text-[3.85rem]",
    desktopCopyClassName: "md:max-w-[25rem]",
    desktopOverlayClassName:
      "bg-[linear-gradient(180deg,rgba(29,22,18,0.08),rgba(29,22,18,0.24))] md:bg-[radial-gradient(circle_at_80%_18%,rgba(244,235,224,0.12),transparent_16%),linear-gradient(90deg,rgba(12,10,9,0.76)_0%,rgba(12,10,9,0.48)_44%,rgba(12,10,9,0.14)_76%,rgba(12,10,9,0.04)_100%),linear-gradient(180deg,rgba(12,10,9,0.1)_0%,rgba(12,10,9,0.5)_100%)]",
    imageClassName: "object-[64%_center] md:object-center",
    mobileTitleClassName: "max-w-[12ch] text-[2.05rem] sm:text-[2.35rem]",
    mobileCopyClassName: "max-w-[32ch]",
    mobileImageHeightClassName: "min-h-[clamp(16rem,37svh,21rem)]",
  },
};

export function HeroStatement({ hero }: { hero: HeroContent }) {
  const images = hero.imageIds.map((id) => getImageAsset(id as never));
  const primaryImage = images[0];
  const styles = HERO_VARIANT_STYLES[hero.variant];
  const mobileContentId = getMobileHeroContentId(hero);

  return (
    <section
      className="relative px-3 pt-3 pb-6 md:px-8 md:pt-6 md:pb-10 lg:px-10"
      data-hero-section="true"
    >
      <div
        className={cn(
          "relative flex flex-col overflow-hidden rounded-[2rem] border border-[rgb(25_22_18_/_0.08)] bg-[linear-gradient(180deg,rgba(250,247,242,0.98),rgba(242,236,228,0.98))] shadow-[0_24px_60px_rgba(28,22,18,0.08)]",
          styles.desktopFrameClassName,
        )}
      >
        <div className="relative md:absolute md:inset-0">
          <div
            className={cn(
              "relative overflow-hidden rounded-t-[2rem] rounded-b-[1.65rem] md:h-full md:min-h-full md:rounded-[2rem]",
              styles.mobileImageHeightClassName,
            )}
          >
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
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(255,255,255,0.2),transparent_24%),linear-gradient(180deg,rgba(29,22,18,0.04),rgba(29,22,18,0.14)_58%,rgba(29,22,18,0.42)_100%)] md:hidden" />
          </div>
          <a
            href={`#${mobileContentId}`}
            aria-label="Scroll to hero introduction"
            className="absolute inset-x-0 bottom-0 z-20 flex translate-y-1/2 flex-col items-center gap-2 md:hidden"
          >
            <span className="text-[0.58rem] font-medium tracking-[0.34em] text-[rgb(250_247_242_/_0.86)] uppercase drop-shadow-[0_2px_10px_rgba(28,22,18,0.28)]">
              Scroll
            </span>
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgb(223_206_182_/_0.78)] bg-[rgb(250_247_242_/_0.92)] text-[var(--color-ink)] shadow-[0_16px_30px_rgba(28,22,18,0.16)] backdrop-blur-md">
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
            className="scroll-mt-20 border-t border-[rgb(25_22_18_/_0.06)] px-6 pt-14 pb-7 md:border-t-0 md:px-0 md:pt-0 md:pb-0"
          >
            <div
              className={cn(
                "relative space-y-5 md:space-y-6",
                styles.desktopContentClassName,
              )}
            >
              <div className="pointer-events-none absolute inset-y-[-2.25rem] right-[-4rem] left-[-2rem] hidden rounded-[2.8rem] bg-[linear-gradient(135deg,rgba(15,12,10,0.42)_0%,rgba(15,12,10,0.18)_48%,rgba(15,12,10,0.04)_76%,rgba(15,12,10,0)_100%)] backdrop-blur-[2px] md:block" />
              {hero.eyebrow ? (
                <FloatIn from="left">
                  <Eyebrow className="relative mb-0 inline-flex rounded-full border border-[rgb(25_22_18_/_0.08)] bg-white/58 px-4 py-2 text-[var(--color-mist)] md:border-white/16 md:bg-[rgb(255_255_255_/_0.08)] md:text-[rgb(244_235_224_/_0.84)] md:backdrop-blur-sm">
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
                      className="min-h-[3.5rem] w-full border-white/0 bg-white/72 px-6 text-[0.95rem] md:min-h-11 md:w-auto md:border-white/14 md:bg-[rgb(255_255_255_/_0.12)] md:px-5 md:text-sm md:text-[var(--color-paper)] md:backdrop-blur-sm"
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
