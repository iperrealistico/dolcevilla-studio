"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Container } from "@/components/ui/Container";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { getImageAsset } from "@/lib/images/imageManifest";
import type { ServicePageContent } from "@/types/content";

type TeamMember = NonNullable<ServicePageContent["team"]>["members"][number];

type TeamSlide = {
  kind: "member" | "studio";
  key: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  image: ReturnType<typeof getImageAsset>;
};

const cardBaseClass =
  "group relative flex min-h-[39rem] shrink-0 flex-col overflow-hidden rounded-[2rem] border border-[var(--color-line)] bg-[rgb(255_255_255_/_0.92)] select-none";

function buildMemberSlide(member: TeamMember): TeamSlide {
  return {
    kind: "member",
    key: member.name,
    eyebrow: "Principal lead",
    title: member.name,
    subtitle: member.role,
    description: member.quote,
    image: getImageAsset(member.imageId as never),
  };
}

export function StudioTeamBlock({
  team,
}: {
  team?: ServicePageContent["team"];
}) {
  const reduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const resumeTimeoutRef = useRef<number | null>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const scrollTargetRef = useRef(0);
  const dragStateRef = useRef<{
    pointerId: number;
    startX: number;
    scrollLeft: number;
  } | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPaused, setIsAutoPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const slides = useMemo<TeamSlide[]>(() => {
    if (!team) {
      return [];
    }

    return [
      ...team.members.map((member) => buildMemberSlide(member)),
      {
        kind: "studio",
        key: "wider-studio",
        eyebrow: "The wider studio",
        title: "A larger circle behind the work",
        subtitle:
          "Production, second coverage, film handling, archive, and finishing all move to one shared standard.",
        description:
          team.groupNote ??
          "Beyond the four visible leads is a larger working studio moving with the same eye for light, restraint, hospitality, film handling, and finish.",
        image: getImageAsset("teamWiderStudioVillaRaffaelli"),
      },
    ];
  }, [team]);

  const clearResumeTimer = useCallback(() => {
    if (resumeTimeoutRef.current !== null) {
      window.clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  }, []);

  const cancelScrollAnimation = useCallback(() => {
    if (scrollFrameRef.current !== null) {
      window.cancelAnimationFrame(scrollFrameRef.current);
      scrollFrameRef.current = null;
    }
  }, []);

  const clampScrollLeft = (viewport: HTMLDivElement, value: number) =>
    Math.max(0, Math.min(value, viewport.scrollWidth - viewport.clientWidth));

  const setScrollTarget = useCallback((nextLeft: number, immediate = false) => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    scrollTargetRef.current = clampScrollLeft(viewport, nextLeft);

    if (immediate || reduceMotion) {
      cancelScrollAnimation();
      viewport.scrollLeft = scrollTargetRef.current;
      return;
    }

    if (scrollFrameRef.current !== null) {
      return;
    }

    const animate = () => {
      const activeViewport = viewportRef.current;

      if (!activeViewport) {
        scrollFrameRef.current = null;
        return;
      }

      const delta = scrollTargetRef.current - activeViewport.scrollLeft;

      if (Math.abs(delta) < 0.6) {
        activeViewport.scrollLeft = scrollTargetRef.current;
        scrollFrameRef.current = null;
        return;
      }

      activeViewport.scrollLeft += delta * 0.18;
      scrollFrameRef.current = window.requestAnimationFrame(animate);
    };

    scrollFrameRef.current = window.requestAnimationFrame(animate);
  }, [cancelScrollAnimation, reduceMotion]);

  const pauseAutoplay = () => {
    clearResumeTimer();
    startTransition(() => setIsAutoPaused(true));
  };

  const scheduleAutoplayResume = (delay = 2800) => {
    clearResumeTimer();

    if (reduceMotion) {
      return;
    }

    resumeTimeoutRef.current = window.setTimeout(() => {
      startTransition(() => setIsAutoPaused(false));
    }, delay);
  };

  const updateScrollState = () => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const viewportPaddingLeft =
      Number.parseFloat(window.getComputedStyle(viewport).paddingLeft) || 0;

    if (scrollFrameRef.current === null && dragStateRef.current === null) {
      scrollTargetRef.current = viewport.scrollLeft;
    }

    let nextIndex = 0;
    let bestDistance = Number.POSITIVE_INFINITY;

    slideRefs.current.forEach((slide, index) => {
      if (!slide) {
        return;
      }

      const distance = Math.abs(
        slide.offsetLeft - viewport.scrollLeft - viewportPaddingLeft,
      );

      if (distance < bestDistance) {
        bestDistance = distance;
        nextIndex = index;
      }
    });

    startTransition(() => {
      setActiveIndex((currentIndex) =>
        currentIndex === nextIndex ? currentIndex : nextIndex,
      );
    });
  };

  const scrollToIndex = (
    nextIndex: number,
    behavior: ScrollBehavior = reduceMotion ? "auto" : "smooth",
  ) => {
    const viewport = viewportRef.current;
    const target = slideRefs.current[nextIndex];

    if (!viewport || !target) {
      return;
    }

    const viewportPaddingLeft =
      Number.parseFloat(window.getComputedStyle(viewport).paddingLeft) || 0;
    setScrollTarget(
      target.offsetLeft - viewportPaddingLeft,
      behavior === "auto" || reduceMotion,
    );

    startTransition(() => {
      setActiveIndex((currentIndex) =>
        currentIndex === nextIndex ? currentIndex : nextIndex,
      );
    });
  };

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport || !slides.length) {
      return;
    }

    updateScrollState();

    viewport.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      viewport.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [slides.length]);

  useEffect(() => {
    if (reduceMotion || isAutoPaused || slides.length < 2) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const nextIndex = (activeIndex + 1) % slides.length;
      const viewport = viewportRef.current;
      const target = slideRefs.current[nextIndex];

      if (!viewport || !target) {
        return;
      }

      const viewportPaddingLeft =
        Number.parseFloat(window.getComputedStyle(viewport).paddingLeft) || 0;

      setScrollTarget(
        target.offsetLeft - viewportPaddingLeft,
        reduceMotion,
      );
    }, 4600);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [activeIndex, isAutoPaused, reduceMotion, setScrollTarget, slides.length]);

  useEffect(
    () => () => {
      if (resumeTimeoutRef.current !== null) {
        window.clearTimeout(resumeTimeoutRef.current);
      }
      cancelScrollAnimation();
    },
    [cancelScrollAnimation],
  );

  if (!team || !slides.length) {
    return null;
  }

  const handleArrowClick = (direction: -1 | 1) => {
    pauseAutoplay();
    scrollToIndex((activeIndex + direction + slides.length) % slides.length);
    scheduleAutoplayResume(3800);
  };

  const handleMouseEnter = () => {
    pauseAutoplay();
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      scheduleAutoplayResume(2200);
    }
  };

  const handleTouchStart = () => {
    pauseAutoplay();
  };

  const handleTouchEnd = () => {
    scheduleAutoplayResume(2600);
  };

  const handleFocusCapture = () => {
    pauseAutoplay();
  };

  const handleBlurCapture = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      scheduleAutoplayResume(2200);
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) {
      return;
    }

    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      scrollLeft: viewport.scrollLeft,
    };
    viewport.setPointerCapture(event.pointerId);
    pauseAutoplay();
    cancelScrollAnimation();
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;
    const viewport = viewportRef.current;

    if (!dragState || !viewport || dragState.pointerId !== event.pointerId) {
      return;
    }

    event.preventDefault();
    const nextLeft = dragState.scrollLeft - (event.clientX - dragState.startX);
    viewport.scrollLeft = clampScrollLeft(viewport, nextLeft);
    scrollTargetRef.current = viewport.scrollLeft;
  };

  const endDrag = (event?: React.PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;
    const viewport = viewportRef.current;

    if (!dragState || !viewport) {
      return;
    }

    if (event && viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }

    dragStateRef.current = null;
    setIsDragging(false);
    scrollTargetRef.current = viewport.scrollLeft;
    updateScrollState();
    scheduleAutoplayResume(2600);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const horizontalDelta = event.deltaX;
    const verticalDelta = event.deltaY;

    if (
      Math.abs(horizontalDelta) < 1 ||
      Math.abs(horizontalDelta) <= Math.abs(verticalDelta)
    ) {
      return;
    }

    event.preventDefault();
    pauseAutoplay();
    setScrollTarget(scrollTargetRef.current + horizontalDelta * 1.08);
    scheduleAutoplayResume(2800);
  };

  return (
    <Container>
      <section className="relative overflow-visible rounded-[2.75rem] border border-[var(--color-line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(247,243,237,0.9))] px-6 py-8 shadow-[0_34px_84px_rgba(30,20,12,0.1)] md:px-8 md:py-10 lg:px-10">
        <div className="max-w-4xl space-y-4">
          <p className="text-xs font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
            {team.eyebrow ?? "The studio"}
          </p>
          <h2 className="font-display-face max-w-5xl text-3xl leading-[0.96] tracking-[-0.04em] md:text-5xl">
            {team.heading}
          </h2>
          <div className="max-w-3xl space-y-2 text-sm leading-7 text-[var(--color-mist)] md:text-[15px]">
            {team.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div
          className="relative mt-10"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onFocusCapture={handleFocusCapture}
          onBlurCapture={handleBlurCapture}
        >
          {slides.length > 1 ? (
            <>
              <button
                type="button"
                aria-label="Show previous team card"
                onClick={() => handleArrowClick(-1)}
                className="absolute left-2 top-[38%] z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[rgb(255_255_255_/_0.72)] bg-[rgb(255_255_255_/_0.74)] text-[var(--color-ink)] shadow-[0_14px_28px_rgba(30,20,12,0.14)] backdrop-blur-md transition hover:bg-white md:left-4"
              >
                <ArrowLeft size={18} strokeWidth={1.75} />
              </button>
              <button
                type="button"
                aria-label="Show next team card"
                onClick={() => handleArrowClick(1)}
                className="absolute right-2 top-[38%] z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[rgb(255_255_255_/_0.72)] bg-[rgb(255_255_255_/_0.74)] text-[var(--color-ink)] shadow-[0_14px_28px_rgba(30,20,12,0.14)] backdrop-blur-md transition hover:bg-white md:right-4"
              >
                <ArrowRight size={18} strokeWidth={1.75} />
              </button>
            </>
          ) : null}

          <div
            ref={viewportRef}
            className="flex gap-5 overflow-x-auto overscroll-x-contain px-4 py-4 pb-8 [scrollbar-width:none] [-ms-overflow-style:none] md:px-6 lg:px-7 [&::-webkit-scrollbar]:hidden"
            style={{ scrollPaddingInline: "1.75rem" }}
            onScroll={updateScrollState}
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            {slides.map((slide, index) => (
              <motion.article
                key={slide.key}
                ref={(node) => {
                  slideRefs.current[index] = node;
                }}
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.58,
                  ease: [0.22, 1, 0.36, 1],
                  delay: reduceMotion ? 0 : index * 0.06,
                }}
                className={`${cardBaseClass} ${
                  isDragging ? "cursor-grabbing" : "cursor-grab"
                } min-w-[82vw] max-w-[82vw] sm:min-w-[22rem] sm:max-w-[22rem] lg:min-w-[24rem] lg:max-w-[24rem]`}
              >
                <div className="relative overflow-hidden rounded-[1.75rem]">
                  <Image
                    src={slide.image.src}
                    alt={slide.image.alt}
                    width={slide.image.width}
                    height={slide.image.height}
                    sizes="(min-width: 1024px) 24rem, (min-width: 640px) 22rem, 82vw"
                    placeholder="blur"
                    blurDataURL={slide.image.blurDataURL}
                    className={
                      slide.kind === "studio"
                        ? "aspect-[4/5] w-full object-cover grayscale contrast-[1.05] brightness-[1.04]"
                        : "aspect-[4/5] w-full object-cover grayscale transition-[filter,transform] duration-700 ease-out contrast-[1.03] group-hover:grayscale-0 group-focus-within:grayscale-0"
                    }
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,14,11,0.02),rgba(18,14,11,0.14)_58%,rgba(18,14,11,0.48))]" />

                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                      delay: reduceMotion ? 0 : 0.12 + index * 0.05,
                    }}
                    className="absolute inset-x-0 bottom-0 space-y-3 p-5 text-[var(--color-paper)]"
                  >
                    <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[rgb(244_235_224_/_0.82)]">
                      {slide.eyebrow}
                    </p>
                    <h3 className="font-display-face max-w-[14ch] text-[2rem] leading-[0.96] tracking-[-0.04em] md:text-[2.25rem]">
                      {slide.title}
                    </h3>
                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, scaleX: 0.65 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{
                        duration: 0.48,
                        ease: [0.22, 1, 0.36, 1],
                        delay: reduceMotion ? 0 : 0.18 + index * 0.05,
                      }}
                      className="h-px origin-left bg-[rgb(244_235_224_/_0.76)]"
                    />
                  </motion.div>
                </div>

                <div className="flex flex-1 flex-col justify-between gap-5 px-5 pb-5 pt-4">
                  <div className="space-y-3">
                    <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--color-mist)] uppercase">
                      {slide.subtitle}
                    </p>
                    <p className="text-sm leading-7 text-[var(--color-mist)]">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}
