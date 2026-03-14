"use client";

import { Button } from "@/components/ui/Button";
import { useConsent } from "@/hooks/useConsent";

export function ConsentActions() {
  const { acceptAll, essentialOnly } = useConsent();

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button variant="secondary" onClick={essentialOnly}>
        Essential only
      </Button>
      <Button onClick={acceptAll}>Accept analytics and marketing</Button>
    </div>
  );
}
