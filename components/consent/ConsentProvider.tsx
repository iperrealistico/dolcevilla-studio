"use client";

import { AnimatePresence } from "framer-motion";
import { useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
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

const CONSENT_EVENT = "dolcevilla-consent-change";
let cachedConsentRaw: string | null = null;
let cachedConsentSnapshot: ConsentState = defaultConsent;

function readConsentSnapshot(): ConsentState {
  if (typeof window === "undefined") {
    return defaultConsent;
  }

  const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);

  if (!raw) {
    cachedConsentRaw = null;
    cachedConsentSnapshot = defaultConsent;
    return defaultConsent;
  }

  if (raw === cachedConsentRaw) {
    return cachedConsentSnapshot;
  }

  try {
    cachedConsentRaw = raw;
    cachedConsentSnapshot = JSON.parse(raw) as ConsentState;
    return cachedConsentSnapshot;
  } catch {
    cachedConsentRaw = null;
    cachedConsentSnapshot = defaultConsent;
    return defaultConsent;
  }
}

function subscribeToConsentStore(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleChange = () => onStoreChange();
  window.addEventListener("storage", handleChange);
  window.addEventListener(CONSENT_EVENT, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(CONSENT_EVENT, handleChange);
  };
}

function persistConsent(nextState: ConsentState) {
  const serialized = JSON.stringify(nextState);
  cachedConsentRaw = serialized;
  cachedConsentSnapshot = nextState;
  window.localStorage.setItem(CONSENT_STORAGE_KEY, serialized);
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const consent = useSyncExternalStore(
    subscribeToConsentStore,
    readConsentSnapshot,
    () => defaultConsent,
  );
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const isConsentDialogOpen = !consent.hasInteracted || isManagerOpen;
  const modalLockProps = isConsentDialogOpen ? ({ inert: true } as Record<string, boolean>) : {};

  const setConsent = (nextState: ConsentState) => {
    persistConsent(nextState);
    setIsManagerOpen(false);
  };

  const value = useMemo(
    () => ({
      consent,
      isConsentDialogOpen,
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
      savePreferences: ({
        analytics,
        marketing,
      }: {
        analytics: boolean;
        marketing: boolean;
      }) =>
        setConsent({
          hasInteracted: true,
          analytics,
          marketing,
          timestamp: new Date().toISOString(),
        }),
      openConsentManager: () => setIsManagerOpen(true),
      closeConsentManager: () => {
        if (consent.hasInteracted) {
          setIsManagerOpen(false);
        }
      },
      resetConsent: () => {
        persistConsent(defaultConsent);
        setIsManagerOpen(true);
      },
      setConsent,
    }),
    [consent, isConsentDialogOpen],
  );

  return (
    <ConsentContext.Provider value={value}>
      <div aria-hidden={isConsentDialogOpen} {...modalLockProps}>
        {children}
      </div>
      <AnimatePresence>
        {isConsentDialogOpen ? <ConsentDoorway /> : null}
      </AnimatePresence>
    </ConsentContext.Provider>
  );
}
