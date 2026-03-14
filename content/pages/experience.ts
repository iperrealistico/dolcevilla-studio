import { servicePageContentSchema } from "@/lib/content/schemas";
import { faqs } from "@/content/site/faqs";

export const experiencePage = servicePageContentSchema.parse({
  slug: "experience",
  pageType: "experience",
  intro: {
    eyebrow: "Experience",
    heading: "Calm, clear, and visually exacting from the first message to the final gallery.",
    body: [
      "We designed the process for international couples who need confidence, warmth, and a photographer who can translate both logistics and atmosphere into something clear.",
    ],
  },
  highlights: [
    {
      title: "First reply with substance",
      description: "We answer thoughtfully, not with a generic sales sequence.",
    },
    {
      title: "Planning support",
      description: "We help shape timing, flow, and how different parts of Tuscany actually behave in real light and movement.",
    },
    {
      title: "Discreet presence",
      description: "Our approach on the day is attentive and emotionally tuned without becoming performative.",
    },
  ],
  process: [
    { title: "Inquiry", description: "You share your date, place, and what the day should feel like." },
    { title: "Consultation", description: "We refine fit, rhythm, and expectations together." },
    { title: "Pre-wedding support", description: "We guide visual flow, portraits, and time where it matters." },
    { title: "Coverage", description: "We photograph with calm, direction, and emotional awareness." },
    { title: "Gallery", description: "Delivery prioritizes narrative pacing, atmosphere, and clarity." },
  ],
  villa: {
    variant: "minimal",
    title: "Our point of view begins at Villa Raffaelli.",
    body: "That private world shapes how we understand quiet beauty, hospitality, and the real texture of Tuscany.",
  },
  faqs: faqs.experience,
  cta: {
    title: "If you want clarity and atmosphere to coexist, we should talk.",
    body: "Tell us about your day and we’ll reply with the next right step.",
    primaryCta: { label: "Inquire now", href: "/contact" },
  },
  seo: {
    title: "The Dolcevilla Studio Experience",
    description:
      "See how Dolcevilla Studio works with international couples across Tuscany, from inquiry to gallery delivery, with local knowledge and a calm premium process.",
    path: "/experience",
  },
});
