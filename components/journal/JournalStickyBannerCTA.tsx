"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { JournalCTAButton } from "@/components/journal/JournalCTAButton";
import { useConsent } from "@/hooks/useConsent";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { CTASection as CTASectionContent } from "@/types/content";

type DesktopBounds = {
  left: number;
  width: number;
};

const FALLBACK_HEADER_HEIGHT = 76;
const SHOW_AFTER_SCROLL_PX = 120;
const BANNER_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function getSiteHeaderHeight() {
  if (typeof window === "undefined") {
    return FALLBACK_HEADER_HEIGHT;
  }

  const value = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--site-header-height");
  const parsed = Number.parseFloat(value);

  return Number.isFinite(parsed) && parsed > 0
    ? parsed
    : FALLBACK_HEADER_HEIGHT;
}

function readDesktopBounds(bodyColumnId?: string) {
  if (typeof document === "undefined" || !bodyColumnId) {
    return null;
  }

  const target = document.getElementById(bodyColumnId);

  if (!target) {
    return null;
  }

  const rect = target.getBoundingClientRect();

  return {
    left: rect.left,
    width: rect.width,
  };
}

export function JournalStickyBannerCTA({
  section,
  bodyColumnId,
  deferUntilScroll = true,
}: {
  section: CTASectionContent;
  bodyColumnId?: string;
  deferUntilScroll?: boolean;
}) {
  const { isConsentDialogOpen } = useConsent();
  const reduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(!deferUntilScroll);
  const [desktopBounds, setDesktopBounds] = useState<DesktopBounds | null>(() =>
    readDesktopBounds(bodyColumnId),
  );

  useEffect(() => {
    const target = bodyColumnId ? document.getElementById(bodyColumnId) : null;

    if (!target) {
      return;
    }

    const updateBounds = () => {
      const rect = target.getBoundingClientRect();

      setDesktopBounds((currentBounds) => {
        const nextBounds = {
          left: rect.left,
          width: rect.width,
        };

        if (
          currentBounds &&
          currentBounds.left === nextBounds.left &&
          currentBounds.width === nextBounds.width
        ) {
          return currentBounds;
        }

        return nextBounds;
      });
    };

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(updateBounds);
    const frame = window.requestAnimationFrame(updateBounds);

    resizeObserver?.observe(target);
    window.addEventListener("resize", updateBounds);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateBounds);
    };
  }, [bodyColumnId]);

  useEffect(() => {
    if (!deferUntilScroll) {
      return;
    }

    const article = document.getElementById("journal-article");
    let frame: number | null = null;

    const updateVisibility = () => {
      const headerHeight = getSiteHeaderHeight();
      const hasScrolledEnough =
        window.scrollY > SHOW_AFTER_SCROLL_PX ||
        window.pageYOffset > SHOW_AFTER_SCROLL_PX;
      let nextVisible = hasScrolledEnough;

      if (!article) {
        setIsVisible((currentVisible) =>
          currentVisible === nextVisible ? currentVisible : nextVisible,
        );
        return;
      }

      const articleRect = article.getBoundingClientRect();
      const hasEnteredArticle = articleRect.top <= headerHeight + 96;
      const stillInsideArticle = articleRect.bottom > headerHeight + 240;
      nextVisible =
        hasScrolledEnough && hasEnteredArticle && stillInsideArticle;

      setIsVisible((currentVisible) =>
        currentVisible === nextVisible ? currentVisible : nextVisible,
      );
    };

    const handleScroll = () => {
      if (frame !== null) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = null;
        updateVisibility();
      });
    };

    updateVisibility();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [deferUntilScroll]);

  const shouldShowBanner = !isConsentDialogOpen && isVisible;
  const bannerTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.3, ease: BANNER_EASE };
  const bannerMotion = reduceMotion
    ? {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 0 },
      }
    : {
        initial: { opacity: 0, y: 28 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 22 },
      };

  return (
    <>
      <AnimatePresence>
        {shouldShowBanner ? (
          <motion.div
            key="journal-sticky-banner-mobile"
            initial={bannerMotion.initial}
            animate={bannerMotion.animate}
            exit={bannerMotion.exit}
            transition={bannerTransition}
            className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-3 pt-2 xl:hidden"
          >
            <div className="safe-bottom pointer-events-auto rounded-t-[2rem] border border-[rgb(92_77_58_/_0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(244,236,225,0.97))] px-4 py-3 shadow-[0_-18px_48px_rgba(25,19,14,0.12)] backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  {section.eyebrow ? (
                    <p className="text-[0.6rem] font-semibold tracking-[0.22em] text-[var(--color-mist)] uppercase">
                      {section.eyebrow}
                    </p>
                  ) : null}
                  <p className="line-clamp-2 pt-1 text-[0.96rem] leading-5 font-semibold text-[var(--color-ink)]">
                    {section.title}
                  </p>
                </div>
                <JournalCTAButton
                  href={section.primaryCta.href}
                  tone="contact"
                  size="compact"
                  className="shrink-0 px-3.5"
                >
                  {section.primaryCta.label}
                </JournalCTAButton>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {shouldShowBanner && desktopBounds ? (
          <motion.div
            key="journal-sticky-banner-desktop"
            initial={bannerMotion.initial}
            animate={bannerMotion.animate}
            exit={bannerMotion.exit}
            transition={bannerTransition}
            className="pointer-events-none fixed bottom-4 z-40 hidden xl:block"
            style={{
              left: `${desktopBounds.left}px`,
              width: `${desktopBounds.width}px`,
            }}
          >
            <div className="pointer-events-auto px-1">
              <div className="rounded-[2.1rem] border border-[rgb(196_154_92_/_0.16)] bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(245,237,226,0.97))] px-5 py-4 shadow-[0_24px_60px_rgba(25,19,14,0.14)] backdrop-blur-md md:px-6 md:py-5">
                <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-6">
                  <div className="min-w-0">
                    {section.eyebrow ? (
                      <p className="text-[0.62rem] font-semibold tracking-[0.24em] text-[var(--color-mist)] uppercase">
                        {section.eyebrow}
                      </p>
                    ) : null}
                    <p className="font-display-face max-w-[18ch] pt-1 text-[1.55rem] leading-[0.95] tracking-[-0.035em] text-[var(--color-ink)]">
                      {section.title}
                    </p>
                    <p className="max-w-2xl pt-2 text-sm leading-6 text-[var(--color-mist)]">
                      {section.body}
                    </p>
                  </div>
                  <JournalCTAButton
                    href={section.primaryCta.href}
                    tone="contact"
                    size="banner"
                    className="w-full justify-between md:w-auto md:min-w-[13.5rem]"
                  >
                    {section.primaryCta.label}
                  </JournalCTAButton>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
