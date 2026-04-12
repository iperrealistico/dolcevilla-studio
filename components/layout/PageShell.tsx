import type { ReactNode } from "react";
import { BottomSheetMenu } from "@/components/mobile/BottomSheetMenu";
import { GalleryLightbox } from "@/components/galleries/GalleryLightbox";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";

type PageShellProps = {
  children: ReactNode;
  stickyCta?: {
    label: string;
    href: string;
  };
  simplifiedHeader?: boolean;
};

export function PageShell({ children, stickyCta, simplifiedHeader = false }: PageShellProps) {
  return (
    <>
      <SkipLink />
      <Header simplified={simplifiedHeader} />
      <BottomSheetMenu />
      <main id="main-content" className="overflow-x-clip">
        {children}
      </main>
      <Footer />
      <GalleryLightbox />
      {stickyCta ? <StickyMobileCTA label={stickyCta.label} href={stickyCta.href} /> : null}
    </>
  );
}
