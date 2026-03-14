import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { buttonVariantStyles, buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof buttonVariants;
  className?: string;
  style?: CSSProperties;
};

export function LinkButton({
  href,
  children,
  variant = "primary",
  className,
  style,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-pill)] px-5 py-3 text-sm font-semibold transition",
        buttonVariants[variant],
        className,
      )}
      style={{ ...buttonVariantStyles[variant], ...style }}
    >
      {children}
    </Link>
  );
}
