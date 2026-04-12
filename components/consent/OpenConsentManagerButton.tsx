"use client";

import { useConsent } from "@/hooks/useConsent";

type OpenConsentManagerButtonProps = {
  label?: string;
  panel?: "choices" | "privacy";
  className?: string;
};

export function OpenConsentManagerButton({
  label = "Cookie settings",
  panel = "choices",
  className = "hover:text-[var(--color-ink)]",
}: OpenConsentManagerButtonProps) {
  const { openConsentManager, openPrivacyManager } = useConsent();
  const handleClick = panel === "privacy" ? openPrivacyManager : openConsentManager;

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
    >
      {label}
    </button>
  );
}
