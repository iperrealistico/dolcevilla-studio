"use client";

import { createContext } from "react";
import type { ConsentState } from "@/types/consent";

export type ConsentContextValue = {
  consent: ConsentState;
  isConsentDialogOpen: boolean;
  consentPanel: "choices" | "privacy";
  acceptAll: () => void;
  essentialOnly: () => void;
  savePreferences: (preferences: {
    analytics: boolean;
    marketing: boolean;
  }) => void;
  openConsentManager: () => void;
  openPrivacyManager: () => void;
  showConsentChoices: () => void;
  closeConsentManager: () => void;
  resetConsent: () => void;
  setConsent: (state: ConsentState) => void;
};

export const ConsentContext = createContext<ConsentContextValue | null>(null);
