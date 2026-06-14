import { ImmersiveGalleryPage } from "@/components/gallery/ImmersiveGalleryPage";
import { galleryPage } from "@/content/pages/gallery";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata(galleryPage.seo);

export default function GalleryPageRoute() {
  return <ImmersiveGalleryPage page={galleryPage} />;
}
