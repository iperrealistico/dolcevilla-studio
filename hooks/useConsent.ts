"use client";

import { useContext } from "react";
import { ConsentContext } from "@/contexts/ConsentContext";

export function useConsent() {
  const context = useContext(ConsentContext);

  if (!context) {
    throw new Error("useConsent must be used within ConsentProvider");
  }

  return context;
}
