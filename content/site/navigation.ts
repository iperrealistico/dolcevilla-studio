import { linkSchema } from "@/lib/content/schemas";

export const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Weddings", href: "/weddings" },
  { label: "Elopements", href: "/elopements" },
  { label: "Experience", href: "/experience" },
  { label: "Film", href: "/film-wedding-photography" },
  { label: "Villa", href: "/villa-raffaelli" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
].map((item) => linkSchema.parse(item));

export const footerLocationLinks = [
  { label: "Tuscany", href: "/tuscany-wedding-photographer" },
  { label: "Lucca", href: "/lucca-wedding-photographer" },
  { label: "Florence", href: "/florence-wedding-photographer" },
  { label: "Chianti", href: "/chianti-wedding-photographer" },
  { label: "Villa Raffaelli", href: "/villa-raffaelli" },
].map((item) => linkSchema.parse(item));
