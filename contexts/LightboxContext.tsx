"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { ImageAsset } from "@/types/gallery";

type LightboxState = {
  images: ImageAsset[];
  index: number;
};

type LightboxContextValue = {
  state: LightboxState | null;
  openLightbox: (images: ImageAsset[], index?: number) => void;
  closeLightbox: () => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LightboxState | null>(null);

  const value = useMemo(
    () => ({
      state,
      openLightbox: (images: ImageAsset[], index = 0) => setState({ images, index }),
      closeLightbox: () => setState(null),
    }),
    [state],
  );

  return <LightboxContext.Provider value={value}>{children}</LightboxContext.Provider>;
}

export function useLightbox() {
  const context = useContext(LightboxContext);

  if (!context) {
    throw new Error("useLightbox must be used within LightboxProvider");
  }

  return context;
}
