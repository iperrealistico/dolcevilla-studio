"use client";

import type { ReactNode } from "react";

export function StickyBottomBar({ children }: { children: ReactNode }) {
  return (
    <div className="safe-bottom fixed inset-x-0 bottom-0 z-30 border-t border-[var(--color-line)] bg-[var(--surface-overlay)] px-4 py-3 shadow-[0_-18px_42px_rgba(0,0,0,0.22)] backdrop-blur md:hidden">
      {children}
    </div>
  );
}
