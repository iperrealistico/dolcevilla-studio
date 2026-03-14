"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
      <Image
        key={activeImage.id}
        src={activeImage.src}
        alt={activeImage.alt}
        width={activeImage.width}
        height={activeImage.height}
        priority
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,12,10,0.12),rgba(14,12,10,0.56))]" />
    </div>
  );
}
