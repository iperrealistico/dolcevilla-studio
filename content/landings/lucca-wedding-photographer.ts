import { locationLandingSchema } from "@/lib/content/schemas";
import { buildGallery } from "@/lib/images/imageManifest";

export const luccaLanding = locationLandingSchema.parse({
  slug: "lucca-wedding-photographer",
  title: "Lucca Wedding Photographer",
  hero: {
    title: "Lucca wedding photography for couples drawn to elegance and quiet depth.",
    subtitle:
      "Lucca and Upper Tuscany allow for a richer, more private visual world than the usual postcard version of the region.",
    primaryCta: { label: "Inquire for Lucca", href: "/contact" },
    imageIds: ["luccaEvening", "villaCourtyard"],
    variant: "landing",
  },
  intro: {
    heading: "Lucca is one of our most natural worlds.",
    body: [
      "Its restraint, architecture, and nearness to Upper Tuscany make it especially suited to couples who want refinement without spectacle.",
    ],
  },
  whyThisPlaceMatters: [
    { title: "Architectural elegance", description: "Walls, villas, and gardens create calm structure without heaviness." },
    { title: "Near our base", description: "The Lucca area sits close to the geography that shaped the brand itself." },
  ],
  whyWeFit: [
    { title: "Local point of view", description: "We know how Lucca connects to the broader rhythm of Upper Tuscany." },
    { title: "Emotion without noise", description: "The work stays refined, intimate, and visually articulate." },
  ],
  gallery: buildGallery([
    { id: "luccaEvening", layoutVariant: "portrait" },
    { id: "villaCourtyard", layoutVariant: "portrait" },
    { id: "welcomeDinnerLanterns", layoutVariant: "landscape", span: "lg" },
    { id: "homeCoupleQuiet", layoutVariant: "portrait" },
  ]),
  featuredStorySlugs: ["lucca-garden-weekend"],
  testimonial: {
    quote: "The Lucca atmosphere felt inseparable from the photographs. It all belonged together.",
    names: "Iris & Theo",
    location: "Lucca",
  },
  faqItems: [
    { question: "Do you know Lucca venues well?", answer: "Yes. We know the tone, movement, and visual rhythm of the Lucca area intimately." },
    { question: "Is Lucca good for wedding weekends?", answer: "Very. It balances elegance, accessibility, and the slower feel many couples want." },
    { question: "Do you photograph in Upper Tuscany too?", answer: "Yes. That is part of the brand’s core geography." },
  ],
  investmentNote: {
    heading: "Lucca weddings are quoted bespoke, with premium starting points.",
    body: ["Coverage reflects the shape of the celebration, the spaces involved, and the rhythm across the day or weekend."],
  },
  seo: {
    title: "Lucca Wedding Photographer",
    description:
      "Dolcevilla Studio photographs Lucca weddings with a refined, place-rooted editorial approach for international couples in Tuscany.",
    path: "/lucca-wedding-photographer",
  },
  villaIdentityVariant: "editorial",
  cta: {
    title: "Planning a Lucca wedding?",
    body: "Tell us where in Lucca or Upper Tuscany your celebration will unfold.",
    primaryCta: { label: "Start your inquiry", href: "/contact" },
  },
});
