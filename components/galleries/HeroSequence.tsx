"use client";

import { startTransition, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { cn } from "../../lib/utils/cn";
import type { ImageAsset } from "../../types/gallery";

const DEFAULT_HERO_SLIDE_INTERVAL_MS = 5600;

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
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const slideIntervalSeconds = slideIntervalMs / 1000;
  const opacityDurationSeconds = Math.min(
    1.8,
    Math.max(0.8, slideIntervalSeconds * 0.32),
  );
  const scaleDurationSeconds = slideIntervalSeconds + 1.2;

  useEffect(() => {
    if (reduceMotion || images.length < 2) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      startTransition(() => {
        setIndex((current) => (current + 1) % images.length);
      });
    }, slideIntervalMs);

    return () => window.clearInterval(interval);
  }, [images.length, reduceMotion, slideIntervalMs]);

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
                    opacity: {
                      duration: opacityDurationSeconds,
                      ease: [0.22, 1, 0.36, 1],
                    },
                    scale: { duration: scaleDurationSeconds, ease: "linear" },
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
