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
    "/images/brand/ai-temp/villa-raffaelli-dawn.webp",
    "Morning light crossing the facade of Villa Raffaelli.",
    1024,
    1536,
    "linen",
  ),
  homeCoupleQuiet: createAsset(
    "home-couple-quiet",
    "/images/brand/ai-temp/editorial-couple-loggia.webp",
    "A couple framed in quiet afternoon light among Tuscan textures.",
    1024,
    1536,
  ),
  homeReceptionNight: createAsset(
    "home-reception-night",
    "/images/brand/ai-temp/reception-evening-candles.webp",
    "A candlelit dinner scene set beneath a darkening Tuscan sky.",
    1024,
    1536,
  ),
  homeUpperTuscany: createAsset(
    "home-upper-tuscany",
    "/images/brand/ai-temp/upper-tuscany-marble-landscape.webp",
    "Upper Tuscany hills with marble-toned light and layered distance.",
    1536,
    1024,
    "sage",
  ),
  homePortraits: createAsset(
    "home-portraits",
    "/images/brand/ai-temp/portrait-studio-window-light.webp",
    "Portrait fragments shaped by artful interior light.",
    1024,
    1536,
  ),
  journalCover: createAsset(
    "journal-cover",
    "/images/brand/ai-temp/journal-garden-story.webp",
    "A couple moving through a Tuscan garden reception in late afternoon light.",
    1536,
    1024,
    "ink",
  ),
  villaCourtyard: createAsset(
    "villa-courtyard",
    "/images/brand/ai-temp/villa-courtyard-morning.webp",
    "The courtyard at Villa Raffaelli in the quiet of the morning.",
    1024,
    1536,
  ),
  luccaEvening: createAsset(
    "lucca-evening",
    "/images/brand/ai-temp/lucca-evening-garden.webp",
    "An evening celebration near Lucca with warm candlelight and depth.",
    1024,
    1536,
  ),
  marblePath: createAsset(
    "marble-path",
    "/images/brand/ai-temp/marble-ridges-distance.webp",
    "Layered mountain light and marble-toned ridges above the coast.",
    1536,
    1024,
  ),
  intimateGesture: createAsset(
    "intimate-gesture",
    "/images/brand/ai-temp/intimate-gesture-garden.webp",
    "An intimate gesture between partners in a calm editorial frame.",
    1024,
    1536,
  ),
  studioInterior: createAsset(
    "studio-interior",
    "/images/brand/ai-temp/portrait-studio-window-light.webp",
    "A quiet portrait fragment inside the studio world of Villa Raffaelli.",
    1024,
    1536,
  ),
  storyFrame: createAsset(
    "story-frame",
    "/images/brand/ai-temp/journal-garden-story.webp",
    "A layered editorial story image used across journal previews.",
    1536,
    1024,
  ),
} as const;

export type ImageManifestKey = keyof typeof imageManifest;

export function getImageAsset(id: ImageManifestKey): ImageAsset {
  return imageManifest[id];
}

export function buildGallery(
  items: {
    id: ImageManifestKey;
    layoutVariant?: GalleryItem["layoutVariant"];
    span?: GalleryItem["span"];
  }[],
): GalleryItem[] {
  return items.map(({ id, layoutVariant = "portrait", span }) => ({
    image: getImageAsset(id),
    layoutVariant,
    span,
  }));
}

export const allImages = Object.values(imageManifest);
