import { Camera, House } from "lucide-react";
import { LinkButton } from "@/components/ui/LinkButton";

export function JournalPhotographerSegue() {
  return (
    <aside className="not-prose relative my-12 overflow-hidden rounded-[2rem] border border-[rgb(92_77_58_/_0.12)] bg-[linear-gradient(150deg,rgba(255,255,255,0.9),rgba(247,241,235,0.96))] p-6 shadow-[0_24px_64px_rgba(22,15,11,0.11)] md:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full bg-[rgb(212_195_166_/_0.28)] blur-3xl"
      />
      <div className="relative space-y-5">
        <div className="flex items-start gap-4 md:gap-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] border border-[rgb(92_77_58_/_0.12)] bg-white/80 text-[var(--color-ink)] shadow-[0_12px_28px_rgba(22,15,11,0.08)]">
            <Camera size={18} strokeWidth={1.9} aria-hidden="true" />
          </div>
          <div className="min-w-0 space-y-2">
            <p className="text-[0.7rem] font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
              Choosing the right photographer
            </p>
            <h2 className="font-display-face max-w-[18ch] text-[1.85rem] leading-[0.96] tracking-[-0.04em] text-[var(--color-ink)] md:text-[2.2rem]">
              Start with the studio world behind the photographs.
            </h2>
          </div>
        </div>

        <div className="space-y-5">
          <p className="max-w-4xl text-[0.98rem] leading-8 text-[var(--color-mist)] md:text-[1.02rem]">
            If atmosphere, pacing, film craft, and a strong sense of place matter
            to you, the best next step is to see the wider Dolcevilla Studio
            approach before you decide how you want the day to be photographed.
          </p>

          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <LinkButton
              href="/"
              variant="secondary"
              className="w-full whitespace-nowrap no-underline shadow-[0_16px_38px_rgba(22,15,11,0.08)] sm:w-auto"
              icon={<House size={16} strokeWidth={1.8} aria-hidden="true" />}
              hideAutoIcon
            >
              Discover Dolcevilla Studio
            </LinkButton>
            <p className="max-w-[22rem] text-xs font-semibold tracking-[0.22em] text-[var(--color-mist)] uppercase xl:text-right">
              Then explore the wider studio approach
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
