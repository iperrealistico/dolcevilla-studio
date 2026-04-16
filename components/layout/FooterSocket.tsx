import Link from "next/link";
import { OpenConsentManagerButton } from "@/components/consent/OpenConsentManagerButton";
import { siteSettings } from "@/content/site/settings";
import { siteUi } from "@/content/site/ui";
import { Container } from "@/components/ui/Container";
import { getUtilityIcon } from "@/lib/ui/iconography";

const PrivacyUtilityIcon = getUtilityIcon("privacy");
const CookieUtilityIcon = getUtilityIcon("cookies");
const LegalUtilityIcon = getUtilityIcon("legal");

export function FooterSocket() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t border-[var(--color-line)] bg-[var(--color-shell)]">
      <Container className="flex flex-col gap-4 py-5 text-xs tracking-[0.04em] text-[var(--color-mist)] sm:flex-row sm:items-center sm:justify-between">
        <p>
          {siteUi.footerSocket.copyrightLabel} {currentYear}{" "}
          {siteSettings.siteName}
        </p>
        <nav
          aria-label={siteUi.footerSocket.ariaLabel}
          className="flex flex-wrap items-center gap-x-5 gap-y-3"
        >
          <OpenConsentManagerButton
            label={siteUi.footerSocket.privacyLabel}
            panel="privacy"
            className="inline-flex items-center gap-2 hover:text-[var(--color-ink)]"
            icon={
              <PrivacyUtilityIcon
                size={14}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            }
          />
          <Link
            href="/legal"
            className="inline-flex items-center gap-2 hover:text-[var(--color-ink)]"
          >
            <LegalUtilityIcon size={14} strokeWidth={1.8} aria-hidden="true" />
            {siteUi.footerSocket.legalLabel}
          </Link>
          <OpenConsentManagerButton
            label={siteUi.footerSocket.cookieSettingsLabel}
            className="inline-flex items-center gap-2 hover:text-[var(--color-ink)]"
            icon={
              <CookieUtilityIcon
                size={14}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            }
          />
        </nav>
      </Container>
    </div>
  );
}
