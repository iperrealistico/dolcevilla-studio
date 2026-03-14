import { servicePageContentSchema } from "@/lib/content/schemas";

export const legalPage = servicePageContentSchema.parse({
  slug: "legal",
  pageType: "utility",
  intro: {
    heading: "Legal",
    body: [
      "This site is the public marketing presence of Dolcevilla Studio.",
      "All imagery, text, and brand assets remain protected and may not be reused without permission.",
    ],
  },
  cta: {
    title: "Need more detail?",
    body: "Contact us for contractual or licensing questions.",
    primaryCta: { label: "Contact Dolcevilla Studio", href: "/contact" },
  },
  seo: {
    title: "Legal",
    description:
      "Legal information for Dolcevilla Studio covering copyright, site use, and contact routes for contractual or licensing questions.",
    path: "/legal",
  },
});
