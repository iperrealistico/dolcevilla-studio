"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BudgetSelect } from "@/components/forms/BudgetSelect";
import { FormField } from "@/components/forms/FormField";
import { inquiryFormContent } from "@/content/site/forms";
import { inquiryFormSchema } from "@/lib/forms/formSchema";
import {
  getPersistedUtmPayload,
  persistUtmPayload,
  readUtmParams,
} from "@/lib/forms/utm";
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
      filmInterest: false,
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
    <form
      className="grid gap-5 rounded-[2rem] border border-[var(--color-line)] bg-[rgb(255_255_255_/_0.72)] p-6 shadow-[var(--shadow-soft)]"
      onSubmit={onSubmit}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <FormField
          label={inquiryFormContent.fields.names}
          error={form.formState.errors.names?.message}
        >
          <input className={inputClassName} {...form.register("names")} />
        </FormField>
        <FormField
          label={inquiryFormContent.fields.email}
          error={form.formState.errors.email?.message}
        >
          <input
            className={inputClassName}
            type="email"
            {...form.register("email")}
          />
        </FormField>
        <FormField
          label={inquiryFormContent.fields.weddingDate}
          error={form.formState.errors.weddingDate?.message}
        >
          <input
            className={inputClassName}
            type="date"
            {...form.register("weddingDate")}
          />
        </FormField>
        <FormField
          label={inquiryFormContent.fields.location}
          error={form.formState.errors.location?.message}
        >
          <input className={inputClassName} {...form.register("location")} />
        </FormField>
        <FormField label={inquiryFormContent.fields.venue}>
          <input className={inputClassName} {...form.register("venue")} />
        </FormField>
        <FormField label={inquiryFormContent.fields.guestCount}>
          <input className={inputClassName} {...form.register("guestCount")} />
        </FormField>
        <FormField
          label={inquiryFormContent.fields.celebrationType}
          error={form.formState.errors.celebrationType?.message}
        >
          <select
            className={inputClassName}
            {...form.register("celebrationType")}
          >
            {inquiryFormContent.celebrationTypeOptions.map((option) => (
              <option key={option.value || "empty"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>
        <FormField
          label={inquiryFormContent.fields.photographyBudgetRange}
          error={form.formState.errors.photographyBudgetRange?.message}
        >
          <BudgetSelect props={form.register("photographyBudgetRange")} />
        </FormField>
      </div>
      <FormField
        label={inquiryFormContent.fields.message}
        error={form.formState.errors.message?.message}
      >
        <textarea
          className={`${inputClassName} min-h-40`}
          {...form.register("message")}
        />
      </FormField>
      <label className="flex items-start gap-3 rounded-2xl border border-[var(--color-line)] bg-white/50 px-4 py-4 text-sm text-[var(--color-mist)]">
        <input
          className="mt-1 size-4"
          type="checkbox"
          {...form.register("filmInterest")}
        />
        {inquiryFormContent.checkboxes.filmInterest}
      </label>
      <label className="flex items-start gap-3 rounded-2xl border border-[var(--color-line)] bg-white/50 px-4 py-4 text-sm text-[var(--color-mist)]">
        <input
          className="mt-1 size-4"
          type="checkbox"
          {...form.register("villaInterest")}
        />
        {inquiryFormContent.checkboxes.villaInterest}
      </label>
      <input type="hidden" {...form.register("pageUrl")} />
      <input type="hidden" {...form.register("referrer")} />
      <input type="hidden" {...form.register("utmSource")} />
      <input type="hidden" {...form.register("utmMedium")} />
      <input type="hidden" {...form.register("utmCampaign")} />
      <input type="hidden" {...form.register("utmContent")} />
      <input type="hidden" {...form.register("gclid")} />
      <input type="hidden" {...form.register("fbclid")} />
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        {...form.register("honey")}
      />
      {submitError ? (
        <p className="text-sm text-[#9b3a2c]">{submitError}</p>
      ) : null}
      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        icon={
          <SendHorizontal
            size={16}
            strokeWidth={1.8}
            aria-hidden="true"
            className="shrink-0 opacity-85"
          />
        }
      >
        {form.formState.isSubmitting
          ? inquiryFormContent.sendingLabel
          : inquiryFormContent.submitLabel}
      </Button>
    </form>
  );
}
