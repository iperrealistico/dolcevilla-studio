import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export function Heading({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "font-display-face text-4xl leading-[0.95] tracking-[-0.04em] text-[var(--color-ink)] md:text-6xl",
        className,
      )}
      {...props}
    />
  );
}
