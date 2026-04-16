import {
  pointSchema,
  richSectionSchema,
  servicePageContentSchema,
} from "@/lib/content/schemas";
import { buildGallery } from "@/lib/images/imageManifest";
import { faqs } from "@/content/site/faqs";
import { testimonials } from "@/content/site/testimonials";

export const villaRaffaelliPage = servicePageContentSchema.parse({
  slug: "villa-raffaelli",
  pageType: "service",
  hero: {
    eyebrow: "Villa Raffaelli",
    title: "Our private creative base in the mountains of north Tuscany.",
    subtitle:
      "Villa Raffaelli is part of the studio’s identity, not because it is public, but because it remains private, unseen, and exclusive. In selected circumstances, it can become part of a couple’s portraits or a very intimate wedding day.",
    primaryCta: { label: "Ask about the villa", href: "/contact" },
    secondaryCta: {
      label: "Read the story of place",
      href: "/journal/villa-raffaelli-mornings",
      variant: "secondary",
    },
    imageIds: [
      "page.villa-raffaelli.hero.primary",
      "page.villa-raffaelli.hero.secondary",
      "page.villa-raffaelli.hero.tertiary",
      "page.villa-raffaelli.hero.quaternary",
    ],
    variant: "service",
  },
  intro: {
    eyebrow: "A private world",
    heading:
      "This is not a public venue pitch. It is the origin point of the eye behind Dolcevilla Studio.",
    body: [
      "Villa Raffaelli taught us quiet architecture, measured hospitality, mountain air, and the kind of beauty that does not need to announce itself. That atmosphere shaped the brand long before it ever became a page on the site.",
      "If a couple is interested, we can sometimes photograph there, and in the right circumstances it can also host a very small, deeply personal wedding. The key is fit: the villa only works when the day remains intimate, discreet, and true to the place.",
    ],
  },
  gallery: buildGallery([
    {
      id: "page.villa-raffaelli.gallery.1",
      layoutVariant: "landscape",
      span: "lg",
    },
    { id: "page.villa-raffaelli.gallery.2", layoutVariant: "portrait" },
    { id: "page.villa-raffaelli.gallery.3", layoutVariant: "portrait" },
    { id: "page.villa-raffaelli.gallery.4", layoutVariant: "portrait" },
    { id: "page.villa-raffaelli.gallery.5", layoutVariant: "portrait" },
    { id: "page.villa-raffaelli.gallery.6", layoutVariant: "portrait" },
    { id: "page.villa-raffaelli.gallery.7", layoutVariant: "landscape" },
    { id: "page.villa-raffaelli.gallery.8", layoutVariant: "landscape" },
  ]),
  highlights: [
    {
      title: "Private by nature",
      description:
        "The villa is not on a public booking circuit. That privacy is part of why it still feels rare and emotionally intact.",
    },
    {
      title: "Best at intimate scale",
      description:
        "Portraits, two-person vows, and very small celebrations feel natural here because the place rewards calm rather than spectacle.",
    },
    {
      title: "Rooted in north Tuscany",
      description:
        "Garfagnana gives the villa freshness, mountain distance, and easy reach to Lucca, Pisa, and the Cinque Terre side without losing seclusion.",
    },
  ],
  craft: {
    variant: "editorial",
    eyebrow: "How we use it",
    title:
      "Portraits, private vows, and small wedding days all live differently here.",
    body: "We only bring Villa Raffaelli into the conversation when the couple truly wants intimacy, architecture, mountain air, and discretion. The goal is never to force a venue story. The goal is to let the place become part of the imagery only when it genuinely belongs there.",
    imageId: "page.villa-raffaelli.craft.image",
    points: [
      {
        title: "Couple portraits",
        description:
          "The villa gives portraits space, stillness, and layered stone textures without the feeling of a crowded event property.",
      },
      {
        title: "Two-person ceremonies",
        description:
          "For vows that want privacy more than production, the setting can hold a deeply personal scale beautifully.",
      },
      {
        title: "Intimate weddings",
        description:
          "Very small wedding days can work here when the rhythm stays quiet, elegant, and genuinely limited in size.",
      },
      {
        title: "Part of a wider story",
        description:
          "Sometimes the villa belongs to portraits or a private interlude even when the main celebration happens elsewhere in Tuscany.",
      },
    ],
  },
  geography: {
    eyebrow: "Where it sits",
    heading: "Fresh mountain light, old stone, and a calmer side of Tuscany.",
    body: [
      "Villa Raffaelli is in Garfagnana, in the greener mountains of north Tuscany. That means cleaner air, more distance, and a different emotional temperature from the hotter, more predictable postcard version of the region.",
      "It remains close enough to Lucca and Pisa for practical movement, while still feeling connected to the upper landscapes that lead toward the Cinque Terre side. For the right couple, that balance of access and seclusion is exactly the appeal.",
    ],
    places: [
      "Garfagnana",
      "North Tuscany",
      "Lucca",
      "Pisa",
      "Cinque Terre side",
      "Mountain air",
    ],
  },
  locationLinks: [
    {
      label: "Experience",
      href: "/experience",
      variant: "ghost",
    },
    { label: "Film", href: "/film-wedding-photography", variant: "ghost" },
    {
      label: "Journal story",
      href: "/journal/villa-raffaelli-mornings",
      variant: "ghost",
    },
  ],
  stories: [
    "villa-raffaelli-mornings",
    "upper-tuscany-guide",
    "lucca-garden-weekend",
  ],
  testimonials: testimonials.home,
  investmentNote: {
    eyebrow: "Access and fit",
    heading: "This is discussed quietly, case by case.",
    body: [
      "Villa Raffaelli is not offered as a volume venue. If it becomes part of a proposal, it is because the scale, the couple, and the atmosphere are right for a place that is meant to remain private.",
    ],
  },
  faqs: faqs.villa,
  cta: {
    eyebrow: "Private inquiry",
    title: "If Villa Raffaelli feels like part of your story, tell us how.",
    body: "Share your date, your scale, and whether you are imagining portraits, private vows, or a very intimate wedding day. We will answer with discretion.",
    primaryCta: { label: "Start your inquiry", href: "/contact" },
    secondaryCta: {
      label: "Explore the journal",
      href: "/journal",
      variant: "secondary",
    },
  },
  seo: {
    title: "Villa Raffaelli | Private Creative Base In North Tuscany",
    description:
      "Discover Villa Raffaelli, the private creative base behind Dolcevilla Studio in Garfagnana, north Tuscany, available in selected circumstances for portraits and intimate weddings.",
    path: "/villa-raffaelli",
    keywords: [
      "villa raffaelli",
      "private tuscany wedding villa",
      "garfagnana intimate wedding",
      "north tuscany wedding photography",
    ],
  },
});

