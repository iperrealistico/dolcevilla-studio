import { locationLandingSchema } from "@/lib/content/schemas";
import { buildGallery } from "@/lib/images/imageManifest";

export const florenceLanding = locationLandingSchema.parse({
  slug: "florence-wedding-photographer",
  title: "Florence Wedding Photographer",
  hero: {
    title: "Florence weddings photographed with depth beyond the expected postcard.",
    subtitle: "For couples who want Florence with atmosphere, emotional restraint, and a stronger sense of editorial clarity.",
    primaryCta: { label: "Contact Dolcevilla Studio", href: "/contact" },
    imageIds: ["homePortraits", "homeReceptionNight"],
    variant: "landing",
  },
  intro: {
    heading: "Florence works best when it stays human.",
    body: ["We look for the layers beneath scale and iconography: quieter light, emotional pacing, and balance between grandeur and intimacy."],
  },
  whyThisPlaceMatters: [
    { title: "Historic intensity", description: "Florence brings visual richness quickly, so restraint matters." },
    { title: "International destination energy", description: "It draws couples who want beauty but still need clarity and calm." },
  ],
  whyWeFit: [
    { title: "Editorial balance", description: "We keep Florence elegant without turning it into a cliché." },
    { title: "Human pace", description: "We make room for intimacy inside a location that can otherwise feel overwhelming." },
  ],
  gallery: buildGallery([
    { id: "homePortraits", layoutVariant: "portrait" },
    { id: "homeReceptionNight", layoutVariant: "portrait" },
    { id: "homeUpperTuscany", layoutVariant: "landscape", span: "lg" },
    { id: "storyFrame", layoutVariant: "landscape" },
  ]),
  featuredStorySlugs: ["weekend-timeline-notes"],
  testimonial: {
    quote: "The images felt sophisticated and emotionally grounded at the same time.",
    names: "Leila & Owen",
    location: "Florence",
  },
  faqItems: [
    { question: "Do you photograph city weddings?", answer: "Yes, especially when the couple wants elegance without losing emotional softness." },
    { question: "Can Florence still feel intimate?", answer: "Absolutely, with the right structure and a photographic approach that values pacing." },
    { question: "Do you travel from Upper Tuscany?", answer: "Yes. Florence is within the region we regularly work across." },
  ],
  investmentNote: {
    heading: "Florence celebrations are quoted around scale, flow, and coverage depth.",
    body: ["We tailor collections so the experience remains premium and clear."],
  },
  seo: {
    title: "Florence Wedding Photographer",
    description:
      "Dolcevilla Studio photographs Florence weddings for international couples seeking editorial clarity, emotional depth, and a premium Tuscany perspective.",
    path: "/florence-wedding-photographer",
  },
  villaIdentityVariant: "minimal",
  cta: {
    title: "Planning in Florence?",
    body: "Share your date and venue vision and we’ll guide the next step.",
    primaryCta: { label: "Get in touch", href: "/contact" },
  },
});
