import type { GalleryItem } from "@/types/gallery";
import { ImageGallery } from "@/components/galleries/ImageGallery";

export function StoryGallery({ items }: { items: GalleryItem[] }) {
  return <ImageGallery items={items} variant="story" />;
}
