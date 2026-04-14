import { servicePageContentSchema } from "@/lib/content/schemas";
import { buildGallery } from "@/lib/images/imageManifest";
import { faqs } from "@/content/site/faqs";
import { testimonials } from "@/content/site/testimonials";

export const weddingsPage = servicePageContentSchema.parse({
  slug: "weddings",
  pageType: "service",
  hero: {
    eyebrow: "Full weddings and wedding weekends",
    title: "For destination weddings that need more than coverage.",
    subtitle:
      "We photograph elegant multi-day celebrations in Tuscany with a calm editorial eye, a deep understanding of place, and a hybrid film-and-digital method built for real wedding rhythm.",
    primaryCta: { label: "Check availability", href: "/contact" },
    secondaryCta: { label: "View pricing", href: "/pricing", variant: "secondary" },
    imageIds: [
      "page.weddings.hero.primary",
      "page.weddings.hero.secondary",
      "page.weddings.hero.tertiary",
    ],
    variant: "service",
  },
  intro: {
    eyebrow: "Weddings",
    heading: "The full atmosphere matters: arrivals, dinners, stillness, family, landscape, and the pace between them.",
    body: [
      "We are especially suited to destination weddings and wedding weekends where emotional rhythm, multiple spaces, and a real sense of Tuscany are central to the experience.",
      "Film becomes part of that full narrative rather than a side request. We use it where texture, pace, and atmosphere matter most, while digital keeps the weekend complete and operationally dependable.",
    ],
  },
  gallery: buildGallery([
    { id: "page.weddings.gallery.1", layoutVariant: "portrait" },
    { id: "page.weddings.gallery.2", layoutVariant: "portrait", span: "lg" },
    { id: "page.weddings.gallery.3", layoutVariant: "landscape", span: "lg" },
    { id: "page.weddings.gallery.4", layoutVariant: "portrait" },
    { id: "page.weddings.gallery.5", layoutVariant: "portrait" },
    { id: "page.weddings.gallery.6", layoutVariant: "landscape" },
  ]),
  highlights: [
    {
      title: "Destination-fluent",
      description: "We understand the emotional and logistical rhythm of celebrations planned from abroad.",
    },
    {
      title: "Weekend-minded",
      description: "We photograph dinners, mornings, transitions, and family atmosphere as part of the full narrative.",
    },
    {
      title: "Hybrid by design",
      description: "35mm and medium format add texture and pacing, while digital keeps ceremonies, speeches, and moving parts fully covered.",
    },
  ],
  craft: {
    variant: "editorial",
    eyebrow: "Weddings on film",
    title: "Film belongs to the weekend, not just the portraits.",
    body:
      "Wedding weekends have enough breathing room for film to matter across more than one type of moment. That might mean 35mm at dinner, medium format through portraits, and selected large-format frames when a setting deserves real ceremony.",
    imageId: "page.weddings.craft.image",
    points: [
      {
        title: "35mm for movement",
        description: "Arrivals, dinners, dancing, transitions, and candid energy carry beautifully on 35mm.",
      },
      {
        title: "120 for portrait depth",
        description: "Portraits, still-life details, and architectural pauses gain weight and dimensionality on medium format.",
      },
      {
        title: "Digital for pace",
        description: "When the day accelerates, digital keeps the coverage responsive, safe, and complete.",
      },
    ],
  },
  stories: ["lucca-garden-weekend", "why-we-photograph-weddings-on-film-and-digital"],
  testimonials: testimonials.services,
  process: [
    { title: "Inquiry and call", description: "A focused first conversation around fit, pace, and the world of your celebration." },
    { title: "Planning support", description: "We shape visual rhythm, portrait timing, and where film should be used with purpose rather than novelty." },
    { title: "Wedding coverage", description: "Presence that is calm, attentive, visually exacting, and hybrid without ever feeling overcomplicated." },
    { title: "Gallery delivery", description: "A final edit that preserves the emotional architecture of the weekend and the tactile presence of film." },
  ],
  investmentNote: {
    eyebrow: "Starting point",
    heading: "Wedding coverage is positioned for premium destination celebrations.",
    body: [
      "Every proposal is tailored, but our pricing is designed for couples who want an intentional, high-touch experience with hybrid craft rather than a commodity booking.",
    ],
  },
  villa: {
    variant: "minimal",
    title: "Rooted in a real place, not trapped inside one.",
    body: "Villa Raffaelli shapes our visual point of view, but the work is equally defined by the seriousness of the photographic method.",
    imageId: "page.weddings.villa.image",
  },
  faqs: faqs.weddings,
  cta: {
    title: "Planning a wedding weekend in Tuscany?",
    body: "Tell us what kind of celebration you are building and what kind of atmosphere you want it to hold.",
    primaryCta: { label: "Start your inquiry", href: "/contact" },
  },
  seo: {
    title: "Tuscany Wedding Photography for Destination Weddings",
    description:
      "Dolcevilla Studio photographs destination weddings and wedding weekends in Tuscany with a premium editorial eye, hybrid film-and-digital craft, and a strong sense of place.",
    path: "/weddings",
  },
});
