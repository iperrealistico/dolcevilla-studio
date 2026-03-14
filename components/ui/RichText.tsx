import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type RichTextProps = HTMLAttributes<HTMLDivElement> & {
  body?: string[];
};

export function RichText({ body, className, children, ...props }: RichTextProps) {
  return (
    <div className={cn("prose-dolcevilla max-w-3xl text-base text-[var(--color-mist)]", className)} {...props}>
      {body?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {children}
    </div>
  );
}
