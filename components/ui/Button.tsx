import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export const buttonVariants = {
  primary: "hover:bg-[var(--button-primary-hover)]",
  secondary: "border hover:bg-[var(--button-secondary-hover)]",
  ghost: "bg-transparent hover:bg-[var(--button-ghost-hover)]",
  inline: "bg-transparent p-0 underline underline-offset-4",
} as const;

export const buttonVariantStyles: Record<
  keyof typeof buttonVariants,
  CSSProperties
> = {
  primary: {
    backgroundColor: "var(--button-primary-bg)",
    color: "var(--button-primary-fg)",
  },
  secondary: {
    backgroundColor: "var(--button-secondary-bg)",
    borderColor: "var(--button-secondary-border)",
    color: "var(--button-secondary-fg)",
  },
  ghost: {
    color: "var(--color-ink)",
  },
  inline: {
    color: "var(--color-ink)",
  },
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: keyof typeof buttonVariants;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
};

export function Button({
  children,
  className,
  style,
  variant = "primary",
  icon,
  iconPosition = "left",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 touch-manipulation items-center justify-center gap-2 rounded-[var(--radius-pill)] px-5 py-3 text-sm font-semibold transition",
        buttonVariants[variant],
        className,
      )}
      style={{ ...buttonVariantStyles[variant], ...style }}
      {...props}
    >
      {iconPosition === "left" ? icon : null}
      {children}
      {iconPosition === "right" ? icon : null}
    </button>
  );
}
