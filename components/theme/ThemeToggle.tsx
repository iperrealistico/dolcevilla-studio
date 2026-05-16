"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useTheme } from "@/components/theme/ThemeProvider";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={theme === "light"}
      aria-label="Light theme"
      title={`Switch to ${nextTheme} theme`}
      data-theme={theme}
      className={cn(
        "theme-toggle relative inline-grid min-h-11 w-[4.75rem] shrink-0 grid-cols-2 items-center overflow-hidden rounded-[var(--radius-control)] border border-[var(--color-line)] bg-[var(--surface-toggle)] text-[var(--color-mist)] shadow-[var(--shadow-soft)] transition hover:bg-[var(--surface-chip-hover)]",
        className,
      )}
      onClick={toggleTheme}
    >
      <span className="theme-toggle__thumb" aria-hidden="true" />
      <span
        className="theme-toggle__icon theme-toggle__icon--dark"
        aria-hidden="true"
      >
        <MoonStar size={17} strokeWidth={1.8} />
      </span>
      <span
        className="theme-toggle__icon theme-toggle__icon--light"
        aria-hidden="true"
      >
        <SunMedium size={17} strokeWidth={1.8} />
      </span>
    </button>
  );
}
