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
    eyebrow: "Destination weddings in Tuscany",
    heading:
      "One photography experience for destination wedding weekends, intimate wedding days, and elopements in Tuscany.",
    body: [
      "Most couples come to us planning from abroad and need more than a photographer. They need clear help with timing, travel rhythm, light, portrait flow, and how to make Tuscany feel specific to their celebration. This page brings the whole offer together: multi-day weddings, one-day celebrations, and elopements handled with the same calm guidance, film knowledge, and dependable digital coverage.",
    ],
  },
  highlights: [
    {
      title: "Wedding weekends with full-story coverage",
      description:
        "Welcome dinners, full wedding days, poolside gatherings, and brunches need consistency, stamina, and a photographer who can keep the whole story coherent across several chapters.",
    },
    {
      title: "Elopements and intimate wedding days",
      description:
        "Smaller celebrations still need strong location judgment, portrait timing, and enough flexibility for the day to feel free instead of over-directed.",
    },
    {
      title: "Planning help that improves the day",
      description:
        "We help with light, travel flow, family rhythm, and where film genuinely belongs, so the photography supports the celebration instead of complicating it.",
    },
  ],
  craft: {
    variant: "editorial",
    eyebrow: "Film and digital",
    title: "Film adds character. Digital keeps the story complete.",
    body:
      "We do not offer one philosophy for bigger weddings and another for quieter days. The same hybrid method runs through both. Film brings texture, pace, and selectivity. Digital keeps ceremonies, fast transitions, weather changes, family movement, and low light fully covered.",
    imageId: "page.experience.craft.image",
    points: [
      {
        title: "Wedding weekends",
        description:
          "Multi-day coverage needs range: 35mm for movement and energy, medium format for portraits and detail, and digital for rhythm, pace, and dependable full-story coverage.",
      },
      {
        title: "Elopements and smaller days",
        description:
          "Smaller formats often give us more room for portraits, landscape, and selected medium-format or large-format frames without slowing the day in the wrong places.",
      },
      {
        title: "Planning around light and movement",
        description:
          "We help decide when portraits should happen, where travel time changes the schedule, and which parts of the day deserve a slower film approach.",
      },
      {
        title: "Coverage that stays quiet",
        description:
          "The cameras should serve the celebration. We keep the workflow clear and calm so you experience the day, not the machinery behind it.",
      },
    ],
  },
  geography: {
    eyebrow: "Where we work",
    heading:
      "Across Tuscany, with a real base in the north and a practical understanding of how the region behaves.",
    body: [
      "Our studio is based at Villa Raffaelli in Garfagnana, near Lucca, and we photograph destination weddings across Florence, Chianti, Val d'Orcia, Versilia, Pisa, and quieter corners couples often discover later in planning.",
      "That local perspective helps in practical ways: choosing where to stay, how far guests can comfortably move, when mountain light or coastal wind changes the plan, and which locations actually suit the scale of the celebration.",
    ],
    places: [
      "Garfagnana",
      "Lucca",
      "Florence",
      "Chianti",
      "Val d'Orcia",
      "Versilia",
      "Pisa",
    ],
  },
  locationLinks: [
    { label: "Read the journal", href: "/journal", variant: "ghost" },
    {
      label: "Explore film coverage",
      href: "/film-wedding-photography",
      variant: "ghost",
    },
    { label: "See Villa Raffaelli", href: "/villa-raffaelli", variant: "ghost" },
    { label: "Start your inquiry", href: "/contact", variant: "ghost" },
  ],
  stories: [],
  testimonials: [...testimonials.services, ...testimonials.home],
  process: [
    {
      title: "First conversation",
      description:
        "We start with your date, guest count, locations, and whether you are planning a wedding weekend, a one-day celebration, or an elopement.",
    },
    {
      title: "Planning support",
      description:
        "We help shape the timeline, travel flow, portrait windows, family rhythm, and the moments where film will add value without making the day more complicated.",
    },
    {
      title: "Coverage plan",
      description:
        "Before the wedding, we align on coverage priorities, location movement, weather alternatives, and how much of the story should be carried more heavily on film.",
    },
    {
      title: "Wedding day coverage",
      description:
        "On the day we stay calm and responsive, moving between film and digital as the pace changes without turning the coverage into a visible production.",
    },
    {
      title: "Final gallery",
      description:
        "The finished gallery keeps the celebration coherent from start to finish, with film character where it matters and digital completeness where it counts.",
    },
  ],
  investmentNote: {
    eyebrow: "Investment",
    heading:
      "Coverage is quoted around scale, travel, and the level of support the celebration needs.",
    body: [
      "A multi-day wedding weekend, a one-day destination wedding, and a two-person elopement do not need the same structure, but they all receive the same seriousness around planning, craft, and delivery.",
    ],
  },
  villa: {
    variant: "minimal",
    title: "Villa Raffaelli gives the studio a real base, not just a mailing address.",
    body: "Because the studio works from a private villa in Garfagnana, our knowledge of north Tuscany is lived and practical. In selected cases, the villa can also become part of portraits, private vows, or a very intimate wedding plan.",
    imageId: "page.experience.villa.image",
  },
  faqs: faqs.experience,
  cta: {
    eyebrow: "Start planning",
    title:
      "If you are planning a destination wedding in Tuscany, this is the right place to start.",
    body:
      "Tell us your date, your locations, your guest count, and whether you are planning a wedding weekend, a one-day celebration, or an elopement. We will reply with clear guidance on fit, coverage, and next steps.",
    primaryCta: { label: "Start your inquiry", href: "/contact" },
    secondaryCta: { label: "Read the journal", href: "/journal", variant: "secondary" },
  },
  seo: {
    title: "Destination Wedding Photographer Tuscany | Dolcevilla Studio",
    description:
      "Dolcevilla Studio is a destination wedding photographer in Tuscany, offering calm planning support, hybrid film-and-digital coverage, and local guidance for wedding weekends, intimate days, and elopements.",
    path: "/experience",
    keywords: [
      "destination wedding photographer tuscany",
      "tuscany elopement photographer",
      "wedding weekend photographer tuscany",
      "intimate wedding photographer tuscany",
      "tuscany wedding photography",
    ],
  },
});
