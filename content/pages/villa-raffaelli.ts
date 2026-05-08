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
    eyebrow: "Private villa in Tuscany",
    title:
      "A private villa in Tuscany for portraits, private vows, and very intimate weddings.",
    subtitle:
      "Villa Raffaelli is Dolcevilla Studio's private base in Garfagnana, near Lucca. It is not a public venue. In selected cases, it can host portraits, quiet ceremonies, or a small wedding day for couples who want privacy, character, and a slower pace.",
    primaryCta: { label: "Ask about the villa", href: "/contact" },
    secondaryCta: {
      label: "See the journal",
      href: "/journal",
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
    eyebrow: "What makes it different",
    heading:
      "A real private villa wedding setting in Tuscany, offered only when it truly fits.",
    body: [
      "Villa Raffaelli is where Dolcevilla Studio is based: a real villa in Garfagnana, not a rental location invented for a campaign. The rooms, gardens, stone surfaces, and mountain light are part of the way we work every day.",
      "It is not meant for everyone. We suggest the villa only when a couple genuinely wants privacy, intimacy, and a place with its own life rather than a high-volume venue built around turnover.",
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
        "Because Villa Raffaelli is a private property first, it still feels protected, personal, and free from the rhythm of constant public bookings.",
    },
    {
      title: "Best for intimate formats",
      description:
        "The villa is strongest for portraits, private vows, and very small wedding days where calm, discretion, and atmosphere matter more than scale.",
    },
    {
      title: "A quieter side of Tuscany",
      description:
        "Garfagnana gives the villa mountain air, deep privacy, and practical reach from Lucca and Pisa without the feeling of an overused postcard location.",
    },
  ],
  craft: {
    variant: "editorial",
    eyebrow: "Best use cases",
    title:
      "The villa works best when the scale stays calm and the reason for being there is clear.",
    body: "Some couples come for portraits only. Some want a private exchange of vows. Some are planning a very intimate wedding and need a place that feels discreet, beautiful, and coherent from morning to evening. We do not force the villa into every proposal. We use it when it adds something real.",
    imageId: "page.villa-raffaelli.craft.image",
    points: [
      {
        title: "Portraits in privacy",
        description:
          "The villa offers architecture, gardens, and complete breathing room for portraits without the pressure or foot traffic of a public event property.",
      },
      {
        title: "Private vows",
        description:
          "For couples who want a ceremony stripped back to what matters most, the setting gives privacy, calm, and a strong sense of place without needing a large production.",
      },
      {
        title: "Very intimate weddings",
        description:
          "Small wedding days can work beautifully here when the guest count stays limited and the format respects the quiet scale of the property.",
      },
      {
        title: "One part of a larger wedding weekend",
        description:
          "The main celebration can happen elsewhere, while the villa becomes the place for getting ready, a first look, portraits, or a slower private chapter in the weekend.",
      },
    ],
  },
  geography: {
    eyebrow: "Where it is",
    heading:
      "In Garfagnana, on the greener and quieter mountain side of north Tuscany.",
    body: [
      "Villa Raffaelli sits in Garfagnana, the mountain area north of Lucca. Couples who first imagine Tuscany only as cypress roads and classic valley views are often surprised by how much freshness, depth, and privacy this landscape offers.",
      "At the same time, the villa stays practical for movement through Lucca, Pisa, and the wider region. That balance between seclusion and access is a large part of why it suits the right couple.",
    ],
    places: [
      "Garfagnana",
      "North Tuscany",
      "Near Lucca",
      "Within reach of Pisa",
      "Mountain setting",
      "Private grounds",
    ],
  },
  locationLinks: [
    {
      label: "See the experience",
      href: "/experience",
      variant: "ghost",
    },
    {
      label: "Explore film coverage",
      href: "/film-wedding-photography",
      variant: "ghost",
    },
    { label: "Read the journal", href: "/journal", variant: "ghost" },
  ],
  stories: [],
  testimonials: testimonials.home,
  investmentNote: {
    eyebrow: "Access and availability",
    heading: "We discuss access privately, case by case.",
    body: [
      "Because Villa Raffaelli is a private property, we do not present it like a standard venue with fixed public availability. If you are interested, tell us the date, guest count, and how you imagine using it, and we will answer clearly about fit and feasibility.",
      "Sometimes the answer is yes for portraits and no for a full wedding day. That selectivity protects the place and helps couples choose it for the right reasons.",
    ],
  },
  faqs: faqs.villa,
  cta: {
    eyebrow: "Private inquiry",
    title: "Tell us how you imagine using the villa, and we will answer honestly.",
    body: "Share your date, guest count, and whether you are thinking about portraits, private vows, or a very intimate wedding in Tuscany. If Villa Raffaelli is the right fit, we will explain how access works from there.",
    primaryCta: { label: "Ask about Villa Raffaelli", href: "/contact" },
    secondaryCta: {
      label: "See the journal",
      href: "/journal",
      variant: "secondary",
    },
  },
  seo: {
    title: "Private Villa Wedding Tuscany | Villa Raffaelli",
    description:
      "Discover Villa Raffaelli, Dolcevilla Studio's private villa in Garfagnana near Lucca, available in selected cases for portraits, private vows, and intimate weddings in Tuscany.",
    path: "/villa-raffaelli",
    keywords: [
      "private villa wedding tuscany",
      "intimate tuscany wedding villa",
      "private villa near lucca wedding",
      "garfagnana wedding villa",
      "villa raffaelli",
    ],
  },
});

