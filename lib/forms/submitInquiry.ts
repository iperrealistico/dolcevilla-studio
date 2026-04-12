import type { InquiryFormValues } from "@/types/forms";

const INQUIRY_TIMEOUT_MS = 10_000;

function getErrorMessage(payload: unknown) {
  if (typeof payload === "string" && payload.trim()) {
    const message = payload.trim();
    if (message.length <= 160 && !message.includes("<")) {
      return message;
    }
  }

  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;

    if (typeof record.message === "string" && record.message.trim()) {
      return record.message;
    }

    if (typeof record.error === "string" && record.error.trim()) {
      return record.error;
    }
  }

  return "Something went wrong while sending your inquiry.";
}

export async function submitInquiry(values: InquiryFormValues) {
  const endpoint = process.env.NEXT_PUBLIC_INQUIRY_ENDPOINT;

  if (!endpoint) {
    if (process.env.NODE_ENV !== "production") {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { ok: true as const };
    }

    return {
      ok: false as const,
      message: "Inquiry endpoint is not configured.",
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), INQUIRY_TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      cache: "no-store",
      headers: {
        Accept: "application/json, text/plain;q=0.9, */*;q=0.8",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      signal: controller.signal,
    });

    if (!response.ok) {
      const contentType = response.headers.get("content-type") ?? "";
      const errorPayload = contentType.includes("application/json")
        ? await response.json().catch(() => null)
        : await response.text().catch(() => null);

      return {
        ok: false as const,
        message: getErrorMessage(errorPayload),
      };
    }

    return { ok: true as const };
  } catch (error) {
    const isAbortError = error instanceof Error && error.name === "AbortError";

    return {
      ok: false as const,
      message: isAbortError
        ? "The inquiry request timed out. Please try again."
        : "Something went wrong while sending your inquiry.",
    };
  } finally {
    clearTimeout(timeout);
  }
}
