import { linkSchema } from "@/lib/content/schemas";

export const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Experience", href: "/experience" },
  { label: "Film", href: "/film-wedding-photography" },
  { label: "Villa", href: "/villa-raffaelli" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
].map((item) => linkSchema.parse(item));

export const footerLocationLinks = [
  { label: "Villa Raffaelli", href: "/villa-raffaelli" },
].map((item) => linkSchema.parse(item));
