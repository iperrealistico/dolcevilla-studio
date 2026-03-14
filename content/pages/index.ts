export { homePage } from "@/content/pages/home";
export { weddingsPage } from "@/content/pages/weddings";
export { elopementsPage } from "@/content/pages/elopements";
export { experiencePage } from "@/content/pages/experience";
export { pricingPage } from "@/content/pages/pricing";
export { aboutPage } from "@/content/pages/about";
export { contactPage } from "@/content/pages/contact";
export { thankYouPage } from "@/content/pages/thank-you";
export { privacyPage } from "@/content/pages/privacy";
export { legalPage } from "@/content/pages/legal";

import { aboutPage } from "@/content/pages/about";
import { contactPage } from "@/content/pages/contact";
import { elopementsPage } from "@/content/pages/elopements";
import { experiencePage } from "@/content/pages/experience";
import { homePage } from "@/content/pages/home";
import { legalPage } from "@/content/pages/legal";
import { pricingPage } from "@/content/pages/pricing";
import { privacyPage } from "@/content/pages/privacy";
import { thankYouPage } from "@/content/pages/thank-you";
import { weddingsPage } from "@/content/pages/weddings";

export const pages = {
  home: homePage,
  weddings: weddingsPage,
  elopements: elopementsPage,
  experience: experiencePage,
  pricing: pricingPage,
  about: aboutPage,
  contact: contactPage,
  "thank-you": thankYouPage,
  privacy: privacyPage,
  legal: legalPage,
};

export const pageSlugs = Object.keys(pages);
