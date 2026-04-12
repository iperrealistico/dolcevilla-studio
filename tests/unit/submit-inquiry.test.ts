import { afterEach, describe, expect, it, vi } from "vitest";
import type { InquiryFormValues } from "@/types/forms";

const validInquiry: InquiryFormValues = {
  names: "Alex and Sam",
  email: "alex@example.com",
  weddingDate: "2026-09-20",
  location: "Lucca",
  venue: "Villa Example",
  guestCount: "50",
  celebrationType: "wedding-weekend",
  photographyBudgetRange: "€8k-12k",
  message: "We are planning a relaxed Tuscany wedding weekend and would love to talk.",
  villaInterest: false,
  honey: "",
};

describe("submitInquiry", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it("returns a configuration error in production when the endpoint is missing", async () => {
    vi.stubEnv("NODE_ENV", "production");

    const { submitInquiry } = await import("@/lib/forms/submitInquiry");
    const result = await submitInquiry(validInquiry);

    expect(result).toEqual({
      ok: false,
      message: "Inquiry endpoint is not configured.",
    });
  });

  it("returns the endpoint error message when the external service responds with JSON", async () => {
    vi.stubEnv("NEXT_PUBLIC_INQUIRY_ENDPOINT", "https://example.com/form");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        headers: new Headers({
          "content-type": "application/json",
        }),
        json: vi.fn().mockResolvedValue({
          message: "Please complete the anti-spam challenge.",
        }),
      }),
    );

    const { submitInquiry } = await import("@/lib/forms/submitInquiry");
    const result = await submitInquiry(validInquiry);

    expect(result).toEqual({
      ok: false,
      message: "Please complete the anti-spam challenge.",
    });
  });

  it("returns success when the external endpoint accepts the submission", async () => {
    vi.stubEnv("NEXT_PUBLIC_INQUIRY_ENDPOINT", "https://example.com/form");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        headers: new Headers(),
      }),
    );

    const { submitInquiry } = await import("@/lib/forms/submitInquiry");
    const result = await submitInquiry(validInquiry);

    expect(result).toEqual({
      ok: true,
    });
  });
});
