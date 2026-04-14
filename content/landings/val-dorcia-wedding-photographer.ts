import { locationLandingSchema } from "@/lib/content/schemas";
import { buildGallery } from "@/lib/images/imageManifest";

export const valDorciaLanding = locationLandingSchema.parse({
  slug: "val-dorcia-wedding-photographer",
  title: "Val d’Orcia Wedding Photographer",
  hero: {
    title: "Val d’Orcia wedding photography with atmosphere instead of overstatement.",
    subtitle: "The landscape is iconic. The challenge is making it feel lived, intimate, and specific to you.",
    primaryCta: { label: "Plan your Val d’Orcia wedding", href: "/contact" },
    imageIds: [
      "landing.val-dorcia-wedding-photographer.hero.primary",
      "landing.val-dorcia-wedding-photographer.hero.secondary",
    ],
    variant: "landing",
  },
  intro: {
    heading: "When the landscape is this strong, direction matters even more.",
    body: ["We photograph Val d’Orcia with restraint so the place feels cinematic without overwhelming the people inside it."],
  },
  whyThisPlaceMatters: [
    { title: "Expansive landscapes", description: "The scale is generous and asks for thoughtful composition." },
    { title: "Destination magnetism", description: "Couples often choose it for atmosphere, space, and long-view beauty." },
  ],
  whyWeFit: [
    { title: "Landscape sensitivity", description: "We know how to use space without turning it into generic luxury imagery." },
    { title: "Calm pacing", description: "We keep the day grounded so the landscape supports the story rather than replacing it." },
  ],
  gallery: buildGallery([
    { id: "landing.val-dorcia-wedding-photographer.gallery.1", layoutVariant: "landscape", span: "lg" },
    { id: "landing.val-dorcia-wedding-photographer.gallery.2", layoutVariant: "portrait" },
    { id: "landing.val-dorcia-wedding-photographer.gallery.3", layoutVariant: "landscape" },
    { id: "landing.val-dorcia-wedding-photographer.gallery.4", layoutVariant: "portrait" },
  ]),
  featuredStorySlugs: ["upper-tuscany-guide"],
  testimonial: {
    quote: "The photographs gave the landscape gravity without letting it swallow the human story.",
    names: "Charlotte & Finn",
    location: "Val d’Orcia",
  },
  faqItems: [
    { question: "Do you travel to Val d’Orcia?", answer: "Yes. We travel across Tuscany and adapt the visual approach to the specific landscape." },
    { question: "Can portraits feel relaxed there?", answer: "Yes. We shape pace carefully so the scenery supports intimacy rather than spectacle." },
    { question: "Do you cover full weekends there too?", answer: "Absolutely." },
  ],
  investmentNote: {
    heading: "Collections are tailored around geography, timing, and coverage depth.",
    body: ["The more the landscape matters, the more carefully the day should be structured."],
  },
  seo: {
    title: "Val d’Orcia Wedding Photographer",
    description:
      "Premium Val d’Orcia wedding photography by Dolcevilla Studio for couples seeking atmosphere, intimacy, and a refined Tuscany perspective.",
    path: "/val-dorcia-wedding-photographer",
  },
  villaIdentityVariant: "minimal",
  cta: {
    title: "Thinking about Val d’Orcia?",
    body: "Tell us what kind of atmosphere you imagine for the day.",
    primaryCta: { label: "Check availability", href: "/contact" },
  },
});
