import { getBlurData } from "@/lib/images/getBlurData";
import type { GalleryItem, ImageAsset } from "@/types/gallery";

const blurDataURL = getBlurData();

function createAsset(
  id: string,
  src: string,
  alt: string,
  width = 1600,
  height = 2000,
  dominantTone = "stone",
): ImageAsset {
  return {
    id,
    src,
    alt,
    width,
    height,
    dominantTone,
    blurDataURL,
  };
}

export const imageManifest = {
  homeHeroVilla: createAsset(
    "home-hero-villa",
    "/images/brand/hero-villa.svg",
    "Morning light crossing the facade of Villa Raffaelli.",
    1600,
    2000,
    "linen",
  ),
  homeCoupleQuiet: createAsset(
    "home-couple-quiet",
    "/images/brand/editorial-couple.svg",
    "A couple framed in quiet afternoon light among Tuscan textures.",
  ),
  homeReceptionNight: createAsset(
    "home-reception-night",
    "/images/brand/reception-evening.svg",
    "A candlelit dinner scene set beneath a darkening Tuscan sky.",
  ),
  homeUpperTuscany: createAsset(
    "home-upper-tuscany",
    "/images/brand/landscape-marble.svg",
    "Upper Tuscany hills with marble-toned light and layered distance.",
    1600,
    1200,
    "sage",
  ),
  homePortraits: createAsset(
    "home-portraits",
    "/images/brand/portrait-studio.svg",
    "Portrait fragments shaped by artful interior light.",
  ),
  journalCover: createAsset(
    "journal-cover",
    "/images/brand/journal-story.svg",
    "A journal cover image with layered editorial typography.",
    1600,
    1200,
    "ink",
  ),
  villaCourtyard: createAsset(
    "villa-courtyard",
    "/images/brand/hero-villa.svg",
    "The courtyard at Villa Raffaelli in the quiet of the morning.",
    1600,
    2000,
  ),
  luccaEvening: createAsset(
    "lucca-evening",
    "/images/brand/reception-evening.svg",
    "An evening celebration near Lucca with warm candlelight and depth.",
  ),
  marblePath: createAsset(
    "marble-path",
    "/images/brand/landscape-marble.svg",
    "Layered mountain light and marble-toned ridges above the coast.",
    1600,
    1200,
  ),
  intimateGesture: createAsset(
    "intimate-gesture",
    "/images/brand/editorial-couple.svg",
    "An intimate gesture between partners in a calm editorial frame.",
  ),
  studioInterior: createAsset(
    "studio-interior",
    "/images/brand/portrait-studio.svg",
    "Still-life fragments from the studio world at Villa Raffaelli.",
  ),
  storyFrame: createAsset(
    "story-frame",
    "/images/brand/journal-story.svg",
    "A layered story image used across journal previews.",
    1600,
    1200,
  ),
} as const;

export type ImageManifestKey = keyof typeof imageManifest;

export function getImageAsset(id: ImageManifestKey): ImageAsset {
  return imageManifest[id];
}

export function buildGallery(
  items: { id: ImageManifestKey; layoutVariant?: GalleryItem["layoutVariant"]; span?: GalleryItem["span"] }[],
): GalleryItem[] {
  return items.map(({ id, layoutVariant = "portrait", span }) => ({
    image: getImageAsset(id),
    layoutVariant,
    span,
  }));
}

export const allImages = Object.values(imageManifest);
