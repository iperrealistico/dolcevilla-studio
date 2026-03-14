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
      "We photograph elopements and intimate wedding days in Tuscany with an emphasis on place, movement, and emotional honesty.",
    primaryCta: { label: "Plan your elopement", href: "/contact" },
    secondaryCta: { label: "See stories", href: "/journal", variant: "secondary" },
    imageIds: ["intimateGesture", "marblePath", "homeUpperTuscany"],
    variant: "service",
  },
  intro: {
    eyebrow: "Elopements",
    heading: "For couples who want intimacy over noise and a landscape that can actually breathe inside the day.",
    body: [
      "This work is for celebrations with a lighter rhythm, more freedom, and a deeper connection to Tuscany as a lived environment rather than a decorative backdrop.",
    ],
  },
  gallery: buildGallery([
    { id: "intimateGesture", layoutVariant: "portrait", span: "lg" },
    { id: "marblePath", layoutVariant: "landscape", span: "lg" },
    { id: "homeUpperTuscany", layoutVariant: "landscape" },
    { id: "homePortraits", layoutVariant: "portrait" },
    { id: "villaCourtyard", layoutVariant: "portrait" },
  ]),
  highlights: [
    {
      title: "Freedom in structure",
      description: "The day can hold portraits, movement, quiet meals, and landscape in a way larger weddings often cannot.",
    },
    {
      title: "Guidance without pressure",
      description: "We help shape the day visually while protecting intimacy and emotional ease.",
    },
    {
      title: "Subtle Villa Raffaelli connection",
      description: "The villa may enter the story quietly through portraits or atmosphere, never through public venue language.",
    },
  ],
  stories: ["quarry-elopement", "upper-tuscany-guide"],
  investmentNote: {
    eyebrow: "Starting point",
    heading: "Intimate celebrations begin with a clear, premium baseline.",
    body: [
      "We price elopements with the same care and intentionality as larger weddings while adapting for the different rhythm and scale.",
    ],
  },
  villa: {
    variant: "quote",
    title: "Villa Raffaelli stays in the background, but its atmosphere remains part of the eye.",
    body: "It informs how we see stillness, architecture, and quiet intimacy.",
  },
  faqs: faqs.elopements,
  cta: {
    title: "Planning an intimate Tuscany day?",
    body: "Share the landscape, the pace, and the emotional tone you want to preserve.",
    primaryCta: { label: "Start your inquiry", href: "/contact" },
  },
  seo: {
    title: "Tuscany Elopement Photography",
    description:
      "Dolcevilla Studio photographs elopements and intimate wedding days in Tuscany with an editorial, place-rooted approach shaped by atmosphere and emotional honesty.",
    path: "/elopements",
  },
});
