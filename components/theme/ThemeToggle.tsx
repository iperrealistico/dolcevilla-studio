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
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
      className={cn(
        "inline-flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-control)] border border-[var(--color-line)] bg-[var(--surface-floating)] text-[var(--color-ink)] shadow-[var(--shadow-soft)] transition hover:bg-[var(--surface-chip-hover)]",
        className,
      )}
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <SunMedium size={18} strokeWidth={1.8} aria-hidden="true" />
      ) : (
        <MoonStar size={18} strokeWidth={1.8} aria-hidden="true" />
      )}
    </button>
  );
}
