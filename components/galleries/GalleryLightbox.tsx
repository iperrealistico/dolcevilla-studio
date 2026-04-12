"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLightbox } from "@/contexts/LightboxContext";

export function GalleryLightbox() {
  const { state, closeLightbox, goToNext, goToPrevious } = useLightbox();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!state) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
        return;
      }

      if (state.images.length < 2) {
        return;
      }

      if (event.key === "ArrowRight") {
        goToNext();
      }

      if (event.key === "ArrowLeft") {
        goToPrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeLightbox, goToNext, goToPrevious, state]);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {state ? (() => {
        const currentImage = state.images[state.index];

        if (!currentImage) {
          return null;
        }

        const hasMultipleImages = state.images.length > 1;

        return (
          <motion.div
            key="gallery-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Gallery lightbox"
            data-lightbox="true"
            className="fixed inset-0 z-[130] flex items-center justify-center bg-[rgb(10_8_7_/_0.88)] p-4 sm:p-6"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            onClick={closeLightbox}
          >
            <button
              type="button"
              aria-label="Close gallery lightbox"
              className="absolute right-4 top-4 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/16 bg-white/10 text-white transition hover:bg-white/16 sm:right-6 sm:top-6"
              onClick={(event) => {
                event.stopPropagation();
                closeLightbox();
              }}
            >
              <X size={18} />
            </button>

            {hasMultipleImages ? (
              <button
                type="button"
                aria-label="Show previous image"
                className="absolute left-4 top-1/2 hidden min-h-12 min-w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/16 bg-white/10 text-white transition hover:bg-white/16 md:inline-flex"
                onClick={(event) => {
                  event.stopPropagation();
                  goToPrevious();
                }}
              >
                <ChevronLeft size={20} />
              </button>
            ) : null}

            <motion.figure
              key={currentImage.id}
              className="relative flex max-h-[min(90vh,960px)] w-full max-w-[min(92vw,1440px)] items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-[rgb(18_15_12_/_0.66)] p-3 shadow-[0_40px_120px_rgba(0,0,0,0.38)] sm:p-5"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.985 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative flex max-h-[calc(90vh-2.5rem)] w-full items-center justify-center overflow-hidden rounded-[1.5rem] bg-[rgb(31_25_21_/_0.42)]">
                <Image
                  key={currentImage.id}
                  src={currentImage.src}
                  alt={currentImage.alt}
                  width={currentImage.width}
                  height={currentImage.height}
                  sizes="(min-width: 1280px) 1200px, 92vw"
                  placeholder="blur"
                  blurDataURL={currentImage.blurDataURL}
                  priority
                  className="max-h-[calc(90vh-2.5rem)] h-auto w-auto max-w-full object-contain"
                />
              </div>

              <figcaption className="pointer-events-none absolute inset-x-5 bottom-4 flex items-end justify-between gap-4 text-[0.72rem] uppercase tracking-[0.26em] text-white/72 sm:inset-x-7 sm:bottom-5">
                <span className="max-w-[75%] text-balance">{currentImage.alt}</span>
                <span>
                  {state.index + 1} / {state.images.length}
                </span>
              </figcaption>
            </motion.figure>

            {hasMultipleImages ? (
              <button
                type="button"
                aria-label="Show next image"
                className="absolute right-4 top-1/2 hidden min-h-12 min-w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/16 bg-white/10 text-white transition hover:bg-white/16 md:inline-flex"
                onClick={(event) => {
                  event.stopPropagation();
                  goToNext();
                }}
              >
                <ChevronRight size={20} />
              </button>
            ) : null}
          </motion.div>
        );
      })() : null}
    </AnimatePresence>,
    document.body,
  );
}
