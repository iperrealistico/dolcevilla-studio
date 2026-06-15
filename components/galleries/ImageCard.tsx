"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLightbox } from "@/contexts/LightboxContext";
import type { GalleryItem } from "@/types/gallery";
import { DEFAULT_IMAGE_SIZES } from "@/lib/images/imageConfig";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSimplifiedMotion } from "@/hooks/useSimplifiedMotion";

type ImageCardProps = {
  item: GalleryItem;
  gallery: GalleryItem[];
  index?: number;
};

export function ImageCard({ item, gallery, index = 0 }: ImageCardProps) {
  const { openLightbox } = useLightbox();
  const reduceMotion = useReducedMotion();
  const simplifyMotion = useSimplifiedMotion();
  const disableAnimation = reduceMotion || simplifyMotion;
  const { ref, inView } = useInViewOnce<HTMLButtonElement>(!disableAnimation);
  const initialX = index % 3 === 0 ? -28 : index % 3 === 2 ? 28 : 0;
  const initialY = 52;
  const buttonClassName =
    "group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-[var(--radius-frame)] border border-white/20 bg-[var(--color-shell)] text-left shadow-[0_28px_60px_rgba(26,20,15,0.14)]";

  if (disableAnimation) {
    return (
      <button
        type="button"
        className={buttonClassName}
        onClick={() => openLightbox(gallery.map((entry) => entry.image), index)}
      >
        <Image
          src={item.image.src}
          alt={item.image.alt}
          width={item.image.width}
          height={item.image.height}
          sizes={DEFAULT_IMAGE_SIZES}
          placeholder="blur"
          blurDataURL={item.image.blurDataURL}
          className="h-auto w-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
        />
        {item.caption ? (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 text-sm text-white">
            {item.caption}
          </div>
        ) : null}
      </button>
    );
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      className={`mobile-motion-static transform-gpu ${buttonClassName}`}
      style={{ backfaceVisibility: "hidden" }}
      initial={
        {
          opacity: 0,
          x: initialX,
          y: initialY,
          scale: 0.982,
        }
      }
      animate={inView ? { opacity: 1, x: 0, y: 0, scale: 1 } : undefined}
      transition={{
        duration: 0.72,
        delay: Math.min(index * 0.035, 0.18),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6, scale: 1.018 }}
      onClick={() => openLightbox(gallery.map((entry) => entry.image), index)}
    >
      <Image
        src={item.image.src}
        alt={item.image.alt}
        width={item.image.width}
        height={item.image.height}
        sizes={DEFAULT_IMAGE_SIZES}
        placeholder="blur"
        blurDataURL={item.image.blurDataURL}
        className="h-auto w-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
      />
      {item.caption ? (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 text-sm text-white">
          {item.caption}
        </div>
      ) : null}
    </motion.button>
  );
}
