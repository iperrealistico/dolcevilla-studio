"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Compass, Send } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type JournalChapter = {
  id: string;
  title: string;
};

type JournalReadingChromeProps = {
  chapters: JournalChapter[];
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function JournalReadingChrome({
  chapters,
}: JournalReadingChromeProps) {
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
    if (!chapters.length) {
      return;
    }

    const article = document.getElementById("journal-article");

    if (!article) {
      return;
    }

    const updateProgress = () => {
      const rect = article.getBoundingClientRect();
      const documentHeight = window.innerHeight;
      const totalScrollable = rect.height - documentHeight * 0.55;
      const distance = documentHeight * 0.28 - rect.top;

      setProgress(clamp(distance / Math.max(totalScrollable, 1), 0, 1));
    };

    const sections = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio);

        if (!visibleEntries.length) {
          return;
        }

        setActiveId(visibleEntries[0]?.target.id ?? chapters[0]?.id ?? "");
      },
      {
        rootMargin: "-24% 0px -48% 0px",
        threshold: [0.16, 0.33, 0.5, 0.66, 0.82],
      },
    );

    sections.forEach((section) => observer.observe(section));
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [chapters]);

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

      <div className="pointer-events-none fixed top-28 left-4 z-40 hidden xl:block">
        <div className="pointer-events-auto flex w-[16rem] flex-col gap-4 rounded-[2rem] border border-[rgb(92_77_58_/_0.12)] bg-[rgb(255_255_255_/_0.8)] p-4 shadow-[0_28px_70px_rgba(25,19,14,0.12)] backdrop-blur-md">
          <div className="space-y-2 px-1">
            <p className="inline-flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
              <Compass size={13} strokeWidth={1.8} aria-hidden="true" />
              <span>Chapter Guide</span>
            </p>
            <p className="text-sm leading-6 text-[var(--color-mist)]">
              Follow the flow of the article and jump where you need to.
            </p>
          </div>
          <div className="relative space-y-2">
            <div className="absolute top-2 bottom-2 left-[1.2rem] w-px bg-[rgb(92_77_58_/_0.14)]" />
            {chapterMap.map((chapter) => {
              const isActive = chapter.id === activeId;

              return (
                <a
                  key={chapter.id}
                  href={`#${chapter.id}`}
                  className={cn(
                    "group relative grid grid-cols-[2.4rem_1fr] items-start gap-3 rounded-[1.3rem] px-2 py-2.5 transition",
                    isActive
                      ? "bg-[rgb(255_255_255_/_0.9)] shadow-[0_16px_36px_rgba(25,19,14,0.08)]"
                      : "hover:bg-white/70",
                  )}
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
                </a>
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

      <div className="fixed inset-x-0 bottom-4 z-40 px-4 xl:hidden">
        <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-[1fr_auto] items-center gap-3 rounded-[1.4rem] border border-[rgb(92_77_58_/_0.12)] bg-[rgb(255_255_255_/_0.86)] px-3 py-3 shadow-[0_22px_56px_rgba(25,19,14,0.12)] backdrop-blur-md">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {chapterMap.map((chapter) => {
              const isActive = chapter.id === activeId;

              return (
                <a
                  key={chapter.id}
                  href={`#${chapter.id}`}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-[0.72rem] font-semibold tracking-[0.16em] uppercase transition",
                    isActive
                      ? "border-[rgb(92_77_58_/_0.18)] bg-[var(--color-ink)] text-[var(--color-paper)]"
                      : "border-[rgb(92_77_58_/_0.12)] bg-white/80 text-[var(--color-mist)]",
                  )}
                >
                  <span>{chapter.label}</span>
                </a>
              );
            })}
          </div>
          <Link
            href="/contact"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgb(92_77_58_/_0.12)] bg-[linear-gradient(145deg,rgba(29,25,22,0.96),rgba(56,48,40,0.92))] text-[var(--color-paper)] shadow-[0_18px_42px_rgba(25,19,14,0.16)]"
            aria-label="Start an inquiry"
          >
            <Send size={16} strokeWidth={1.9} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </>
  );
}
