import { beforeEach, describe, expect, it, vi } from "vitest";

describe("analytics tracking", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    window.gtag = vi.fn();
    window.fbq = vi.fn();
  });

  it("tracks route-aware page views for consented sessions", async () => {
    const { trackPageView } = await import("@/lib/analytics/tracking");

    trackPageView({
      page_path: "/contact?utm_source=google",
      page_title: "Contact",
    });

    expect(window.gtag).toHaveBeenCalledWith("event", "page_view", {
      page_path: "/contact?utm_source=google",
      page_title: "Contact",
    });
    expect(window.fbq).toHaveBeenCalledWith("track", "PageView");
  });

  it("maps inquiry submissions to lead events and Google Ads conversions", async () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_ADS_ID", "AW-123456789");
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL", "abcDEFghi");

    const { trackEvent } = await import("@/lib/analytics/tracking");

    trackEvent("submit_inquiry_form", {
      celebrationType: "wedding-weekend",
    });

    expect(window.gtag).toHaveBeenNthCalledWith(1, "event", "generate_lead", {
      form_name: "inquiry",
      celebrationType: "wedding-weekend",
    });
    expect(window.gtag).toHaveBeenNthCalledWith(2, "event", "conversion", {
      send_to: "AW-123456789/abcDEFghi",
      celebrationType: "wedding-weekend",
    });
    expect(window.fbq).toHaveBeenCalledWith("track", "Lead", {
      celebrationType: "wedding-weekend",
    });
  });
});
