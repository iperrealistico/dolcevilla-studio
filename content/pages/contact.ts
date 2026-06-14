import { servicePageContentSchema } from "@/lib/content/schemas";
import { sharedSiteCta } from "@/content/site/sharedCta";

export const contactPage = servicePageContentSchema.parse({
  slug: "contact",
  pageType: "contact",
  intro: {
    eyebrow: "Contact Dolcevilla Studio",
    heading:
      "Tell us your date, your locations, and what kind of celebration you are planning.",
    body: [
      "The most useful first message includes the date, the venue or area, the approximate guest count, and whether you are planning a wedding weekend, a one-day wedding, an intimate celebration, or an elopement.",
      "If film matters to you, say so. If the Studio is part of the conversation, say that too. We read every inquiry carefully and reply clearly about fit, availability, and next steps.",
    ],
  },
  process: [
    {
      title: "First conversation",
      description:
        "We begin with your date, your plans, your venue, and how important film is to the way you want the day remembered.",
    },
    {
      title: "Planning support",
      description:
        "We advise on timing, portrait rhythm, travel flow, and where film will add value without making the schedule harder.",
    },
    {
      title: "Wedding day coverage",
      description:
        "Film stays intentional, digital stays dependable, and the coverage never turns into a performance about cameras.",
    },
    {
      title: "Delivery",
      description:
        "Your gallery is edited for coherence, feeling, and the right balance between tactile film character and complete storytelling.",
    },
  ],
  locationLinks: [],
  formIntro: {
    eyebrow: "Inquiry form",
    heading: "Start your inquiry here",
    body: [
      "Share the essentials first. If you already know the venue, the guest count, and how important film is to you, include that now.",
      "If you are still planning from abroad and deciding between locations, say where you are in the process. That helps us answer in a way that is actually useful.",
    ],
  },
  nextSteps: [
    "We aim to reply within two business days.",
    "If the date is open and the fit looks right, we will suggest the next conversation.",
    "If film is a priority, tell us where you want it to matter most in the coverage.",
    "If the Studio is part of the plan, we keep that conversation private and specific to the actual use case.",
  ],
  cta: {
    eyebrow: "Start here",
    ...sharedSiteCta,
  },
  seo: {
    title: "Contact Dolcevilla Studio | Tuscany Wedding Photography Inquiry",
    description:
      "Contact Dolcevilla Studio to inquire about Tuscany wedding photography, wedding weekends, intimate celebrations, elopements, hybrid film coverage, and selected Studio use cases.",
    path: "/contact",
    keywords: [
      "contact dolcevilla studio",
      "contact tuscany wedding photographer",
      "inquire tuscany wedding photographer",
      "tuscany wedding photography inquiry",
    ],
  },
});
