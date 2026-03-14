import type { GalleryItem } from "@/types/gallery";
import { EditorialGrid } from "@/components/galleries/EditorialGrid";
import { ImageCard } from "@/components/galleries/ImageCard";
import { ScrollSnapCarousel } from "@/components/mobile/ScrollSnapCarousel";

type ImageGalleryProps = {
  items: GalleryItem[];
  variant?: "editorial" | "floating" | "story" | "compact-strip";
};

export function ImageGallery({ items }: ImageGalleryProps) {
  return (
    <div className="space-y-4">
      <EditorialGrid items={items} />
      <ScrollSnapCarousel>
        {items.map((item) => (
          <div key={item.image.id} className="scroll-snap-item min-w-[78%]">
            <ImageCard item={item} gallery={items} />
          </div>
        ))}
      </ScrollSnapCarousel>
    </div>
  );
}
