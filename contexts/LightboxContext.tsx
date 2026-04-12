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
  goToNext: () => void;
  goToPrevious: () => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LightboxState | null>(null);

  const value = useMemo(
    () => ({
      state,
      openLightbox: (images: ImageAsset[], index = 0) =>
        setState({
          images,
          index:
            images.length > 0
              ? Math.min(Math.max(index, 0), images.length - 1)
              : 0,
        }),
      closeLightbox: () => setState(null),
      goToNext: () =>
        setState((current) => {
          if (!current || current.images.length < 2) {
            return current;
          }

          return {
            ...current,
            index: (current.index + 1) % current.images.length,
          };
        }),
      goToPrevious: () =>
        setState((current) => {
          if (!current || current.images.length < 2) {
            return current;
          }

          return {
            ...current,
            index: (current.index - 1 + current.images.length) % current.images.length,
          };
        }),
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