export const villaRaffaelliDetails = {
  identityIntro: richSectionSchema.parse({
    eyebrow: "Why it matters",
    heading:
      "The villa shaped the brand because it taught us restraint before it taught us spectacle.",
    body: [
      "Villa Raffaelli is part of the studio identity because it formed the pace of the eye: how to look at stone, silence, shadow, gardens, mountain weather, and rooms that carry memory without trying to perform for the camera.",
    ],
  }),
  identity: [
    {
      title: "Origin of the taste",
      description:
        "The brand’s sense of quiet beauty began here, long before it became part of the public-facing language of the studio.",
    },
    {
      title: "Architecture with calm",
      description:
        "Old surfaces, measured proportions, and mountain light slow the way we compose and help the imagery stay elegant rather than overstated.",
    },
    {
      title: "Atmosphere over spectacle",
      description:
        "The villa does not need grand gestures. Its strength is how naturally it holds intimacy, stillness, and emotional understatement.",
    },
    {
      title: "A real private home",
      description:
        "Because it has not been flattened into a public venue machine, it still feels lived, hidden, and rare in the best possible way.",
    },
  ].map((item) => pointSchema.parse(item)),
  celebrationsIntro: richSectionSchema.parse({
    eyebrow: "What belongs here",
    heading:
      "The right use is always intimate, deliberate, and quietly luxurious.",
    body: [
      "Not every celebration should happen at Villa Raffaelli. The ones that fit are the ones that want privacy, slowness, mountain air, and a sense that the place still belongs to itself.",
    ],
  }),
  celebrations: [
    {
      title: "Portrait sessions",
      description:
        "Some couples want the villa for portraits only, either because they are drawn to the setting itself or because they want a private editorial chapter around the wedding.",
    },
    {
      title: "Two-person vows",
      description:
        "For a ceremony stripped back to only what matters, the villa can hold an exchange of vows with unusual intimacy and calm.",
    },
    {
      title: "Very small weddings",
      description:
        "Small-scale celebrations can work beautifully here when the guest count stays limited and the intention is closeness rather than event spectacle.",
    },
    {
      title: "A quiet part of a larger weekend",
      description:
        "Even when the main wedding happens elsewhere, the villa can still become the place for a private first look, portraits, or a slower emotional pause.",
    },
  ].map((item) => pointSchema.parse(item)),
  privacyIntro: richSectionSchema.parse({
    eyebrow: "Why we keep it rare",
    heading: "The villa only keeps its meaning if it stays selective.",
    body: [
      "We are protective of Villa Raffaelli because scarcity alone is not the point. The point is preserving the emotional truth of a place that shaped the studio. If it became too available, it would stop feeling like itself.",
    ],
  }),
  privacy: [
    {
      title: "No public venue funnel",
      description:
        "We do not treat the villa like an open calendar where anyone can simply pick a date and pass through.",
    },
    {
      title: "Access begins with conversation",
      description:
        "We talk first about fit, scale, and intention before deciding whether the villa belongs in the proposal at all.",
    },
    {
      title: "Imagery is shown selectively",
      description:
        "Part of the allure is that the place remains largely unseen. We prefer discretion over constant exposure.",
    },
    {
      title: "The day must suit the place",
      description:
        "If a wedding needs a louder, larger, or more operational venue, we would rather say so honestly than force the villa into the wrong role.",
    },
  ].map((item) => pointSchema.parse(item)),
  accessNote: richSectionSchema.parse({
    eyebrow: "What we protect",
    heading: "Villa Raffaelli matters precisely because we do not overuse it.",
    body: [
      "We never want the villa to become a generic backdrop rented until all personality disappears. If we bring it into a couple’s story, it is because the people, the scale, and the sensibility are genuinely aligned with the place.",
      "That is why the conversation around Villa Raffaelli stays discreet from the beginning. Some couples ask for portraits there. Some ask whether a very intimate wedding can happen there. In either case, the answer depends on fit, not on volume.",
    ],
  }),
};
