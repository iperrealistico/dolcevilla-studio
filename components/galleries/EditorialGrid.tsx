import type { GalleryItem } from "@/types/gallery";
import { ImageCard } from "@/components/galleries/ImageCard";

export function EditorialGrid({ items }: { items: GalleryItem[] }) {
  return (
    <div className="columns-1 gap-5 sm:columns-2 xl:columns-3">
      {items.map((item, index) => (
        <ImageCard key={item.image.id} item={item} gallery={items} index={index} />
      ))}
    </div>
  );
}
