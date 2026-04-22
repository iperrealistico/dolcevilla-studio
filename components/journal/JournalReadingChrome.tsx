"use client";

import { LayoutGroup, motion } from "framer-motion";
import { Compass } from "lucide-react";
import {
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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

type DesktopRailPointerState = {
  pointerId: number | null;
  startY: number;
  startScrollTop: number;
  dragging: boolean;
  moved: boolean;
};

const DESKTOP_BREAKPOINT = 1280;
const DESKTOP_VIEWPORT_ANCHOR = 0.38;
const MOBILE_VIEWPORT_ANCHOR = 0.26;
const FALLBACK_HEADER_HEIGHT = 76;
const MANUAL_CHAPTER_LOCK_MS = 1500;
const INITIAL_DESKTOP_RAIL_METRICS: DesktopRailMetrics = {
  activeHeight: 0,
  lineLeft: 20,
  trackHeight: 0,
  trackTop: 14,
};
const INITIAL_POINTER_STATE: DesktopRailPointerState = {
  pointerId: null,
  startY: 0,
  startScrollTop: 0,
  dragging: false,
  moved: false,
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

export function JournalReadingChrome({
  chapters,
  stickyCta,
}: JournalReadingChromeProps) {
  const reduceMotion = useReducedMotion();
  const mobileScrollerRef = useRef<HTMLDivElement | null>(null);
  const chipRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const desktopRailScrollerRef = useRef<HTMLDivElement | null>(null);
  const desktopRailListRef = useRef<HTMLDivElement | null>(null);
  const desktopItemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const desktopBadgeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const manualChapterTargetRef = useRef<string | null>(null);
  const manualChapterLockUntilRef = useRef(0);
  const desktopRailPointerStateRef = useRef({ ...INITIAL_POINTER_STATE });

  const [activeId, setActiveId] = useState(chapters[0]?.id ?? "");
  const [desktopRailMetrics, setDesktopRailMetrics] = useState(
    INITIAL_DESKTOP_RAIL_METRICS,
  );
  const [progress, setProgress] = useState(0);

  const chapterMap = useMemo(
    () =>
      chapters.map((chapter, index) => ({
        ...chapter,
        label: String(index + 1).padStart(2, "0"),
      })),
    [chapters],
  );

  useEffect(() => {
    const fallbackId = chapters[0]?.id ?? "";

    setActiveId((currentId) =>
      chapters.some((chapter) => chapter.id === currentId)
        ? currentId
        : fallbackId,
    );
  }, [chapters]);

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

    let chromeFrameRequested = false;

    const updateChrome = () => {
      const articleRect = article.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollable = articleRect.height - viewportHeight * 0.46;
      const distance = viewportHeight * 0.24 - articleRect.top;
      const headerHeight = getSiteHeaderHeight();
      const chromeOffset =
        headerHeight + (window.innerWidth >= DESKTOP_BREAKPOINT ? 28 : 20);

      setProgress(clamp(distance / Math.max(totalScrollable, 1), 0, 1));

      const anchor =
        chromeOffset +
        (window.innerHeight - chromeOffset) *
          (window.innerWidth >= DESKTOP_BREAKPOINT
            ? DESKTOP_VIEWPORT_ANCHOR
            : MOBILE_VIEWPORT_ANCHOR);

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
        const lockExpired =
          reduceMotion || performance.now() > manualChapterLockUntilRef.current;

        if (!targetReached && !lockExpired) {
          return;
        }

        manualChapterTargetRef.current = null;
      }

      setActiveId((currentId) =>
        currentId === nextActiveId ? currentId : nextActiveId,
      );
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
      activeChip.offsetLeft - (scroller.clientWidth - activeChip.offsetWidth) / 2,
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
      return;
    }

    const targetTop = clamp(
      activeItem.offsetTop - (scroller.clientHeight - activeItem.offsetHeight) / 2,
      0,
      Math.max(scroller.scrollHeight - scroller.clientHeight, 0),
    );

    scroller.scrollTo({
      top: targetTop,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [activeId, reduceMotion]);

  useEffect(() => {
    if (!chapterMap.length) {
      setDesktopRailMetrics(INITIAL_DESKTOP_RAIL_METRICS);
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

    const headerHeight = getSiteHeaderHeight();
    const offset =
      headerHeight + (window.innerWidth >= DESKTOP_BREAKPOINT ? 34 : 22);
    const targetTop =
      window.scrollY + section.getBoundingClientRect().top - offset;

    manualChapterTargetRef.current = id;
    manualChapterLockUntilRef.current =
      performance.now() + MANUAL_CHAPTER_LOCK_MS;
    setActiveId(id);
    window.history.replaceState(null, "", `#${id}`);
    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const handleDesktopRailPointerDown = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    const scroller = desktopRailScrollerRef.current;

    if (!scroller) {
      return;
    }

    desktopRailPointerStateRef.current = {
      pointerId: event.pointerId,
      startY: event.clientY,
      startScrollTop: scroller.scrollTop,
      dragging: true,
      moved: false,
    };

    scroller.setPointerCapture(event.pointerId);
  };

  const handleDesktopRailPointerMove = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    const scroller = desktopRailScrollerRef.current;
    const pointerState = desktopRailPointerStateRef.current;

    if (
      !scroller ||
      !pointerState.dragging ||
      pointerState.pointerId !== event.pointerId
    ) {
      return;
    }

    const delta = event.clientY - pointerState.startY;

    if (Math.abs(delta) > 4) {
      pointerState.moved = true;
    }

    scroller.scrollTop = clamp(
      pointerState.startScrollTop - delta,
      0,
      Math.max(scroller.scrollHeight - scroller.clientHeight, 0),
    );
  };

  const finishDesktopRailPointerDrag = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    const scroller = desktopRailScrollerRef.current;
    const pointerState = desktopRailPointerStateRef.current;

    if (
      !scroller ||
      !pointerState.dragging ||
      pointerState.pointerId !== event.pointerId
    ) {
      return;
    }

    pointerState.dragging = false;
    pointerState.pointerId = null;
    scroller.releasePointerCapture(event.pointerId);
  };

  const handleDesktopChapterClick = (id: string) => {
    if (desktopRailPointerStateRef.current.moved) {
      desktopRailPointerStateRef.current.moved = false;
      return;
    }

    scrollToChapter(id);
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
          className="h-full origin-left bg-[linear-gradient(90deg,#1d1916,#a78b68)] transition-transform duration-300 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <div className="relative hidden xl:block">
        <div
          className="sticky"
          style={{ top: "calc(var(--site-header-height, 76px) + 1rem)" }}
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

            <LayoutGroup id="desktop-journal-chapter-rail">
              <div
                ref={desktopRailScrollerRef}
                className="journal-chapter-rail-mask -mx-1 min-h-0 flex-1 overflow-y-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                onPointerDown={handleDesktopRailPointerDown}
                onPointerMove={handleDesktopRailPointerMove}
                onPointerUp={finishDesktopRailPointerDrag}
                onPointerCancel={finishDesktopRailPointerDrag}
              >
                <div ref={desktopRailListRef} className="relative space-y-1.5 pb-1">
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
                    className="pointer-events-none absolute w-px bg-[linear-gradient(180deg,#1d1916,#a78b68)] transition-[height,left,top] duration-300 ease-out"
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
                        onClick={() => handleDesktopChapterClick(chapter.id)}
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
                                      stiffness: 420,
                                      damping: 34,
                                      mass: 0.52,
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
                                      stiffness: 400,
                                      damping: 34,
                                      mass: 0.58,
                                    }
                              }
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 rounded-[1.2rem] bg-white/0 transition-colors duration-200 group-hover:bg-white/72"
                            />
                          )}
                          <span
                            className={cn(
                              "relative z-10 block rounded-[1.2rem] px-3.5 py-2.5 text-[0.9rem] leading-[1.18rem] transition-colors duration-200",
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
              {currentChapter?.label}/{String(chapterMap.length).padStart(2, "0")}
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
