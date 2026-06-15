"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Mail } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { FloatIn } from "@/components/motion/FloatIn";
import { Button } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/LinkButton";
import { useLightbox } from "@/contexts/LightboxContext";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSimplifiedMotion } from "@/hooks/useSimplifiedMotion";
import type { GalleryPageContent } from "@/content/pages/gallery";
import type { ImageAsset } from "@/types/gallery";
import { cn } from "@/lib/utils/cn";

const GALLERY_CYCLES = 3;
const GALLERY_IMAGE_SIZES =
  "(min-width: 1600px) 21vw, (min-width: 1280px) 24vw, (min-width: 768px) 33vw, 50vw";

type GalleryAspect = "portrait" | "landscape" | "wide";

type GalleryTilePlacement = {
  heightBias: number;
  shellClassName: string;
};

type GalleryBucketItem = {
  image: ImageAsset;
  aspect: GalleryAspect;
};

type GalleryColumnItem = {
  image: ImageAsset;
  imageIndex: number;
};

const GALLERY_RHYTHM_PATTERN: readonly GalleryAspect[] = [
  "portrait",
  "wide",
  "portrait",
  "landscape",
  "portrait",
  "portrait",
  "landscape",
  "portrait",
  "wide",
  "portrait",
  "landscape",
  "portrait",
];

const GALLERY_TILE_PLACEMENTS: readonly GalleryTilePlacement[] = [
  {
    heightBias: 0.08,
    shellClassName:
      "mb-2 px-0.5 pt-1 pb-2 md:mb-3 md:px-1.5 md:pt-2 md:pb-3 lg:mb-4 lg:px-2 lg:pt-3 lg:pb-4 md:-translate-x-[4px] lg:-translate-x-[8px]",
  },
  {
    heightBias: 0.1,
    shellClassName:
      "mb-2 px-0.5 pt-2 pb-1 md:mb-3 md:px-1.5 md:pt-3 md:pb-2 lg:mb-4 lg:px-2 lg:pt-5 lg:pb-3 md:translate-x-[4px] lg:translate-x-[7px]",
  },
  {
    heightBias: 0.07,
    shellClassName:
      "mb-2 px-0.5 pt-1 pb-1 md:mb-3 md:px-1 md:pt-1 md:pb-3 lg:mb-4 lg:px-1.5 lg:pt-2 lg:pb-5",
  },
  {
    heightBias: 0.11,
    shellClassName:
      "mb-2 px-0.5 pt-3 pb-1 md:mb-3 md:px-1.5 md:pt-4 md:pb-2 lg:mb-4 lg:px-2 lg:pt-6 lg:pb-3 md:-translate-x-[2px] lg:-translate-x-[5px]",
  },
  {
    heightBias: 0.09,
    shellClassName:
      "mb-2 px-0.5 pt-1 pb-2 md:mb-3 md:px-1 md:pt-2 md:pb-4 lg:mb-4 lg:px-1.5 lg:pt-4 lg:pb-5 md:translate-x-[2px] lg:translate-x-[5px]",
  },
];

const GALLERY_COLUMN_BASE_GAP = 0.18;

function getGalleryAspectRatio(image: ImageAsset) {
  return image.width / image.height;
}

function getGalleryAspect(image: ImageAsset): GalleryAspect {
  const ratio = getGalleryAspectRatio(image);

  if (ratio >= 1.68) {
    return "wide";
  }

  if (ratio >= 1.12) {
    return "landscape";
  }

  return "portrait";
}

function hashGalleryKey(value: string) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 33 + value.charCodeAt(index)) >>> 0;
  }

  return hash;
}

function takeNextFromBucket(
  buckets: Record<GalleryAspect, ImageAsset[]>,
  aspect: GalleryAspect,
): GalleryBucketItem | null {
  const nextImage = buckets[aspect].shift();

  return nextImage ? { image: nextImage, aspect } : null;
}

function takeFallbackImage(
  buckets: Record<GalleryAspect, ImageAsset[]>,
  lastAspect: GalleryAspect | null,
): GalleryBucketItem | null {
  const availableAspects = (Object.keys(buckets) as GalleryAspect[])
    .filter((aspect) => buckets[aspect].length > 0)
    .sort((left, right) => {
      const lengthDelta = buckets[right].length - buckets[left].length;

      if (lengthDelta !== 0) {
        return lengthDelta;
      }

      if (left === lastAspect && right !== lastAspect) {
        return 1;
      }

      if (right === lastAspect && left !== lastAspect) {
        return -1;
      }

      return 0;
    });

  const nextAspect = availableAspects[0];

  return nextAspect ? takeNextFromBucket(buckets, nextAspect) : null;
}

