import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Camera,
  CheckCheck,
  MapPinned,
  NotebookPen,
  Quote,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

type JournalEditorialBlockProps = {
  label: string;
  title?: string;
  icon: LucideIcon;
  children: ReactNode;
  className?: string;
  theme?: "light" | "dark";
};

function JournalEditorialBlock({
  label,
  title,
  icon: Icon,
  children,
  className,
  theme = "light",
}: JournalEditorialBlockProps) {
  const isDark = theme === "dark";

  return (
    <aside
      className={cn(
        "not-prose relative my-10 overflow-hidden rounded-[1.8rem] border p-6 shadow-[0_24px_64px_rgba(22,15,11,0.11)] md:p-7",
        isDark
          ? "border-white/10 bg-[linear-gradient(145deg,rgba(29,25,22,0.96),rgba(56,48,40,0.92))] text-[var(--color-paper)]"
          : "border-[rgb(92_77_58_/_0.12)] bg-[linear-gradient(150deg,rgba(255,255,255,0.9),rgba(247,241,235,0.96))] text-[var(--color-ink)]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full blur-3xl",
          isDark ? "bg-[rgb(233_216_190_/_0.1)]" : "bg-[rgb(212_195_166_/_0.28)]",
        )}
      />
      <div className="relative space-y-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] border shadow-[0_12px_28px_rgba(22,15,11,0.08)]",
              isDark
                ? "border-white/10 bg-white/8 text-[rgb(244_235_224_/_0.92)]"
                : "border-[rgb(92_77_58_/_0.12)] bg-white/80 text-[var(--color-ink)]",
            )}
          >
            <Icon size={18} strokeWidth={1.9} aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <p
              className={cn(
                "text-[0.7rem] font-semibold tracking-[0.28em] uppercase",
                isDark
                  ? "text-[rgb(244_235_224_/_0.68)]"
                  : "text-[var(--color-mist)]",
              )}
            >
              {label}
            </p>
            {title ? (
              <p className="font-display-face text-[1.55rem] leading-[0.98] tracking-[-0.04em] md:text-[1.9rem]">
                {title}
              </p>
            ) : null}
          </div>
        </div>
        <div
          className={cn(
            "space-y-4 text-[0.98rem] leading-8",
            isDark
              ? "text-[rgb(244_235_224_/_0.82)]"
              : "text-[var(--color-mist)]",
          )}
        >
          {children}
        </div>
      </div>
    </aside>
  );
}

type JournalEditorialTextBlockProps = {
  title?: string;
  children: ReactNode;
};

export function JournalQuickAnswer({
  title = "The short answer",
  children,
}: JournalEditorialTextBlockProps) {
  return (
    <JournalEditorialBlock
      label="Quick Answer"
      title={title}
      icon={Sparkles}
      className="md:max-w-[34rem]"
    >
      {children}
    </JournalEditorialBlock>
  );
}

export function JournalPlanningNote({
  title = "Planning Note",
  children,
}: JournalEditorialTextBlockProps) {
  return (
    <JournalEditorialBlock
      label="Planning Note"
      title={title}
      icon={NotebookPen}
    >
      {children}
    </JournalEditorialBlock>
  );
}

export function JournalChecklist({
  title = "Keep this in mind",
  children,
}: JournalEditorialTextBlockProps) {
  return (
    <JournalEditorialBlock
      label="Checklist"
      title={title}
      icon={CheckCheck}
      className="[&_ul]:space-y-3 [&_ul]:pl-5 [&_li]:pl-1"
    >
      {children}
    </JournalEditorialBlock>
  );
}

export function JournalCommonMistake({
  title = "What couples often underestimate",
  children,
}: JournalEditorialTextBlockProps) {
  return (
    <JournalEditorialBlock
      label="Common Mistake"
      title={title}
      icon={TriangleAlert}
      theme="dark"
    >
      {children}
    </JournalEditorialBlock>
  );
}

export function JournalLocalInsight({
  title = "A local read on the place",
  children,
}: JournalEditorialTextBlockProps) {
  return (
    <JournalEditorialBlock
      label="Local Insight"
      title={title}
      icon={MapPinned}
      className="md:max-w-[35rem]"
    >
      {children}
    </JournalEditorialBlock>
  );
}

export function JournalFilmNote({
  title = "Why film changes the feel",
  children,
}: JournalEditorialTextBlockProps) {
  return (
    <JournalEditorialBlock
      label="Film Note"
      title={title}
      icon={Camera}
      className="md:max-w-[35rem]"
    >
      {children}
    </JournalEditorialBlock>
  );
}

type JournalPullQuoteProps = {
  attribution?: string;
  children: ReactNode;
};

export function JournalPullQuote({
  attribution,
  children,
}: JournalPullQuoteProps) {
  return (
    <aside className="not-prose my-12 rounded-[2rem] border border-[rgb(92_77_58_/_0.12)] bg-[rgb(255_255_255_/_0.66)] px-6 py-7 shadow-[0_24px_64px_rgba(22,15,11,0.1)] backdrop-blur-sm md:px-8 md:py-8">
      <div className="space-y-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-[rgb(92_77_58_/_0.12)] bg-white/85 text-[var(--color-ink)] shadow-[0_12px_28px_rgba(22,15,11,0.08)]">
          <Quote size={18} strokeWidth={1.9} aria-hidden="true" />
        </div>
        <blockquote className="font-display-face text-[2rem] leading-[1.02] tracking-[-0.04em] text-[var(--color-ink)] md:text-[2.7rem]">
          {children}
        </blockquote>
        {attribution ? (
          <p className="text-xs font-semibold tracking-[0.24em] text-[var(--color-mist)] uppercase">
            {attribution}
          </p>
        ) : null}
      </div>
    </aside>
  );
}
