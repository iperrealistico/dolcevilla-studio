import { richSectionSchema, ctaSectionSchema, seoSchema } from "@/lib/content/schemas";

export const journalPageContent = {
  intro: richSectionSchema.parse({
    eyebrow: "Journal",
    heading: "Stories, guides, and proof pages about place, process, and the craft behind the photographs.",
    body: [
      "The journal supports search, proof, and brand depth. It stays lighter than the commercial pages, but still carries the same editorial point of view, including the hybrid film-and-digital practice behind the work.",
    ],
  }),
  cta: ctaSectionSchema.parse({
    title: "Ready to turn the inspiration into something real?",
    body: "Tell us about your date, place, and the world you want your photographs to hold.",
    primaryCta: { label: "Start your inquiry", href: "/contact" },
  }),
  seo: seoSchema.parse({
    title: "Journal | Dolcevilla Studio",
    description:
      "Explore weddings, elopements, guides, planning notes, and stories of place from Dolcevilla Studio in Tuscany.",
    path: "/journal",
  }),
};
