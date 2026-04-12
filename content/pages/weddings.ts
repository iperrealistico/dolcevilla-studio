import { servicePageContentSchema } from "@/lib/content/schemas";
import { buildGallery } from "@/lib/images/imageManifest";
import { faqs } from "@/content/site/faqs";
import { testimonials } from "@/content/site/testimonials";

export const weddingsPage = servicePageContentSchema.parse({
  slug: "weddings",
  pageType: "service",
  hero: {
    eyebrow: "Full weddings and wedding weekends",
    title: "For destination weddings that need more than coverage.",
    subtitle:
      "We photograph elegant multi-day celebrations in Tuscany with a calm, editorial eye and a deep understanding of place.",
    primaryCta: { label: "Check availability", href: "/contact" },
    secondaryCta: { label: "View pricing", href: "/pricing", variant: "secondary" },
    imageIds: ["florenceLoggiaBlueHour", "welcomeDinnerLanterns", "chiantiVineyardDinner"],
    variant: "service",
  },
  intro: {
    eyebrow: "Weddings",
    heading: "The full atmosphere matters: arrivals, dinners, stillness, family, landscape, and the pace between them.",
    body: [
      "We are especially suited to destination weddings and wedding weekends where emotional rhythm, multiple spaces, and a real sense of Tuscany are central to the experience.",
    ],
  },
  gallery: buildGallery([
    { id: "candlelitCourtyardToast", layoutVariant: "portrait" },
    { id: "florenceLoggiaBlueHour", layoutVariant: "portrait", span: "lg" },
    { id: "chiantiVineyardDinner", layoutVariant: "landscape", span: "lg" },
    { id: "luccaEvening", layoutVariant: "portrait" },
    { id: "homeCoupleQuiet", layoutVariant: "portrait" },
    { id: "welcomeDinnerLanterns", layoutVariant: "landscape" },
  ]),
  highlights: [
    {
      title: "Destination-fluent",
      description: "We understand the emotional and logistical rhythm of celebrations planned from abroad.",
    },
    {
      title: "Weekend-minded",
      description: "We photograph dinners, mornings, transitions, and family atmosphere as part of the full narrative.",
    },
    {
      title: "Locally grounded",
      description: "Tuscany is not a backdrop to us. It is a lived geography we know from the inside.",
    },
  ],
  stories: ["lucca-garden-weekend", "villa-raffaelli-mornings"],
  testimonials: testimonials.services,
  process: [
    { title: "Inquiry and call", description: "A focused first conversation around fit, pace, and the world of your celebration." },
    { title: "Planning support", description: "We shape visual rhythm, portrait timing, and where atmosphere matters most." },
    { title: "Wedding coverage", description: "Presence that is calm, attentive, and visually exacting." },
    { title: "Gallery delivery", description: "A final edit that preserves the emotional architecture of the weekend." },
  ],
  investmentNote: {
    eyebrow: "Starting point",
    heading: "Wedding coverage is positioned for premium destination celebrations.",
    body: [
      "Every proposal is tailored, but our pricing is designed for couples who want an intentional, high-touch experience rather than a commodity booking.",
    ],
  },
  villa: {
    variant: "minimal",
    title: "Rooted at Villa Raffaelli",
    body: "The villa shapes our visual point of view and anchors the brand in a real place without turning the story into a venue funnel.",
  },
  faqs: faqs.weddings,
  cta: {
    title: "Planning a wedding weekend in Tuscany?",
    body: "Tell us what kind of celebration you are building and what kind of atmosphere you want it to hold.",
    primaryCta: { label: "Start your inquiry", href: "/contact" },
  },
  seo: {
    title: "Tuscany Wedding Photography for Destination Weddings",
    description:
      "Dolcevilla Studio photographs destination weddings and wedding weekends in Tuscany with a premium editorial eye rooted in place, atmosphere, and emotional depth.",
    path: "/weddings",
  },
});
