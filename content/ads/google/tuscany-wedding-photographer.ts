import { adsLandingSchema } from "@/lib/content/schemas";
import { buildGallery } from "@/lib/images/imageManifest";

export const googleTuscanyAdsLanding = adsLandingSchema.parse({
  slug: "google-tuscany-wedding-photographer",
  channel: "google",
  hero: {
    title: "Tuscany wedding photographer for destination couples",
    subtitle: "Premium, place-rooted wedding photography across Tuscany with clear pricing signals and a calm inquiry process.",
    primaryCta: { label: "Check availability", href: "/contact" },
    imageIds: ["valDorciaCypressVows", "florenceLoggiaBlueHour"],
    variant: "ads",
  },
  proof: [
    { title: "Rooted in Tuscany", description: "Based in Upper Tuscany near Lucca with a deep knowledge of the region." },
    { title: "Built for international couples", description: "Clear communication, premium process, and destination wedding fluency." },
  ],
  gallery: buildGallery([
    { id: "florenceLoggiaBlueHour", layoutVariant: "portrait" },
    { id: "valDorciaCypressVows", layoutVariant: "landscape" },
    { id: "welcomeDinnerLanterns", layoutVariant: "landscape" },
  ]),
  caseStudySlug: "lucca-garden-weekend",
  pricingSignal: "Most couples invest from the high four figures upward.",
  faqItems: [
    { question: "Do you travel across Tuscany?", answer: "Yes." },
    { question: "Can you photograph full wedding weekends?", answer: "Absolutely." },
  ],
  seo: {
    title: "Tuscany Wedding Photographer | Ads Landing",
    description:
      "Conversion-focused Google Ads landing page for Tuscany wedding photographer campaigns by Dolcevilla Studio.",
    path: "/ads/google/tuscany-wedding-photographer",
    noindex: true,
  },
  cta: {
    title: "Tell us your date and place",
    body: "We’ll reply with the next step quickly and clearly.",
    primaryCta: { label: "Start your inquiry", href: "/contact" },
  },
});
