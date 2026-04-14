import { adsLandingSchema } from "@/lib/content/schemas";
import { buildGallery } from "@/lib/images/imageManifest";

export const metaElopementAdsLanding = adsLandingSchema.parse({
  slug: "meta-elopement-tuscany",
  channel: "meta",
  hero: {
    title: "Quiet, place-rooted elopements in Tuscany",
    subtitle: "For couples who want intimacy, beauty, and a refined photography experience.",
    primaryCta: { label: "Plan your day", href: "/contact" },
    imageIds: [
      "ads.meta.elopement-tuscany.hero.primary",
      "ads.meta.elopement-tuscany.hero.secondary",
    ],
    variant: "ads",
  },
  proof: [
    { title: "Elopement fluency", description: "We help shape intimate days with calm guidance and real local perspective." },
    { title: "Editorial but human", description: "The work feels elevated without losing emotional honesty." },
  ],
  gallery: buildGallery([
    { id: "ads.meta.elopement-tuscany.gallery.1", layoutVariant: "portrait" },
    { id: "ads.meta.elopement-tuscany.gallery.2", layoutVariant: "landscape" },
    { id: "ads.meta.elopement-tuscany.gallery.3", layoutVariant: "portrait" },
  ]),
  caseStudySlug: "quarry-elopement",
  pricingSignal: "Elopement collections begin with a premium baseline and scale with the structure of the day.",
  faqItems: [
    { question: "Can you help shape the location flow?", answer: "Yes." },
    { question: "Do you photograph intimate weddings too?", answer: "Absolutely." },
  ],
  seo: {
    title: "Meta Ads | Tuscany Elopement Photographer",
    description:
      "Meta Ads landing page for Tuscany elopements by Dolcevilla Studio, built for premium intimate celebration inquiries.",
    path: "/ads/meta/elopement-tuscany",
    noindex: true,
  },
  cta: {
    title: "Tell us how you want the day to feel",
    body: "We’ll help translate that into the right next step.",
    primaryCta: { label: "Start your inquiry", href: "/contact" },
  },
});
