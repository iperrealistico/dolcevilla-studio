import { locationLandingSchema } from "@/lib/content/schemas";
import { buildGallery } from "@/lib/images/imageManifest";

export const intimateWeddingLanding = locationLandingSchema.parse({
  slug: "intimate-wedding-in-tuscany",
  title: "Intimate Wedding in Tuscany",
  hero: {
    title: "For intimate weddings in Tuscany that feel soulful, elegant, and unforced.",
    subtitle: "A premium photography experience for smaller celebrations that still want atmosphere, depth, and direction.",
    primaryCta: { label: "Plan your intimate wedding", href: "/contact" },
    imageIds: ["intimateGesture", "homeReceptionNight"],
    variant: "landing",
  },
  intro: {
    heading: "Smaller does not mean lesser. It often means more room for feeling.",
    body: ["We work well with gatherings where intimacy, family, and place matter more than spectacle."],
  },
  whyThisPlaceMatters: [
    { title: "Space for atmosphere", description: "Smaller celebrations allow Tuscany to breathe inside the story." },
    { title: "Emotional access", description: "There is more room for gestures, silence, and family texture." },
  ],
  whyWeFit: [
    { title: "Quiet confidence", description: "We photograph intimate days with direction that never feels pushy." },
    { title: "Premium sensitivity", description: "The work stays elevated without becoming performative." },
  ],
  gallery: buildGallery([
    { id: "intimateGesture", layoutVariant: "portrait", span: "lg" },
    { id: "homeReceptionNight", layoutVariant: "portrait" },
    { id: "homeUpperTuscany", layoutVariant: "landscape", span: "lg" },
    { id: "homePortraits", layoutVariant: "portrait" },
  ]),
  featuredStorySlugs: ["quarry-elopement", "villa-raffaelli-mornings"],
  testimonial: {
    quote: "The photographs felt full of life and space, which is exactly what the day felt like.",
    names: "Hazel & Luca",
    location: "Upper Tuscany",
  },
  faqItems: [
    { question: "Do you photograph intimate weddings and not only elopements?", answer: "Yes. That is a major part of our work." },
    { question: "Can there still be a strong gallery with a smaller guest count?", answer: "Absolutely. Often the emotional density is even stronger." },
    { question: "Is this a good fit for destination couples?", answer: "Yes. Many of our couples are planning intimate Tuscany celebrations from abroad." },
  ],
  investmentNote: {
    heading: "Pricing reflects the quality of the experience, not just guest count.",
    body: ["We tailor proposals around structure, coverage, and what kind of day you are building."],
  },
  seo: {
    title: "Intimate Wedding in Tuscany Photographer",
    description:
      "Dolcevilla Studio photographs intimate weddings in Tuscany for couples who want elegance, atmosphere, and an emotionally rich photography experience.",
    path: "/intimate-wedding-in-tuscany",
  },
  villaIdentityVariant: "minimal",
  cta: {
    title: "Planning a smaller celebration in Tuscany?",
    body: "Tell us what intimacy means for your day and we’ll take it from there.",
    primaryCta: { label: "Get in touch", href: "/contact" },
  },
});
