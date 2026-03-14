import type { GalleryItem } from "@/types/gallery";
import { SignatureGallery } from "@/components/blocks/SignatureGallery";

export function FloatingGallery({ items }: { items: GalleryItem[] }) {
  return <SignatureGallery items={items} />;
}
