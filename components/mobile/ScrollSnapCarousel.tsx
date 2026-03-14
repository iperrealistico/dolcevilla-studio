import type { ReactNode } from "react";

export function ScrollSnapCarousel({ children }: { children: ReactNode }) {
  return (
    <div className="scroll-snap-x flex gap-4 overflow-x-auto pb-3 md:hidden">
      {children}
    </div>
  );
}
