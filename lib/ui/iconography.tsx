import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Camera,
  Compass,
  Cookie,
  Heart,
  House,
  Instagram,
  Mail,
  MapPinned,
  NotebookText,
  ScrollText,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";

export type IconPlacement = "left" | "right";

export type LinkIconConfig = {
  Icon: LucideIcon;
  placement: IconPlacement;
};

export function getNavigationIcon(href: string): LucideIcon {
  if (href === "/") {
    return House;
  }

  if (href === "/weddings") {
    return Heart;
  }

  if (href === "/elopements") {
    return Compass;
  }

  if (href === "/experience") {
    return Sparkles;
  }

  if (href === "/film-wedding-photography") {
    return Camera;
  }

  if (href === "/villa-raffaelli") {
    return MapPinned;
  }

  if (href === "/journal" || href.startsWith("/journal/")) {
    return NotebookText;
  }

  if (href === "/about") {
    return UsersRound;
  }

  if (href === "/contact" || href.startsWith("mailto:")) {
    return Mail;
  }

  if (href === "/legal") {
    return ScrollText;
  }

  return MapPinned;
}

export function getUtilityIcon(kind: "privacy" | "cookies" | "legal") {
  if (kind === "privacy") {
    return ShieldCheck;
  }

  if (kind === "legal") {
    return ScrollText;
  }

  return Cookie;
}

export function getLinkIconConfig(
  href: string,
  label?: string,
): LinkIconConfig | null {
  const normalizedLabel = label?.toLowerCase().trim() ?? "";
  const normalizedHref = href.toLowerCase();

  if (normalizedHref.includes("instagram.com")) {
    return { Icon: Instagram, placement: "left" };
  }

  if (
    normalizedHref.startsWith("mailto:") ||
    normalizedHref === "/contact" ||
    normalizedLabel.includes("inquiry") ||
    normalizedLabel.includes("contact") ||
    normalizedLabel.includes("email")
  ) {
    return { Icon: Mail, placement: "left" };
  }

  if (normalizedHref === "/journal" || normalizedHref.startsWith("/journal/")) {
    return { Icon: NotebookText, placement: "left" };
  }

  if (normalizedHref === "/film-wedding-photography") {
    return { Icon: Camera, placement: "left" };
  }

  if (
    normalizedHref === "/villa-raffaelli" ||
    normalizedLabel.includes("villa")
  ) {
    return { Icon: MapPinned, placement: "left" };
  }

  if (
    normalizedLabel.includes("privacy") ||
    normalizedLabel.includes("consent")
  ) {
    return { Icon: ShieldCheck, placement: "left" };
  }

  if (normalizedLabel.includes("cookie")) {
    return { Icon: Cookie, placement: "left" };
  }

  if (normalizedHref === "/legal" || normalizedLabel.includes("legal")) {
    return { Icon: ScrollText, placement: "left" };
  }

  if (
    normalizedHref.includes("photographer") ||
    normalizedLabel.includes("tuscany") ||
    normalizedLabel.includes("lucca") ||
    normalizedLabel.includes("florence") ||
    normalizedLabel.includes("siena") ||
    normalizedLabel.includes("chianti")
  ) {
    return { Icon: MapPinned, placement: "left" };
  }

  if (
    normalizedLabel.includes("see more") ||
    normalizedLabel.includes("explore") ||
    normalizedLabel.includes("read") ||
    normalizedLabel.includes("discover")
  ) {
    return { Icon: ArrowUpRight, placement: "right" };
  }

  if (
    normalizedHref.startsWith("http://") ||
    normalizedHref.startsWith("https://")
  ) {
    return { Icon: ArrowUpRight, placement: "right" };
  }

  return null;
}
