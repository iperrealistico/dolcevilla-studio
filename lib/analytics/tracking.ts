import { getGoogleAdsConversionDestination } from "@/lib/analytics/googleAds";

export type AnalyticsEvent =
  | "page_view"
  | "click_contact_cta"
  | "start_inquiry_form"
  | "submit_inquiry_form"
  | "click_email"
  | "click_instagram"
  | "click_story";

type EventPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

function cleanPayload(payload: EventPayload) {
  return Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined));
}

export function trackPageView(payload: EventPayload = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const pagePayload = cleanPayload(payload);

  window.gtag?.("event", "page_view", pagePayload);
  window.fbq?.("track", "PageView");
}

export function trackEvent(event: AnalyticsEvent, payload: EventPayload = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const cleanedPayload = cleanPayload(payload);

  switch (event) {
    case "page_view":
      trackPageView(cleanedPayload);
      return;
    case "click_contact_cta":
      window.gtag?.("event", "contact", cleanedPayload);
      window.fbq?.("track", "Contact", cleanedPayload);
      return;
    case "start_inquiry_form":
      window.gtag?.("event", "form_start", {
        form_name: "inquiry",
        ...cleanedPayload,
      });
      window.fbq?.("trackCustom", event, cleanedPayload);
      return;
    case "submit_inquiry_form": {
      window.gtag?.("event", "generate_lead", {
        form_name: "inquiry",
        ...cleanedPayload,
      });

      const adsConversionDestination = getGoogleAdsConversionDestination();
      if (adsConversionDestination) {
        window.gtag?.("event", "conversion", {
          send_to: adsConversionDestination,
          ...cleanedPayload,
        });
      }

      window.fbq?.("track", "Lead", cleanedPayload);
      return;
    }
    default:
      window.gtag?.("event", event, cleanedPayload);
      window.fbq?.("trackCustom", event, cleanedPayload);
  }
}
