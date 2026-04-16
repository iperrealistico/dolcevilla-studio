import Image from "next/image";
import type { ServicePageContent } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { siteUi } from "@/content/site/ui";
import { getImageAsset } from "@/lib/images/imageManifest";

export function VillaIdentityBlock({
  villa,
}: {
  villa?: ServicePageContent["villa"];
}) {
  if (!villa) {
    return null;
  }

  const image = getImageAsset(
    (villa.imageId ?? "shared.villa.fallback") as never,
  );

  return (
    <Container>
      <div className="rounded-[2rem] border border-[var(--color-line)] bg-[var(--color-shell)] px-6 py-8 shadow-[var(--shadow-soft)] md:px-10">
        <div className="grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
              {villa.eyebrow ?? siteUi.sections.villa.defaultEyebrow}
            </p>
            <h3 className="font-display-face mt-3 text-3xl tracking-[-0.03em] md:text-4xl">
              {villa.title}
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-mist)]">
              {villa.body}
            </p>
          </div>
          <div className="overflow-hidden rounded-[1.5rem] border border-[var(--color-line)] bg-[rgb(255_255_255_/_0.62)] shadow-[0_28px_56px_rgba(29,25,22,0.12)]">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(min-width: 1280px) 28vw, (min-width: 768px) 40vw, 92vw"
              placeholder="blur"
              blurDataURL={image.blurDataURL}
              className="aspect-[5/4] h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
