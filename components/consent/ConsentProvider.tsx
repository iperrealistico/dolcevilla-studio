"use client";

import { useMemo, useState, type ReactNode } from "react";
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
  const [consent, setConsentState] = useState<ConsentState>(() => {
    if (typeof window === "undefined") {
      return defaultConsent;
    }

    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) {
      return defaultConsent;
    }

    try {
      return JSON.parse(raw) as ConsentState;
    } catch {
      return defaultConsent;
    }
  });

  const setConsent = (nextState: ConsentState) => {
    setConsentState(nextState);
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

  return (
    <ConsentContext.Provider value={value}>
      {children}
      <ConsentDoorway />
    </ConsentContext.Provider>
  );
}
