"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Images, Mail } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { FloatIn } from "@/components/motion/FloatIn";
import { Button } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/LinkButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSimplifiedMotion } from "@/hooks/useSimplifiedMotion";
import type { GalleryPageContent } from "@/content/pages/gallery";
import type { ImageAsset } from "@/types/gallery";
import { cn } from "@/lib/utils/cn";

const GALLERY_CYCLES = 3;
const GALLERY_IMAGE_SIZES =
  "(min-width: 1600px) 21vw, (min-width: 1280px) 24vw, (min-width: 768px) 33vw, 50vw";

function distributeIntoColumns(images: ImageAsset[], columnCount: number) {
  const columns = Array.from({ length: columnCount }, () => [] as ImageAsset[]);

  images.forEach((image, index) => {
    columns[index % columnCount]?.push(image);
  });

  return columns;
}

function useColumnCount() {
  const columnCountRef = useRef(4);
  const [, forceRender] = useState(0);

  useEffect(() => {
    const update = () => {
      const next =
        window.innerWidth >= 1280
          ? 4
          : window.innerWidth >= 768
            ? 3
            : 2;

      if (next !== columnCountRef.current) {
        columnCountRef.current = next;
        forceRender((value) => value + 1);
      }
    };

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  return columnCountRef.current;
}

function GalleryTile({
  image,
  priority = false,
  index,
}: {
  image: ImageAsset;
  priority?: boolean;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const simplifyMotion = useSimplifiedMotion();
  const cardClassName =
    "group relative overflow-hidden rounded-[calc(var(--radius-frame)+0.08rem)] border border-[var(--color-line)] bg-[var(--surface-panel)] p-2 shadow-[var(--shadow-card)] backdrop-blur-sm";
  const frameClassName =
    "relative overflow-hidden rounded-[var(--radius-frame)] bg-[var(--surface-panel-soft)]";
  const imageClassName =
    "h-auto w-full object-cover transition duration-700 ease-out group-hover:scale-[1.02]";

  if (reduceMotion || simplifyMotion) {
    return (
      <article className={cardClassName}>
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
      </article>
    );
  }

  return (
    <motion.article
      className={cn("mobile-motion-static", cardClassName)}
      style={{
        willChange: "transform, opacity, filter",
        backfaceVisibility: "hidden",
        contain: "layout paint style",
      }}
      initial={{
        opacity: 0,
        y: 42,
        scale: 0.97,
        filter: "blur(14px)",
      }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.86,
        delay: Math.min(index * 0.02, 0.24),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4, scale: 1.01 }}
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
    </motion.article>
  );
}

export function ImmersiveGalleryPage({ page }: { page: GalleryPageContent }) {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const hasCenteredRef = useRef(false);
  const isAdjustingRef = useRef(false);
  const columnCount = useColumnCount();
  const columns = useMemo(
    () => distributeIntoColumns(page.images, columnCount),
    [columnCount, page.images],
  );

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
  }, [columnCount]);

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
  }, [columnCount]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
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
  }, [router]);

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
        <div className="mx-auto flex max-w-[110rem] items-start justify-between gap-4">
          <FloatIn from="left" className="hidden sm:block">
            <div className="pointer-events-auto max-w-sm rounded-[var(--radius-frame)] border border-[var(--color-line)] bg-[var(--surface-overlay)] px-5 py-4 shadow-[var(--shadow-floating)] backdrop-blur-xl">
              <div className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
                <Images size={14} strokeWidth={1.8} />
                <span>{page.eyebrow}</span>
              </div>
              <h1 className="mt-3 font-display-face text-3xl leading-[0.94] tracking-[-0.05em] text-[var(--color-ink)]">
                {page.title}
              </h1>
              <p className="mt-3 max-w-[30ch] text-sm leading-6 text-[var(--color-mist)]">
                {page.subtitle}
              </p>
            </div>
          </FloatIn>

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
            className="flex flex-col gap-3 md:gap-4 lg:gap-5"
          >
            {Array.from({ length: GALLERY_CYCLES }).map((_, cycleIndex) => (
              <section
                key={cycleIndex}
                className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4 lg:gap-5"
                aria-label={cycleIndex === 1 ? "Immersive wedding gallery" : undefined}
              >
                {columns.map((column, columnIndex) => (
                  <div
                    key={`${cycleIndex}-${columnIndex}`}
                    className="flex flex-col gap-3 md:gap-4 lg:gap-5"
                  >
                    {column.map((image, imageIndex) => {
                      const positionIndex =
                        cycleIndex * page.images.length +
                        columnIndex * column.length +
                        imageIndex;

                      return (
                        <GalleryTile
                          key={`${cycleIndex}-${image.id}`}
                          image={image}
                          index={positionIndex}
                          priority={cycleIndex === 1 && imageIndex < 2}
                        />
                      );
                    })}
                  </div>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
