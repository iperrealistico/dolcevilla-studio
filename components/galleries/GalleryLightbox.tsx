"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useLightbox } from "@/contexts/LightboxContext";

export function GalleryLightbox() {
  const { state, closeLightbox } = useLightbox();

  return (
    <AnimatePresence>
      {state ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/86 p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close gallery lightbox"
            className="absolute right-5 top-5 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/10 text-white"
            onClick={closeLightbox}
          >
            <X size={18} />
          </button>
          <div className="max-h-[90vh] max-w-5xl overflow-hidden rounded-[1.5rem]">
            <Image
              src={state.images[state.index].src}
              alt={state.images[state.index].alt}
              width={state.images[state.index].width}
              height={state.images[state.index].height}
              className="max-h-[90vh] w-auto object-contain"
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