function buildGallerySequence(images: readonly ImageAsset[]) {
  const buckets: Record<GalleryAspect, ImageAsset[]> = {
    portrait: [],
    landscape: [],
    wide: [],
  };

  images.forEach((image) => {
    buckets[getGalleryAspect(image)].push(image);
  });

  const orderedImages: ImageAsset[] = [];
  let lastAspect: GalleryAspect | null = null;
  let patternIndex = 0;

  while (orderedImages.length < images.length) {
    const desiredAspect =
      GALLERY_RHYTHM_PATTERN[patternIndex % GALLERY_RHYTHM_PATTERN.length];
    const nextImage: GalleryBucketItem | null =
      takeNextFromBucket(buckets, desiredAspect) ??
      takeFallbackImage(buckets, lastAspect);

    if (!nextImage) {
      break;
    }

    orderedImages.push(nextImage.image);
    lastAspect = nextImage.aspect;
    patternIndex += 1;
  }

  return orderedImages.length === images.length ? orderedImages : [...images];
}

function getGalleryTilePlacement(image: ImageAsset, index: number) {
  const presetIndex =
    (hashGalleryKey(image.id) + index * 7) % GALLERY_TILE_PLACEMENTS.length;

  return GALLERY_TILE_PLACEMENTS[presetIndex];
}

function getGalleryGridClassName(columnCount: number) {
  if (columnCount >= 4) {
    return "grid-cols-4 gap-x-5";
  }

  if (columnCount === 3) {
    return "grid-cols-3 gap-x-4";
  }

  return "grid-cols-2 gap-x-3";
}

function buildGalleryColumns(
  images: readonly ImageAsset[],
  columnCount: number,
): GalleryColumnItem[][] {
  const safeColumnCount = Math.max(2, Math.min(4, columnCount));
  const columns = Array.from(
    { length: safeColumnCount },
    (): GalleryColumnItem[] => [],
  );
  const columnHeights = Array.from({ length: safeColumnCount }, () => 0);

  images.forEach((image, imageIndex) => {
    const placement = getGalleryTilePlacement(image, imageIndex);
    const estimatedHeight =
      image.height / image.width +
      GALLERY_COLUMN_BASE_GAP +
      placement.heightBias;
    const orderedColumnIndexes = columnHeights
      .map((height, index) => ({ height, index }))
      .sort((left, right) => {
        const heightDelta = left.height - right.height;

        if (heightDelta !== 0) {
          return heightDelta;
        }

        return left.index - right.index;
      })
      .map(({ index }) => index);

    let targetColumnIndex = orderedColumnIndexes[0] ?? 0;
    const alternateColumnIndex = orderedColumnIndexes[1];

    if (alternateColumnIndex !== undefined) {
      const heightDelta =
        columnHeights[alternateColumnIndex] - columnHeights[targetColumnIndex];
      const seededChoice = hashGalleryKey(`${image.id}:${imageIndex}`) % 5;

      if (heightDelta < 0.28 && seededChoice === 0) {
        targetColumnIndex = alternateColumnIndex;
      }
    }

    columns[targetColumnIndex].push({ image, imageIndex });
    columnHeights[targetColumnIndex] += estimatedHeight;
  });

  return columns;
}

