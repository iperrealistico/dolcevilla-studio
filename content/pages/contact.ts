import { servicePageContentSchema } from "@/lib/content/schemas";

export const contactPage = servicePageContentSchema.parse({
  slug: "contact",
  pageType: "contact",
  intro: {
    eyebrow: "Contact Dolcevilla Studio",
    heading:
      "Tell us your date, your locations, and what kind of celebration you are planning.",
    body: [
      "The most useful first message includes the date, the venue or area, the approximate guest count, and whether you are planning a wedding weekend, a one-day wedding, an intimate celebration, or an elopement.",
      "If film matters to you, say so. If Villa Raffaelli is part of the conversation, say that too. We read every inquiry carefully and reply clearly about fit, availability, and next steps.",
    ],
  },
  craft: {
    variant: "minimal",
    eyebrow: "What helps us reply well",
    title: "A specific inquiry helps us give you a much better first answer.",
    imageId: "page.contact.craft.image",
    body: "You do not need a finished schedule before writing. But the clearer the starting details are, the more useful we can be from the first reply. We can help shape the day after that.",
    points: [
      {
        title: "Date and locations",
        description:
          "Tell us the date, the venue if you have it, and the part of Tuscany or Italy you are working with if the venue is still undecided.",
      },
      {
        title: "Celebration format",
        description:
          "Let us know whether this is a wedding weekend, a one-day wedding, an intimate wedding, or an elopement, and roughly how many people will be there.",
      },
      {
        title: "Film priorities",
        description:
          "If film is important, tell us whether you care most about 35mm candor, medium-format portraits, or simply the overall hybrid balance.",
      },
      {
        title: "Villa Raffaelli interest",
        description:
          "If you are asking about Villa Raffaelli, tell us whether you are thinking about portraits, private vows, or a very intimate wedding there.",
      },
    ],
  },
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
    "If Villa Raffaelli is part of the plan, we keep that conversation private and specific to the actual use case.",
  ],
  cta: {
    title:
      "If you want more context before writing, start with the film page and the journal.",
    body: "Those pages explain how film coverage works and give you useful Tuscany planning context before the conversation begins.",
    primaryCta: { label: "Explore film coverage", href: "/film-wedding-photography" },
    secondaryCta: {
      label: "Read the journal",
      href: "/journal",
    },
  },
  seo: {
    title: "Contact Dolcevilla Studio | Tuscany Wedding Photography Inquiry",
    description:
      "Contact Dolcevilla Studio to inquire about Tuscany wedding photography, wedding weekends, intimate celebrations, elopements, hybrid film coverage, and selected Villa Raffaelli use cases.",
    path: "/contact",
    keywords: [
      "contact dolcevilla studio",
      "contact tuscany wedding photographer",
      "inquire tuscany wedding photographer",
      "tuscany wedding photography inquiry",
    ],
  },
});
