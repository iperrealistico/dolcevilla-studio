import { servicePageContentSchema } from "@/lib/content/schemas";
import { siteSettings } from "@/content/site/settings";

export const contactPage = servicePageContentSchema.parse({
  slug: "contact",
  pageType: "contact",
  intro: {
    eyebrow: "Contact",
    heading: "Tell us your date, your place, and the kind of atmosphere you want the photographs to keep.",
    body: [
      "We reply with care, clarity, and the next best step. Availability is intentionally limited so every project remains personal.",
    ],
  },
  formIntro: {
    eyebrow: "Inquiry form",
    heading: "Start here",
    body: [
      "Share the essentials and anything that matters visually, emotionally, or practically. We read every message carefully.",
    ],
  },
  directEmail: siteSettings.contactEmail,
  nextSteps: [
    "We aim to reply within two business days.",
    "If it feels like a fit, we will suggest a call or next conversation.",
    "For private Villa Raffaelli-related imagery, we keep the conversation discreet and contextual.",
  ],
  cta: {
    title: "Prefer email?",
    body: "You can write directly if that feels more natural.",
    primaryCta: { label: siteSettings.contactEmail, href: `mailto:${siteSettings.contactEmail}` },
  },
  seo: {
    title: "Contact Dolcevilla Studio",
    description:
      "Contact Dolcevilla Studio for Tuscany wedding photography, elopements, and intimate celebrations rooted in place, atmosphere, and a premium client experience.",
    path: "/contact",
  },
});
