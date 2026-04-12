"use client";

import { createContext } from "react";
import type { ConsentState } from "@/types/consent";

export type ConsentContextValue = {
  consent: ConsentState;
  isConsentDialogOpen: boolean;
  acceptAll: () => void;
  essentialOnly: () => void;
  savePreferences: (preferences: {
    analytics: boolean;
    marketing: boolean;
  }) => void;
  openConsentManager: () => void;
  closeConsentManager: () => void;
  resetConsent: () => void;
  setConsent: (state: ConsentState) => void;
};

export const ConsentContext = createContext<ConsentContextValue | null>(null);
