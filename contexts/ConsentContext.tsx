"use client";

import { createContext } from "react";
import type { ConsentState } from "@/types/consent";

export type ConsentContextValue = {
  consent: ConsentState;
  acceptAll: () => void;
  essentialOnly: () => void;
  resetConsent: () => void;
  setConsent: (state: ConsentState) => void;
};

export const ConsentContext = createContext<ConsentContextValue | null>(null);
