import { adsLandingSchema } from "@/lib/content/schemas";
import { buildGallery } from "@/lib/images/imageManifest";

export const metaTuscanyAdsLanding = adsLandingSchema.parse({
  slug: "meta-tuscany-wedding-photographer",
  channel: "meta",
  hero: {
    title: "A modern editorial wedding studio rooted in Tuscany",
    subtitle: "For couples who want atmosphere, emotional depth, and a direct path to inquiry.",
    primaryCta: { label: "See if we’re the right fit", href: "/contact" },
    imageIds: [
      "ads.meta.tuscany-wedding-photographer.hero.primary",
      "ads.meta.tuscany-wedding-photographer.hero.secondary",
      "ads.meta.tuscany-wedding-photographer.hero.tertiary",
    ],
    variant: "ads",
  },
  proof: [
    { title: "Distinctive sense of place", description: "Rooted at Villa Raffaelli and the quieter side of Upper Tuscany." },
    { title: "Premium experience", description: "Designed for international couples who value clarity as much as beauty." },
  ],
  gallery: buildGallery([
    { id: "ads.meta.tuscany-wedding-photographer.gallery.1", layoutVariant: "portrait" },
    { id: "ads.meta.tuscany-wedding-photographer.gallery.2", layoutVariant: "portrait" },
    { id: "ads.meta.tuscany-wedding-photographer.gallery.3", layoutVariant: "landscape" },
  ]),
  caseStudySlug: "villa-raffaelli-mornings",
  pricingSignal: "Most couples invest from the high four figures upward.",
  faqItems: [
    { question: "Is Tuscany your base?", answer: "Yes. We are based in Upper Tuscany near Lucca." },
    { question: "Do you only photograph large weddings?", answer: "No. We also photograph intimate celebrations and elopements." },
  ],
  seo: {
    title: "Meta Ads | Tuscany Wedding Photographer",
    description:
      "Meta Ads landing page for Dolcevilla Studio, designed for colder Tuscany wedding photography traffic.",
    path: "/ads/meta/tuscany-wedding-photographer",
    noindex: true,
  },
  cta: {
    title: "Tell us about your celebration",
    body: "We’ll reply with a thoughtful next step.",
    primaryCta: { label: "Start your inquiry", href: "/contact" },
  },
});
