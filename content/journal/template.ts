export const journalEntryTemplateContent = {
  breadcrumbs: {
    home: "Home",
    journal: "Journal",
  },
  articleIntro: {
    label: "Article",
  },
  fallbackArticleCtas: {
    sticky: {
      eyebrow: "Journal inquiry",
      title: "Planning something with place and atmosphere at its center?",
      body: "Tell us the world you are building and we will tell you how we would photograph it.",
      primaryCta: {
        label: "Start here",
        href: "/contact",
        variant: "primary",
      },
    },
    segue: {
      eyebrow: "See the studio approach",
      title: "Start with the studio world behind the photographs.",
      body: "If place, pacing, and film matter to you, begin with the wider Dolcevilla Studio approach before you decide how you want the day photographed.",
      primaryCta: {
        label: "Explore the studio",
        href: "/",
        variant: "secondary",
      },
    },
  },
  fallbackCta: {
    title: "Planning something with place and atmosphere at its center?",
    body: "Tell us about the world you’re building and we’ll take it from there.",
    primaryCta: {
      label: "Start your inquiry",
      href: "/contact",
      variant: "primary",
    },
  },
} as const;
