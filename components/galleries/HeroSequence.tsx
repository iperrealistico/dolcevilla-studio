"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { cn } from "../../lib/utils/cn";
import type { ImageAsset } from "../../types/gallery";

const DEFAULT_HERO_SLIDE_INTERVAL_MS = 4200;
const AUTOPLAY_RESUME_DELAY_MS = 2600;
const SNAP_SETTLE_DELAY_MS = 140;

type HeroSequenceProps = {
  images: ImageAsset[];
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
  slideIntervalMs?: number;
};

export function HeroSequence({
  images,
  className,
  imageClassName,
  overlayClassName,
  slideIntervalMs = DEFAULT_HERO_SLIDE_INTERVAL_MS,
}: HeroSequenceProps) {
  const reduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const scrollIdleRef = useRef<number | null>(null);
  const resumeAutoplayRef = useRef<number | null>(null);
  const widthSyncRef = useRef(0);
  const dragStateRef = useRef<{
    pointerId: number;
    startX: number;
    startScrollLeft: number;
    moved: boolean;
  } | null>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(images.length > 1 ? 1 : 0);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const canLoop = images.length > 1;
  const carouselImages = useMemo(() => {
    if (!canLoop) {
      return images;
    }

    const firstImage = images[0];
    const lastImage = images[images.length - 1];

    return [lastImage, ...images, firstImage];
  }, [canLoop, images]);

  const scheduleAutoplayResume = useCallback(() => {
    if (resumeAutoplayRef.current) {
      window.clearTimeout(resumeAutoplayRef.current);
    }

    setAutoplayPaused(true);

    resumeAutoplayRef.current = window.setTimeout(() => {
      setAutoplayPaused(false);
      resumeAutoplayRef.current = null;
    }, AUTOPLAY_RESUME_DELAY_MS);
  }, []);

  const syncToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const viewport = viewportRef.current;

      if (!viewport || !viewportWidth) {
        return;
      }

      viewport.scrollTo({
        left: index * viewportWidth,
        top: 0,
        behavior,
      });
    },
    [viewportWidth],
  );

  const settleToNearestSlide = useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport || !viewportWidth) {
      return;
    }

    const nearestIndex = Math.round(viewport.scrollLeft / viewportWidth);
    const maxIndex = carouselImages.length - 1;
    const boundedIndex = Math.max(0, Math.min(maxIndex, nearestIndex));

    if (canLoop && boundedIndex === 0) {
      const resetIndex = images.length;
      setActiveIndex(resetIndex);
      syncToIndex(resetIndex, "auto");
      return;
    }

    if (canLoop && boundedIndex === maxIndex) {
      setActiveIndex(1);
      syncToIndex(1, "auto");
      return;
    }

    setActiveIndex(boundedIndex);
    syncToIndex(boundedIndex, "smooth");
  }, [
    canLoop,
    carouselImages.length,
    images.length,
    syncToIndex,
    viewportWidth,
  ]);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return undefined;
    }

    const updateViewportWidth = () => {
      setViewportWidth(viewport.clientWidth);
    };

    updateViewportWidth();

    const resizeObserver = new ResizeObserver(updateViewportWidth);
    resizeObserver.observe(viewport);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!viewportWidth) {
      return;
    }

    if (widthSyncRef.current !== viewportWidth) {
      widthSyncRef.current = viewportWidth;
      syncToIndex(activeIndex, "auto");
    }
  }, [activeIndex, syncToIndex, viewportWidth]);

  useEffect(() => {
    if (
      reduceMotion ||
      !canLoop ||
      autoplayPaused ||
      !viewportWidth ||
      isDragging
    ) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      const nextIndex = activeIndex + 1;
      setActiveIndex(nextIndex);
      syncToIndex(nextIndex, "smooth");
    }, slideIntervalMs);

    return () => window.clearInterval(interval);
  }, [
    activeIndex,
    autoplayPaused,
    canLoop,
    isDragging,
    reduceMotion,
    slideIntervalMs,
    syncToIndex,
    viewportWidth,
  ]);

  useEffect(() => {
    return () => {
      if (scrollIdleRef.current) {
        window.clearTimeout(scrollIdleRef.current);
      }

      if (resumeAutoplayRef.current) {
        window.clearTimeout(resumeAutoplayRef.current);
      }
    };
  }, []);

  if (!images.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden rounded-[var(--radius-frame)] bg-[var(--color-shell)]",
        className,
      )}
    >
      <div
        ref={viewportRef}
        className={cn(
          "flex h-full overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          canLoop ? "snap-x snap-mandatory" : "",
          canLoop ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "",
          "touch-pan-y",
        )}
        role="region"
        aria-roledescription="carousel"
        aria-label="Hero image carousel"
        onPointerDown={(event) => {
          const viewport = viewportRef.current;

          if (!viewport || !canLoop) {
            return;
          }

          dragStateRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startScrollLeft: viewport.scrollLeft,
            moved: false,
          };
          viewport.setPointerCapture(event.pointerId);
          setIsDragging(true);
          scheduleAutoplayResume();
        }}
        onPointerMove={(event) => {
          const viewport = viewportRef.current;
          const dragState = dragStateRef.current;

          if (
            !viewport ||
            !dragState ||
            dragState.pointerId !== event.pointerId
          ) {
            return;
          }

          const deltaX = event.clientX - dragState.startX;

          if (!dragState.moved && Math.abs(deltaX) > 6) {
            dragState.moved = true;
          }

          if (!dragState.moved) {
            return;
          }

          event.preventDefault();
          viewport.scrollLeft = dragState.startScrollLeft - deltaX;
        }}
        onPointerUp={(event) => {
          const viewport = viewportRef.current;
          const dragState = dragStateRef.current;

          if (
            !viewport ||
            !dragState ||
            dragState.pointerId !== event.pointerId
          ) {
            return;
          }

          dragStateRef.current = null;
          setIsDragging(false);
          if (viewport.hasPointerCapture(event.pointerId)) {
            viewport.releasePointerCapture(event.pointerId);
          }
          settleToNearestSlide();
          scheduleAutoplayResume();
        }}
        onPointerCancel={(event) => {
          const viewport = viewportRef.current;
          const dragState = dragStateRef.current;

          if (
            !viewport ||
            !dragState ||
            dragState.pointerId !== event.pointerId
          ) {
            return;
          }

          dragStateRef.current = null;
          setIsDragging(false);
          if (viewport.hasPointerCapture(event.pointerId)) {
            viewport.releasePointerCapture(event.pointerId);
          }
          settleToNearestSlide();
          scheduleAutoplayResume();
        }}
        onMouseEnter={() => {
          if (!reduceMotion) {
            setAutoplayPaused(true);
          }
        }}
        onMouseLeave={() => {
          if (!reduceMotion) {
            scheduleAutoplayResume();
          }
        }}
        onScroll={() => {
          if (scrollIdleRef.current) {
            window.clearTimeout(scrollIdleRef.current);
          }

          scrollIdleRef.current = window.setTimeout(
            settleToNearestSlide,
            SNAP_SETTLE_DELAY_MS,
          );
        }}
      >
        {carouselImages.map((image, imageIndex) => {
          const originalIndex = canLoop
            ? (imageIndex - 1 + images.length) % images.length
            : imageIndex;

          return (
            <div
              key={`${image.id}-${imageIndex}`}
              className="relative h-full min-w-full snap-start overflow-hidden"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={originalIndex === 0}
                loading={originalIndex === 0 ? "eager" : "lazy"}
                sizes="100vw"
                placeholder={image.blurDataURL ? "blur" : "empty"}
                blurDataURL={image.blurDataURL}
                className={cn(
                  "pointer-events-none h-full w-full object-cover select-none",
                  imageClassName,
                )}
              />
            </div>
          );
        })}
      </div>
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(14,12,10,0.12),rgba(14,12,10,0.56))]",
          overlayClassName,
        )}
      />
    </div>
  );
}