function useColumnCount() {
  const [columnCount, setColumnCount] = useState(4);

  useEffect(() => {
    const update = () => {
      const next =
        window.innerWidth >= 1280
          ? 4
          : window.innerWidth >= 768
            ? 3
            : 2;

      setColumnCount((current) => (current === next ? current : next));
    };

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  return columnCount;
}

function GalleryTile({
  image,
  priority = false,
  index,
  onOpen,
}: {
  image: ImageAsset;
  priority?: boolean;
  index: number;
  onOpen: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const simplifyMotion = useSimplifiedMotion();
  const disableAnimation = reduceMotion || simplifyMotion;
  const { ref, inView } = useInViewOnce<HTMLButtonElement>(!disableAnimation);
  const placement = getGalleryTilePlacement(image, index);
  const tileShellClassName = cn(
    "relative inline-block w-full break-inside-avoid overflow-visible transition-transform duration-700 ease-out",
    placement.shellClassName,
  );
  const cardClassName =
    "group relative block w-full overflow-visible rounded-[var(--radius-frame)] text-left transition-transform duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ink)]/35";
  const frameClassName =
    "relative overflow-hidden rounded-[var(--radius-frame)]";
  const imageClassName = "h-auto w-full object-cover transition duration-500 ease-out";
  const openLabel = `Open image: ${image.alt}`;

  if (disableAnimation) {
    return (
      <div className={tileShellClassName}>
        <button
          ref={ref}
          type="button"
          className={cardClassName}
          onClick={onOpen}
          aria-label={openLabel}
        >
          <div className={frameClassName}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes={GALLERY_IMAGE_SIZES}
              priority={priority}
              placeholder="blur"
              blurDataURL={image.blurDataURL}
              className={imageClassName}
            />
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className={tileShellClassName}>
      <motion.button
        ref={ref}
        type="button"
        className={cn("mobile-motion-static transform-gpu", cardClassName)}
        style={{ backfaceVisibility: "hidden" }}
        initial={{
          opacity: 0,
          y: 42,
          scale: 0.982,
        }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
        transition={{
          duration: 0.72,
          delay: Math.min(index * 0.016, 0.16),
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{ scale: 1.018 }}
        whileTap={{ scale: 0.996 }}
        onClick={onOpen}
        aria-label={openLabel}
      >
        <div className={frameClassName}>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes={GALLERY_IMAGE_SIZES}
            priority={priority}
            placeholder="blur"
            blurDataURL={image.blurDataURL}
            className={imageClassName}
          />
        </div>
      </motion.button>
    </div>
  );
}

function GalleryLoopSeparator() {
  return (
    <div
      aria-hidden="true"
      data-gallery-loop-separator="true"
      className="pointer-events-none px-1 py-2 sm:py-3 lg:py-4"
    >
      <div className="h-px w-full bg-[linear-gradient(90deg,transparent,rgba(140,123,103,0.12)_16%,rgba(140,123,103,0.34)_50%,rgba(140,123,103,0.12)_84%,transparent)] dark:bg-[linear-gradient(90deg,transparent,rgba(232,226,215,0.06)_16%,rgba(232,226,215,0.18)_50%,rgba(232,226,215,0.06)_84%,transparent)]" />
    </div>
  );
}

export function ImmersiveGalleryPage({ page }: { page: GalleryPageContent }) {
  const router = useRouter();
  const { openLightbox, state: lightboxState } = useLightbox();
  const orderedImages = useMemo(() => buildGallerySequence(page.images), [page.images]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const hasCenteredRef = useRef(false);
  const isAdjustingRef = useRef(false);
  const columnCount = useColumnCount();
  const galleryColumns = useMemo(
    () => buildGalleryColumns(orderedImages, columnCount),
    [columnCount, orderedImages],
  );

  useEffect(() => {
    hasCenteredRef.current = false;
  }, [orderedImages, columnCount]);

  useEffect(() => {
    const scroller = scrollRef.current;
    const content = contentRef.current;

    if (!scroller || !content) {
      return;
    }

    const centerScroller = () => {
      const cycleHeight = content.scrollHeight / GALLERY_CYCLES;

      if (!cycleHeight || !Number.isFinite(cycleHeight)) {
        return;
      }

      scroller.scrollTop = cycleHeight + 2;
      hasCenteredRef.current = true;
    };

    const frame = window.requestAnimationFrame(centerScroller);
    const timeout = window.setTimeout(centerScroller, 240);
    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            if (!hasCenteredRef.current) {
              centerScroller();
            }
          })
        : null;

    observer?.observe(content);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      observer?.disconnect();
    };
  }, [columnCount, orderedImages]);

  useEffect(() => {
    const scroller = scrollRef.current;
    const content = contentRef.current;

    if (!scroller || !content) {
      return;
    }

    let ticking = false;

    const onScroll = () => {
      if (ticking || isAdjustingRef.current) {
        return;
      }

      ticking = true;

      window.requestAnimationFrame(() => {
        const cycleHeight = content.scrollHeight / GALLERY_CYCLES;

        if (!cycleHeight || !Number.isFinite(cycleHeight)) {
          ticking = false;
          return;
        }

        const currentTop = scroller.scrollTop;
        const upperThreshold = cycleHeight * 0.5;
        const lowerThreshold = cycleHeight * 1.5;

        if (currentTop <= upperThreshold) {
          isAdjustingRef.current = true;
          scroller.scrollTop = currentTop + cycleHeight;
          window.requestAnimationFrame(() => {
            isAdjustingRef.current = false;
          });
        } else if (currentTop >= lowerThreshold) {
          isAdjustingRef.current = true;
          scroller.scrollTop = currentTop - cycleHeight;
          window.requestAnimationFrame(() => {
            isAdjustingRef.current = false;
          });
        }

        ticking = false;
      });
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });

    return () => scroller.removeEventListener("scroll", onScroll);
  }, [columnCount, orderedImages]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      if (lightboxState) {
        return;
      }

      if (typeof window !== "undefined" && document.referrer) {
        try {
          if (new URL(document.referrer).origin === window.location.origin) {
            router.back();
            return;
          }
        } catch {
          // Fall back to the homepage when the referrer is not a parseable URL.
        }
      }

      router.push("/");
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [lightboxState, router]);

  const handleBack = () => {
    if (typeof window !== "undefined" && document.referrer) {
      try {
        if (new URL(document.referrer).origin === window.location.origin) {
          router.back();
          return;
        }
      } catch {
        // Fall back to the homepage when the referrer is not a parseable URL.
      }
    }

    router.push("/");
  };

  return (
    <main className="relative h-[100dvh] overflow-hidden bg-[var(--color-bg)] text-[var(--color-ink)]">
      <h1 className="sr-only">{page.title}</h1>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.28),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(95,113,103,0.12),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0),rgba(0,0,0,0.04))] dark:bg-[radial-gradient(circle_at_top_left,rgba(160,184,170,0.12),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(177,149,110,0.08),transparent_22%),linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.18))]" />

      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[110rem] items-start justify-end gap-4">
          <FloatIn from="right">
            <div className="pointer-events-auto ml-auto flex items-center gap-2 rounded-[var(--radius-frame)] border border-[var(--color-line)] bg-[var(--surface-overlay)] p-2 shadow-[var(--shadow-floating)] backdrop-blur-xl">
              <Button
                type="button"
                variant="secondary"
                onClick={handleBack}
                className="min-h-11 rounded-[var(--radius-control)] px-3"
                icon={<ArrowLeft size={16} strokeWidth={1.8} />}
                aria-label="Go back"
              >
                <span className="hidden sm:inline">Back</span>
              </Button>
              <LinkButton
                href="/contact"
                className="min-h-11 rounded-[var(--radius-control)] px-4"
                icon={<Mail size={16} strokeWidth={1.8} />}
                hideAutoIcon
              >
                Contact
              </LinkButton>
              <ThemeToggle />
            </div>
          </FloatIn>
        </div>
      </div>

      <div
        ref={scrollRef}
        data-gallery-scroller="true"
        className="relative z-10 h-full overflow-y-auto overflow-x-hidden overscroll-none"
      >
        <div className="mx-auto max-w-[110rem] px-3 pb-4 pt-24 sm:px-4 md:px-6 md:pt-28 lg:px-8 xl:px-10">
          <div
            ref={contentRef}
            data-gallery-content="true"
            className="flex flex-col"
          >
            {Array.from({ length: GALLERY_CYCLES }).flatMap((_, cycleIndex) => [
              <section
                key={`cycle-${cycleIndex}`}
                className={cn(
                  "grid items-start",
                  getGalleryGridClassName(columnCount),
                )}
                aria-label={cycleIndex === 1 ? "Immersive wedding gallery" : undefined}
              >
                {galleryColumns.map((column, columnIndex) => (
                  <div key={`${cycleIndex}-${columnIndex}`} className="flex min-w-0 flex-col">
                    {column.map(({ image, imageIndex }) => (
                      <GalleryTile
                        key={`${cycleIndex}-${image.id}`}
                        image={image}
                        index={imageIndex}
                        priority={cycleIndex === 1 && imageIndex < 2}
                        onOpen={() => openLightbox(orderedImages, imageIndex)}
                      />
                    ))}
                  </div>
                ))}
              </section>,
              cycleIndex < GALLERY_CYCLES - 1 ? (
                <GalleryLoopSeparator key={`loop-separator-${cycleIndex}`} />
              ) : null,
            ])}
          </div>
        </div>
      </div>
    </main>
  );
}
