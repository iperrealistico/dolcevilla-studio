import { servicePageContentSchema } from "@/lib/content/schemas";
import { buildGallery } from "@/lib/images/imageManifest";
import { testimonials } from "@/content/site/testimonials";

export const homePage = servicePageContentSchema.parse({
  slug: "home",
  pageType: "home",
  hero: {
    eyebrow: "Dolcevilla Studio | Villa Raffaelli, North Tuscany",
    title:
      "Tuscany wedding photography shaped by film craft, digital reliability, and life at Villa Raffaelli.",
    subtitle:
      "We photograph weddings across Tuscany from our private villa studio near Lucca, using 35mm, medium format, and dependable digital coverage for couples who want beautiful images and expert guidance in equal measure.",
    primaryCta: { label: "Start your inquiry", href: "/contact" },
    secondaryCta: { label: "Read the journal", href: "/journal" },
    imageIds: [
      "page.home.hero.primary",
      "page.home.hero.secondary",
      "page.home.hero.tertiary",
      "page.home.hero.quaternary",
    ],
    variant: "home",
  },
  intro: {
    eyebrow: "Why Dolcevilla Studio",
    heading:
      "A real villa studio, a real darkroom culture, and a way of photographing that stays grounded in the day itself.",
    body: [
      "Villa Raffaelli is not a decorative backstory. It is our working base in north Tuscany, home to the studio and the analog culture behind it, from proofing and film handling to the slower visual discipline that comes with a real darkroom mindset.",
      "That craft matters because weddings move quickly. We use film where it adds depth, texture, and presence, and we rely on digital where pace, changing light, and full coverage need certainty. The result feels tactile without ever feeling risky.",
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
  highlights: [],
  craft: {
    variant: "editorial",
    eyebrow: "Film and digital",
    title: "Real film craft, backed by digital coverage.",
    body: "We do not sell film as nostalgia, and we do not use digital as a fallback story. We use each medium where it genuinely performs best, so the final work keeps the character of film and the dependability a wedding day deserves.",
    imageId: "page.home.craft.image",
    points: [
      {
        title: "35mm for energy",
        description:
          "Fast, alive, and perfect for arrivals, dinners, dancing, flash, and all the movement that should still feel immediate.",
      },
      {
        title: "120 for portraits and detail",
        description:
          "A slower, richer format for faces, fabrics, interiors, florals, and architecture when depth and shape matter most.",
      },
      {
        title: "Large format for selected frames",
        description:
          "Reserved for the rare moments that deserve more ceremony, more patience, and a stronger sense of permanence.",
      },
      {
        title: "Digital for pace and backup",
        description:
          "Essential for ceremonies, low light, family rhythm, fast transitions, and the kind of coverage that has to stay complete.",
      },
    ],
  },
  geography: {
    eyebrow: "Based in north Tuscany",
    heading:
      "A villa studio near Lucca, with the rest of Tuscany within reach.",
    body: [
      "Our studio is in Garfagnana, near Lucca, in the greener mountain side of Tuscany. From there we work across Florence, Versilia, Pisa, and beyond, helping couples make better decisions about locations, timing, light, and how the region should actually live inside the wedding.",
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
  locationLinks: [],
  stories: [],
  testimonials: testimonials.home,
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
  villa: {
    variant: "editorial",
    eyebrow: "Villa Raffaelli",
    title: "The villa matters because it is where the studio lives and works.",
    body: "Villa Raffaelli is part of the Home page because it is our real base in Tuscany, not because we need a myth around the brand. It shapes the way we see architecture, gardens, intimacy, and hospitality, and in selected cases it can also become part of a couple's portraits or private celebration.",
    imageId: "page.home.villa.image",
  },
  cta: {
    eyebrow: "Start here",
    title:
      "Planning a wedding in Tuscany and want photography with more substance behind it?",
    body: "Tell us your date, your venue, and whether film is an important part of the photography. We will reply with honest guidance on fit, coverage, and the right balance of film and digital for your day.",
    primaryCta: { label: "Start your inquiry", href: "/contact" },
    secondaryCta: {
      label: "Read the journal",
      href: "/journal",
      variant: "secondary",
    },
  },
  seo: {
    title: "Tuscany Wedding Photographer | Dolcevilla Studio",
    description:
      "Dolcevilla Studio is a Tuscany wedding photographer based at Villa Raffaelli near Lucca, offering film craft, dependable digital coverage, and clear local guidance for couples planning in Italy.",
    path: "/",
    keywords: [
      "tuscany wedding photographer",
      "destination wedding photographer tuscany",
      "film wedding photographer tuscany",
      "lucca wedding photographer",
      "north tuscany wedding photographer",
    ],
  },
});
