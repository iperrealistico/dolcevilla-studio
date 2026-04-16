"use client";

import type { ReactNode } from "react";
import { siteUi } from "@/content/site/ui";
import { useConsent } from "@/hooks/useConsent";
import { getUtilityIcon } from "@/lib/ui/iconography";

const PrivacyPanelIcon = getUtilityIcon("privacy");
const CookiePanelIcon = getUtilityIcon("cookies");

type OpenConsentManagerButtonProps = {
  label?: string;
  panel?: "choices" | "privacy";
  className?: string;
  icon?: ReactNode;
};

export function OpenConsentManagerButton({
  label = siteUi.footerSocket.cookieSettingsLabel,
  panel = "choices",
  className = "inline-flex items-center gap-2 hover:text-[var(--color-ink)]",
  icon,
}: OpenConsentManagerButtonProps) {
  const { openConsentManager, openPrivacyManager } = useConsent();
  const handleClick =
    panel === "privacy" ? openPrivacyManager : openConsentManager;
  const FallbackIcon = panel === "privacy" ? PrivacyPanelIcon : CookiePanelIcon;

  return (
    <button type="button" onClick={handleClick} className={className}>
      {icon ?? <FallbackIcon size={15} strokeWidth={1.8} aria-hidden="true" />}
      {label}
    </button>
  );
}
