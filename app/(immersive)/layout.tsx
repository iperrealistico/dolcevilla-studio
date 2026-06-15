import type { ReactNode } from "react";
import { GalleryLightbox } from "@/components/galleries/GalleryLightbox";

export default function ImmersiveLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <GalleryLightbox />
    </>
  );
}
