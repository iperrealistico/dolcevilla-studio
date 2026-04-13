import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { buttonVariantStyles, buttonVariants } from "@/components/ui/Button";
import { getLinkIconConfig } from "@/lib/ui/iconography";
import { cn } from "@/lib/utils/cn";

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof buttonVariants;
  className?: string;
  style?: CSSProperties;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  hideAutoIcon?: boolean;
};

export function LinkButton({
  href,
  children,
  variant = "primary",
  className,
  style,
  icon,
  iconPosition = "left",
  hideAutoIcon = false,
}: LinkButtonProps) {
  const textLabel = typeof children === "string" ? children : undefined;
  const autoIconConfig = !hideAutoIcon ? getLinkIconConfig(href, textLabel) : null;
  const resolvedIcon =
    icon ??
    (autoIconConfig ? (
      <autoIconConfig.Icon
        size={16}
        strokeWidth={1.8}
        aria-hidden="true"
        className="shrink-0 opacity-80"
      />
    ) : null);
  const resolvedPosition = icon ? iconPosition : autoIconConfig?.placement ?? iconPosition;

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
      {resolvedPosition === "left" ? resolvedIcon : null}
      {children}
      {resolvedPosition === "right" ? resolvedIcon : null}
    </Link>
  );
}
