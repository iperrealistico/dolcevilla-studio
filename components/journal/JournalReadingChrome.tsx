"use client";

import { LayoutGroup, motion } from "framer-motion";
import { Compass } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { JournalCTAButton } from "@/components/journal/JournalCTAButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { CTASection as CTASectionContent } from "@/types/content";
import { cn } from "@/lib/utils/cn";

type JournalChapter = {
  id: string;
  title: string;
  shortTitle?: string;
};

type JournalReadingChromeProps = {
  chapters: JournalChapter[];
  stickyCta: CTASectionContent;
};

type DesktopRailMetrics = {
  activeHeight: number;
  lineLeft: number;
  trackHeight: number;
  trackTop: number;
};

const DESKTOP_BREAKPOINT = 1280;
const DESKTOP_VIEWPORT_ANCHOR = 0.34;
const MOBILE_VIEWPORT_ANCHOR = 0.26;
const DESKTOP_RAIL_CENTER = 0.44;
const DESKTOP_RAIL_FOCUS_PADDING = 18;
const DESKTOP_RAIL_SCROLL_DURATION_MS = 220;
const FALLBACK_HEADER_HEIGHT = 76;
const MANUAL_CHAPTER_LOCK_BASE_MS = 900;
const MANUAL_CHAPTER_LOCK_MAX_MS = 2200;
const INITIAL_DESKTOP_RAIL_METRICS: DesktopRailMetrics = {
  activeHeight: 0,
  lineLeft: 20,
  trackHeight: 0,
  trackTop: 14,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function distanceToRange(anchor: number, top: number, bottom: number) {
  if (anchor < top) {
    return top - anchor;
  }

  if (anchor > bottom) {
    return anchor - bottom;
  }

  return 0;
}

function easeOutCubic(value: number) {
  return 1 - (1 - value) ** 3;
}

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

function getChromeAnchorOffset() {
  const headerHeight = getSiteHeaderHeight();
  const chromeOffset =
    headerHeight + (window.innerWidth >= DESKTOP_BREAKPOINT ? 28 : 20);
  const viewportAnchor =
    window.innerWidth >= DESKTOP_BREAKPOINT
      ? DESKTOP_VIEWPORT_ANCHOR
      : MOBILE_VIEWPORT_ANCHOR;

  return chromeOffset + (window.innerHeight - chromeOffset) * viewportAnchor;
}

export function JournalReadingChrome({
  chapters,
  stickyCta,
}: JournalReadingChromeProps) {
  const reduceMotion = useReducedMotion();
  const mobileScrollerRef = useRef<HTMLDivElement | null>(null);
  const chipRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const desktopTrackRef = useRef<HTMLDivElement | null>(null);
  const desktopCardRef = useRef<HTMLDivElement | null>(null);
  const desktopRailScrollerRef = useRef<HTMLDivElement | null>(null);
  const desktopRailListRef = useRef<HTMLDivElement | null>(null);
  const desktopItemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const desktopBadgeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const desktopAnimationFrameRef = useRef<number | null>(null);
  const desktopRailScrollFrameRef = useRef<number | null>(null);
  const desktopCurrentOffsetRef = useRef(0);
  const desktopTargetOffsetRef = useRef(0);
  const manualChapterTargetRef = useRef<string | null>(null);
  const manualChapterLockTimeoutRef = useRef<number | null>(null);

  const [activeIdState, setActiveId] = useState(chapters[0]?.id ?? "");
  const [desktopRailMetrics, setDesktopRailMetrics] = useState(
    INITIAL_DESKTOP_RAIL_METRICS,
  );

  const chapterMap = useMemo(
    () =>
      chapters.map((chapter, index) => ({
        ...chapter,
        label: String(index + 1).padStart(2, "0"),
      })),
    [chapters],
  );
  const activeId = chapters.some((chapter) => chapter.id === activeIdState)
    ? activeIdState
    : (chapters[0]?.id ?? "");

  useEffect(() => {
    if (!chapters.length) {
      return;
    }

    const article = document.getElementById("journal-article");
    const sections = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!article || !sections.length) {
      return;
    }

    const setDesktopTransform = (offset: number) => {
      const desktopCard = desktopCardRef.current;

      if (!desktopCard) {
        return;
      }

      desktopCard.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    let chromeFrameRequested = false;

    const stopDesktopAnimation = () => {
      if (desktopAnimationFrameRef.current !== null) {
        cancelAnimationFrame(desktopAnimationFrameRef.current);
        desktopAnimationFrameRef.current = null;
      }
    };

    const animateDesktopRail = () => {
      stopDesktopAnimation();

      const step = () => {
        const delta =
          desktopTargetOffsetRef.current - desktopCurrentOffsetRef.current;

        if (Math.abs(delta) < 0.5) {
          desktopCurrentOffsetRef.current = desktopTargetOffsetRef.current;
          setDesktopTransform(desktopCurrentOffsetRef.current);
          desktopAnimationFrameRef.current = null;
          return;
        }

        desktopCurrentOffsetRef.current += delta * 0.16;
        setDesktopTransform(desktopCurrentOffsetRef.current);
        desktopAnimationFrameRef.current = requestAnimationFrame(step);
      };

      desktopAnimationFrameRef.current = requestAnimationFrame(step);
    };

    const updateDesktopRail = () => {
      const track = desktopTrackRef.current;
      const card = desktopCardRef.current;

      if (!track || !card || window.innerWidth < DESKTOP_BREAKPOINT) {
        stopDesktopAnimation();
        desktopCurrentOffsetRef.current = 0;
        desktopTargetOffsetRef.current = 0;
        setDesktopTransform(0);
        return;
      }

      const trackRect = track.getBoundingClientRect();
      const trackTop = window.scrollY + trackRect.top;
      const maxOffset = Math.max(track.offsetHeight - card.offsetHeight, 0);
      const headerHeight = getSiteHeaderHeight();
      const railTopOffset = headerHeight + 24;
      const safeViewportHeight = Math.max(
        window.innerHeight - railTopOffset - 20,
        card.offsetHeight,
      );
      const desiredTop =
        window.scrollY +
        railTopOffset +
        Math.max(
          (safeViewportHeight - card.offsetHeight) * DESKTOP_RAIL_CENTER,
          0,
        );

      desktopTargetOffsetRef.current = clamp(
        desiredTop - trackTop,
        0,
        maxOffset,
      );

      if (reduceMotion) {
        stopDesktopAnimation();
        desktopCurrentOffsetRef.current = desktopTargetOffsetRef.current;
        setDesktopTransform(desktopCurrentOffsetRef.current);
        return;
      }

      if (desktopAnimationFrameRef.current === null) {
        animateDesktopRail();
      }
    };

    const updateChrome = () => {
      const articleRect = article.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollable = articleRect.height - viewportHeight * 0.46;
      const distance = viewportHeight * 0.24 - articleRect.top;
      const anchor = getChromeAnchorOffset();

      const nextProgress = clamp(distance / Math.max(totalScrollable, 1), 0, 1);
      const progressBar = progressBarRef.current;

      if (progressBar) {
        progressBar.style.transform = `scaleX(${nextProgress})`;
      }

      const nextActiveId =
        sections.reduce<{ id: string; distance: number } | null>(
          (nearest, section) => {
            const rect = section.getBoundingClientRect();
            const distanceToSection = distanceToRange(
              anchor,
              rect.top,
              rect.bottom,
            );

            if (!nearest || distanceToSection < nearest.distance) {
              return {
                id: section.id,
                distance: distanceToSection,
              };
            }

            return nearest;
          },
          null,
        )?.id ??
        chapters[0]?.id ??
        "";

      const manualTargetId = manualChapterTargetRef.current;

      if (manualTargetId) {
        const targetSection = document.getElementById(manualTargetId);
        const targetRect = targetSection?.getBoundingClientRect();
        const targetDistance = targetRect
          ? distanceToRange(anchor, targetRect.top, targetRect.bottom)
          : Number.POSITIVE_INFINITY;
        const targetReached = targetDistance <= 10;

        if (!targetReached && !reduceMotion) {
          updateDesktopRail();
          return;
        }

        manualChapterTargetRef.current = null;
        if (manualChapterLockTimeoutRef.current !== null) {
          window.clearTimeout(manualChapterLockTimeoutRef.current);
          manualChapterLockTimeoutRef.current = null;
        }
      }

      setActiveId((currentId) =>
        currentId === nextActiveId ? currentId : nextActiveId,
      );
      updateDesktopRail();
    };

    const handleScroll = () => {
      if (chromeFrameRequested) {
        return;
      }

      chromeFrameRequested = true;
      requestAnimationFrame(() => {
        chromeFrameRequested = false;
        updateChrome();
      });
    };

    updateChrome();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      stopDesktopAnimation();
      if (manualChapterLockTimeoutRef.current !== null) {
        window.clearTimeout(manualChapterLockTimeoutRef.current);
        manualChapterLockTimeoutRef.current = null;
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [chapters, reduceMotion]);

  useEffect(() => {
    const scroller = mobileScrollerRef.current;
    const activeChip = chipRefs.current[activeId];

    if (!scroller || !activeChip) {
      return;
    }

    const targetLeft = clamp(
      activeChip.offsetLeft -
        (scroller.clientWidth - activeChip.offsetWidth) / 2,
      0,
      Math.max(scroller.scrollWidth - scroller.clientWidth, 0),
    );

    scroller.scrollTo({
      left: targetLeft,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [activeId, reduceMotion]);

  useEffect(() => {
    const scroller = desktopRailScrollerRef.current;
    const activeItem = desktopItemRefs.current[activeId];

    if (!scroller || !activeItem || window.innerWidth < DESKTOP_BREAKPOINT) {
      if (desktopRailScrollFrameRef.current !== null) {
        cancelAnimationFrame(desktopRailScrollFrameRef.current);
        desktopRailScrollFrameRef.current = null;
      }
      return;
    }

    const maxScrollTop = Math.max(
      scroller.scrollHeight - scroller.clientHeight,
      0,
    );
    const currentScrollTop = scroller.scrollTop;
    const itemTop = activeItem.offsetTop;
    const itemBottom = itemTop + activeItem.offsetHeight;
    const centerTargetTop = clamp(
      itemTop - (scroller.clientHeight - activeItem.offsetHeight) / 2,
      0,
      maxScrollTop,
    );
    const shouldCenterActiveItem = manualChapterTargetRef.current === activeId;
    let targetTop = currentScrollTop;

    if (shouldCenterActiveItem) {
      targetTop = centerTargetTop;
    } else {
      const visibleTop = currentScrollTop + DESKTOP_RAIL_FOCUS_PADDING;
      const visibleBottom =
        currentScrollTop + scroller.clientHeight - DESKTOP_RAIL_FOCUS_PADDING;

      if (itemTop < visibleTop) {
        targetTop = clamp(
          itemTop - DESKTOP_RAIL_FOCUS_PADDING,
          0,
          maxScrollTop,
        );
      } else if (itemBottom > visibleBottom) {
        targetTop = clamp(
          itemBottom - scroller.clientHeight + DESKTOP_RAIL_FOCUS_PADDING,
          0,
          maxScrollTop,
        );
      } else {
        return;
      }
    }

    if (Math.abs(targetTop - currentScrollTop) < 1) {
      scroller.scrollTop = targetTop;
      return;
    }

    if (desktopRailScrollFrameRef.current !== null) {
      cancelAnimationFrame(desktopRailScrollFrameRef.current);
      desktopRailScrollFrameRef.current = null;
    }

    if (reduceMotion) {
      scroller.scrollTop = targetTop;
      return;
    }

    const startTop = currentScrollTop;
    const delta = targetTop - startTop;
    const duration = shouldCenterActiveItem
      ? DESKTOP_RAIL_SCROLL_DURATION_MS
      : 170;
    const startTime = performance.now();

    const animateRailScroll = (timestamp: number) => {
      const progress = clamp((timestamp - startTime) / duration, 0, 1);
      scroller.scrollTop = startTop + delta * easeOutCubic(progress);

      if (progress < 1) {
        desktopRailScrollFrameRef.current =
          requestAnimationFrame(animateRailScroll);
        return;
      }

      desktopRailScrollFrameRef.current = null;
    };

    desktopRailScrollFrameRef.current =
      requestAnimationFrame(animateRailScroll);

    return () => {
      if (desktopRailScrollFrameRef.current !== null) {
        cancelAnimationFrame(desktopRailScrollFrameRef.current);
        desktopRailScrollFrameRef.current = null;
      }
    };
  }, [activeId, reduceMotion]);

  useEffect(() => {
    if (!chapterMap.length) {
      return;
    }

    const updateDesktopRailMetrics = () => {
      const list = desktopRailListRef.current;
      const firstBadge = desktopBadgeRefs.current[chapterMap[0]?.id];
      const lastBadge =
        desktopBadgeRefs.current[chapterMap[chapterMap.length - 1]?.id];
      const activeBadge =
        desktopBadgeRefs.current[activeId] ??
        desktopBadgeRefs.current[chapterMap[0]?.id];

      if (!list || !firstBadge || !lastBadge || !activeBadge) {
        setDesktopRailMetrics(INITIAL_DESKTOP_RAIL_METRICS);
        return;
      }

      const getCenterPoint = (element: HTMLDivElement) => ({
        x: element.offsetLeft + element.offsetWidth / 2,
        y: element.offsetTop + element.offsetHeight / 2,
      });

      const firstCenter = getCenterPoint(firstBadge);
      const lastCenter = getCenterPoint(lastBadge);
      const activeCenter = getCenterPoint(activeBadge);

      setDesktopRailMetrics({
        activeHeight: Math.max(activeCenter.y - firstCenter.y, 0),
        lineLeft: firstCenter.x,
        trackHeight: Math.max(lastCenter.y - firstCenter.y, 0),
        trackTop: firstCenter.y,
      });
    };

    const frame = requestAnimationFrame(updateDesktopRailMetrics);
    window.addEventListener("resize", updateDesktopRailMetrics);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateDesktopRailMetrics);
    };
  }, [activeId, chapterMap]);

  const scrollToChapter = (id: string) => {
    const section = document.getElementById(id);

    if (!section) {
      return;
    }

    const targetTop =
      window.scrollY +
      section.getBoundingClientRect().top -
      getChromeAnchorOffset();
    const lockDuration = reduceMotion
      ? 0
      : clamp(
          650 + Math.abs(targetTop - window.scrollY) * 0.18,
          MANUAL_CHAPTER_LOCK_BASE_MS,
          MANUAL_CHAPTER_LOCK_MAX_MS,
        );

    if (manualChapterLockTimeoutRef.current !== null) {
      window.clearTimeout(manualChapterLockTimeoutRef.current);
    }

    manualChapterTargetRef.current = id;
    manualChapterLockTimeoutRef.current = window.setTimeout(() => {
      manualChapterTargetRef.current = null;
      manualChapterLockTimeoutRef.current = null;
    }, lockDuration);
    setActiveId(id);
    window.history.replaceState(null, "", `#${id}`);
    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const currentChapter =
    chapterMap.find((chapter) => chapter.id === activeId) ?? chapterMap[0];

  if (!chapters.length) {
    return null;
  }

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px] bg-[rgb(29_25_22_/_0.08)]">
        <div
          ref={progressBarRef}
          className="h-full origin-left bg-[linear-gradient(90deg,#1d1916,#a78b68)] transition-transform duration-200 ease-out"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <div className="relative hidden h-full xl:block" ref={desktopTrackRef}>
        <div
          ref={desktopCardRef}
          className="w-full will-change-transform"
          style={{ transform: "translate3d(0, 0, 0)" }}
        >
          <div className="flex max-h-[calc(100dvh-var(--site-header-height,76px)-2rem)] flex-col gap-3 rounded-[1.8rem] border border-[rgb(92_77_58_/_0.1)] bg-[rgb(255_255_255_/_0.82)] p-3.5 shadow-[0_26px_70px_rgba(25,19,14,0.1)] backdrop-blur-md">
            <div className="space-y-2 px-1">
              <p className="inline-flex items-center gap-2 text-[0.65rem] font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
                <Compass size={12} strokeWidth={1.85} aria-hidden="true" />
                <span>Chapter Guide</span>
              </p>
              <p className="text-[0.92rem] leading-6 text-[var(--color-mist)]">
                Move through the article without losing your place.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-[rgb(196_154_92_/_0.14)] bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(246,239,230,0.92))] p-3.5">
              {stickyCta.eyebrow ? (
                <p className="pb-2 text-[0.6rem] font-semibold tracking-[0.24em] text-[var(--color-mist)] uppercase">
                  {stickyCta.eyebrow}
                </p>
              ) : null}
              <p className="pb-3 text-[0.94rem] leading-5 text-[var(--color-ink)]">
                {stickyCta.title}
              </p>
              <JournalCTAButton
                href={stickyCta.primaryCta.href}
                tone="contact"
                size="compact"
                className="w-full justify-between"
              >
                {stickyCta.primaryCta.label}
              </JournalCTAButton>
            </div>

            <div className="min-h-0 flex-1 rounded-[1.5rem] border border-[rgb(92_77_58_/_0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(247,242,236,0.9))] p-2.5">
              <div className="flex items-center justify-between gap-3 px-1 pb-2.5">
                <p className="text-[0.6rem] font-semibold tracking-[0.24em] text-[var(--color-mist)] uppercase">
                  Jump to chapter
                </p>
                <p className="text-[0.64rem] font-semibold tracking-[0.24em] text-[var(--color-mist)] uppercase">
                  {currentChapter?.label}/
                  {String(chapterMap.length).padStart(2, "0")}
                </p>
              </div>

              <LayoutGroup id="desktop-journal-chapter-rail">
                <div
                  ref={desktopRailScrollerRef}
                  className="journal-chapter-rail-mask max-h-full min-h-0 overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  <div
                    ref={desktopRailListRef}
                    className="relative space-y-1.5 pr-1 pb-1"
                  >
                    <div
                      className="pointer-events-none absolute w-px bg-[rgb(92_77_58_/_0.14)]"
                      style={{
                        height: `${desktopRailMetrics.trackHeight}px`,
                        left: `${desktopRailMetrics.lineLeft}px`,
                        top: `${desktopRailMetrics.trackTop}px`,
                        transform: "translateX(-50%)",
                      }}
                    />
                    <div
                      className="pointer-events-none absolute w-px bg-[linear-gradient(180deg,#1d1916,#a78b68)] transition-[height,left,top] duration-200 ease-out"
                      style={{
                        height: `${desktopRailMetrics.activeHeight}px`,
                        left: `${desktopRailMetrics.lineLeft}px`,
                        top: `${desktopRailMetrics.trackTop}px`,
                        transform: "translateX(-50%)",
                      }}
                    />

                    {chapterMap.map((chapter) => {
                      const isActive = chapter.id === activeId;
                      const chapterTitle = chapter.shortTitle ?? chapter.title;

                      return (
                        <button
                          key={chapter.id}
                          ref={(node) => {
                            desktopItemRefs.current[chapter.id] = node;
                          }}
                          type="button"
                          onClick={() => scrollToChapter(chapter.id)}
                          className="group relative grid w-full grid-cols-[2.15rem_minmax(0,1fr)] items-start gap-2.5 py-0.5 text-left"
                          aria-current={isActive ? "true" : undefined}
                        >
                          <div
                            ref={(node) => {
                              desktopBadgeRefs.current[chapter.id] = node;
                            }}
                            className="relative z-20 flex h-7 w-7 items-center justify-center self-start"
                          >
                            {isActive ? (
                              <motion.div
                                layoutId="desktop-journal-chapter-active-badge"
                                className="absolute inset-0 rounded-full border border-[rgb(92_77_58_/_0.18)] bg-[var(--color-ink)]"
                                transition={
                                  reduceMotion
                                    ? { duration: 0 }
                                    : {
                                        type: "spring",
                                        stiffness: 520,
                                        damping: 38,
                                        mass: 0.48,
                                      }
                                }
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="absolute inset-0 rounded-full border border-[rgb(92_77_58_/_0.14)] bg-[rgb(255_255_255_/_0.94)] shadow-[0_8px_20px_rgba(25,19,14,0.04)]"
                              />
                            )}
                            <span
                              className={cn(
                                "relative z-10 text-[0.62rem] font-semibold tracking-[0.18em]",
                                isActive
                                  ? "text-[var(--color-paper)]"
                                  : "text-[var(--color-mist)]",
                              )}
                            >
                              {chapter.label}
                            </span>
                          </div>

                          <div className="relative min-h-[2.85rem] pt-0.5">
                            {isActive ? (
                              <motion.div
                                layoutId="desktop-journal-chapter-active-card"
                                className="absolute inset-0 rounded-[1.2rem] bg-[rgb(255_255_255_/_0.94)] shadow-[0_14px_30px_rgba(25,19,14,0.08)]"
                                transition={
                                  reduceMotion
                                    ? { duration: 0 }
                                    : {
                                        type: "spring",
                                        stiffness: 480,
                                        damping: 38,
                                        mass: 0.54,
                                      }
                                }
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="absolute inset-0 rounded-[1.2rem] bg-white/0 transition-colors duration-150 group-hover:bg-white/72"
                              />
                            )}
                            <span
                              className={cn(
                                "relative z-10 block rounded-[1.2rem] px-3.5 py-2.5 text-[0.9rem] leading-[1.18rem] transition-colors duration-150",
                                isActive
                                  ? "text-[var(--color-ink)]"
                                  : "text-[var(--color-mist)] group-hover:text-[var(--color-ink)]",
                              )}
                            >
                              {chapterTitle}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </LayoutGroup>
            </div>
          </div>
        </div>
      </div>

      <div
        className="fixed inset-x-0 z-40 px-4 xl:hidden"
        style={{
          bottom: "calc(env(safe-area-inset-bottom, 0px) + 7.75rem)",
        }}
      >
        <div className="mx-auto max-w-[var(--container-max)] rounded-[1.6rem] border border-[rgb(92_77_58_/_0.12)] bg-[rgb(255_255_255_/_0.88)] px-3 py-3 shadow-[0_22px_56px_rgba(25,19,14,0.12)] backdrop-blur-md">
          <div className="mb-3 flex items-start justify-between gap-3 px-1">
            <div className="min-w-0">
              <p className="text-[0.62rem] font-semibold tracking-[0.24em] text-[var(--color-mist)] uppercase">
                Chapter Guide
              </p>
              <p className="truncate pt-1 text-sm leading-5 text-[var(--color-ink)]">
                {currentChapter?.shortTitle ?? currentChapter?.title}
              </p>
            </div>
            <p className="shrink-0 pt-1 text-[0.68rem] font-semibold tracking-[0.24em] text-[var(--color-mist)] uppercase">
              {currentChapter?.label}/
              {String(chapterMap.length).padStart(2, "0")}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div
              ref={mobileScrollerRef}
              className="min-w-0 flex-1 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className="inline-flex items-center gap-2 pr-2">
                {chapterMap.map((chapter) => {
                  const isActive = chapter.id === activeId;

                  return (
                    <button
                      key={chapter.id}
                      ref={(node) => {
                        chipRefs.current[chapter.id] = node;
                      }}
                      type="button"
                      onClick={() => scrollToChapter(chapter.id)}
                      className={cn(
                        "inline-flex shrink-0 items-center justify-center rounded-[999px] border px-3 py-2 text-[0.75rem] font-semibold transition",
                        isActive
                          ? "border-[rgb(92_77_58_/_0.18)] bg-[var(--color-ink)] text-[var(--color-paper)]"
                          : "border-[rgb(92_77_58_/_0.12)] bg-white/80 text-[var(--color-mist)]",
                      )}
                      aria-current={isActive ? "true" : undefined}
                    >
                      <span className="whitespace-nowrap">
                        {chapter.shortTitle ?? chapter.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <JournalCTAButton
              href={stickyCta.primaryCta.href}
              tone="contact"
              size="compact"
              className="max-w-[10.5rem] shrink-0 px-3.5 py-2 text-[0.72rem] leading-tight"
            >
              {stickyCta.primaryCta.label}
            </JournalCTAButton>
          </div>
        </div>
      </div>
    </>
  );
}
