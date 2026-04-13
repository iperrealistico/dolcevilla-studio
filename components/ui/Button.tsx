import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export const buttonVariants = {
  primary: "hover:bg-[color:rgb(25_22_18_/_0.88)]",
  secondary: "border hover:bg-white",
  ghost: "bg-transparent hover:bg-white/60",
  inline: "bg-transparent p-0 underline underline-offset-4",
} as const;

export const buttonVariantStyles: Record<
  keyof typeof buttonVariants,
  CSSProperties
> = {
  primary: {
    backgroundColor: "var(--color-ink)",
    color: "var(--color-paper)",
  },
  secondary: {
    backgroundColor: "rgb(255 255 255 / 0.72)",
    borderColor: "var(--color-line)",
    color: "var(--color-ink)",
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
