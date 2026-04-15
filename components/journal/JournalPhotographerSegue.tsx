import { House } from "lucide-react";
import { LinkButton } from "@/components/ui/LinkButton";

export function JournalPhotographerSegue() {
  return (
    <aside className="not-prose my-10 rounded-[1.75rem] border border-[var(--color-line)] bg-[linear-gradient(145deg,rgba(255,255,255,0.82),rgba(246,238,231,0.94))] p-6 shadow-[0_24px_60px_rgba(26,20,15,0.12)] md:p-7">
      <div className="space-y-4">
        <p className="text-xs font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
          Finding the right fit
        </p>
        <div className="space-y-3">
          <h2 className="font-display-face text-[2rem] leading-[0.94] tracking-[-0.04em] text-[var(--color-ink)] md:text-[2.4rem]">
            Start with the studio world behind the photographs.
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-[var(--color-mist)] md:text-base">
            If atmosphere, pacing, film craft, and a strong sense of place matter
            to you, the best next step is to see the wider Dolcevilla Studio
            approach before you decide how you want the day to be photographed.
          </p>
        </div>
        <div className="pt-1">
          <LinkButton
            href="/"
            variant="secondary"
            className="no-underline"
            icon={<House size={16} strokeWidth={1.8} aria-hidden="true" />}
            hideAutoIcon
          >
            Discover Dolcevilla Studio
          </LinkButton>
        </div>
      </div>
    </aside>
  );
}
