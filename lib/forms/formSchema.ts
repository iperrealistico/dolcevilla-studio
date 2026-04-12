import { z } from "zod";

export const inquiryFormSchema = z.object({
  names: z.string().min(2, "Please share both names or a full name."),
  email: z.email("Please enter a valid email address."),
  weddingDate: z.string().min(1, "Please share your celebration date."),
  location: z.string().min(2, "Please share your location."),
  venue: z.string().optional(),
  guestCount: z.string().optional(),
  celebrationType: z.string().min(1, "Please select the celebration type."),
  photographyBudgetRange: z.string().min(1, "Please select a budget range."),
  message: z.string().min(20, "Please tell us a little more about your plans."),
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
