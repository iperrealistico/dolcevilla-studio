"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useConsent } from "@/hooks/useConsent";
import { trackPageView } from "@/lib/analytics/tracking";

export function AnalyticsPageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { consent } = useConsent();
  const lastTrackedRoute = useRef<string | null>(null);

  const search = searchParams.toString();
  const routeKey = search ? `${pathname}?${search}` : pathname;

  useEffect(() => {
    if (!consent.hasInteracted || (!consent.analytics && !consent.marketing)) {
      return;
    }

    if (lastTrackedRoute.current === routeKey) {
      return;
    }

    lastTrackedRoute.current = routeKey;
    queueMicrotask(() => {
      trackPageView({
        page_location: window.location.href,
        page_path: routeKey,
        page_title: document.title,
      });
    });
  }, [consent.analytics, consent.hasInteracted, consent.marketing, routeKey]);

  return null;
}
