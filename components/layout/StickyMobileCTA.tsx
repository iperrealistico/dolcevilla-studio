"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LinkButton } from "@/components/ui/LinkButton";
import { StickyBottomBar } from "@/components/mobile/StickyBottomBar";
import { useConsent } from "@/hooks/useConsent";
import { useMobileUI } from "@/contexts/MobileUIContext";

type StickyMobileCTAProps = {
  label: string;
  href: string;
};

export function StickyMobileCTA({ label, href }: StickyMobileCTAProps) {
  const pathname = usePathname();
  const { isMenuOpen } = useMobileUI();
  const { consent } = useConsent();
  const [isHeroCtaVisible, setIsHeroCtaVisible] = useState(false);
  const [isHeroSectionVisible, setIsHeroSectionVisible] = useState(false);
  const isJournalEntryRoute =
    pathname?.startsWith("/journal/") && pathname !== "/journal";

  useEffect(() => {
    const updateVisibility = () => {
      const target = document.querySelector<HTMLElement>(
        "[data-hero-cta-region='true']",
      );
      const heroSection = document.querySelector<HTMLElement>(
        "[data-hero-section='true']",
      );

      if (!target) {
        setIsHeroCtaVisible(false);
      } else {
        const rect = target.getBoundingClientRect();
        const isVisible =
          rect.bottom >= 0 && rect.top <= window.innerHeight + 88;
        setIsHeroCtaVisible(isVisible);
      }

      if (!heroSection) {
        setIsHeroSectionVisible(false);
        return;
      }

      const heroRect = heroSection.getBoundingClientRect();
      const isVisible =
        heroRect.bottom >= window.innerHeight * 0.3 &&
        heroRect.top <= window.innerHeight * 0.92;
      setIsHeroSectionVisible(isVisible);
    };

    updateVisibility();

    const mutationObserver = new MutationObserver(() => {
      updateVisibility();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      mutationObserver.disconnect();
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  if (
    isJournalEntryRoute ||
    isMenuOpen ||
    !consent.hasInteracted ||
    isHeroCtaVisible ||
    isHeroSectionVisible
  ) {
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
