import { Camera } from "lucide-react";
import type { CTASection as CTASectionContent } from "@/types/content";
import { JournalCTAButton } from "@/components/journal/JournalCTAButton";

const fallbackSegueSection: CTASectionContent = {
  eyebrow: "Choosing the right photographer",
  title: "Start with the studio world behind the photographs.",
  body: "If atmosphere, pacing, film craft, and a strong sense of place matter to you, the best next step is to see the wider Dolcevilla Studio approach before you decide how you want the day to be photographed.",
  primaryCta: {
    label: "Discover Dolcevilla Studio",
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
    <aside className="journal-cta-highlight not-prose relative my-12 overflow-hidden rounded-[2rem] border border-[rgb(196_154_92_/_0.18)] bg-[linear-gradient(145deg,rgba(255,255,255,0.94),rgba(245,236,221,0.98))] p-6 shadow-[0_28px_72px_rgba(22,15,11,0.14)] md:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full bg-[rgb(214_180_126_/_0.2)] blur-3xl"
      />
      <div className="relative space-y-5">
        <div className="flex items-start gap-4 md:gap-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] border border-[rgb(196_154_92_/_0.2)] bg-[rgb(255_255_255_/_0.92)] text-[var(--color-ink)] shadow-[0_16px_34px_rgba(120,85,34,0.1)]">
            <Camera size={18} strokeWidth={1.9} aria-hidden="true" />
          </div>
          <div className="min-w-0 space-y-2">
            <p className="text-[0.7rem] font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
              {section.eyebrow ?? fallbackSegueSection.eyebrow}
            </p>
            <h2 className="font-display-face max-w-[18ch] text-[1.85rem] leading-[0.96] tracking-[-0.04em] text-[var(--color-ink)] md:text-[2.2rem]">
              {section.title}
            </h2>
          </div>
        </div>

        <div className="space-y-5">
          <p className="max-w-4xl text-[0.98rem] leading-8 text-[var(--color-mist)] md:text-[1.02rem]">
            {section.body}
          </p>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <JournalCTAButton
              href={section.primaryCta.href}
              tone="home"
              size="banner"
              className="w-full justify-between sm:w-auto sm:min-w-[18.5rem]"
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
                className="w-full whitespace-nowrap sm:w-auto"
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
