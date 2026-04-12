import { servicePageContentSchema } from "@/lib/content/schemas";
import { buildGallery } from "@/lib/images/imageManifest";

export const aboutPage = servicePageContentSchema.parse({
  slug: "about",
  pageType: "about",
  hero: {
    eyebrow: "About",
    title: "A Tuscany-rooted studio shaped by art, place, and emotional restraint.",
    subtitle:
      "Dolcevilla Studio was formed around Villa Raffaelli and a part of Tuscany that feels more layered, more private, and more surprising than the postcard version.",
    primaryCta: { label: "Get in touch", href: "/contact" },
    imageIds: ["villaLibraryPortrait", "villaCourtyard", "bridalPrepWindowSilk"],
    variant: "editorial",
  },
  intro: {
    eyebrow: "Who we are",
    heading: "We believe weddings are best photographed with taste, clarity, and a real relationship to place.",
    body: [
      "This is not a long biography page. It is a compact portrait of the visual world, geography, and perspective behind the work.",
    ],
  },
  gallery: buildGallery([
    { id: "villaLibraryPortrait", layoutVariant: "portrait" },
    { id: "villaCourtyard", layoutVariant: "portrait" },
    { id: "bridalPrepWindowSilk", layoutVariant: "portrait" },
    { id: "homeUpperTuscany", layoutVariant: "landscape", span: "lg" },
  ]),
  highlights: [
    {
      title: "Visual philosophy",
      description: "Emotion matters most when it is held inside strong composition, rhythm, and lived atmosphere.",
    },
    {
      title: "Upper Tuscany matters",
      description: "This quieter geography gives the brand its texture and distinction.",
    },
    {
      title: "International couples fit naturally",
      description: "We work well with couples who care about beauty, communication, and emotional intelligence.",
    },
  ],
  villa: {
    variant: "editorial",
    title: "Villa Raffaelli is our creative home, not our public product.",
    body: "It is where the brand’s taste, stillness, and point of view come from.",
  },
  cta: {
    title: "If this world feels close to yours, let’s talk.",
    body: "We’d love to hear about the place and feeling you’re planning.",
    primaryCta: { label: "Start your inquiry", href: "/contact" },
  },
  seo: {
    title: "About Dolcevilla Studio",
    description:
      "Learn more about Dolcevilla Studio, a Tuscany wedding photography brand rooted at Villa Raffaelli and shaped by art, place, and emotional clarity.",
    path: "/about",
  },
});
