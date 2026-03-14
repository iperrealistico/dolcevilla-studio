const UTM_STORAGE_KEY = "dolcevilla-utm-v1";

export type AttributionPayload = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  gclid?: string;
  fbclid?: string;
};

export function readUtmParams(search: string): AttributionPayload {
  const params = new URLSearchParams(search);

  return {
    utmSource: params.get("utm_source") ?? undefined,
    utmMedium: params.get("utm_medium") ?? undefined,
    utmCampaign: params.get("utm_campaign") ?? undefined,
    utmContent: params.get("utm_content") ?? undefined,
    gclid: params.get("gclid") ?? undefined,
    fbclid: params.get("fbclid") ?? undefined,
  };
}

export function persistUtmPayload(payload: AttributionPayload) {
  if (typeof window === "undefined") {
    return;
  }

  const hasAnyValue = Object.values(payload).some(Boolean);
  if (!hasAnyValue) {
    return;
  }

  window.localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(payload));
}

export function getPersistedUtmPayload(): AttributionPayload {
  if (typeof window === "undefined") {
    return {};
  }

  const raw = window.localStorage.getItem(UTM_STORAGE_KEY);
  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw) as AttributionPayload;
  } catch {
    return {};
  }
}
