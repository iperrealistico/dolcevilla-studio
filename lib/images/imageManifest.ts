import rawImageSlots from "@/content/site/image-slots.json";
import { getBlurData } from "@/lib/images/getBlurData";
import {
  getImageLibraryAsset,
  imageAssetLibrary,
  type ImageAssetLibraryKey,
} from "@/lib/images/imageLibrary";
import type { GalleryItem, ImageAsset } from "@/types/gallery";

type ImageSlotDefinition = {
  asset: ImageAssetLibraryKey;
  alt?: string;
};

type ImageSlotRecord = {
  [K in keyof typeof rawImageSlots]: ImageSlotDefinition;
};

export const imageSlots = rawImageSlots as ImageSlotRecord;

const blurDataURL = getBlurData();

function createSlotAsset(
  slotId: string,
  definition: ImageSlotDefinition,
): ImageAsset {
  if (!(definition.asset in imageAssetLibrary)) {
    throw new Error(
      `Image slot "${slotId}" references unknown asset "${definition.asset}".`,
    );
  }

  const sourceAsset = getImageLibraryAsset(definition.asset);

  return {
    ...sourceAsset,
    id: slotId,
    alt: definition.alt ?? sourceAsset.alt,
    blurDataURL,
  };
}

export const imageManifest = Object.fromEntries(
  Object.entries(imageSlots).map(([slotId, definition]) => [
    slotId,
    createSlotAsset(slotId, definition),
  ]),
) as {
  [K in keyof typeof imageSlots]: ImageAsset;
};

export type ImageManifestKey = keyof typeof imageManifest;
export type ImageSlotKey = ImageManifestKey;
export type ImageSlotAssetKey = keyof typeof imageAssetLibrary;

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
