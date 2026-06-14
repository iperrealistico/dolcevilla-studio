export { homePage } from "@/content/pages/home";
export { filmWeddingPhotographyPage } from "@/content/pages/film-wedding-photography";
export { studioPage } from "@/content/pages/studio";
export { aboutPage } from "@/content/pages/about";
export { contactPage } from "@/content/pages/contact";

import { aboutPage } from "@/content/pages/about";
import { contactPage } from "@/content/pages/contact";
import { filmWeddingPhotographyPage } from "@/content/pages/film-wedding-photography";
import { homePage } from "@/content/pages/home";
import { studioPage } from "@/content/pages/studio";

export const pages = {
  home: homePage,
  "film-wedding-photography": filmWeddingPhotographyPage,
  studio: studioPage,
  about: aboutPage,
  contact: contactPage,
};

export const pageSlugs = Object.keys(pages);
