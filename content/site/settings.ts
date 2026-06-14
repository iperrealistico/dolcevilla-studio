import { siteSettingsSchema } from "@/lib/content/schemas";

export const siteSettings = siteSettingsSchema.parse({
  siteName: "Dolcevilla Studio",
  siteUrl: "https://dolcevilla.studio",
  defaultTitle: "Dolcevilla Studio | Tuscany Wedding Photography",
  titleTemplate: "%s | Dolcevilla Studio",
  defaultDescription:
    "Dolcevilla Studio is a Tuscany wedding photography studio based at a private studio near Lucca, combining film craft, dependable digital coverage, and local guidance for destination weddings in Italy.",
  defaultOgImage: "/og/default-og.svg",
  contactEmail: "hello@dolcevilla.studio",
  instagramUrl: "https://instagram.com/dolcevillastudio",
  primaryCTA: {
    label: "Start your inquiry",
    href: "/contact",
    variant: "primary",
  },
  footerStatement:
    "Dolcevilla Studio is a Tuscany wedding photography studio shaped by Upper Tuscany, its private studio base, and a hybrid film-plus-digital approach for international couples who care about atmosphere, authenticity, and emotional depth.",
});
