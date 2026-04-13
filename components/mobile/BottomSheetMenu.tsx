"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { navigationItems } from "@/content/site/navigation";
import { useMobileUI } from "@/contexts/MobileUIContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollLock } from "@/hooks/useScrollLock";
import { getNavigationIcon } from "@/lib/ui/iconography";

export function BottomSheetMenu() {
  const { isMenuOpen, closeMenu } = useMobileUI();
  const reduceMotion = useReducedMotion();

  useScrollLock(isMenuOpen);

  return (
    <AnimatePresence>
      {isMenuOpen ? (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-black/35 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
          />
          <motion.div
            className="safe-bottom fixed inset-x-0 bottom-0 z-50 rounded-t-[2rem] border border-[var(--color-line)] bg-[var(--color-paper)] px-5 pt-6 pb-8 md:hidden"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 32 }}
          >
            <p className="mb-4 text-xs font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
              Navigation
            </p>
            <nav className="space-y-3">
              {navigationItems.map((item) => {
                const Icon = getNavigationIcon(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-display-face flex items-center justify-between rounded-2xl border border-[var(--color-line)] bg-white/80 px-4 py-4 text-2xl tracking-[-0.03em]"
                    onClick={closeMenu}
                  >
                    <span className="inline-flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgb(95_113_103_/_0.08)] text-[var(--color-ink)]">
                        <Icon size={18} strokeWidth={1.85} aria-hidden="true" />
                      </span>
                      <span>{item.label}</span>
                    </span>
                    <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" className="text-[var(--color-mist)]" />
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
