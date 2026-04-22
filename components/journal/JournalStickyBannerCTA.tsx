"use client";

import type { CTASection as CTASectionContent } from "@/types/content";
import { useConsent } from "@/hooks/useConsent";
import { JournalCTAButton } from "@/components/journal/JournalCTAButton";

export function JournalStickyBannerCTA({
  section,
}: {
  section: CTASectionContent;
}) {
  const { isConsentDialogOpen } = useConsent();

  if (isConsentDialogOpen) {
    return null;
  }

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-3 pt-2 xl:hidden">
        <div className="safe-bottom pointer-events-auto rounded-t-[1.7rem] border border-[rgb(92_77_58_/_0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,237,226,0.96))] px-4 py-3 shadow-[0_-18px_48px_rgba(25,19,14,0.12)] backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              {section.eyebrow ? (
                <p className="text-[0.6rem] font-semibold tracking-[0.22em] text-[var(--color-mist)] uppercase">
                  {section.eyebrow}
                </p>
              ) : null}
              <p className="pt-1 text-sm leading-5 font-semibold text-[var(--color-ink)]">
                {section.title}
              </p>
            </div>
            <JournalCTAButton
              href={section.primaryCta.href}
              tone="contact"
              size="compact"
              className="max-w-[11.25rem] shrink-0"
            >
              {section.primaryCta.label}
            </JournalCTAButton>
          </div>
        </div>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 hidden justify-center px-6 xl:flex">
        <div className="journal-cta-highlight pointer-events-auto relative flex w-full max-w-4xl items-center gap-6 overflow-hidden rounded-[999px] border border-[rgb(196_154_92_/_0.2)] bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(244,233,214,0.96))] px-6 py-4 shadow-[0_26px_70px_rgba(25,19,14,0.16)] backdrop-blur-md">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -bottom-12 h-32 w-32 rounded-full bg-[rgb(214_180_126_/_0.18)] blur-3xl"
          />
          <div className="relative min-w-0 flex-1">
            {section.eyebrow ? (
              <p className="text-[0.62rem] font-semibold tracking-[0.26em] text-[var(--color-mist)] uppercase">
                {section.eyebrow}
              </p>
            ) : null}
            <p className="font-display-face pt-1 text-[1.55rem] leading-[0.95] tracking-[-0.035em] text-[var(--color-ink)]">
              {section.title}
            </p>
            <p className="max-w-2xl pt-2 text-sm leading-6 text-[var(--color-mist)]">
              {section.body}
            </p>
          </div>
          <JournalCTAButton
            href={section.primaryCta.href}
            tone="contact"
            size="banner"
            className="max-w-[17rem] shrink-0"
          >
            {section.primaryCta.label}
          </JournalCTAButton>
        </div>
      </div>
    </>
  );
}
