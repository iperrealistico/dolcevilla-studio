import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export function Eyebrow({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-mist)]",
        className,
      )}
      {...props}
    />
  );
}
