import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, House, Send } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type JournalCTAButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  pulseClassName?: string;
  size?: "compact" | "regular" | "banner";
  tone?: "contact" | "home";
};

const sizeClasses = {
  compact: "min-h-11 gap-2 px-4 py-2.5 text-sm",
  regular: "min-h-12 gap-2.5 px-5 py-3 text-sm md:text-[0.96rem]",
  banner:
    "min-h-[3.35rem] gap-2.5 px-5 py-3.5 text-sm md:min-h-[3.6rem] md:px-6 md:text-[0.96rem]",
} as const;

const toneClasses = {
  contact:
    "border-[rgb(196_154_92_/_0.35)] bg-[linear-gradient(135deg,rgba(247,230,199,0.98),rgba(216,180,121,0.96))] text-[var(--color-ink)] shadow-[0_22px_48px_rgba(120,85,34,0.18)]",
  home: "border-[rgb(196_154_92_/_0.28)] bg-[rgb(255_255_255_/_0.94)] text-[var(--color-ink)] shadow-[0_18px_42px_rgba(120,85,34,0.12)]",
} as const;

function resolveIcon(href: string, tone: JournalCTAButtonProps["tone"]) {
  if (href === "/contact" || tone === "contact") {
    return Send;
  }

  if (href === "/" || tone === "home") {
    return House;
  }

  return ArrowUpRight;
}

export function JournalCTAButton({
  href,
  children,
  className,
  pulseClassName,
  size = "regular",
  tone = "contact",
}: JournalCTAButtonProps) {
  const Icon = resolveIcon(href, tone);

  return (
    <div
      className={cn(
        "relative inline-flex max-w-full rounded-[var(--radius-pill)]",
        pulseClassName,
      )}
    >
      <span aria-hidden="true" className="journal-cta-pulse-ring" />
      <Link
        href={href}
        className={cn(
          "journal-cta-highlight relative inline-flex max-w-full items-center justify-center rounded-[var(--radius-pill)] border font-semibold transition duration-300 hover:-translate-y-0.5",
          sizeClasses[size],
          toneClasses[tone],
          className,
        )}
      >
        <Icon
          size={size === "compact" ? 15 : 16}
          strokeWidth={1.85}
          aria-hidden="true"
        />
        <span className="truncate">{children}</span>
      </Link>
    </div>
  );
}
