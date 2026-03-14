import { describe, expect, it, beforeEach } from "vitest";
import { getPersistedUtmPayload, persistUtmPayload, readUtmParams } from "@/lib/forms/utm";

describe("utm helpers", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("reads UTM parameters from the query string", () => {
    expect(
      readUtmParams("?utm_source=google&utm_medium=cpc&utm_campaign=spring&utm_content=hero&gclid=123"),
    ).toEqual({
      utmSource: "google",
      utmMedium: "cpc",
      utmCampaign: "spring",
      utmContent: "hero",
      gclid: "123",
      fbclid: undefined,
    });
  });

  it("persists only meaningful payloads", () => {
    persistUtmPayload({ utmSource: "meta", fbclid: "abc" });

    expect(getPersistedUtmPayload()).toEqual({
      utmSource: "meta",
      fbclid: "abc",
    });
  });
});
