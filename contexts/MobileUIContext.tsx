"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type MobileUIContextValue = {
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
};

const MobileUIContext = createContext<MobileUIContextValue | null>(null);

export function MobileUIProvider({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const value = useMemo(
    () => ({
      isMenuOpen,
      openMenu: () => setIsMenuOpen(true),
      closeMenu: () => setIsMenuOpen(false),
      toggleMenu: () => setIsMenuOpen((current) => !current),
    }),
    [isMenuOpen],
  );

  return <MobileUIContext.Provider value={value}>{children}</MobileUIContext.Provider>;
}

export function useMobileUI() {
  const context = useContext(MobileUIContext);

  if (!context) {
    throw new Error("useMobileUI must be used within MobileUIProvider");
  }

  return context;
}
