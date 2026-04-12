import { adsLandingSchema } from "@/lib/content/schemas";
import { buildGallery } from "@/lib/images/imageManifest";

export const googleLuccaAdsLanding = adsLandingSchema.parse({
  slug: "google-lucca-wedding-photographer",
  channel: "google",
  hero: {
    title: "Lucca wedding photographer with a premium local perspective",
    subtitle: "Elegant, emotionally rich wedding photography for couples planning in Lucca and Upper Tuscany.",
    primaryCta: { label: "Inquire for Lucca", href: "/contact" },
    imageIds: ["luccaEvening", "villaCourtyard"],
    variant: "ads",
  },
  proof: [
    { title: "Close to Lucca", description: "Our base in Upper Tuscany makes Lucca a natural part of the brand world." },
    { title: "Weekend-friendly", description: "We cover destination weddings and multi-day celebrations with a calm visual rhythm." },
  ],
  gallery: buildGallery([
    { id: "luccaEvening", layoutVariant: "portrait" },
    { id: "villaCourtyard", layoutVariant: "portrait" },
    { id: "welcomeDinnerLanterns", layoutVariant: "landscape" },
  ]),
  caseStudySlug: "lucca-garden-weekend",
  pricingSignal: "Collections begin with a premium starting point and are tailored to the structure of the day.",
  faqItems: [
    { question: "Do you know Lucca well?", answer: "Yes, deeply." },
    { question: "Do you photograph wedding weekends?", answer: "Yes." },
  ],
  seo: {
    title: "Lucca Wedding Photographer | Ads Landing",
    description:
      "Conversion-focused Google Ads landing page for Lucca wedding photographer campaigns by Dolcevilla Studio.",
    path: "/ads/google/lucca-wedding-photographer",
    noindex: true,
  },
  cta: {
    title: "Share your Lucca plans",
    body: "We’ll reply with clarity, pricing fit, and next steps.",
    primaryCta: { label: "Start your inquiry", href: "/contact" },
  },
});
