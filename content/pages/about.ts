import { servicePageContentSchema } from "@/lib/content/schemas";
import { sharedSiteCta } from "@/content/site/sharedCta";

export const aboutPage = servicePageContentSchema.parse({
  slug: "about",
  pageType: "about",
  hero: {
    eyebrow: "About Dolcevilla Studio",
    title:
      "A Tuscany wedding studio built on film craft, digital dependability, and clearly defined roles.",
    subtitle:
      "Dolcevilla Studio works from Garfagnana, near Lucca, with separate responsibility for creative direction, production, film handling, archive, postproduction, and final delivery. That structure helps the work feel calm to the couple and precise behind the scenes.",
    primaryCta: { label: "Start your inquiry", href: "/contact" },
    secondaryCta: {
      label: "Explore film coverage",
      href: "/film-wedding-photography",
      variant: "secondary",
    },
    imageIds: [],
    variant: "minimal",
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
      "Five principal leads, each responsible for a different part of the studio.",
    body: [
      "The visible core of Dolcevilla Studio sits with five people. Around them is a wider working circle of photographers, assistants, production support, and finishing hands who move to the same standard.",
      "For couples, that means the work stays personal without being fragile. There is a clear voice behind the studio, but also enough real structure to support destination weddings, film coverage, travel logistics, and careful delivery.",
    ],
    groupNote:
      "Beyond the five principal leads is a wider 10-plus-person studio handling second coverage, videography, digital photography, film processing support, archive discipline, assistants, logistics, and finishing to one shared standard.",
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
        role: "Photographer, Postproduction, and Final Image Finishing",
        quote:
          "Postproduction should give the gallery continuity and atmosphere, without polishing away the life the day already had.",
        imageId: "page.about.team.francesco",
      },
      {
        name: "Mirko Ciabatti",
        role: "16mm Film Videographer and Motion-Picture Coverage",
        quote:
          "Film motion should add rhythm, memory, and atmosphere to the day without turning the wedding into a second production.",
        imageId: "page.about.team.mirko",
      },
    ],
  },
  gallery: [],
  highlights: [],
  geography: {
    eyebrow: "Where the studio lives",
    heading:
      "Based in Garfagnana, near Lucca, with the rest of Tuscany within reach.",
    body: [
      "The studio works from the quieter mountain side of north Tuscany, not from a placeless office and not from a city borrowed only for marketing. That location shapes the pace of the work and gives the team a real relationship with the region.",
      "It also helps in practical terms. Couples planning from abroad often need advice on movement, weather, light, and which parts of Tuscany genuinely fit the celebration. Local knowledge matters more when it can actually guide decisions.",
    ],
    places: [
      "Studio",
      "Garfagnana",
      "Near Lucca",
      "North Tuscany",
      "Pisa",
      "Florence",
      "Versilia",
    ],
  },
  locationLinks: [],
  stories: [],
  testimonials: [],
  cta: {
    eyebrow: "Get in touch",
    ...sharedSiteCta,
  },
  seo: {
    title: "About Dolcevilla Studio | Tuscany Wedding Photography Team",
    description:
      "Learn about Dolcevilla Studio, a Tuscany wedding photography team based at a private studio near Lucca, with dedicated leads for direction, film lab, archive, postproduction, and hybrid coverage.",
    path: "/about",
    keywords: [
      "Dolcevilla Studio",
      "tuscany wedding photography team",
      "film and digital wedding photographers in tuscany",
      "lucca wedding photography studio",
      "private studio near lucca",
    ],
  },
});
