"use client";

import type { ReactNode } from "react";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { MobileUIProvider } from "@/contexts/MobileUIContext";
import { LightboxProvider } from "@/contexts/LightboxContext";
import { StudioCursor } from "@/components/cursor/StudioCursor";
import { useViewportHeight } from "@/hooks/useViewportHeight";

type ProvidersProps = {
  children: ReactNode;
};

function ViewportSync() {
  useViewportHeight();
  return null;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ConsentProvider>
      <MobileUIProvider>
        <LightboxProvider>
          <ViewportSync />
          {children}
          <StudioCursor />
        </LightboxProvider>
      </MobileUIProvider>
    </ConsentProvider>
  );
}
