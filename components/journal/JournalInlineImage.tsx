import Image from "next/image";
import { DEFAULT_IMAGE_SIZES } from "@/lib/images/imageConfig";
import { imageManifest } from "@/lib/images/imageManifest";
import { cn } from "@/lib/utils/cn";

type JournalInlineImageProps = {
  slot?: string;
  imageId?: string;
  caption?: string;
  alt?: string;
  width?: "narrow" | "wide";
};

const widthClasses = {
  narrow: "max-w-2xl",
  wide: "max-w-4xl",
} as const;

export function JournalInlineImage({
  slot,
  imageId,
  caption,
  alt,
  width = "wide",
}: JournalInlineImageProps) {
  const resolvedId = slot ?? imageId;

  if (!resolvedId) {
    throw new Error("JournalInlineImage requires either a slot or imageId.");
  }

  const image = imageManifest[resolvedId as keyof typeof imageManifest];

  if (!image) {
    throw new Error(`Unknown journal inline image id "${resolvedId}".`);
  }

  return (
    <figure
      className={cn(
        "not-prose mx-auto my-10 space-y-3",
        widthClasses[width],
      )}
    >
      <div className="overflow-hidden rounded-[1.75rem] border border-white/18 bg-[var(--color-shell)] shadow-[0_26px_70px_rgba(22,15,11,0.18)]">
        <Image
          src={image.src}
          alt={alt ?? image.alt}
          width={image.width}
          height={image.height}
          sizes={DEFAULT_IMAGE_SIZES}
          placeholder="blur"
          blurDataURL={image.blurDataURL}
          className="h-auto w-full object-cover"
        />
      </div>
      {caption ? (
        <figcaption className="px-1 text-sm leading-7 text-[var(--color-mist)]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
