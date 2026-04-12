import { servicePageContentSchema } from "@/lib/content/schemas";
import { buildGallery } from "@/lib/images/imageManifest";
import { testimonials } from "@/content/site/testimonials";

export const homePage = servicePageContentSchema.parse({
  slug: "home",
  pageType: "home",
  hero: {
    eyebrow: "Upper Tuscany wedding photography",
    title: "A private Tuscan world for couples who want beauty with depth.",
    subtitle:
      "Dolcevilla Studio creates emotionally rich wedding imagery rooted at Villa Raffaelli and shaped by the quiet rhythm of Upper Tuscany.",
    primaryCta: { label: "Start your inquiry", href: "/contact" },
    secondaryCta: { label: "See selected stories", href: "/journal" },
    imageIds: ["homeHeroVilla", "florenceLoggiaBlueHour", "welcomeDinnerLanterns", "valDorciaCypressVows"],
    variant: "home",
  },
  intro: {
    eyebrow: "Who we are",
    heading: "Not a template portfolio. A real place, a real point of view.",
    body: [
      "We are a Tuscany-rooted wedding photography studio built around atmosphere, intimacy, and a strong sense of place.",
      "Villa Raffaelli is our creative home in Upper Tuscany. It shapes the way we see light, movement, and emotional quiet without ever becoming a public venue pitch.",
    ],
  },
  gallery: buildGallery([
    { id: "homeCoupleQuiet", layoutVariant: "portrait", span: "lg" },
    { id: "oliveGardenCeremony", layoutVariant: "landscape", span: "lg" },
    { id: "bridalPrepWindowSilk", layoutVariant: "portrait" },
    { id: "homeReceptionNight", layoutVariant: "portrait" },
    { id: "villaLibraryPortrait", layoutVariant: "portrait" },
    { id: "versiliaSeasideWalk", layoutVariant: "landscape", span: "lg" },
  ]),
  highlights: [
    {
      title: "Rooted rather than generic",
      description: "We live Tuscany from the inside and photograph it with local sensitivity rather than postcard shorthand.",
    },
    {
      title: "Premium without theatre",
      description: "The experience is thoughtful, refined, and clear without slipping into empty luxury language.",
    },
    {
      title: "Built for international couples",
      description: "Most of our couples are planning from abroad and need confidence, guidance, and visual direction they can trust.",
    },
  ],
  geography: {
    eyebrow: "Our world",
    heading: "Upper Tuscany, Lucca, the coast, marble light, and the quieter side of the region.",
    body: [
      "We are based near Lucca, with Florence, Versilia, Viareggio, and the marble landscapes of Massa Carrara all part of the world we know deeply.",
    ],
    places: ["Lucca", "Versilia", "Pisa", "Florence", "Massa Carrara", "Cinque Terre side"],
  },
  locationLinks: [
    { label: "Tuscany", href: "/tuscany-wedding-photographer", variant: "ghost" },
    { label: "Lucca", href: "/lucca-wedding-photographer", variant: "ghost" },
    { label: "Florence", href: "/florence-wedding-photographer", variant: "ghost" },
    { label: "Elopements", href: "/tuscany-elopement-photographer", variant: "ghost" },
  ],
  stories: ["lucca-garden-weekend", "quarry-elopement", "upper-tuscany-guide"],
  testimonials: testimonials.home,
  process: [
    { title: "Inquiry", description: "A thoughtful first exchange focused on fit, place, and celebration rhythm." },
    { title: "Guidance", description: "Planning support around light, timing, and how the weekend should feel." },
    { title: "Delivery", description: "A final gallery built with atmosphere, emotional pacing, and visual coherence." },
  ],
  investmentNote: {
    eyebrow: "Investment",
    heading: "Most couples invest from the high four figures upward.",
    body: [
      "We frame pricing clearly because the experience is designed for couples who value atmosphere, artistry, and a deeply considered process.",
    ],
  },
  villa: {
    variant: "editorial",
    eyebrow: "Villa Raffaelli",
    title: "Our private creative home",
    body: "The villa is where our eye was formed: quiet architecture, lived-in beauty, and a cultivated way of seeing Tuscany without turning it into a sales pitch.",
  },
  cta: {
    eyebrow: "Inquire",
    title: "If place matters to you, let’s begin there.",
    body: "Share your date, your setting, and the world you want your photographs to hold.",
    primaryCta: { label: "Start your inquiry", href: "/contact" },
    secondaryCta: { label: "Explore the journal", href: "/journal", variant: "secondary" },
  },
  seo: {
    title: "Tuscany Wedding Photographer | Dolcevilla Studio",
    description:
      "Dolcevilla Studio is a premium Tuscany wedding photography brand rooted at Villa Raffaelli, crafted for international couples seeking atmosphere, intimacy, and a true sense of place.",
    path: "/",
    keywords: ["tuscany wedding photographer", "lucca wedding photographer", "upper tuscany wedding photography"],
  },
});
