"use client";

import { useConsent } from "@/hooks/useConsent";

export function OpenConsentManagerButton() {
  const { openConsentManager } = useConsent();

  return (
    <button
      type="button"
      onClick={openConsentManager}
      className="hover:text-[var(--color-ink)]"
    >
      Cookie settings
    </button>
  );
}
