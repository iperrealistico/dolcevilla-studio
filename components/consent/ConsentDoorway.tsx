"use client";

import { ConsentActions } from "@/components/consent/ConsentActions";
import { Heading } from "@/components/ui/Heading";
import { useConsent } from "@/hooks/useConsent";
import { useScrollLock } from "@/hooks/useScrollLock";

export function ConsentDoorway() {
  const { consent } = useConsent();
  useScrollLock(!consent.hasInteracted);

  if (consent.hasInteracted) {
    return null;
  }

  return (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-[90] overflow-y-auto bg-[rgb(20_17_14_/_0.8)] p-4 sm:p-5"
    >
      <div className="flex min-h-full items-end justify-center py-4 sm:items-center">
        <div className="max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-white/12 bg-[linear-gradient(135deg,#1D1916,#4B4034)] px-6 py-8 text-[var(--color-paper)] shadow-2xl md:px-10 md:py-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-[rgb(244_235_224_/_0.7)]">
            Consent
          </p>
          <Heading className="max-w-xl text-[2.6rem] text-[var(--color-paper)] md:text-6xl">
            Step quietly into our world.
          </Heading>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[rgb(244_235_224_/_0.8)]">
            Choose the experience you want. We only activate analytics and advertising after explicit permission, and we never use a generic cookie banner.
          </p>
          <div className="mt-8">
            <ConsentActions />
          </div>
        </div>
      </div>
    </div>
  );
}
