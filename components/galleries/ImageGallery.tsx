import type { GalleryItem } from "@/types/gallery";
import { EditorialGrid } from "@/components/galleries/EditorialGrid";

type ImageGalleryProps = {
  items: GalleryItem[];
  variant?: "editorial" | "floating" | "story" | "compact-strip";
};

export function ImageGallery({ items }: ImageGalleryProps) {
  return <EditorialGrid items={items} />;
}
