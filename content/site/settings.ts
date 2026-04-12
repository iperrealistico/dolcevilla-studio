import { siteSettingsSchema } from "@/lib/content/schemas";

export const siteSettings = siteSettingsSchema.parse({
  siteName: "Dolcevilla Studio",
  siteUrl: "https://dolcevilla.studio",
  defaultTitle: "Dolcevilla Studio | Tuscany Wedding Photography",
  titleTemplate: "%s | Dolcevilla Studio",
  defaultDescription:
    "Premium Tuscany wedding photography shaped by Upper Tuscany, Villa Raffaelli, and a hybrid film-plus-digital craft for couples who want atmosphere, authenticity, and a real sense of place.",
  defaultOgImage: "/og/default-og.svg",
  contactEmail: "hello@dolcevilla.studio",
  instagramUrl: "https://instagram.com/dolcevillastudio",
  primaryCTA: {
    label: "Start your inquiry",
    href: "/contact",
    variant: "primary",
  },
  footerStatement:
    "Dolcevilla Studio is a Tuscany wedding photography studio shaped by Upper Tuscany, Villa Raffaelli, and a hybrid film-plus-digital approach for international couples who care about atmosphere, authenticity, and emotional depth.",
});
