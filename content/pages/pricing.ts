import { servicePageContentSchema } from "@/lib/content/schemas";
import { faqs } from "@/content/site/faqs";

export const pricingPage = servicePageContentSchema.parse({
  slug: "pricing",
  pageType: "pricing",
  intro: {
    eyebrow: "Pricing",
    heading: "Premium, human, and intentionally clear.",
    body: [
      "Every celebration is different, but our position should feel easy to understand. We are built for couples who want atmosphere, depth, hybrid craft, and a high-touch process rather than a basic coverage package.",
    ],
  },
  highlights: [
    { title: "Wedding day", description: "A premium starting point for full wedding-day coverage." },
    { title: "Hybrid film coverage", description: "Film is part of the studio language, not a novelty line item added at the end." },
    { title: "Large format and bespoke scope", description: "Selected large-format portraits, expanded film ambitions, or multi-day analog coverage can shape the proposal." },
  ],
  craft: {
    variant: "minimal",
    eyebrow: "What the pricing reflects",
    title: "You are not paying for a preset. You are paying for judgment.",
    body:
      "Hybrid work only has value when the photographer knows when to use film, when not to use it, and how to deliver a complete wedding story without turning the day into a technical exercise.",
    points: [
      {
        title: "Film is included",
        description: "Our proposals already assume film is part of the visual language of the studio.",
      },
      {
        title: "Bespoke analog scope",
        description: "If a celebration calls for more stock, more medium format, or selected large-format portraiture, we shape that intentionally.",
      },
    ],
  },
  investmentNote: {
    eyebrow: "What shapes the proposal",
    heading: "Coverage days, movement, scale, and how the celebration actually unfolds.",
    body: [
      "We tailor proposals around the emotional and logistical architecture of the celebration, including how much of the day should live on film and how much needs the speed of digital.",
    ],
  },
  faqs: faqs.pricing,
  cta: {
    title: "If the fit feels right, let’s build the right proposal.",
    body: "Share the date, location, and structure of the celebration and we’ll guide the next step.",
    primaryCta: { label: "Request pricing", href: "/contact" },
  },
  seo: {
    title: "Dolcevilla Studio Pricing",
    description:
      "Explore Dolcevilla Studio pricing guidance for Tuscany weddings, wedding weekends, and elopements with a premium hybrid film-and-digital photography experience.",
    path: "/pricing",
  },
});
