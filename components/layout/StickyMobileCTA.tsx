"use client";

import { LinkButton } from "@/components/ui/LinkButton";
import { StickyBottomBar } from "@/components/mobile/StickyBottomBar";
import { useMobileUI } from "@/contexts/MobileUIContext";

type StickyMobileCTAProps = {
  label: string;
  href: string;
};

export function StickyMobileCTA({ label, href }: StickyMobileCTAProps) {
  const { isMenuOpen } = useMobileUI();

  if (isMenuOpen) {
    return null;
  }

  return (
    <StickyBottomBar>
      <LinkButton href={href} className="w-full" variant="primary">
        {label}
      </LinkButton>
    </StickyBottomBar>
  );
}
