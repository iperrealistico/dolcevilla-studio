import { locationLandingSchema } from "@/lib/content/schemas";
import { buildGallery } from "@/lib/images/imageManifest";

export const tuscanyLanding = locationLandingSchema.parse({
  slug: "tuscany-wedding-photographer",
  title: "Tuscany Wedding Photographer",
  hero: {
    eyebrow: "Search-ready landing",
    title: "Tuscany wedding photography with a real sense of place.",
    subtitle:
      "For international couples who want a Tuscany wedding photographer rooted in the region rather than passing through it.",
    primaryCta: { label: "Start your inquiry", href: "/contact" },
    secondaryCta: { label: "See weddings", href: "/weddings", variant: "secondary" },
    imageIds: ["homeUpperTuscany", "homeCoupleQuiet"],
    variant: "landing",
  },
  intro: {
    heading: "Tuscany is broad. The point of view matters.",
    body: [
      "We know Tuscany as a lived geography: elegant cities, quieter Upper Tuscany, the coast, and the landscapes between them.",
    ],
  },
  whyThisPlaceMatters: [
    { title: "Varied landscape", description: "From Lucca to Val d’Orcia, every corner asks for a different visual language." },
    { title: "Destination rhythm", description: "Tuscany celebrations often unfold over multiple days and spaces." },
  ],
  whyWeFit: [
    { title: "Local fluency", description: "We work with the region’s light, distances, and atmosphere from the inside." },
    { title: "Premium editorial eye", description: "The work is shaped to feel grounded, cinematic, and emotionally clear." },
  ],
  gallery: buildGallery([
    { id: "homeUpperTuscany", layoutVariant: "landscape", span: "lg" },
    { id: "homeCoupleQuiet", layoutVariant: "portrait" },
    { id: "homeReceptionNight", layoutVariant: "portrait" },
    { id: "marblePath", layoutVariant: "landscape" },
  ]),
  featuredStorySlugs: ["lucca-garden-weekend"],
  testimonial: {
    quote: "They understood Tuscany in a way that made the photographs feel lived rather than staged.",
    names: "Claire & Ben",
    location: "Tuscany",
  },
  faqItems: [
    {
      question: "Do you travel across Tuscany?",
      answer: "Yes. We photograph weddings across the region while keeping the work grounded in the specifics of each place.",
    },
    {
      question: "Do you work with destination couples?",
      answer: "Yes. Most of our couples are planning from abroad and need local knowledge paired with clear communication.",
    },
    {
      question: "Is Villa Raffaelli the venue?",
      answer: "No. It is our private creative home and brand origin, not a public venue funnel.",
    },
  ],
  investmentNote: {
    heading: "Most Tuscany wedding collections begin in the premium range.",
    body: ["We tailor proposals around coverage, geography, and the emotional structure of the celebration."],
  },
  seo: {
    title: "Tuscany Wedding Photographer",
    description:
      "Looking for a Tuscany wedding photographer? Dolcevilla Studio offers premium, place-rooted photography for international couples across Tuscany.",
    path: "/tuscany-wedding-photographer",
  },
  villaIdentityVariant: "minimal",
  cta: {
    title: "Planning a Tuscany wedding?",
    body: "Share the place and the feeling you want to preserve.",
    primaryCta: { label: "Check availability", href: "/contact" },
  },
});
