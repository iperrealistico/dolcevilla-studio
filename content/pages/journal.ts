import { richSectionSchema, ctaSectionSchema, seoSchema } from "@/lib/content/schemas";

export const journalPageContent = {
  intro: richSectionSchema.parse({
    eyebrow: "Journal",
    heading:
      "A Tuscany wedding photography journal with venue guides, planning notes, and real wedding stories.",
    body: [
      "This is where Dolcevilla Studio shares useful articles for couples planning weddings in Tuscany: venue guides, practical planning notes, coverage ideas, and format-specific advice drawn from the way the studio actually works.",
      "Some pieces help you compare places, some answer the questions couples usually ask before they inquire, and some show how film, digital, timing, and light shape the final photographs. The goal is to help you make better decisions before the wedding day arrives.",
    ],
  }),
  cta: ctaSectionSchema.parse({
    eyebrow: "Planning your celebration",
    title: "When a guide helps you narrow the place, the format, or the pace, the next step is a real conversation.",
    body: "Tell us where in Tuscany you are getting married, whether film matters to you, and what kind of celebration you are planning. We will answer clearly about fit, coverage, and next steps.",
    primaryCta: { label: "Start your inquiry", href: "/contact" },
    secondaryCta: {
      label: "See the experience",
      href: "/experience",
      variant: "secondary",
    },
  }),
  seo: seoSchema.parse({
    title: "Tuscany Wedding Photography Journal | Dolcevilla Studio",
    description:
      "Read the Dolcevilla Studio journal for Tuscany wedding venue guides, planning notes, film and digital photography advice, and destination insights from a studio based near Lucca.",
    path: "/journal",
    keywords: [
      "tuscany wedding photography journal",
      "tuscany wedding guides",
      "tuscany wedding planning journal",
      "tuscany venue wedding guides",
      "film and digital wedding photography tuscany",
    ],
  }),
};
