"use client";

import Link from "next/link";
import { Mail, Menu, X } from "lucide-react";
import { navigationItems } from "@/content/site/navigation";
import { useMobileUI } from "@/contexts/MobileUIContext";
import { getNavigationIcon } from "@/lib/ui/iconography";
import { cn } from "@/lib/utils/cn";

type HeaderProps = {
  simplified?: boolean;
};

export function Header({ simplified = false }: HeaderProps) {
  const { isMenuOpen, toggleMenu } = useMobileUI();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-[rgb(245_241_235_/_0.85)] backdrop-blur">
      <div className="mx-auto flex max-w-[var(--container-max)] items-center justify-between gap-4 px-5 py-4 md:px-8 lg:gap-6 lg:px-10">
        <Link
          href="/"
          className="font-display-face shrink-0 text-2xl tracking-[-0.04em] whitespace-nowrap lg:text-[1.85rem] xl:text-2xl"
        >
          Dolcevilla Studio
        </Link>
        {!simplified ? (
          <>
            <nav className="ml-auto hidden items-center gap-4 lg:flex xl:gap-5">
              {navigationItems.map((item) => {
                const Icon = getNavigationIcon(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-[0.92rem] text-[var(--color-mist)] transition hover:text-[var(--color-ink)] xl:gap-2 xl:text-sm"
                  >
                    <Icon
                      size={14}
                      strokeWidth={1.8}
                      aria-hidden="true"
                      className="opacity-75"
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            <button
              type="button"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
              className={cn(
                "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--color-line)] lg:hidden",
              )}
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </>
        ) : (
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-ink)]"
          >
            <Mail size={14} strokeWidth={1.8} aria-hidden="true" />
            Inquire
          </Link>
        )}
      </div>
    </header>
  );
}
