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
              className="flex w-auto max-w-[min(94vw,1600px)] flex-col gap-4 rounded-[2rem] border border-white/10 bg-[rgb(18_15_12_/_0.72)] p-3 shadow-[0_40px_120px_rgba(0,0,0,0.38)] sm:p-5"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.985 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative flex items-center justify-center overflow-hidden rounded-[1.5rem] bg-[rgb(31_25_21_/_0.42)] px-2 py-2 sm:px-3 sm:py-3">
                <Image
                  key={currentImage.id}
                  src={currentImage.src}
                  alt={currentImage.alt}
                  width={currentImage.width}
                  height={currentImage.height}
                  sizes="(min-width: 1280px) 1280px, 94vw"
                  placeholder="blur"
                  blurDataURL={currentImage.blurDataURL}
                  priority
                  className="h-auto w-auto max-h-[74vh] max-w-[min(90vw,1400px)] object-contain"
                />
              </div>

              <figcaption className="flex items-start justify-between gap-4 px-2 pb-1 text-[0.72rem] uppercase tracking-[0.24em] text-white/72">
                <span className="max-w-[75%] text-balance leading-6">{currentImage.alt}</span>
                <span className="whitespace-nowrap">
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
