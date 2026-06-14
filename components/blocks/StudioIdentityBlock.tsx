import Image from "next/image";
import type { ServicePageContent } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { siteUi } from "@/content/site/ui";
import { getImageAsset } from "@/lib/images/imageManifest";

export function StudioIdentityBlock({
  studio,
}: {
  studio?: ServicePageContent["studio"];
}) {
  if (!studio) {
    return null;
  }

  const image = getImageAsset(
    (studio.imageId ?? "shared.studio.fallback") as never,
  );

  return (
    <Container>
      <div className="rounded-[var(--radius-frame)] border border-[var(--color-line)] bg-[var(--color-shell)] px-6 py-8 shadow-[var(--shadow-card)] md:px-10">
        <div className="grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
              {studio.eyebrow ?? siteUi.sections.studio.defaultEyebrow}
            </p>
            <h3 className="font-display-face mt-3 text-3xl tracking-[-0.03em] md:text-4xl">
              {studio.title}
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-mist)]">
              {studio.body}
            </p>
          </div>
          <div className="overflow-hidden rounded-[var(--radius-panel)] border border-[var(--color-line)] bg-[var(--surface-panel-soft)] shadow-[var(--shadow-card)]">
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
