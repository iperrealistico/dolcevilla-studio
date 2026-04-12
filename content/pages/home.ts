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
      "Dolcevilla Studio creates emotionally rich wedding imagery through a hybrid film-and-digital approach shaped by Upper Tuscany, Villa Raffaelli, and the quiet rhythm of real places.",
    primaryCta: { label: "Start your inquiry", href: "/contact" },
    secondaryCta: { label: "See selected stories", href: "/journal" },
    imageIds: ["homeHeroVilla", "villaCourtyard", "homeCoupleQuiet", "villaLibraryPortrait"],
    variant: "home",
  },
  intro: {
    eyebrow: "Who we are",
    heading: "Not a template portfolio. A real place, a real craft, a real point of view.",
    body: [
      "We are a Tuscany-rooted wedding photography studio built around atmosphere, intimacy, and the physical truth of how an image feels when it has really been made.",
      "Villa Raffaelli is part of that world, but not the whole identity. One photographer always works with film alongside digital coverage, moving between 35mm, medium format, and selected large-format frames to keep the work tactile, intentional, and impossible to fake with a preset.",
    ],
  },
  gallery: buildGallery([
    { id: "filmCameraCollectionStudioTable", layoutVariant: "landscape" },
    { id: "filmNikonFVintageVillaLibrary", layoutVariant: "portrait" },
    { id: "filmRolleiflexBridalPrep", layoutVariant: "portrait" },
    { id: "filmHasselbladGroundGlassOliveCeremony", layoutVariant: "landscape" },
    { id: "filmHasselblad500cmWindowGarden", layoutVariant: "portrait" },
    { id: "darkroomHangingPrintsRedLight", layoutVariant: "landscape" },
  ]),
  highlights: [
    {
      title: "Rooted rather than generic",
      description: "We live Tuscany from the inside and photograph it with local sensitivity rather than postcard shorthand.",
    },
    {
      title: "Hybrid craft, not imitation",
      description: "Film gives the work a tactile, physical character. Digital keeps the story dependable, complete, and fast where it needs to be.",
    },
    {
      title: "Built for international couples",
      description: "Most of our couples are planning from abroad and need confidence, guidance, and visual direction they can trust.",
    },
  ],
  craft: {
    variant: "editorial",
    eyebrow: "Analog craft",
    title: "One photographer always carries film.",
    body:
      "We do not use film as a gimmick or a nostalgic accessory. It is part of the working method: 35mm for movement, 120 medium format for depth, and selected large-format frames when a moment deserves genuine stillness, all supported by digital coverage for speed, security, and completeness.",
    points: [
      {
        title: "35mm for energy",
        description: "Fast, tactile, and alive for arrivals, dinners, movement, and the in-between moments that should stay loose.",
      },
      {
        title: "120 for depth",
        description: "A slower portrait language for faces, fabrics, architecture, and the emotional weight of a frame.",
      },
      {
        title: "Digital for certainty",
        description: "Ceremonies, low light, family rhythm, and full-story delivery still need the precision and dependability of digital.",
      },
      {
        title: "Darkroom-minded",
        description: "Even our sequencing and edit rhythm are informed by proof sheets, print thinking, and analog discipline.",
      },
    ],
  },
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
    { label: "Film", href: "/film-wedding-photography", variant: "ghost" },
    { label: "Elopements", href: "/tuscany-elopement-photographer", variant: "ghost" },
  ],
  stories: ["lucca-garden-weekend", "why-we-photograph-weddings-on-film-and-digital", "35mm-120-large-format-wedding-photography"],
  testimonials: testimonials.home,
  process: [
    { title: "Inquiry", description: "A thoughtful first exchange focused on fit, place, and celebration rhythm." },
    { title: "Guidance", description: "Planning support around light, timing, and the moments where film can genuinely add depth." },
    { title: "Coverage", description: "Hybrid coverage that lets film stay tactile and intentional while digital protects pace and completeness." },
    { title: "Delivery", description: "A final gallery built with atmosphere, emotional pacing, visual coherence, and the physical character of film where it belongs." },
  ],
  investmentNote: {
    eyebrow: "Investment",
    heading: "Most couples invest from the high four figures upward.",
    body: [
      "We frame pricing clearly because the experience is designed for couples who value atmosphere, artistry, hybrid craft, and a deeply considered process.",
    ],
  },
  villa: {
    variant: "editorial",
    eyebrow: "Villa Raffaelli",
    title: "Our private creative home",
    body: "The villa is where our eye was formed: quiet architecture, lived-in beauty, and a cultivated way of seeing Tuscany. It remains the origin of the taste, not the whole definition of the studio.",
  },
  cta: {
    eyebrow: "Inquire",
    title: "If place matters to you, let’s begin there.",
    body: "Share your date, your setting, and whether film, digital, or both matter to the world you want your photographs to hold.",
    primaryCta: { label: "Start your inquiry", href: "/contact" },
    secondaryCta: { label: "Explore the journal", href: "/journal", variant: "secondary" },
  },
  seo: {
    title: "Tuscany Wedding Photographer | Dolcevilla Studio",
    description:
      "Dolcevilla Studio is a premium Tuscany wedding photography brand shaped by Upper Tuscany, Villa Raffaelli, and a hybrid film-plus-digital approach for couples seeking atmosphere, intimacy, and a true sense of place.",
    path: "/",
    keywords: ["tuscany wedding photographer", "lucca wedding photographer", "upper tuscany wedding photography"],
  },
});
