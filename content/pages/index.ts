export { homePage } from "@/content/pages/home";
export { experiencePage } from "@/content/pages/experience";
export { filmWeddingPhotographyPage } from "@/content/pages/film-wedding-photography";
export { villaRaffaelliPage } from "@/content/pages/villa-raffaelli";
export { aboutPage } from "@/content/pages/about";
export { contactPage } from "@/content/pages/contact";

import { aboutPage } from "@/content/pages/about";
import { contactPage } from "@/content/pages/contact";
import { experiencePage } from "@/content/pages/experience";
import { filmWeddingPhotographyPage } from "@/content/pages/film-wedding-photography";
import { homePage } from "@/content/pages/home";
import { villaRaffaelliPage } from "@/content/pages/villa-raffaelli";

export const pages = {
  home: homePage,
  experience: experiencePage,
  "film-wedding-photography": filmWeddingPhotographyPage,
  "villa-raffaelli": villaRaffaelliPage,
  about: aboutPage,
  contact: contactPage,
};

export const pageSlugs = Object.keys(pages);
