import { getImageAsset } from "@/lib/images/imageManifest";
import type { ImageAsset } from "@/types/gallery";

const galleryImageIds = [
  "page.home.hero.primary",
  "page.home.hero.secondary",
  "page.home.hero.tertiary",
  "page.home.hero.quaternary",
  "page.home.gallery.1",
  "page.home.gallery.2",
  "page.home.gallery.3",
  "page.home.gallery.4",
  "page.home.gallery.5",
  "page.home.gallery.6",
  "page.film-wedding-photography.gallery.1",
  "page.film-wedding-photography.gallery.2",
  "page.film-wedding-photography.gallery.3",
  "page.film-wedding-photography.gallery.4",
  "page.film-wedding-photography.gallery.5",
  "page.film-wedding-photography.gallery.6",
  "page.film-wedding-photography.gallery.7",
  "page.film-wedding-photography.gallery.8",
  "page.studio.hero.primary",
  "page.studio.hero.secondary",
  "page.studio.gallery.1",
  "page.studio.gallery.2",
  "page.studio.gallery.3",
  "page.about.gallery.1",
] as const;

export const galleryPage = {
  eyebrow: "Gallery",
  title: "An endless edit of light, gesture, and place.",
  subtitle:
    "A full-screen gallery that loops without a beginning or end, tuned for fast loading across desktop and mobile while staying quiet inside the Dolcevilla visual language.",
  seo: {
    title: "Wedding Gallery | Dolcevilla Studio",
    description:
      "A fullscreen Dolcevilla Studio wedding gallery with an endless scroll of Tuscany wedding photographs, film texture, studio light, and quiet editorial motion.",
    path: "/gallery",
    keywords: [
      "tuscany wedding gallery",
      "destination wedding photography gallery",
      "film wedding gallery",
      "dolcevilla studio gallery",
      "tuscany wedding photographs",
    ],
  },
  images: galleryImageIds.map((id) => getImageAsset(id)) satisfies ImageAsset[],
};

export type GalleryPageContent = typeof galleryPage;
