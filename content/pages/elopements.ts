import { servicePageContentSchema } from "@/lib/content/schemas";
import { buildGallery } from "@/lib/images/imageManifest";
import { faqs } from "@/content/site/faqs";

export const elopementsPage = servicePageContentSchema.parse({
  slug: "elopements",
  pageType: "service",
  hero: {
    eyebrow: "Intimate celebrations and elopements",
    title: "A quieter format for couples who want freedom, atmosphere, and room to feel.",
    subtitle:
      "We photograph elopements and intimate wedding days in Tuscany with an emphasis on place, movement, emotional honesty, and the tactile calm of hybrid analog coverage.",
    primaryCta: { label: "Plan your elopement", href: "/contact" },
    secondaryCta: { label: "See stories", href: "/journal", variant: "secondary" },
    imageIds: [
      "page.elopements.hero.primary",
      "page.elopements.hero.secondary",
      "page.elopements.hero.tertiary",
    ],
    variant: "service",
  },
  intro: {
    eyebrow: "Elopements",
    heading: "For couples who want intimacy over noise and a landscape that can actually breathe inside the day.",
    body: [
      "This work is for celebrations with a lighter rhythm, more freedom, and a deeper connection to Tuscany as a lived environment rather than a decorative backdrop.",
      "That quieter pace often makes film even more meaningful. Medium format and selected large-format frames can sit naturally inside an intimate day when there is room for stillness.",
    ],
  },
  gallery: buildGallery([
    { id: "page.elopements.gallery.1", layoutVariant: "portrait", span: "lg" },
    { id: "page.elopements.gallery.2", layoutVariant: "landscape", span: "lg" },
    { id: "page.elopements.gallery.3", layoutVariant: "landscape" },
    { id: "page.elopements.gallery.4", layoutVariant: "portrait" },
    { id: "page.elopements.gallery.5", layoutVariant: "portrait" },
  ]),
  highlights: [
    {
      title: "Freedom in structure",
      description: "The day can hold portraits, movement, quiet meals, and landscape in a way larger weddings often cannot.",
    },
    {
      title: "Film suits intimacy",
      description: "Elopements often give 120 medium format and selected large-format frames the quiet they need to become truly special.",
    },
    {
      title: "Guidance without pressure",
      description: "We help shape the day visually while protecting intimacy and emotional ease, never forcing the day around equipment.",
    },
  ],
  craft: {
    variant: "editorial",
    eyebrow: "Elopements on film",
    title: "The quieter the day, the more film can breathe.",
    body:
      "Elopements and intimate celebrations often create the exact conditions film needs: time, calm, and visual honesty. We can slow down without becoming precious, using traditional formats where they add emotional depth rather than spectacle.",
    imageId: "page.elopements.craft.image",
    points: [
      {
        title: "120 for portraits",
        description: "Medium format is ideal for intimate portraits, clothing details, and emotionally quiet space.",
      },
      {
        title: "Large format for rare frames",
        description: "In selected contexts, one or two large-format portraits can become true heirloom images.",
      },
      {
        title: "Digital keeps it effortless",
        description: "The day still flows naturally, with digital support wherever pace or unpredictability demands it.",
      },
    ],
  },
  stories: ["quarry-elopement", "35mm-120-large-format-wedding-photography"],
  investmentNote: {
    eyebrow: "Starting point",
    heading: "Intimate celebrations begin with a clear, premium baseline.",
    body: [
      "We price elopements with the same care and intentionality as larger weddings while adapting for the different rhythm, scale, and analog possibilities of a quieter day.",
    ],
  },
  villa: {
    variant: "quote",
    title: "Villa Raffaelli stays in the background, while craft and intimacy come forward.",
    body: "It still informs how we see stillness, architecture, and quiet intimacy, but the day itself is led by the emotional truth of the moment.",
    imageId: "page.elopements.villa.image",
  },
  faqs: faqs.elopements,
  cta: {
    title: "Planning an intimate Tuscany day?",
    body: "Share the landscape, the pace, and whether medium format, large format, or a quieter hybrid approach feels right to you.",
    primaryCta: { label: "Start your inquiry", href: "/contact" },
  },
  seo: {
    title: "Tuscany Elopement Photography",
    description:
      "Dolcevilla Studio photographs elopements and intimate wedding days in Tuscany with an editorial, place-rooted, film-aware approach shaped by atmosphere and emotional honesty.",
    path: "/elopements",
  },
});
