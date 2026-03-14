import { servicePageContentSchema } from "@/lib/content/schemas";

export const privacyPage = servicePageContentSchema.parse({
  slug: "privacy",
  pageType: "utility",
  intro: {
    heading: "Privacy",
    body: [
      "We collect only the information needed to respond to inquiries and measure site performance after explicit consent.",
      "No analytics or marketing scripts load until you actively allow them through the consent doorway.",
    ],
  },
  cta: {
    title: "Questions about privacy?",
    body: "Write to us directly if you need clarification on data handling or consent.",
    primaryCta: { label: "Email us", href: "mailto:hello@dolcevilla.studio" },
  },
  seo: {
    title: "Privacy Policy",
    description:
      "Privacy information for Dolcevilla Studio, including consent behavior, inquiry data handling, and script activation rules.",
    path: "/privacy",
  },
});
