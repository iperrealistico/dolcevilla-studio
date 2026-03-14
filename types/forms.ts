import type { z } from "zod";
import { inquiryFormSchema } from "@/lib/forms/formSchema";

export type InquiryFormValues = z.input<typeof inquiryFormSchema>;
