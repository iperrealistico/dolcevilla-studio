"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { navigationItems } from "@/content/site/navigation";
import { siteUi } from "@/content/site/ui";
import { useMobileUI } from "@/contexts/MobileUIContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollLock } from "@/hooks/useScrollLock";
import { getNavigationIcon } from "@/lib/ui/iconography";

export function BottomSheetMenu() {
  const { isMenuOpen, closeMenu } = useMobileUI();
  const reduceMotion = useReducedMotion();

  useScrollLock(isMenuOpen);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isMenuOpen ? (
        <>
          <motion.button
            type="button"
            aria-label={siteUi.mobileMenu.closeLabel}
            className="fixed inset-0 z-40 bg-black/35 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
          />
          <div className="pointer-events-none fixed inset-0 z-50 flex items-end px-3 pt-3 sm:px-4 lg:hidden">
            <motion.div
              className="safe-bottom pointer-events-auto flex max-h-[calc(var(--app-height,100dvh)-0.75rem)] w-full flex-col overflow-hidden rounded-t-[1.85rem] border border-[var(--color-line)] bg-[var(--color-paper)] shadow-[0_-20px_48px_rgba(30,20,12,0.18)]"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 44 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
            >
              <div className="flex items-center justify-between gap-3 border-b border-[var(--color-line)] bg-[rgb(245_241_235_/_0.92)] px-[clamp(1rem,4vw,1.25rem)] pt-[clamp(1rem,4vw,1.25rem)] pb-3 backdrop-blur-sm">
                <p className="text-[0.7rem] font-semibold tracking-[0.24em] text-[var(--color-mist)] uppercase">
                  {siteUi.mobileMenu.title}
                </p>
                <button
                  type="button"
                  aria-label={siteUi.mobileMenu.closeLabel}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-line)] bg-white/88 text-[var(--color-ink)] shadow-[0_12px_26px_rgba(30,20,12,0.08)]"
                  onClick={closeMenu}
                >
                  <X size={18} strokeWidth={1.8} aria-hidden="true" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto overscroll-contain px-[clamp(0.9rem,3.6vw,1.2rem)] pt-3 pb-2 [-webkit-overflow-scrolling:touch]">
                <div className="space-y-2.5 pb-1">
                  {navigationItems.map((item) => {
                    const Icon = getNavigationIcon(item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="font-display-face flex items-center justify-between rounded-[1.35rem] border border-[var(--color-line)] bg-white/82 px-[clamp(0.875rem,3.8vw,1rem)] py-[clamp(0.8rem,3.3vw,0.95rem)] text-[clamp(1.15rem,5.4vw,1.5rem)] leading-none tracking-[-0.03em] shadow-[0_16px_34px_rgba(30,20,12,0.06)]"
                        onClick={closeMenu}
                      >
                        <span className="inline-flex min-w-0 items-center gap-[clamp(0.75rem,3vw,0.95rem)]">
                          <span className="flex h-[clamp(2.25rem,11vw,2.6rem)] w-[clamp(2.25rem,11vw,2.6rem)] shrink-0 items-center justify-center rounded-full bg-[rgb(95_113_103_/_0.08)] text-[var(--color-ink)]">
                            <Icon
                              size={18}
                              strokeWidth={1.85}
                              aria-hidden="true"
                            />
                          </span>
                          <span className="min-w-0">{item.label}</span>
                        </span>
                        <ArrowUpRight
                          size={17}
                          strokeWidth={1.8}
                          aria-hidden="true"
                          className="shrink-0 text-[var(--color-mist)]"
                        />
                      </Link>
                    );
                  })}
                </div>
              </nav>
            </motion.div>
          </div>
        </>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
