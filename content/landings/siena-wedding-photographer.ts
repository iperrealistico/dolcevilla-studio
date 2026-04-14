import { locationLandingSchema } from "@/lib/content/schemas";
import { buildGallery } from "@/lib/images/imageManifest";

export const sienaLanding = locationLandingSchema.parse({
  slug: "siena-wedding-photographer",
  title: "Siena Wedding Photographer",
  hero: {
    title: "Siena wedding photography with emotional clarity and old-world depth.",
    subtitle: "For couples who want the atmosphere of Siena held with restraint, taste, and a premium human experience.",
    primaryCta: { label: "Inquire for Siena", href: "/contact" },
    imageIds: [
      "landing.siena-wedding-photographer.hero.primary",
      "landing.siena-wedding-photographer.hero.secondary",
    ],
    variant: "landing",
  },
  intro: {
    heading: "Siena brings gravity. The work should still feel alive.",
    body: ["We use composition, pacing, and tone to keep the imagery elegant without becoming static or theatrical."],
  },
  whyThisPlaceMatters: [
    { title: "Historic weight", description: "Siena carries visual intensity and asks for compositional restraint." },
    { title: "Intimate grandeur", description: "It can feel both monumental and deeply human when approached carefully." },
  ],
  whyWeFit: [
    { title: "Taste over trend", description: "We are interested in depth, feeling, and strong editing rather than fashionable noise." },
    { title: "Atmosphere-led", description: "We preserve space, architecture, and emotional softness in balance." },
  ],
  gallery: buildGallery([
    { id: "landing.siena-wedding-photographer.gallery.1", layoutVariant: "portrait", span: "lg" },
    { id: "landing.siena-wedding-photographer.gallery.2", layoutVariant: "portrait" },
    { id: "landing.siena-wedding-photographer.gallery.3", layoutVariant: "portrait" },
    { id: "landing.siena-wedding-photographer.gallery.4", layoutVariant: "landscape" },
  ]),
  featuredStorySlugs: ["villa-raffaelli-mornings"],
  testimonial: {
    quote: "There was so much atmosphere in the gallery without anything feeling heavy-handed.",
    names: "Mina & Arthur",
    location: "Siena",
  },
  faqItems: [
    { question: "Do you work in Siena for destination weddings?", answer: "Yes. Siena is one of the Tuscan locations we photograph with a tailored approach." },
    { question: "Can the work stay intimate there?", answer: "Yes. We shape pace and framing so intimacy never gets lost." },
    { question: "Do you also photograph nearby countryside venues?", answer: "Absolutely." },
  ],
  investmentNote: {
    heading: "Siena coverage is tailored for premium destination events and wedding weekends.",
    body: ["We quote around the day’s structure and the world around it."],
  },
  seo: {
    title: "Siena Wedding Photographer",
    description:
      "Dolcevilla Studio photographs Siena weddings with editorial restraint, emotional depth, and a premium Tuscany perspective for international couples.",
    path: "/siena-wedding-photographer",
  },
  villaIdentityVariant: "minimal",
  cta: {
    title: "Planning in Siena?",
    body: "Share the day you’re imagining and we’ll guide the next step.",
    primaryCta: { label: "Contact Dolcevilla Studio", href: "/contact" },
  },
});
