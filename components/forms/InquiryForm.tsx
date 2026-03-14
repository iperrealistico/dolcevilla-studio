"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { BudgetSelect } from "@/components/forms/BudgetSelect";
import { FormField } from "@/components/forms/FormField";
import { inquiryFormSchema } from "@/lib/forms/formSchema";
import { getPersistedUtmPayload, persistUtmPayload, readUtmParams } from "@/lib/forms/utm";
import { submitInquiry } from "@/lib/forms/submitInquiry";
import { trackEvent } from "@/lib/analytics/tracking";
import type { InquiryFormValues } from "@/types/forms";

const inputClassName =
  "min-h-12 w-full rounded-2xl border border-[var(--color-line)] bg-white/85 px-4 py-3 text-[var(--color-ink)]";

export function InquiryForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<InquiryFormValues>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      names: "",
      email: "",
      weddingDate: "",
      location: "",
      venue: "",
      guestCount: "",
      celebrationType: "",
      photographyBudgetRange: "",
      message: "",
      villaInterest: false,
      honey: "",
    },
  });

  useEffect(() => {
    const currentUtm = readUtmParams(window.location.search);
    persistUtmPayload(currentUtm);
    const persisted = getPersistedUtmPayload();
    form.setValue("pageUrl", window.location.href);
    form.setValue("referrer", document.referrer);
    form.setValue("utmSource", persisted.utmSource);
    form.setValue("utmMedium", persisted.utmMedium);
    form.setValue("utmCampaign", persisted.utmCampaign);
    form.setValue("utmContent", persisted.utmContent);
    form.setValue("gclid", persisted.gclid);
    form.setValue("fbclid", persisted.fbclid);
  }, [form]);

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitError(null);
    trackEvent("start_inquiry_form");
    const result = await submitInquiry(values);

    if (!result.ok) {
      setSubmitError(result.message);
      return;
    }

    trackEvent("submit_inquiry_form");
    router.push("/thank-you");
  });

  return (
    <form className="grid gap-5 rounded-[2rem] border border-[var(--color-line)] bg-[rgb(255_255_255_/_0.72)] p-6 shadow-[var(--shadow-soft)]" onSubmit={onSubmit}>
      <div className="grid gap-5 md:grid-cols-2">
        <FormField label="Names" error={form.formState.errors.names?.message}>
          <input className={inputClassName} {...form.register("names")} />
        </FormField>
        <FormField label="Email" error={form.formState.errors.email?.message}>
          <input className={inputClassName} type="email" {...form.register("email")} />
        </FormField>
        <FormField label="Wedding date" error={form.formState.errors.weddingDate?.message}>
          <input className={inputClassName} type="date" {...form.register("weddingDate")} />
        </FormField>
        <FormField label="Location" error={form.formState.errors.location?.message}>
          <input className={inputClassName} {...form.register("location")} />
        </FormField>
        <FormField label="Venue">
          <input className={inputClassName} {...form.register("venue")} />
        </FormField>
        <FormField label="Guest count">
          <input className={inputClassName} {...form.register("guestCount")} />
        </FormField>
        <FormField label="Celebration type" error={form.formState.errors.celebrationType?.message}>
          <select className={inputClassName} {...form.register("celebrationType")}>
            <option value="">Select one</option>
            <option value="wedding-weekend">Wedding weekend</option>
            <option value="wedding-day">Wedding day</option>
            <option value="elopement">Elopement</option>
            <option value="intimate-wedding">Intimate wedding</option>
          </select>
        </FormField>
        <FormField label="Photography budget" error={form.formState.errors.photographyBudgetRange?.message}>
          <BudgetSelect props={form.register("photographyBudgetRange")} />
        </FormField>
      </div>
      <FormField label="Message" error={form.formState.errors.message?.message}>
        <textarea className={`${inputClassName} min-h-40`} {...form.register("message")} />
      </FormField>
      <label className="flex items-start gap-3 rounded-2xl border border-[var(--color-line)] bg-white/50 px-4 py-4 text-sm text-[var(--color-mist)]">
        <input className="mt-1 size-4" type="checkbox" {...form.register("villaInterest")} />
        Curious about portraits or a very private Villa Raffaelli-related context
      </label>
      <input type="hidden" {...form.register("pageUrl")} />
      <input type="hidden" {...form.register("referrer")} />
      <input type="hidden" {...form.register("utmSource")} />
      <input type="hidden" {...form.register("utmMedium")} />
      <input type="hidden" {...form.register("utmCampaign")} />
      <input type="hidden" {...form.register("utmContent")} />
      <input type="hidden" {...form.register("gclid")} />
      <input type="hidden" {...form.register("fbclid")} />
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...form.register("honey")} />
      {submitError ? <p className="text-sm text-[#9b3a2c]">{submitError}</p> : null}
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Sending..." : "Send inquiry"}
      </Button>
    </form>
  );
}
