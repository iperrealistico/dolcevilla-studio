import { locationLandingSchema } from "@/lib/content/schemas";
import { buildGallery } from "@/lib/images/imageManifest";

export const chiantiLanding = locationLandingSchema.parse({
  slug: "chianti-wedding-photographer",
  title: "Chianti Wedding Photographer",
  hero: {
    title: "Chianti wedding photography with depth, movement, and restraint.",
    subtitle: "For celebrations that want warmth and elegance without generic countryside clichés.",
    primaryCta: { label: "Inquire for Chianti", href: "/contact" },
    imageIds: ["chiantiVineyardDinner", "oliveGardenCeremony"],
    variant: "landing",
  },
  intro: {
    heading: "Chianti works best when it stays specific.",
    body: ["We focus on warmth, hospitality, and rhythm rather than relying on generic Tuscany shorthand."],
  },
  whyThisPlaceMatters: [
    { title: "Hospitality-driven weekends", description: "Chianti often suits gatherings built around food, conversation, and long evenings." },
    { title: "Layered countryside", description: "The visual world is rich but can become repetitive without care." },
  ],
  whyWeFit: [
    { title: "Editorial clarity", description: "We keep the imagery articulate, not overloaded." },
    { title: "Weekend coverage fluency", description: "We know how to photograph dinners, gatherings, and movement with intention." },
  ],
  gallery: buildGallery([
    { id: "candlelitCourtyardToast", layoutVariant: "portrait" },
    { id: "chiantiVineyardDinner", layoutVariant: "landscape", span: "lg" },
    { id: "intimateGesture", layoutVariant: "portrait" },
    { id: "welcomeDinnerLanterns", layoutVariant: "landscape" },
  ]),
  featuredStorySlugs: ["lucca-garden-weekend"],
  testimonial: {
    quote: "The weekend felt textured, elegant, and completely ours in the final gallery.",
    names: "Eva & Matteo",
    location: "Chianti",
  },
  faqItems: [
    { question: "Do you cover multiple events in Chianti?", answer: "Yes. We often photograph dinners, welcome parties, and the wedding day as one connected story." },
    { question: "Will the work still feel personal in a popular area?", answer: "Yes. The key is selecting the right angle and visual rhythm for the specific celebration." },
    { question: "Are you based in Chianti?", answer: "No. We are based in Upper Tuscany but work across the region." },
  ],
  investmentNote: {
    heading: "Chianti collections are quoted bespoke around the weekend structure.",
    body: ["Our proposals stay clear, premium, and tailored rather than generic."],
  },
  seo: {
    title: "Chianti Wedding Photographer",
    description:
      "Dolcevilla Studio photographs Chianti weddings with a refined editorial approach for international couples planning destination celebrations in Tuscany.",
    path: "/chianti-wedding-photographer",
  },
  villaIdentityVariant: "minimal",
  cta: {
    title: "Planning in Chianti?",
    body: "Let’s talk about the places, gatherings, and atmosphere shaping your weekend.",
    primaryCta: { label: "Start your inquiry", href: "/contact" },
  },
});
