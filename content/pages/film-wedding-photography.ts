import {
  faqItemSchema,
  richSectionSchema,
  servicePageContentSchema,
} from "@/lib/content/schemas";
import { buildGallery } from "@/lib/images/imageManifest";
import { sharedSiteCta } from "@/content/site/sharedCta";

export const filmWeddingPhotographyPage = servicePageContentSchema.parse({
  slug: "film-wedding-photography",
  pageType: "service",
  hero: {
    eyebrow: "Film wedding photography in Tuscany",
    title:
      "Film wedding photography in Tuscany, with digital coverage that protects the day.",
    subtitle:
      "Dolcevilla Studio uses 35mm, medium format, selected large-format frames, and dependable digital backup so film can be a real part of the coverage without asking the wedding day to behave like a studio set.",
    primaryCta: { label: "Ask about film coverage", href: "/contact" },
    secondaryCta: {
      label: "Read the journal",
      href: "/journal",
      variant: "secondary",
    },
    imageIds: [],
    variant: "minimal",
  },
  intro: {
    eyebrow: "Why film still matters",
    heading:
      "Because film changes the photographs, and digital protects the wedding day.",
    body: [
      "Film gives weddings something digital does not: different highlight handling, real grain, a slower pace, and a physical negative behind the image. That difference is why we keep it in the work.",
      "But a wedding is not a controlled studio set. Ceremonies move quickly, light changes fast, and family moments do not repeat. That is why digital backup is built into the coverage from the beginning.",
    ],
  },
  gallery: buildGallery([
    {
      id: "page.film-wedding-photography.gallery.1",
      layoutVariant: "portrait",
    },
    {
      id: "page.film-wedding-photography.gallery.2",
      layoutVariant: "portrait",
    },
    {
      id: "page.film-wedding-photography.gallery.3",
      layoutVariant: "portrait",
    },
    {
      id: "page.film-wedding-photography.gallery.4",
      layoutVariant: "portrait",
    },
    {
      id: "page.film-wedding-photography.gallery.5",
      layoutVariant: "portrait",
    },
    {
      id: "page.film-wedding-photography.gallery.6",
      layoutVariant: "portrait",
    },
    {
      id: "page.film-wedding-photography.gallery.7",
      layoutVariant: "landscape",
    },
    {
      id: "page.film-wedding-photography.gallery.8",
      layoutVariant: "portrait",
    },
    {
      id: "page.film-wedding-photography.gallery.9",
      layoutVariant: "portrait",
    },
    {
      id: "page.film-wedding-photography.gallery.10",
      layoutVariant: "landscape",
    },
    {
      id: "page.film-wedding-photography.gallery.11",
      layoutVariant: "landscape",
    },
    {
      id: "page.film-wedding-photography.gallery.12",
      layoutVariant: "landscape",
    },
    {
      id: "page.film-wedding-photography.gallery.13",
      layoutVariant: "landscape",
    },
    {
      id: "page.film-wedding-photography.gallery.14",
      layoutVariant: "landscape",
    },
    {
      id: "page.film-wedding-photography.gallery.15",
      layoutVariant: "landscape",
    },
  ]),
  highlights: [],
  stories: [],
  testimonials: [],
  cta: {
    eyebrow: "Film inquiries",
    ...sharedSiteCta,
  },
  seo: {
    title: "Film Wedding Photographer in Tuscany | Dolcevilla Studio",
    description:
      "Dolcevilla Studio is a film wedding photographer in Tuscany, combining 35mm, medium format, selected large-format frames, digital backup, and real darkroom knowledge for full wedding coverage.",
    path: "/film-wedding-photography",
    keywords: [
      "film wedding photographer tuscany",
      "hybrid film and digital wedding photographer",
      "35mm wedding photographer italy",
      "medium format wedding photographer italy",
      "tuscany film wedding photography",
    ],
  },
});

