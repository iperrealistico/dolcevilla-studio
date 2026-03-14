export type AnalyticsEvent =
  | "page_view"
  | "view_pricing"
  | "click_contact_cta"
  | "start_inquiry_form"
  | "submit_inquiry_form"
  | "click_email"
  | "click_instagram"
  | "click_story"
  | "click_location_page"
  | "view_ads_landing";

type EventPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, payload: EventPayload = {}) {
  if (typeof window === "undefined") {
    return;
  }

  window.gtag?.("event", event, payload);
  window.fbq?.("trackCustom", event, payload);
}
