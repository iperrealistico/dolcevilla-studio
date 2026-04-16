import { z } from "zod";
import { inquiryFormContent } from "@/content/site/forms";

export const inquiryFormSchema = z.object({
  names: z.string().min(2, inquiryFormContent.validation.names),
  email: z.email(inquiryFormContent.validation.email),
  weddingDate: z.string().min(1, inquiryFormContent.validation.weddingDate),
  location: z.string().min(2, inquiryFormContent.validation.location),
  venue: z.string().optional(),
  guestCount: z.string().optional(),
  celebrationType: z
    .string()
    .min(1, inquiryFormContent.validation.celebrationType),
  photographyBudgetRange: z
    .string()
    .min(1, inquiryFormContent.validation.photographyBudgetRange),
  message: z.string().min(20, inquiryFormContent.validation.message),
  filmInterest: z.boolean().default(false),
  villaInterest: z.boolean().default(false),
  pageUrl: z.string().optional(),
  referrer: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmContent: z.string().optional(),
  gclid: z.string().optional(),
  fbclid: z.string().optional(),
  honey: z.string().max(0).optional(),
});
