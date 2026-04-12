"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { ImageAsset } from "@/types/gallery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function HeroSequence({ images }: { images: ImageAsset[] }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || images.length < 2) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, [images.length, reduceMotion]);

  const activeImage = images[index] ?? images[0];

  return (
    <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeImage.id}
          className="absolute inset-0"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.08, rotate: -0.4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.985 }}
          transition={{ duration: reduceMotion ? 0.2 : 1.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            width={activeImage.width}
            height={activeImage.height}
            priority
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,12,10,0.12),rgba(14,12,10,0.56))]"
        animate={reduceMotion ? undefined : { opacity: [0.9, 1, 0.94], scale: [1, 1.015, 1] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </div>
  );
}