export const filmWeddingPhotographyDetails = {
  formatsIntro: richSectionSchema.parse({
    eyebrow: "Formats in practice",
    heading: "Still photography and video on film do different jobs.",
    body: [
      "The first four boxes below belong to still photography. They shape how the photographs look, how quickly we can move, and which parts of the day film can honestly carry.",
      "Super 8 and 16mm are different. They belong to moving-image coverage on film, with a separate rhythm, a separate production weight, and a purpose that should never be confused with the photographic side.",
    ],
  }),
  formats: [
    {
      medium: "photography",
      title: "35mm for movement and flash",
      description:
        "Our fastest film-stills format. It suits arrivals, aperitivo, dinners, dancing, direct flash, and the parts of the day that should stay alive rather than overcomposed.",
      imageId: "page.film-wedding-photography.formats.35mm",
    },
    {
      medium: "photography",
      title: "120 for portraits and detail",
      description:
        "Medium format slows the rhythm down for faces, fabrics, interiors, florals, and quieter portraits where shape, tonal depth, and skin matter more than speed.",
      imageId: "page.film-wedding-photography.formats.120",
    },
    {
      medium: "photography",
      title: "Large format for selected heirloom stills",
      description:
        "Used sparingly for a few deliberate photographs. It asks for stillness, time, and collaboration, so it belongs to the rare frames that can carry more ceremony.",
      imageId: "page.film-wedding-photography.formats.large-format",
    },
    {
      medium: "photography",
      title: "Digital for pace and redundancy",
      description:
        "This is still photography too, but it protects different pressures: ceremonies, low light, family movement, fast transitions, and the moments that cannot ask the day to slow down.",
      imageId: "page.film-wedding-photography.formats.digital",
    },
    {
      medium: "video",
      title: "Super 8 for atmosphere and guest energy",
      description:
        "This is motion film, not photography. It works best for arrivals, welcome dinners, aperitivo, and loose fragments where grain, movement, anticipation, and mood matter more than exhaustive coverage.",
      imageId: "page.film-wedding-photography.formats.super-8",
    },
    {
      medium: "video",
      title: "16mm for a fuller cinematic chapter",
      description:
        "Also motion film, but with more weight and intention than Super 8. It suits couples who want moving images on film to feel more composed, more authored, and more deliberately built.",
      imageId: "page.film-wedding-photography.formats.16mm",
    },
  ],
  whyBothIntro: richSectionSchema.parse({
    eyebrow: "Why not film only",
    heading: "Why we do not promise film-only wedding coverage.",
    body: [
      "A wedding is too fast, too emotional, and too unpredictable to treat like a studio exercise. Doing both well is what makes the coverage beautiful and trustworthy at the same time.",
    ],
  }),
  whyBoth: [] as { title: string; description: string }[],
  darkroom: richSectionSchema.parse({
    eyebrow: "The darkroom",
    heading: "The darkroom matters because it keeps the film promise honest.",
    body: [
      "The analog side of the studio is not decorative. The darkroom ties the work back to proof sheets, negatives, exposure judgment, scanning discipline, and a physical relationship with the image that goes beyond simply buying film cameras.",
      "That knowledge shapes the whole workflow. It influences how we expose, how we edit, how we sequence, how we think about print, and how we protect the difference between real film work and a digital imitation of it.",
    ],
  }),
  darkroomGallery: buildGallery([]),
  faqs: [
    {
      question: "Do you always shoot film?",
      answer:
        "Yes. One photographer always works with film as part of the coverage. The balance between film and digital changes with the day, but hybrid craft is part of the studio from the beginning.",
    },
    {
      question: "Can we ask for more film or more specific formats?",
      answer:
        "Absolutely. Some couples care especially about 35mm candor, others about medium-format portraits, and some want a few large-format heirloom frames. We can shape the proposal around that.",
    },
    {
      question: "Is large format realistic on a wedding day?",
      answer:
        "Yes, but only in selected moments. Large format is not for everything. It is for a few quiet frames where patience and stillness can genuinely exist.",
    },
    {
      question: "Does the darkroom mean everything is processed in-house?",
      answer:
        "What matters most is that the analog side of the studio is grounded in real darkroom and proofing practice. That knowledge shapes how we expose, edit, sequence, scan, and protect the integrity of the film work.",
    },
  ].map((item) => faqItemSchema.parse(item)),
} as const;
