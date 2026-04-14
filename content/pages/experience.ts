import { servicePageContentSchema } from "@/lib/content/schemas";
import { faqs } from "@/content/site/faqs";
import { buildGallery } from "@/lib/images/imageManifest";

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
    eyebrow: "Experience",
    heading: "Calm, clear, and technically intentional from the first message to the final gallery.",
    body: [
      "We designed the process for international couples who need confidence, warmth, and a photographer who can translate both logistics and atmosphere into something clear.",
      "That includes knowing where film genuinely belongs, where digital must take over, and how to combine both without making the day feel like a workshop or performance.",
    ],
  },
  highlights: [
    {
      title: "First reply with substance",
      description: "We answer thoughtfully, not with a generic sales sequence.",
    },
    {
      title: "Hybrid coverage design",
      description: "One photographer always carries film, but we map the day so analog craft adds meaning rather than friction.",
    },
    {
      title: "Discreet presence",
      description: "Our approach on the day is attentive, emotionally tuned, and technically calm without becoming performative.",
    },
  ],
  craft: {
    variant: "editorial",
    eyebrow: "How it works",
    title: "Film for character. Digital for rhythm, speed, and certainty.",
    body:
      "A wedding day asks for range. Film gives the work a physical signature, but digital protects the moments that move too quickly, the light that shifts too fast, and the parts of the day that need reliability over ideology.",
    imageId: "page.experience.craft.image",
    points: [
      {
        title: "We assign film deliberately",
        description: "Portraits, transitions, morning preparation, dinners, and select quiet moments often suit film best.",
      },
      {
        title: "Digital keeps the story whole",
        description: "Ceremonies, speeches, fast family movement, and low-light coverage stay complete and secure.",
      },
      {
        title: "Nothing feels slowed down",
        description: "The workflow is designed around your day, not around showing off cameras.",
      },
    ],
  },
  stories: ["why-we-photograph-weddings-on-film-and-digital", "weekend-timeline-notes"],
  process: [
    { title: "Inquiry", description: "You share your date, place, and what the day should feel like." },
    { title: "Consultation", description: "We refine fit, rhythm, expectations, and whether certain moments deserve more analog weight." },
    { title: "Pre-wedding support", description: "We guide visual flow, portraits, and the parts of the timeline where film can breathe." },
    { title: "Coverage", description: "We photograph with calm, direction, emotional awareness, and a hybrid method that stays invisible to you." },
    { title: "Gallery", description: "Delivery prioritizes narrative pacing, atmosphere, clarity, and the tactile contribution of film." },
  ],
  villa: {
    variant: "minimal",
    title: "Our point of view begins in a real place and is protected by real craft.",
    body: "Villa Raffaelli still matters because it taught us quiet beauty and hospitality, but the studio is equally defined by the seriousness of how it works.",
    imageId: "page.experience.villa.image",
  },
  faqs: faqs.experience,
  cta: {
    title: "If you want clarity and atmosphere to coexist, we should talk.",
    body: "Tell us about your day and whether film, digital, or both feel important to you. We’ll reply with the next right step.",
    primaryCta: { label: "Inquire now", href: "/contact" },
  },
  seo: {
    title: "The Dolcevilla Studio Experience",
    description:
      "See how Dolcevilla Studio works with international couples across Tuscany, combining local knowledge with a calm hybrid film-and-digital process from inquiry to gallery delivery.",
    path: "/experience",
  },
});
