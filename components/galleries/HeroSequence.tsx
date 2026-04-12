"use client";

import { startTransition, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ImageAsset } from "@/types/gallery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HERO_SLIDE_INTERVAL_MS = 5600;

export function HeroSequence({ images }: { images: ImageAsset[] }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || images.length < 2) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      startTransition(() => {
        setIndex((current) => (current + 1) % images.length);
      });
    }, HERO_SLIDE_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [images.length, reduceMotion]);

  if (!images.length) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden rounded-[2rem] bg-[color:var(--surface-canvas)]">
      {images.map((image, imageIndex) => {
        const isActive = imageIndex === index;

        return (
          <motion.div
            key={image.id}
            className="absolute inset-0 will-change-transform will-change-opacity"
            initial={false}
            animate={
              reduceMotion
                ? { opacity: isActive ? 1 : 0 }
                : {
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1.035 : 1,
                  }
            }
            transition={
              reduceMotion
                ? { duration: 0.2 }
                : {
                    opacity: { duration: 1.8, ease: [0.22, 1, 0.36, 1] },
                    scale: { duration: 6.8, ease: "linear" },
                  }
            }
            style={{ zIndex: isActive ? 2 : 1 }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              priority={imageIndex === 0}
              loading="eager"
              sizes="100vw"
              placeholder="blur"
              blurDataURL={image.blurDataURL}
              className="h-full w-full object-cover"
            />
          </motion.div>
        );
      })}
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,12,10,0.12),rgba(14,12,10,0.56))]"
        animate={reduceMotion ? undefined : { opacity: [0.9, 1, 0.94], scale: [1, 1.015, 1] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </div>
  );
}
