"use client";

import Image from "next/image";
import { useLightbox } from "@/contexts/LightboxContext";
import type { GalleryItem } from "@/types/gallery";
import { DEFAULT_IMAGE_SIZES } from "@/lib/images/imageConfig";
import { cn } from "@/lib/utils/cn";

type ImageCardProps = {
  item: GalleryItem;
  gallery: GalleryItem[];
};

export function ImageCard({ item, gallery }: ImageCardProps) {
  const { openLightbox } = useLightbox();

  return (
    <button
      type="button"
      className={cn(
        "group relative overflow-hidden rounded-[1.75rem] border border-white/20 bg-[var(--color-shell)] text-left shadow-[var(--shadow-soft)]",
        item.span === "lg" ? "md:col-span-2" : "",
      )}
      onClick={() => openLightbox(gallery.map((entry) => entry.image), gallery.findIndex((entry) => entry.image.id === item.image.id))}
    >
      <Image
        src={item.image.src}
        alt={item.image.alt}
        width={item.image.width}
        height={item.image.height}
        sizes={DEFAULT_IMAGE_SIZES}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
      />
      {item.caption ? (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 text-sm text-white">
          {item.caption}
        </div>
      ) : null}
    </button>
  );
}
