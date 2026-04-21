import { ArrowUpRight, House, Sparkles } from "lucide-react";
import { LinkButton } from "@/components/ui/LinkButton";

export function JournalPhotographerSegue() {
  return (
    <aside className="not-prose relative my-12 overflow-hidden rounded-[2rem] border border-[rgb(92_77_58_/_0.12)] bg-[linear-gradient(150deg,rgba(255,255,255,0.92),rgba(247,240,233,0.98))] p-6 shadow-[0_30px_80px_rgba(26,20,15,0.12)] md:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-18 -right-16 h-40 w-40 rounded-full bg-[rgb(212_195_166_/_0.26)] blur-3xl"
      />
      <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div className="space-y-4">
          <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
            <Sparkles size={14} strokeWidth={1.85} aria-hidden="true" />
            <span>Choosing the right photographer</span>
          </p>
          <div className="space-y-3">
            <h2 className="font-display-face text-[2rem] leading-[0.94] tracking-[-0.04em] text-[var(--color-ink)] md:text-[2.7rem]">
              Start with the studio world behind the photographs.
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-[var(--color-mist)] md:text-base">
            If atmosphere, pacing, film craft, and a strong sense of place matter
            to you, the best next step is to see the wider Dolcevilla Studio
            approach before you decide how you want the day to be photographed.
            </p>
          </div>
        </div>
        <div className="pt-1 md:pt-0">
          <LinkButton
            href="/"
            variant="secondary"
            className="no-underline shadow-[0_16px_38px_rgba(22,15,11,0.08)]"
            icon={<House size={16} strokeWidth={1.8} aria-hidden="true" />}
            hideAutoIcon
          >
            Discover Dolcevilla Studio
          </LinkButton>
          <p className="mt-3 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] text-[var(--color-mist)] uppercase">
            <ArrowUpRight size={13} strokeWidth={1.85} aria-hidden="true" />
            <span>Quietly continue the conversation from there</span>
          </p>
        </div>
      </div>
    </aside>
  );
}
