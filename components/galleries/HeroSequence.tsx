"use client";

import Image from "next/image";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils/cn";
import type { ImageAsset } from "@/types/gallery";

const DEFAULT_HERO_AUTOSCROLL_PX_PER_SECOND = 30;
const AUTOPLAY_RESUME_DELAY_MS = 1100;
const LOOP_RESET_BUFFER_PX = 2;
const SEGMENT_COPIES = 3;
const DEFAULT_HERO_SLIDE_SIZES =
  "(min-width: 1536px) 28vw, (min-width: 1280px) 30vw, (min-width: 1024px) 36vw, (min-width: 640px) 62vw, 80vw";

export type HeroSequenceSlide = ImageAsset & {
  objectPosition?: string;
};

type HeroSequenceProps = {
  images: HeroSequenceSlide[];
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
  slideClassName?: string;
  sizes?: string;
  autoScrollSpeedPxPerSecond?: number;
};

function createLoopableSlides(images: HeroSequenceSlide[]) {
  if (images.length !== 1) {
    return images;
  }

  const [image] = images;
  const basePosition = image.objectPosition ?? image.focalPoint ?? "50% 50%";

  return [
    { ...image, id: `${image.id}-origin`, objectPosition: basePosition },
    { ...image, id: `${image.id}-left`, objectPosition: "28% 50%" },
    { ...image, id: `${image.id}-center`, objectPosition: "50% 50%" },
    { ...image, id: `${image.id}-right`, objectPosition: "72% 50%" },
  ];
}

function normalizeLoopPosition(
  target: HTMLDivElement | null,
  segmentWidth: number,
) {
  if (!target || !segmentWidth) {
    return;
  }

  if (target.scrollLeft <= LOOP_RESET_BUFFER_PX) {
    target.scrollLeft += segmentWidth;
    return;
  }

  if (target.scrollLeft >= segmentWidth * 2 - LOOP_RESET_BUFFER_PX) {
    target.scrollLeft -= segmentWidth;
  }
}

