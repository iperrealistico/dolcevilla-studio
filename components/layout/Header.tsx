"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navigationItems } from "@/content/site/navigation";
import { useMobileUI } from "@/contexts/MobileUIContext";
import { cn } from "@/lib/utils/cn";

type HeaderProps = {
  simplified?: boolean;
};

export function Header({ simplified = false }: HeaderProps) {
  const { isMenuOpen, toggleMenu } = useMobileUI();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-[rgb(245_241_235_/_0.85)] backdrop-blur">
      <div className="mx-auto flex max-w-[var(--container-max)] items-center justify-between px-5 py-4 md:px-8 lg:px-10">
        <Link
          href="/"
          className="font-display-face text-2xl tracking-[-0.04em]"
        >
          Dolcevilla Studio
        </Link>
        {!simplified ? (
          <>
            <nav className="hidden items-center gap-6 md:flex">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-[var(--color-mist)] transition hover:text-[var(--color-ink)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <button
              type="button"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
              className={cn(
                "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--color-line)] md:hidden",
              )}
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </>
        ) : (
          <Link
            href="/contact"
            className="text-sm font-semibold text-[var(--color-ink)]"
          >
            Inquire
          </Link>
        )}
      </div>
    </header>
  );
}
