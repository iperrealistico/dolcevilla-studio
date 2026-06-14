import { servicePageContentSchema } from "@/lib/content/schemas";
import { buildGallery } from "@/lib/images/imageManifest";
import { faqs } from "@/content/site/faqs";
import { sharedSiteCta } from "@/content/site/sharedCta";

export const studioPage = servicePageContentSchema.parse({
  slug: "studio",
  pageType: "service",
  hero: {
    eyebrow: "The studio",
    title:
      "A private studio setting in Tuscany, used only when it truly fits.",
    subtitle:
      "The Studio is Dolcevilla Studio's private base in Garfagnana, near Lucca. It is not a public venue. In selected cases, it can host portraits, private vows, or a very intimate wedding day for couples who want privacy, atmosphere, and a quieter rhythm.",
    primaryCta: { label: "Ask about the studio", href: "/contact" },
    secondaryCta: {
      label: "See the journal",
      href: "/journal",
      variant: "secondary",
    },
    imageIds: [],
    variant: "minimal",
  },
  intro: {
    eyebrow: "What makes it different",
    heading:
      "A real private studio setting in Tuscany, offered only when it truly fits.",
    body: [
      "The Studio is where Dolcevilla Studio is based: a real place in Garfagnana, not a rental location invented for a campaign. The rooms, gardens, stone surfaces, and mountain light are part of the way we work every day.",
      "It is not meant for everyone. We suggest the studio only when a couple genuinely wants privacy, intimacy, and a place with its own life rather than a high-volume venue built around turnover.",
    ],
  },
  gallery: buildGallery([
    {
      id: "page.studio.gallery.1",
      layoutVariant: "landscape",
      span: "lg",
    },
    { id: "page.studio.gallery.2", layoutVariant: "portrait" },
    { id: "page.studio.gallery.3", layoutVariant: "portrait" },
  ]),
  highlights: [],
  craft: {
    variant: "editorial",
    eyebrow: "Best use cases",
    title: "Our studio can also be a venue.",
    body: "Some couples come for portraits only. Some want a private exchange of vows. Some are planning a very intimate wedding and need a place that feels discreet, beautiful, and coherent from morning to evening. We do not force the studio into every proposal. We use it only when it adds something real.",
    imageId: "page.studio.craft.image",
    points: [
      {
        title: "Portraits in privacy",
        description:
          "The studio offers architecture, gardens, and complete breathing room for portraits without the pressure or foot traffic of a public event property.",
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
          "The main celebration can happen elsewhere, while the studio becomes the place for getting ready, a first look, portraits, or a slower private chapter in the weekend.",
      },
    ],
  },
  geography: {
    eyebrow: "Where it is",
    heading:
      "In Garfagnana, on the greener and quieter mountain side of north Tuscany.",
    body: [
      "The Studio sits in Garfagnana, the mountain area north of Lucca. Couples who first imagine Tuscany only as cypress roads and classic valley views are often surprised by how much freshness, depth, and privacy this landscape offers.",
      "At the same time, the studio stays practical for movement through Lucca, Pisa, and the wider region. That balance between seclusion and access is a large part of why it suits the right couple.",
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
  locationLinks: [],
  stories: [],
  testimonials: [],
  faqs: faqs.studio,
  cta: {
    eyebrow: "Private inquiry",
    ...sharedSiteCta,
  },
  seo: {
    title: "Studio | Dolcevilla Studio",
    description:
      "Discover the private Dolcevilla Studio setting in Garfagnana near Lucca, available in selected cases for portraits, private vows, and intimate weddings in Tuscany.",
    path: "/studio",
    keywords: [
      "private studio wedding tuscany",
      "intimate tuscany studio setting",
      "private studio near lucca wedding",
      "garfagnana studio wedding",
      "dolcevilla studio",
    ],
  },
});
