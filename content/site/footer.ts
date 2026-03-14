import { siteSettings } from "@/content/site/settings";
import { footerLocationLinks, navigationItems } from "@/content/site/navigation";

export const footerContent = {
  statement: siteSettings.footerStatement,
  navigationItems,
  locationItems: footerLocationLinks,
};
