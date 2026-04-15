import { servicePageContentSchema } from "@/lib/content/schemas";
import { buildGallery } from "@/lib/images/imageManifest";
import { testimonials } from "@/content/site/testimonials";

export const homePage = servicePageContentSchema.parse({
  slug: "home",
  pageType: "home",
  hero: {
    eyebrow: "Villa Raffaelli, Upper Tuscany",
    title:
      "Tuscany wedding photography shaped by Villa Raffaelli and built on real film expertise.",
    subtitle:
      "Dolcevilla Studio photographs weddings in Tuscany with a hybrid film-and-digital approach, deep local knowledge, and calm guidance for international couples planning from abroad.",
    primaryCta: { label: "Start your inquiry", href: "/contact" },
    secondaryCta: { label: "See selected stories", href: "/journal" },
    imageIds: [
      "page.home.hero.primary",
      "page.home.hero.secondary",
      "page.home.hero.tertiary",
      "page.home.hero.quaternary",
    ],
    variant: "home",
  },
  intro: {
    eyebrow: "Why couples choose us",
    heading:
      "A private Tuscan point of view, with the experience to use it well.",
    body: [
      "Villa Raffaelli is the private creative base behind the studio: a world of old stone, quiet architecture, and mountain air that shaped how we see Tuscany, intimacy, and atmosphere.",
      "That point of view is matched by working expertise. One photographer always carries film alongside digital coverage, moving between 35mm, 120 medium format, and selected large-format frames with the judgment to know where each tool belongs.",
    ],
  },
  gallery: buildGallery([
    { id: "page.home.gallery.1", layoutVariant: "portrait" },
    { id: "page.home.gallery.2", layoutVariant: "landscape" },
    { id: "page.home.gallery.3", layoutVariant: "portrait" },
    { id: "page.home.gallery.4", layoutVariant: "landscape" },
    { id: "page.home.gallery.5", layoutVariant: "portrait" },
    { id: "page.home.gallery.6", layoutVariant: "landscape" },
  ]),
  highlights: [
    {
      title: "Villa Raffaelli at the core",
      description:
        "The brand begins in a private place with real atmosphere, not in generic destination-wedding styling.",
    },
    {
      title: "Film expertise, not film rhetoric",
      description:
        "35mm, medium format, and large format are part of a serious working method used with experience, intent, and restraint.",
    },
    {
      title: "Guidance you can trust",
      description:
        "Most of our couples are planning from abroad and rely on us for clarity around timing, light, flow, and what will genuinely photograph well.",
    },
  ],
  craft: {
    variant: "editorial",
    eyebrow: "Film expertise",
    title: "Film and digital, used with judgment.",
    body: "We do not treat film as decoration or digital as a compromise. Film gives the work tactility, depth, and emotional weight. Digital protects pace, changing light, family rhythm, and full-story coverage. The strength is knowing where each medium does its best work.",
    imageId: "page.home.craft.image",
    points: [
      {
        title: "35mm for movement",
        description:
          "Loose, quick, and alive for arrivals, dinners, dancing, and the in-between moments that should still feel in motion.",
      },
      {
        title: "120 for portraits",
        description:
          "A slower, more dimensional portrait language for faces, fabrics, interiors, and architecture.",
      },
      {
        title: "Large format for stillness",
        description:
          "Reserved for the rare frames that deserve ceremony, patience, and a more permanent sense of presence.",
      },
      {
        title: "Digital for certainty",
        description:
          "Essential where speed, low light, family rhythm, and full-story reliability matter most.",
      },
    ],
  },
  geography: {
    eyebrow: "Our world",
    heading:
      "Villa Raffaelli, Lucca, and the quieter side of Tuscany.",
    body: [
      "We are based near Lucca, with Garfagnana, Florence, Versilia, Pisa, and the marble landscapes of Upper Tuscany all part of the world we know from the inside. That local knowledge helps us guide couples toward settings, light, and timing that feel refined rather than formulaic.",
    ],
    places: [
      "Villa Raffaelli",
      "Garfagnana",
      "Lucca",
      "Versilia",
      "Pisa",
      "Florence",
      "Massa Carrara",
    ],
  },
  locationLinks: [
    {
      label: "Tuscany",
      href: "/tuscany-wedding-photographer",
      variant: "ghost",
    },
    { label: "Lucca", href: "/lucca-wedding-photographer", variant: "ghost" },
    {
      label: "Florence",
      href: "/florence-wedding-photographer",
      variant: "ghost",
    },
    { label: "Film", href: "/film-wedding-photography", variant: "ghost" },
    { label: "Villa Raffaelli", href: "/villa-raffaelli", variant: "ghost" },
    {
      label: "Elopements",
      href: "/tuscany-elopement-photographer",
      variant: "ghost",
    },
  ],
  stories: [
    "lucca-garden-weekend",
    "why-we-photograph-weddings-on-film-and-digital",
    "35mm-120-large-format-wedding-photography",
  ],
  testimonials: testimonials.home,
  process: [
    {
      title: "Discovery",
      description:
        "We start with the celebration, the setting, and how important film is to your vision.",
    },
    {
      title: "Planning",
      description:
        "We advise on light, timing, portrait rhythm, and where film can add value without adding risk.",
    },
    {
      title: "Coverage",
      description:
        "Film stays intentional, digital stays dependable, and the day remains calm because the approach is already thought through.",
    },
    {
      title: "Delivery",
      description:
        "Your gallery is edited for atmosphere, coherence, and the right balance between tactile film character and complete story coverage.",
    },
  ],
  investmentNote: {
    eyebrow: "Investment",
    heading: "Most couples invest from the high four figures upward.",
    body: [
      "This is a premium service for couples who care about taste, film expertise, guidance, and dependable full-story coverage.",
    ],
  },
  villa: {
    variant: "editorial",
    eyebrow: "Villa Raffaelli",
    title: "The private origin of the studio, not a public venue pitch.",
    body: "We speak about Villa Raffaelli because it explains the taste, restraint, and atmosphere behind the work better than generic brand language ever could. It remains private, but it still shapes the eye behind the studio.",
    imageId: "page.home.villa.image",
  },
  cta: {
    eyebrow: "Inquire",
    title:
      "If Villa Raffaelli, Tuscany, and real film expertise matter to you, start here.",
    body: "Share your date, your setting, and how important film is to you. We will answer with clear guidance on fit, pacing, and the right balance of film and digital for your day.",
    primaryCta: { label: "Start your inquiry", href: "/contact" },
    secondaryCta: {
      label: "Explore the journal",
      href: "/journal",
      variant: "secondary",
    },
  },
  seo: {
    title: "Tuscany Wedding Photographer | Dolcevilla Studio",
    description:
      "Dolcevilla Studio is a Tuscany wedding photographer shaped by Villa Raffaelli, known for hybrid film-and-digital expertise and calm guidance for international couples planning in Italy.",
    path: "/",
    keywords: [
      "tuscany wedding photographer",
      "film wedding photographer tuscany",
      "lucca wedding photographer",
      "villa raffaelli wedding photography",
    ],
  },
});
