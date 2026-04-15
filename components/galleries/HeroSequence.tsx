"use client";

import { startTransition, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { cn } from "../../lib/utils/cn";
import type { ImageAsset } from "../../types/gallery";

const HERO_SLIDE_INTERVAL_MS = 5600;

type HeroSequenceProps = {
  images: ImageAsset[];
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
};

export function HeroSequence({
  images,
  className,
  imageClassName,
  overlayClassName,
}: HeroSequenceProps) {
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
    <div
      className={cn(
        "absolute inset-0 overflow-hidden rounded-[2rem] bg-[var(--color-shell)]",
        className,
      )}
    >
      {images.map((image, imageIndex) => {
        const isActive = imageIndex === index;

        return (
          <motion.div
            key={image.id}
            className="will-change-opacity absolute inset-0 will-change-transform"
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
              className={cn("h-full w-full object-cover", imageClassName)}
            />
          </motion.div>
        );
      })}
      <motion.div
        className={cn(
          "absolute inset-0 bg-[linear-gradient(180deg,rgba(14,12,10,0.12),rgba(14,12,10,0.56))]",
          overlayClassName,
        )}
        animate={
          reduceMotion
            ? undefined
            : { opacity: [0.9, 1, 0.94], scale: [1, 1.015, 1] }
        }
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
