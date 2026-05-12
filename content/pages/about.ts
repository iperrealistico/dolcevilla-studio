import { servicePageContentSchema } from "@/lib/content/schemas";
import { buildGallery } from "@/lib/images/imageManifest";
import { testimonials } from "@/content/site/testimonials";

export const aboutPage = servicePageContentSchema.parse({
  slug: "about",
  pageType: "about",
  hero: {
    eyebrow: "About Dolcevilla Studio",
    title:
      "A Tuscany wedding studio built on real film craft, dependable digital coverage, and clearly defined roles.",
    subtitle:
      "Dolcevilla Studio works from Villa Raffaelli in Garfagnana, near Lucca, with separate leads for creative direction, production, film handling, archive, postproduction, and final delivery. That structure is part of why the work feels calm to the couple and precise behind the scenes.",
    primaryCta: { label: "Start your inquiry", href: "/contact" },
    secondaryCta: {
      label: "Explore film coverage",
      href: "/film-wedding-photography",
      variant: "secondary",
    },
    imageIds: [
      "page.about.hero.primary",
      "page.about.hero.secondary",
      "page.about.hero.tertiary",
    ],
    variant: "editorial",
  },
  intro: {
    eyebrow: "Who we are",
    heading:
      "A real studio in Tuscany, with different hands responsible for different parts of the work.",
    body: [
      "This page matters because many studios talk about film, craft, and direction as if one person does everything equally well. Dolcevilla Studio is built differently. The photography, the planning, the film side, the archive, and the finishing all have clear ownership.",
      "That structure helps couples in practical ways. It means film is handled by people who actually work with negatives and scans, digital coverage stays reliable when the day speeds up, and the final gallery is shaped with continuity from the first conversation to the last exported file.",
    ],
  },
  team: {
    eyebrow: "The studio",
    heading:
      "Four principal leads, each responsible for a different part of the studio.",
    body: [
      "The visible core of Dolcevilla Studio sits with four people. Around them is a wider working circle of photographers, assistants, production support, and finishing hands who move to the same standard.",
      "For couples, that means the work stays personal without being fragile. There is a clear voice behind the studio, but also enough real structure to support destination weddings, film coverage, travel logistics, and careful delivery.",
    ],
    groupNote:
      "Beyond the four principal leads is a wider 10-plus-person studio handling second coverage, videography, digital photography, film processing support, archive discipline, assistants, logistics, and finishing to one shared standard.",
    supportingRoles: [],
    members: [
      {
        name: "Lisa Mazzei",
        role: "Creative Director and Lead Photographer",
        quote:
          "The photographs should feel close to the day itself, not inflated by direction that never belonged there.",
        imageId: "page.about.team.lisa",
      },
      {
        name: "Alberto Pellegrinetti",
        role: "Executive Producer, Client Lead, and Photographer",
        quote:
          "The best production is the one that keeps the day clear, calm, and easy for the couple from the beginning.",
        imageId: "page.about.team.alberto",
      },
      {
        name: "Leonardo Fiori",
        role: "Head of Film Lab, Archive, and Photographer",
        quote:
          "Film matters because it passes through real judgment at every stage, from exposure to scan to archive.",
        imageId: "page.about.team.leonardo",
      },
      {
        name: "Francesco Tarantino",
        role: "Head of Postproduction, Color, and Photographer",
        quote:
          "Finishing should protect skin, light, and texture, not smooth the life out of the pictures.",
        imageId: "page.about.team.francesco",
      },
    ],
  },
  gallery: buildGallery([
    { id: "page.about.gallery.1", layoutVariant: "portrait" },
    { id: "page.about.gallery.2", layoutVariant: "portrait" },
    { id: "page.about.gallery.3", layoutVariant: "landscape" },
    { id: "page.about.gallery.4", layoutVariant: "landscape" },
    { id: "page.about.gallery.5", layoutVariant: "landscape" },
    { id: "page.about.gallery.6", layoutVariant: "portrait" },
  ]),
  highlights: [
    {
      title: "Clear responsibilities",
      description:
        "Creative direction, production, film handling, archive, and finishing are not blurred into one vague promise. Different people carry different parts of the work.",
    },
    {
      title: "Real analog practice",
      description:
        "Film is part of the studio because there is real lab knowledge behind it: rolls, negatives, proofing, scans, archive discipline, and decisions made by people who know the material.",
    },
    {
      title: "A real Tuscany base",
      description:
        "Villa Raffaelli in Garfagnana is not just a visual backdrop. It is where the studio works, meets, plans, and builds its sense of place.",
    },
  ],
  craft: {
    variant: "editorial",
    eyebrow: "The craft",
    title:
      "The film side is real, and the digital side is treated with the same seriousness.",
    body:
      "35mm, medium format, selected large-format frames, and digital coverage all ask for different decisions. The point is not to mention formats for prestige. The point is to know what each one does well and who in the studio is responsible for carrying that standard through capture, scanning, color, and delivery.",
    imageId: "page.about.craft.image",
    points: [
      {
        title: "35mm for movement and energy",
        description:
          "Fast enough for arrivals, dinners, dance floors, flash, and the parts of a wedding that should still feel immediate.",
      },
      {
        title: "120 for portraits and detail",
        description:
          "Slower, richer, and better suited to faces, interiors, architecture, florals, and the frames that need more shape and depth.",
      },
      {
        title: "Large format for selected heirloom frames",
        description:
          "Used rarely and deliberately, when time, stillness, and collaboration line up for a few frames that deserve more ceremony.",
      },
      {
        title: "Darkroom literacy and finishing discipline",
        description:
          "The analog side does not stop at shooting. Proof sheets, negatives, scans, archive care, and final finishing all shape the way the studio works.",
      },
    ],
  },
  geography: {
    eyebrow: "Where the studio lives",
    heading:
      "Based at Villa Raffaelli in Garfagnana, near Lucca, with the rest of Tuscany within reach.",
    body: [
      "The studio works from the quieter mountain side of north Tuscany, not from a placeless office and not from a city borrowed only for marketing. That location shapes the pace of the work and gives the team a real relationship with the region.",
      "It also helps in practical terms. Couples planning from abroad often need advice on movement, weather, light, and which parts of Tuscany genuinely fit the celebration. Local knowledge matters more when it can actually guide decisions.",
    ],
    places: [
      "Villa Raffaelli",
      "Garfagnana",
      "Near Lucca",
      "North Tuscany",
      "Pisa",
      "Florence",
      "Versilia",
    ],
  },
  locationLinks: [
    {
      label: "Explore film coverage",
      href: "/film-wedding-photography",
      variant: "ghost",
    },
    { label: "See Villa Raffaelli", href: "/villa-raffaelli", variant: "ghost" },
    { label: "Start your inquiry", href: "/contact", variant: "ghost" },
  ],
  stories: [],
  testimonials: [...testimonials.home, ...testimonials.services],
  investmentNote: {
    eyebrow: "Why this structure matters",
    heading:
      "Good wedding photography depends on more than one person knowing how to use a camera.",
    body: [
      "When the planning, capture, film handling, archive, and finishing are all taken seriously, the result feels more coherent for the couple and more dependable under pressure. That is the standard the studio is built around.",
    ],
  },
  villa: {
    variant: "editorial",
    eyebrow: "Villa Raffaelli",
    title: "Villa Raffaelli matters because it is the studio's real base, not a brand prop.",
    body: "The villa is where the studio works and where its relationship with north Tuscany became concrete. It shaped the visual language, but it also houses the day-to-day discipline behind the work, from planning and hospitality to the film side of the practice.",
    imageId: "page.about.villa.image",
  },
  cta: {
    eyebrow: "Get in touch",
    title: "If you want to know who will actually shape the work, start here.",
    body: "Tell us your date, your venue, and what matters most to you in the photography. We will answer clearly about fit, approach, and how the studio would handle your celebration.",
    primaryCta: { label: "Start your inquiry", href: "/contact" },
    secondaryCta: {
      label: "Read the journal",
      href: "/journal",
      variant: "secondary",
    },
  },
  seo: {
    title: "About Dolcevilla Studio | Tuscany Wedding Photography Team",
    description:
      "Learn about Dolcevilla Studio, a Tuscany wedding photography team based at Villa Raffaelli near Lucca, with dedicated leads for direction, film lab, archive, postproduction, and hybrid coverage.",
    path: "/about",
    keywords: [
      "Dolcevilla Studio",
      "tuscany wedding photography team",
      "film and digital wedding photographers in tuscany",
      "lucca wedding photography studio",
      "villa raffaelli studio",
    ],
  },
});
