export { homePage } from "@/content/pages/home";
export { weddingsPage } from "@/content/pages/weddings";
export { elopementsPage } from "@/content/pages/elopements";
export { experiencePage } from "@/content/pages/experience";
export { filmWeddingPhotographyPage } from "@/content/pages/film-wedding-photography";
export { villaRaffaelliPage } from "@/content/pages/villa-raffaelli";
export { pricingPage } from "@/content/pages/pricing";
export { aboutPage } from "@/content/pages/about";
export { contactPage } from "@/content/pages/contact";
export { thankYouPage } from "@/content/pages/thank-you";
export { legalPage } from "@/content/pages/legal";

import { aboutPage } from "@/content/pages/about";
import { contactPage } from "@/content/pages/contact";
import { elopementsPage } from "@/content/pages/elopements";
import { experiencePage } from "@/content/pages/experience";
import { filmWeddingPhotographyPage } from "@/content/pages/film-wedding-photography";
import { homePage } from "@/content/pages/home";
import { legalPage } from "@/content/pages/legal";
import { pricingPage } from "@/content/pages/pricing";
import { thankYouPage } from "@/content/pages/thank-you";
import { villaRaffaelliPage } from "@/content/pages/villa-raffaelli";
import { weddingsPage } from "@/content/pages/weddings";

export const pages = {
  home: homePage,
  weddings: weddingsPage,
  elopements: elopementsPage,
  experience: experiencePage,
  "film-wedding-photography": filmWeddingPhotographyPage,
  "villa-raffaelli": villaRaffaelliPage,
  pricing: pricingPage,
  about: aboutPage,
  contact: contactPage,
  "thank-you": thankYouPage,
  legal: legalPage,
};

export const pageSlugs = Object.keys(pages);
