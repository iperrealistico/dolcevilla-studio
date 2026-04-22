import { Camera } from "lucide-react";
import type { CTASection as CTASectionContent } from "@/types/content";
import { JournalCTAButton } from "@/components/journal/JournalCTAButton";

const fallbackSegueSection: CTASectionContent = {
  eyebrow: "Choosing the right photographer",
  title: "Start with the studio world behind the photographs.",
  body: "If atmosphere, pacing, film craft, and a strong sense of place matter to you, the best next step is to see the wider Dolcevilla Studio approach before you decide how you want the day to be photographed.",
  primaryCta: {
    label: "See the studio",
    href: "/",
    variant: "secondary",
  },
};

export function JournalPhotographerSegue({
  section = fallbackSegueSection,
}: {
  section?: CTASectionContent;
}) {
  return (
    <aside className="journal-cta-highlight not-prose relative my-12 overflow-hidden rounded-[2rem] border border-[rgb(196_154_92_/_0.16)] bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(246,239,229,0.98))] p-6 shadow-[0_26px_66px_rgba(22,15,11,0.12)] md:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full bg-[rgb(214_180_126_/_0.18)] blur-3xl"
      />
      <div className="relative grid gap-5 md:grid-cols-[auto_minmax(0,1fr)] md:gap-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] border border-[rgb(196_154_92_/_0.18)] bg-[rgb(255_255_255_/_0.94)] text-[var(--color-ink)] shadow-[0_14px_30px_rgba(120,85,34,0.08)]">
          <Camera size={18} strokeWidth={1.9} aria-hidden="true" />
        </div>

        <div className="min-w-0 space-y-5">
          <div className="space-y-2">
            <p className="text-[0.68rem] font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
              {section.eyebrow ?? fallbackSegueSection.eyebrow}
            </p>
            <h2 className="font-display-face max-w-[16ch] text-[1.9rem] leading-[0.95] tracking-[-0.042em] text-[var(--color-ink)] md:text-[2.35rem]">
              {section.title}
            </h2>
          </div>

          <p className="max-w-3xl text-[0.98rem] leading-8 text-[var(--color-mist)] md:text-[1.01rem]">
            {section.body}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <JournalCTAButton
              href={section.primaryCta.href}
              tone="home"
              size="banner"
              className="w-full justify-between sm:w-auto sm:min-w-[15.75rem]"
            >
              {section.primaryCta.label}
            </JournalCTAButton>

            {section.secondaryCta ? (
              <JournalCTAButton
                href={section.secondaryCta.href}
                tone={
                  section.secondaryCta.href === "/contact" ? "contact" : "home"
                }
                size="regular"
                className="w-full justify-between sm:w-auto"
              >
                {section.secondaryCta.label}
              </JournalCTAButton>
            ) : null}
          </div>
        </div>
      </div>
    </aside>
  );
}
