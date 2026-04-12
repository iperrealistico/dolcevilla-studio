"use client";

import { LinkButton } from "@/components/ui/LinkButton";
import { StickyBottomBar } from "@/components/mobile/StickyBottomBar";
import { useConsent } from "@/hooks/useConsent";
import { useMobileUI } from "@/contexts/MobileUIContext";

type StickyMobileCTAProps = {
  label: string;
  href: string;
};

export function StickyMobileCTA({ label, href }: StickyMobileCTAProps) {
  const { isMenuOpen } = useMobileUI();
  const { consent } = useConsent();

  if (isMenuOpen || !consent.hasInteracted) {
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
