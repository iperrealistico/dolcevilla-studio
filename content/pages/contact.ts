import { servicePageContentSchema } from "@/lib/content/schemas";
import { siteSettings } from "@/content/site/settings";

export const contactPage = servicePageContentSchema.parse({
  slug: "contact",
  pageType: "contact",
  intro: {
    eyebrow: "Contact",
    heading: "Tell us your date, your place, and the kind of atmosphere and photographic language you want the images to hold.",
    body: [
      "We reply with care, clarity, and the next best step. Availability is intentionally limited so every project remains personal.",
    ],
  },
  craft: {
    variant: "minimal",
    eyebrow: "What to tell us",
    title: "If film matters to you, say so early.",
    body:
      "Some couples know immediately that 35mm, medium format, or selected large-format portraits belong in the story. Others simply know they want something tactile and authentic. Either is useful context for the first conversation.",
    imageId: "film35mmRollStillLife",
    points: [
      {
        title: "Tell us the mood",
        description: "We want to know how the day should feel, not just where it takes place.",
      },
      {
        title: "Tell us the craft preference",
        description: "If hybrid film coverage matters to you, we can shape the conversation around it from the start.",
      },
    ],
  },
  formIntro: {
    eyebrow: "Inquiry form",
    heading: "Start here",
    body: [
      "Share the essentials and anything that matters visually, emotionally, or practically. We read every message carefully, including whether film is part of what you are hoping for.",
    ],
  },
  directEmail: siteSettings.contactEmail,
  nextSteps: [
    "We aim to reply within two business days.",
    "If it feels like a fit, we will suggest a call or next conversation.",
    "If hybrid film coverage matters to you, tell us which parts of the day feel most important for it.",
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
      "Contact Dolcevilla Studio for Tuscany wedding photography, elopements, and hybrid film-and-digital celebrations rooted in place, atmosphere, and a premium client experience.",
    path: "/contact",
  },
});