export function HeroSequence({
  images,
  className,
  imageClassName,
  overlayClassName,
  slideClassName,
  sizes = DEFAULT_HERO_SLIDE_SIZES,
  autoScrollSpeedPxPerSecond = DEFAULT_HERO_AUTOSCROLL_PX_PER_SECOND,
}: HeroSequenceProps) {
  const reduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const segmentRef = useRef<HTMLDivElement | null>(null);
  const segmentWidthRef = useRef(0);
  const hasInitializedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const isTouchingRef = useRef(false);
  const dragOriginXRef = useRef(0);
  const dragOriginScrollLeftRef = useRef(0);
  const resumeAutoplayAtRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const loopableSlides = useMemo(() => createLoopableSlides(images), [images]);

  const pauseAutoplay = () => {
    resumeAutoplayAtRef.current = performance.now() + AUTOPLAY_RESUME_DELAY_MS;
  };

  useEffect(() => {
    const syncMeasurements = () => {
      const viewport = viewportRef.current;
      const segment = segmentRef.current;

      if (!viewport || !segment) {
        return;
      }

      const segmentWidth = segment.scrollWidth;

      if (!segmentWidth) {
        return;
      }

      segmentWidthRef.current = segmentWidth;

      if (!hasInitializedRef.current) {
        viewport.scrollLeft = segmentWidth;
        hasInitializedRef.current = true;
        return;
      }

      normalizeLoopPosition(viewport, segmentWidth);
    };

    syncMeasurements();

    const segment = segmentRef.current;

    if (!segment || typeof ResizeObserver === "undefined") {
      return undefined;
    }

    const resizeObserver = new ResizeObserver(() => {
      syncMeasurements();
    });

    resizeObserver.observe(segment);
    window.addEventListener("resize", syncMeasurements);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", syncMeasurements);
    };
  }, [loopableSlides.length]);

  useEffect(() => {
    if (reduceMotion || !loopableSlides.length) {
      return undefined;
    }

    let animationFrame = 0;
    let previousTimestamp = 0;

    const step = (timestamp: number) => {
      if (!previousTimestamp) {
        previousTimestamp = timestamp;
      }

      const viewport = viewportRef.current;
      const segmentWidth = segmentWidthRef.current;
      const isPaused =
        isDraggingRef.current ||
        isTouchingRef.current ||
        timestamp < resumeAutoplayAtRef.current;

      if (viewport && segmentWidth && !isPaused) {
        viewport.scrollLeft +=
          ((timestamp - previousTimestamp) / 1000) *
          autoScrollSpeedPxPerSecond;
        normalizeLoopPosition(viewport, segmentWidth);
      }

      previousTimestamp = timestamp;
      animationFrame = window.requestAnimationFrame(step);
    };

    animationFrame = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [
    autoScrollSpeedPxPerSecond,
    loopableSlides.length,
    reduceMotion,
  ]);

  if (!loopableSlides.length) {
    return null;
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    event.preventDefault();
    pauseAutoplay();
    isDraggingRef.current = true;
    setIsDragging(true);
    dragOriginXRef.current = event.clientX;
    dragOriginScrollLeftRef.current = viewport.scrollLeft;
    viewport.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !viewportRef.current) {
      return;
    }

    const deltaX = event.clientX - dragOriginXRef.current;
    pauseAutoplay();

    viewportRef.current.scrollLeft =
      dragOriginScrollLeftRef.current - deltaX;
    normalizeLoopPosition(viewportRef.current, segmentWidthRef.current);
  };

  const handlePointerRelease = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!viewportRef.current) {
      return;
    }

    isDraggingRef.current = false;
    setIsDragging(false);
    pauseAutoplay();

    if (viewportRef.current.hasPointerCapture(event.pointerId)) {
      viewportRef.current.releasePointerCapture(event.pointerId);
    }
  };

  const handleTouchStart = () => {
    isTouchingRef.current = true;
    pauseAutoplay();
  };

  const handleTouchMove = () => {
    pauseAutoplay();
  };

  const handleTouchEnd = () => {
    isTouchingRef.current = false;
    pauseAutoplay();
  };

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey) {
      pauseAutoplay();
    }
  };

  const handleScroll = () => {
    normalizeLoopPosition(viewportRef.current, segmentWidthRef.current);
  };

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden bg-[var(--color-shell)]",
        className,
      )}
    >
      <div
        ref={viewportRef}
        className={cn(
          "absolute inset-0 overflow-x-auto overflow-y-hidden overscroll-x-contain touch-auto select-none [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          isDragging ? "cursor-grabbing" : "cursor-grab",
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerRelease}
        onPointerCancel={handlePointerRelease}
        onPointerLeave={handlePointerRelease}
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onWheel={handleWheel}
      >
        <div className="flex h-full items-stretch">
          {Array.from({ length: SEGMENT_COPIES }, (_, segmentIndex) => (
            <div
              key={`hero-segment-${segmentIndex}`}
              ref={segmentIndex === 0 ? segmentRef : null}
              className="flex h-full shrink-0 gap-2 pr-2 sm:gap-3 sm:pr-3"
            >
              {loopableSlides.map((image, imageIndex) => (
                <div
                  key={`${image.id}-${segmentIndex}`}
                  className={cn(
                    "relative h-full min-w-[80vw] overflow-hidden rounded-[var(--radius-frame)] border border-white/12 bg-[var(--surface-panel-strong)] sm:min-w-[62vw] lg:min-w-[36vw] xl:min-w-[30vw] 2xl:min-w-[28vw]",
                    slideClassName,
                  )}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority={segmentIndex === 1 && imageIndex < 2}
                    loading={segmentIndex === 1 && imageIndex < 3 ? "eager" : "lazy"}
                    sizes={sizes}
                    placeholder="blur"
                    blurDataURL={image.blurDataURL}
                    draggable={false}
                    className={cn("select-none object-cover", imageClassName)}
                    style={{
                      objectPosition: image.objectPosition ?? image.focalPoint,
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,9,8,0.08),rgba(10,9,8,0.56))]",
          overlayClassName,
        )}
      />
    </div>
  );
}
