"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Compass, Send } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils/cn";

type JournalChapter = {
  id: string;
  title: string;
};

type JournalReadingChromeProps = {
  chapters: JournalChapter[];
};

const DESKTOP_BREAKPOINT = 1280;
const DESKTOP_VIEWPORT_ANCHOR = 0.38;
const MOBILE_VIEWPORT_ANCHOR = 0.26;
const DESKTOP_RAIL_CENTER = 0.44;
const FALLBACK_HEADER_HEIGHT = 76;

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

  return Number.isFinite(parsed) && parsed > 0 ? parsed : FALLBACK_HEADER_HEIGHT;
}

export function JournalReadingChrome({
  chapters,
}: JournalReadingChromeProps) {
  const reduceMotion = useReducedMotion();
  const mobileScrollerRef = useRef<HTMLDivElement | null>(null);
  const chipRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const desktopTrackRef = useRef<HTMLDivElement | null>(null);
  const desktopCardRef = useRef<HTMLDivElement | null>(null);
  const desktopAnimationFrameRef = useRef<number | null>(null);
  const desktopCurrentOffsetRef = useRef(0);
  const desktopTargetOffsetRef = useRef(0);

  const [activeId, setActiveId] = useState(chapters[0]?.id ?? "");
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
      chapters.some((chapter) => chapter.id === currentId) ? currentId : fallbackId,
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
        const delta = desktopTargetOffsetRef.current - desktopCurrentOffsetRef.current;

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
        Math.max((safeViewportHeight - card.offsetHeight) * DESKTOP_RAIL_CENTER, 0);

      desktopTargetOffsetRef.current = clamp(desiredTop - trackTop, 0, maxOffset);

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
        sections.reduce<{ id: string; distance: number } | null>((nearest, section) => {
          const rect = section.getBoundingClientRect();
          const distanceToSection = distanceToRange(anchor, rect.top, rect.bottom);

          if (!nearest || distanceToSection < nearest.distance) {
            return {
              id: section.id,
              distance: distanceToSection,
            };
          }

          return nearest;
        }, null)?.id ?? chapters[0]?.id ?? "";

      setActiveId((currentId) => (currentId === nextActiveId ? currentId : nextActiveId));
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

    const nextLeft = Math.max(activeChip.offsetLeft - 12, 0);

    scroller.scrollTo({
      left: nextLeft,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [activeId, reduceMotion]);

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
          className="h-full origin-left bg-[linear-gradient(90deg,#1d1916,#a78b68)] transition-transform duration-300 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <div className="relative hidden h-full xl:block" ref={desktopTrackRef}>
        <div
          ref={desktopCardRef}
          className="w-full will-change-transform"
          style={{ transform: "translate3d(0, 0, 0)" }}
        >
          <div className="space-y-4 rounded-[2rem] border border-[rgb(92_77_58_/_0.12)] bg-[rgb(255_255_255_/_0.8)] p-4 shadow-[0_28px_70px_rgba(25,19,14,0.12)] backdrop-blur-md">
            <div className="space-y-2 px-1">
              <p className="inline-flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
                <Compass size={13} strokeWidth={1.8} aria-hidden="true" />
                <span>Chapter Guide</span>
              </p>
              <p className="text-sm leading-6 text-[var(--color-mist)]">
                Move through the article without losing your place.
              </p>
            </div>

            <div className="relative space-y-2">
              <div className="absolute top-2 bottom-2 left-[1.2rem] w-px bg-[rgb(92_77_58_/_0.14)]" />
              <div
                className="absolute top-2 left-[1.2rem] w-px bg-[linear-gradient(180deg,#1d1916,#a78b68)] transition-[height] duration-300 ease-out"
                style={{ height: `calc(${Math.max(progress, 0.06) * 100}% - 1rem)` }}
              />

              {chapterMap.map((chapter) => {
                const isActive = chapter.id === activeId;

                return (
                  <button
                    key={chapter.id}
                    type="button"
                    onClick={() => scrollToChapter(chapter.id)}
                    className={cn(
                      "group relative grid w-full grid-cols-[2.4rem_1fr] items-start gap-3 rounded-[1.3rem] px-2 py-2.5 text-left transition",
                      isActive
                        ? "bg-[rgb(255_255_255_/_0.9)] shadow-[0_16px_36px_rgba(25,19,14,0.08)]"
                        : "hover:bg-white/70",
                    )}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <div
                      className={cn(
                        "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border text-[0.72rem] font-semibold tracking-[0.2em]",
                        isActive
                          ? "border-[rgb(92_77_58_/_0.18)] bg-[var(--color-ink)] text-[var(--color-paper)]"
                          : "border-[rgb(92_77_58_/_0.14)] bg-[rgb(255_255_255_/_0.9)] text-[var(--color-mist)]",
                      )}
                    >
                      {chapter.label}
                    </div>
                    <span
                      className={cn(
                        "block pt-1 text-sm leading-5",
                        isActive ? "text-[var(--color-ink)]" : "text-[var(--color-mist)]",
                      )}
                    >
                      {chapter.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-between gap-3 rounded-[1.4rem] border border-[rgb(92_77_58_/_0.12)] bg-[linear-gradient(145deg,rgba(255,255,255,0.84),rgba(246,238,231,0.96))] px-4 py-3 text-sm font-semibold text-[var(--color-ink)] shadow-[0_18px_42px_rgba(25,19,14,0.08)] transition hover:-translate-y-0.5"
            >
              <span className="inline-flex items-center gap-2">
                <Send size={15} strokeWidth={1.9} aria-hidden="true" />
                <span>Start an inquiry</span>
              </span>
              <ArrowUpRight size={15} strokeWidth={1.9} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-4 z-40 px-4 xl:hidden">
        <div className="mx-auto max-w-[var(--container-max)] rounded-[1.7rem] border border-[rgb(92_77_58_/_0.12)] bg-[rgb(255_255_255_/_0.88)] px-3 py-3 shadow-[0_22px_56px_rgba(25,19,14,0.12)] backdrop-blur-md">
          <div className="mb-3 flex items-start justify-between gap-3 px-1">
            <div className="min-w-0">
              <p className="text-[0.62rem] font-semibold tracking-[0.24em] text-[var(--color-mist)] uppercase">
                Chapter Guide
              </p>
              <p className="truncate pt-1 text-sm leading-5 text-[var(--color-ink)]">
                {currentChapter?.title}
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
                        "inline-flex min-w-[3.2rem] shrink-0 items-center justify-center rounded-full border px-3 py-2 text-[0.72rem] font-semibold tracking-[0.16em] uppercase transition",
                        isActive
                          ? "border-[rgb(92_77_58_/_0.18)] bg-[var(--color-ink)] text-[var(--color-paper)]"
                          : "border-[rgb(92_77_58_/_0.12)] bg-white/80 text-[var(--color-mist)]",
                      )}
                      aria-current={isActive ? "true" : undefined}
                    >
                      {chapter.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[rgb(248_240_230_/_0.12)] bg-[linear-gradient(145deg,rgba(21,17,14,0.98),rgba(58,47,38,0.96))] px-4 py-2 text-[0.72rem] font-semibold tracking-[0.14em] text-[rgb(249_243_235)] uppercase shadow-[0_18px_42px_rgba(25,19,14,0.2)] ring-1 ring-[rgb(255_255_255_/_0.04)]"
            >
              <Send
                size={14}
                strokeWidth={1.9}
                aria-hidden="true"
                className="text-[rgb(249_243_235)]"
              />
              <span className="text-[rgb(249_243_235)]">Contact</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
