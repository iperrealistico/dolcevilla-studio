import type { InquiryFormValues } from "@/types/forms";

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

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    return {
      ok: false as const,
      message: "Something went wrong while sending your inquiry.",
    };
  }

  return { ok: true as const };
}
