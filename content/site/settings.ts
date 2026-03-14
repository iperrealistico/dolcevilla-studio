import { siteSettingsSchema } from "@/lib/content/schemas";

export const siteSettings = siteSettingsSchema.parse({
  siteName: "Dolcevilla Studio",
  siteUrl: "https://dolcevilla.studio",
  defaultTitle: "Dolcevilla Studio | Tuscany Wedding Photography",
  titleTemplate: "%s | Dolcevilla Studio",
  defaultDescription:
    "Premium Tuscany wedding photography rooted at Villa Raffaelli, crafted for international couples who want atmosphere, intimacy, and a real sense of place.",
  defaultOgImage: "/og/default-og.svg",
  contactEmail: "hello@dolcevilla.studio",
  instagramUrl: "https://instagram.com/dolcevillastudio",
  primaryCTA: {
    label: "Start your inquiry",
    href: "/contact",
    variant: "primary",
  },
  footerStatement:
    "Dolcevilla Studio is a wedding photography studio based at Villa Raffaelli, a Renaissance villa in Upper Tuscany, creating emotionally rich imagery for international couples across Tuscany.",
});
