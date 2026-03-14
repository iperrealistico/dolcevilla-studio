import { servicePageContentSchema } from "@/lib/content/schemas";
import { faqs } from "@/content/site/faqs";

export const pricingPage = servicePageContentSchema.parse({
  slug: "pricing",
  pageType: "pricing",
  intro: {
    eyebrow: "Pricing",
    heading: "Premium, human, and intentionally clear.",
    body: [
      "Every celebration is different, but our position should feel easy to understand. We are built for couples who want atmosphere, depth, and a high-touch process rather than a basic coverage package.",
    ],
  },
  highlights: [
    { title: "Wedding day", description: "A premium starting point for full wedding-day coverage." },
    { title: "Wedding weekend", description: "Expanded coverage for multi-day celebrations, dinners, and transitions." },
    { title: "Elopement", description: "Tailored proposals for intimate celebrations and quieter formats." },
  ],
  investmentNote: {
    eyebrow: "What shapes the proposal",
    heading: "Coverage days, movement, scale, and how the celebration actually unfolds.",
    body: [
      "We tailor proposals around the emotional and logistical architecture of the celebration rather than flattening everything into a generic rate card.",
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
      "Explore Dolcevilla Studio pricing guidance for Tuscany weddings, wedding weekends, and elopements with a premium, place-rooted photography experience.",
    path: "/pricing",
  },
});
