"use client";

import { useEffect } from "react";
import { useConsent } from "@/hooks/useConsent";
import { getGaScripts } from "@/lib/analytics/ga";
import { getGoogleAdsScripts } from "@/lib/analytics/googleAds";
import { getMetaInlineScript } from "@/lib/analytics/meta";
import { injectInlineScript, loadScriptOnce } from "@/lib/analytics/consentedScriptLoader";

export function ConsentScriptGate() {
  const { consent } = useConsent();

  useEffect(() => {
    if (!consent.hasInteracted || !consent.analytics) {
      return;
    }

    const ga = getGaScripts();
    if (ga) {
      loadScriptOnce("ga-loader", ga.external);
      injectInlineScript("ga-inline", ga.inline);
    }
  }, [consent.analytics, consent.hasInteracted]);

  useEffect(() => {
    if (!consent.hasInteracted || !consent.marketing) {
      return;
    }

    const ads = getGoogleAdsScripts();
    if (ads) {
      loadScriptOnce("google-ads-loader", ads.external);
      injectInlineScript("google-ads-inline", ads.inline);
    }

    const metaInline = getMetaInlineScript();
    if (metaInline) {
      injectInlineScript("meta-pixel-inline", metaInline);
    }
  }, [consent.hasInteracted, consent.marketing]);

  return null;
}