export const villaRaffaelliDetails = {
  identityIntro: richSectionSchema.parse({
    eyebrow: "Why this page exists",
    heading:
      "Villa Raffaelli is on the site because it is part of the studio, not because we needed a venue story.",
    body: [
      "This villa is where Dolcevilla Studio works, develops film, and welcomes selected couples. It is part of the studio's daily life, which is why it appears here honestly: as a real place that sometimes becomes part of the work.",
    ],
  }),
  identity: [
    {
      title: "The studio and darkroom are here",
      description:
        "Villa Raffaelli is our private base in Garfagnana, where the studio works every day and where the film side of the practice also lives.",
    },
    {
      title: "It shaped the way we photograph",
      description:
        "Old rooms, stone surfaces, gardens, and changing mountain light have shaped how we photograph people, architecture, and atmosphere.",
    },
    {
      title: "It stays a private home first",
      description:
        "We protect the villa as a real private property, which is why we do not run it like a venue built on constant turnover.",
    },
    {
      title: "It offers a different Tuscany",
      description:
        "For the right couple, the villa offers privacy, control, and a quieter north-Tuscany setting that feels distinct from more public wedding locations.",
    },
  ].map((item) => pointSchema.parse(item)),
  celebrationsIntro: richSectionSchema.parse({
    eyebrow: "When it makes sense",
    heading:
      "The villa is best for portraits, private vows, and very intimate wedding days.",
    body: [
      "The point is not to fit every wedding into the villa. The point is to use it when the scale is small enough, the privacy matters enough, and the atmosphere of the place adds something genuine.",
    ],
  }),
  celebrations: [
    {
      title: "Portrait sessions",
      description:
        "Some couples use the villa only for portraits because they want quiet time, architecture, and a setting that feels entirely their own.",
    },
    {
      title: "Private vows",
      description:
        "For a private exchange of vows, the villa offers discretion, calm, and a sense of place without needing a production-heavy setup.",
    },
    {
      title: "Very small weddings",
      description:
        "Small wedding days can work beautifully here when the guest count is limited and the plan respects the scale of the property.",
    },
    {
      title: "One part of a larger Tuscany story",
      description:
        "The main celebration may happen elsewhere, while the villa becomes the place for getting ready, a first look, portraits, or a slower private moment.",
    },
  ].map((item) => pointSchema.parse(item)),
  privacyIntro: richSectionSchema.parse({
    eyebrow: "How access works",
    heading: "Selectivity is part of the value, not a barrier added for effect.",
    body: [
      "We keep the process selective because Villa Raffaelli is a private villa first. Every inquiry starts with fit: the date, the number of guests, the privacy expectations, and whether the property is genuinely the right setting.",
    ],
  }),
  privacy: [
    {
      title: "No public booking calendar",
      description:
        "We do not list the villa like a standard venue with instant availability, fixed packages, and open public dates.",
    },
    {
      title: "The conversation comes first",
      description:
        "Before we discuss using the villa, we need to understand the kind of day you are planning and how much privacy you want from the setting.",
    },
    {
      title: "Use stays limited",
      description:
        "We keep approved use intentionally limited so the villa never loses the protected feeling that makes it special in the first place.",
    },
    {
      title: "Honest answers matter",
      description:
        "If your plans would be better served by a larger or more operational venue, we will say that clearly instead of forcing the villa into the wrong role.",
    },
  ].map((item) => pointSchema.parse(item)),
  accessNote: richSectionSchema.parse({
    eyebrow: "What that protects",
    heading: "The villa keeps its character because it is not treated like inventory.",
    body: [
      "Villa Raffaelli only works because it still feels lived in, protected, and specific to this studio. We want couples to experience that reality, not a polished shell exhausted by constant turnover.",
      "That is why some inquiries are a perfect fit for portraits but not for a wedding, or right for a private ceremony but not for a larger guest list. The answer depends on the actual use case, and we prefer that honesty over easy yeses.",
    ],
  }),
};
