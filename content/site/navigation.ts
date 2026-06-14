import { linkSchema } from "@/lib/content/schemas";

export const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "Film", href: "/film-wedding-photography" },
  { label: "Studio", href: "/studio" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
].map((item) => linkSchema.parse(item));

export const footerLocationLinks = [
  { label: "Studio", href: "/studio" },
].map((item) => linkSchema.parse(item));
