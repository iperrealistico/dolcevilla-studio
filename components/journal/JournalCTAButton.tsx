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
  compact: "min-h-[3rem] gap-2 px-4.5 py-2.5 text-sm",
  regular: "min-h-[3.2rem] gap-2.5 px-5 py-3.5 text-sm md:text-[0.96rem]",
  banner:
    "min-h-[3.45rem] gap-2.5 px-5.5 py-3.5 text-sm md:min-h-[3.75rem] md:px-6.5 md:text-[0.98rem]",
} as const;

const toneClasses = {
  contact:
    "border-[rgb(196_154_92_/_0.3)] bg-[linear-gradient(135deg,rgba(248,233,205,0.98),rgba(222,186,126,0.98))] shadow-[0_22px_48px_rgba(120,85,34,0.16)]",
  home: "border-[var(--color-line)] bg-[var(--surface-badge)] text-[var(--color-ink)] shadow-[var(--shadow-soft)]",
} as const;

function resolveIcon(href: string, tone: JournalCTAButtonProps["tone"]) {
  if (href === "/contact" || tone === "contact") {
    return "contact";
  }

  if (href === "/" || tone === "home") {
    return "home";
  }

  return "external";
}

export function JournalCTAButton({
  href,
  children,
  className,
  pulseClassName,
  size = "regular",
  tone = "contact",
}: JournalCTAButtonProps) {
  const iconSize = size === "compact" ? 15 : 16;
  const iconProps = {
    size: iconSize,
    strokeWidth: 1.85,
    "aria-hidden": true as const,
  };
  const iconKey = resolveIcon(href, tone);

  return (
    <div
      className={cn(
        "relative isolate inline-flex max-w-full rounded-[var(--radius-panel)]",
        pulseClassName,
      )}
    >
      <span aria-hidden="true" className="journal-cta-pulse-ring" />
      <Link
        href={href}
        style={
          tone === "contact"
            ? {
                color: "rgb(15 12 10 / 0.96)",
              }
            : undefined
        }
        className={cn(
          "journal-cta-highlight relative inline-flex max-w-full items-center justify-center rounded-[var(--radius-pill)] border font-semibold no-underline transition duration-300 hover:-translate-y-0.5 hover:no-underline",
          sizeClasses[size],
          toneClasses[tone],
          className,
        )}
      >
        {iconKey === "contact" ? <Send {...iconProps} /> : null}
        {iconKey === "home" ? <House {...iconProps} /> : null}
        {iconKey === "external" ? <ArrowUpRight {...iconProps} /> : null}
        <span className="whitespace-nowrap">{children}</span>
      </Link>
    </div>
  );
}
