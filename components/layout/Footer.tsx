import Link from "next/link";
import { Mail, MapPinned, NotebookText } from "lucide-react";
import { OpenConsentManagerButton } from "@/components/consent/OpenConsentManagerButton";
import { footerContent } from "@/content/site/footer";
import { siteSettings } from "@/content/site/settings";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getNavigationIcon, getUtilityIcon } from "@/lib/ui/iconography";

const PrivacyUtilityIcon = getUtilityIcon("privacy");
const CookieUtilityIcon = getUtilityIcon("cookies");
const LegalUtilityIcon = getUtilityIcon("legal");
const InstagramNavigationIcon = getNavigationIcon(siteSettings.instagramUrl);

export function Footer() {
  return (
    <Section className="border-t border-[var(--color-line)] bg-[var(--color-shell)] py-14">
      <Container className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <p className="font-display-face text-3xl tracking-[-0.04em]">
            Dolcevilla Studio
          </p>
          <p className="max-w-xl text-sm leading-7 text-[var(--color-mist)]">
            {footerContent.statement}
          </p>
        </div>
        <div className="space-y-4">
          <p className="text-xs font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
            <span className="inline-flex items-center gap-2">
              <NotebookText size={13} strokeWidth={1.8} aria-hidden="true" />
              <span>Navigate</span>
            </span>
          </p>
          <div className="space-y-2 text-sm text-[var(--color-mist)]">
            {footerContent.navigationItems.map((item) => {
              const Icon = getNavigationIcon(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-2 hover:text-[var(--color-ink)]"
                >
                  <Icon size={15} strokeWidth={1.8} aria-hidden="true" className="opacity-75" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-xs font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
            <span className="inline-flex items-center gap-2">
              <MapPinned size={13} strokeWidth={1.8} aria-hidden="true" />
              <span>Locations</span>
            </span>
          </p>
          <div className="space-y-2 text-sm text-[var(--color-mist)]">
            {footerContent.locationItems.map((item) => {
              const Icon = getNavigationIcon(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-2 hover:text-[var(--color-ink)]"
                >
                  <Icon size={15} strokeWidth={1.8} aria-hidden="true" className="opacity-75" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <Link
              href={`mailto:${siteSettings.contactEmail}`}
              className="flex items-center gap-2 hover:text-[var(--color-ink)]"
            >
              <Mail size={16} strokeWidth={1.8} aria-hidden="true" />
              {siteSettings.contactEmail}
            </Link>
            <Link
              href={siteSettings.instagramUrl}
              className="flex items-center gap-2 hover:text-[var(--color-ink)]"
            >
              <InstagramNavigationIcon size={16} strokeWidth={1.8} aria-hidden="true" />
              Instagram
            </Link>
            <div className="flex flex-wrap gap-4 pt-2">
              <OpenConsentManagerButton
                label="Privacy"
                panel="privacy"
                className="inline-flex items-center gap-2 hover:text-[var(--color-ink)]"
                icon={<PrivacyUtilityIcon size={15} strokeWidth={1.8} aria-hidden="true" />}
              />
              <Link href="/legal" className="inline-flex items-center gap-2 hover:text-[var(--color-ink)]">
                <LegalUtilityIcon size={15} strokeWidth={1.8} aria-hidden="true" />
                Legal
              </Link>
              <OpenConsentManagerButton
                className="inline-flex items-center gap-2 hover:text-[var(--color-ink)]"
                icon={<CookieUtilityIcon size={15} strokeWidth={1.8} aria-hidden="true" />}
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
