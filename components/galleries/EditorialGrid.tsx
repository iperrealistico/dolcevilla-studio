import type { GalleryItem } from "@/types/gallery";
import { ImageCard } from "@/components/galleries/ImageCard";

export function EditorialGrid({ items }: { items: GalleryItem[] }) {
  return (
    <div className="hidden grid-cols-3 gap-5 md:grid">
      {items.map((item) => (
        <ImageCard key={item.image.id} item={item} gallery={items} />
      ))}
    </div>
  );
}
