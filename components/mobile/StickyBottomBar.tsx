"use client";

import type { ReactNode } from "react";

export function StickyBottomBar({ children }: { children: ReactNode }) {
  return (
    <div className="safe-bottom fixed inset-x-0 bottom-0 z-30 border-t border-[var(--color-line)] bg-[rgb(245_241_235_/_0.92)] px-4 py-3 backdrop-blur md:hidden">
      {children}
    </div>
  );
}
