import { locationLandingSchema } from "@/lib/content/schemas";
import { buildGallery } from "@/lib/images/imageManifest";

export const tuscanyElopementLanding = locationLandingSchema.parse({
  slug: "tuscany-elopement-photographer",
  title: "Tuscany Elopement Photographer",
  hero: {
    title: "Tuscany elopement photography for couples who want quiet, freedom, and place.",
    subtitle: "A lighter day structure with emotional honesty, local sensitivity, and an editorial visual language.",
    primaryCta: { label: "Plan your elopement", href: "/contact" },
    imageIds: ["intimateGesture", "marblePath"],
    variant: "landing",
  },
  intro: {
    heading: "An elopement can hold more feeling when it has room to breathe.",
    body: ["We photograph intimate Tuscany days for couples who want intimacy, landscape, and a more human rhythm."],
  },
  whyThisPlaceMatters: [
    { title: "Freedom", description: "Tuscany allows movement between architecture, landscape, and quiet meals or portraits." },
    { title: "Atmosphere", description: "The region carries emotional texture without needing heavy decoration." },
  ],
  whyWeFit: [
    { title: "Guided but gentle", description: "We help shape the day while protecting your freedom inside it." },
    { title: "Rooted perspective", description: "We know how to make the landscape feel real rather than generic." },
  ],
  gallery: buildGallery([
    { id: "intimateGesture", layoutVariant: "portrait", span: "lg" },
    { id: "marblePath", layoutVariant: "landscape", span: "lg" },
    { id: "homePortraits", layoutVariant: "portrait" },
    { id: "villaCourtyard", layoutVariant: "portrait" },
  ]),
  featuredStorySlugs: ["quarry-elopement"],
  testimonial: {
    quote: "It felt intimate and expansive at the same time, exactly the balance we hoped for.",
    names: "Elena & Jonah",
    location: "Tuscany",
  },
  faqItems: [
    { question: "Do you help shape elopement locations?", answer: "Yes. We can guide around rhythm, atmosphere, and how different Tuscan landscapes actually feel." },
    { question: "Can this be just portraits and vows?", answer: "Absolutely." },
    { question: "Is Villa Raffaelli available to book publicly?", answer: "No. It remains a private world that may enter the imagery only in selected contexts." },
  ],
  investmentNote: {
    heading: "Elopement collections begin with a premium baseline and scale with the structure of the day.",
    body: ["The best fit is for couples who value atmosphere, intentionality, and emotional depth."],
  },
  seo: {
    title: "Tuscany Elopement Photographer",
    description:
      "Dolcevilla Studio photographs Tuscany elopements and intimate celebrations with a calm editorial approach shaped by place, freedom, and emotional honesty.",
    path: "/tuscany-elopement-photographer",
  },
  villaIdentityVariant: "quote",
  cta: {
    title: "Considering a Tuscany elopement?",
    body: "Tell us what you want the day to feel like.",
    primaryCta: { label: "Start your inquiry", href: "/contact" },
  },
});
