"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ConsentDoorway } from "@/components/consent/ConsentDoorway";
import { ConsentContext } from "@/contexts/ConsentContext";
import { CONSENT_STORAGE_KEY } from "@/lib/analytics/consentedScriptLoader";
import type { ConsentState } from "@/types/consent";

const defaultConsent: ConsentState = {
  hasInteracted: false,
  analytics: false,
  marketing: false,
  timestamp: null,
};

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<ConsentState>(defaultConsent);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);

    if (!raw) {
      setHasHydrated(true);
      return;
    }

    try {
      setConsentState(JSON.parse(raw) as ConsentState);
    } catch {
      setConsentState(defaultConsent);
    } finally {
      setHasHydrated(true);
    }
  }, []);

  const setConsent = (nextState: ConsentState) => {
    setConsentState(nextState);
    setHasHydrated(true);
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(nextState));
  };

  const value = useMemo(
    () => ({
      consent,
      acceptAll: () =>
        setConsent({
          hasInteracted: true,
          analytics: true,
          marketing: true,
          timestamp: new Date().toISOString(),
        }),
      essentialOnly: () =>
        setConsent({
          hasInteracted: true,
          analytics: false,
          marketing: false,
          timestamp: new Date().toISOString(),
        }),
      resetConsent: () => setConsent(defaultConsent),
      setConsent,
    }),
    [consent],
  );
  const isConsentPending = hasHydrated && !consent.hasInteracted;
  const modalLockProps = isConsentPending ? ({ inert: true } as Record<string, boolean>) : {};

  return (
    <ConsentContext.Provider value={value}>
      <div aria-hidden={isConsentPending} {...modalLockProps}>
        {children}
      </div>
      <ConsentDoorway />
    </ConsentContext.Provider>
  );
}
