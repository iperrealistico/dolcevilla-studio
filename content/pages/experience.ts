import { servicePageContentSchema } from "@/lib/content/schemas";
import { faqs } from "@/content/site/faqs";
import { buildGallery } from "@/lib/images/imageManifest";
import { testimonials } from "@/content/site/testimonials";

export const experiencePage = servicePageContentSchema.parse({
  slug: "experience",
  pageType: "experience",
  gallery: buildGallery([
    { id: "page.experience.gallery.1", layoutVariant: "portrait" },
    { id: "page.experience.gallery.2", layoutVariant: "landscape" },
    { id: "page.experience.gallery.3", layoutVariant: "landscape" },
    { id: "page.experience.gallery.4", layoutVariant: "portrait" },
  ]),
  intro: {
    eyebrow: "Weddings, elopements, and the full experience",
    heading:
      "One calm, complete photographic experience for wedding weekends, elopements, and intimate celebrations.",
    body: [
      "This is the page that brings the whole offer together: destination wedding weekends, intimate wedding days, and elopements shaped with the same editorial restraint, local sensitivity, and hybrid film-and-digital judgment.",
      "We work across different scales of celebration, but the underlying experience stays consistent: thoughtful guidance, calm presence, clear planning support, and imagery that lets Tuscany feel lived rather than generic.",
    ],
  },
  highlights: [
    {
      title: "Wedding weekends and full celebrations",
      description:
        "We photograph multi-day destination weddings with the emotional range, logistical calm, and full-story coverage they actually require.",
    },
    {
      title: "Elopements and intimate formats",
      description:
        "We also work beautifully with quieter celebrations where place, movement, portraits, and emotional freedom need more room to breathe.",
    },
    {
      title: "One consistent experience behind both",
      description:
        "Whether the day is large or quiet, the way we work stays the same: attentive, technically composed, and designed around atmosphere rather than performance.",
    },
  ],
  craft: {
    variant: "editorial",
    eyebrow: "How we work",
    title: "Film where it adds atmosphere. Digital where the story needs certainty.",
    body:
      "Wedding weekends and elopements ask for different pacing, but not different seriousness. We use film where tactility, stillness, and atmosphere deepen the work, and digital where pace, movement, changing light, or family rhythm need complete reliability.",
    imageId: "page.experience.craft.image",
    points: [
      {
        title: "Wedding weekends gain narrative depth",
        description:
          "35mm for movement, dinners, and transitions. 120 for portraits, architecture, and slower visual pauses. Digital wherever the weekend needs speed and certainty.",
      },
      {
        title: "Elopements give film room to breathe",
        description:
          "Smaller days often create the stillness that medium format and selected large-format frames need to feel emotionally true rather than theatrical.",
      },
      {
        title: "The workflow never takes over the day",
        description:
          "The point is not to showcase cameras. The point is to give the celebration the right visual language without turning the experience into a production exercise.",
      },
    ],
  },
  locationLinks: [
    { label: "Journal", href: "/journal", variant: "ghost" },
    { label: "Film", href: "/film-wedding-photography", variant: "ghost" },
    { label: "Villa Raffaelli", href: "/villa-raffaelli", variant: "ghost" },
    { label: "Contact", href: "/contact", variant: "ghost" },
  ],
  stories: [
    "lucca-garden-weekend",
    "quarry-elopement",
    "weekend-timeline-notes",
  ],
  testimonials: [...testimonials.services, ...testimonials.home],
  process: [
    {
      title: "Inquiry",
      description:
        "You tell us whether you are planning a wedding weekend, an intimate celebration, or an elopement, and what the day should feel like.",
    },
    {
      title: "Fit and direction",
      description:
        "We clarify pace, expectations, guest rhythm, portrait priorities, and where film should carry more weight inside your format.",
    },
    {
      title: "Planning support",
      description:
        "We help shape timing, visual flow, and how Tuscany should live inside the day, whether that means a hosted weekend or a much quieter structure.",
    },
    {
      title: "Coverage",
      description:
        "On the day we stay calm, discreet, and visually exacting, moving between film and digital without making the workflow visible to you.",
    },
    {
      title: "Gallery delivery",
      description:
        "The final edit is built around atmosphere, emotional clarity, and the right balance between tactile film character and full-story completeness.",
    },
  ],
  investmentNote: {
    eyebrow: "Investment",
    heading:
      "The pricing reflects a premium experience, whether the format is expansive or intimate.",
    body: [
      "Wedding weekends, elopements, and smaller celebrations are all quoted with the same seriousness around guidance, atmosphere, hybrid craft, and the level of attention the day deserves.",
    ],
  },
  villa: {
    variant: "minimal",
    title: "Our point of view begins in a real place and is protected by real craft.",
    body: "Villa Raffaelli still matters because it taught us quiet beauty and hospitality, but the studio is equally defined by the seriousness of how it works.",
    imageId: "page.experience.villa.image",
  },
  faqs: faqs.experience,
  cta: {
    title:
      "If you want one thoughtful experience behind the whole celebration, start here.",
    body:
      "Tell us what format you are planning, what kind of atmosphere matters to you, and whether film should play a visible role. We will reply with the next right step.",
    primaryCta: { label: "Inquire now", href: "/contact" },
  },
  seo: {
    title: "Tuscany Weddings, Elopements, And The Dolcevilla Studio Experience",
    description:
      "Discover the full Dolcevilla Studio experience for Tuscany wedding weekends, elopements, and intimate celebrations, shaped by calm guidance and hybrid film-and-digital craft.",
    path: "/experience",
  },
});
