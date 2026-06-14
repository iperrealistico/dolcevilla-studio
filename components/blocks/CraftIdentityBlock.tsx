import Image from "next/image";
import type { ServicePageContent } from "@/types/content";
import { FloatIn } from "@/components/motion/FloatIn";
import { Container } from "@/components/ui/Container";
import { siteUi } from "@/content/site/ui";
import { getImageAsset } from "@/lib/images/imageManifest";

export function CraftIdentityBlock({
  craft,
  layout = "default",
}: {
  craft?: ServicePageContent["craft"];
  layout?: "default" | "feature-grid";
}) {
  if (!craft) {
    return null;
  }

  const image = craft.imageId ? getImageAsset(craft.imageId as never) : null;

  if (layout === "feature-grid") {
    return (
      <Container>
        <div className="rounded-[var(--radius-frame)] border border-[var(--color-line)] bg-[var(--surface-panel)] px-6 py-8 shadow-[var(--shadow-card)] md:px-10 md:py-10 xl:px-12 xl:py-12">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:items-end">
            <FloatIn from="left">
              <div className="space-y-4 xl:max-w-[40rem]">
                <p className="text-xs font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
                  {craft.eyebrow ?? siteUi.sections.craft.defaultEyebrow}
                </p>
                <h3 className="font-display-face text-3xl tracking-[-0.03em] md:text-4xl lg:text-[3.4rem] lg:leading-[0.96]">
                  {craft.title}
                </h3>
              </div>
            </FloatIn>
            <FloatIn
              delay={0.08}
              className="xl:flex xl:min-h-full xl:items-center xl:pb-3"
            >
              <p className="max-w-[40rem] text-base leading-8 text-[var(--color-mist)] md:text-lg">
                {craft.body}
              </p>
            </FloatIn>
          </div>
          <div className="mt-8 grid gap-8 xl:mt-10 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:items-stretch">
            <FloatIn from="left">
              {image ? (
                <div className="overflow-hidden rounded-[var(--radius-panel)] border border-[var(--color-line)] bg-[var(--color-shell)] shadow-[var(--shadow-card)]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(min-width: 1280px) 30vw, (min-width: 768px) 42vw, 92vw"
                    placeholder="blur"
                    blurDataURL={image.blurDataURL}
                    className="aspect-[4/5] h-full w-full object-cover sm:aspect-[5/6] xl:aspect-[5/5.8]"
                  />
                </div>
              ) : null}
            </FloatIn>
            <FloatIn delay={0.08} className="xl:flex xl:h-full xl:items-center">
              {craft.points.length ? (
                <div className="grid w-full gap-4 sm:grid-cols-2 xl:auto-rows-fr">
                  {craft.points.map((point, index) => (
                    <FloatIn key={point.title} delay={index * 0.05}>
                      <div className="h-full rounded-[var(--radius-panel)] border border-[var(--color-line)] bg-[var(--surface-panel-soft)] px-5 py-5 shadow-[var(--shadow-soft)]">
                        <h4 className="font-display-face text-[1.9rem] leading-[1.02] tracking-[-0.03em]">
                          {point.title}
                        </h4>
                        <p className="mt-3 text-[0.98rem] leading-8 text-[var(--color-mist)]">
                          {point.description}
                        </p>
                      </div>
                    </FloatIn>
                  ))}
                </div>
              ) : null}
            </FloatIn>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="rounded-[var(--radius-frame)] border border-[var(--color-line)] bg-[var(--surface-panel)] px-6 py-8 shadow-[var(--shadow-card)] md:px-10">
        <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr]">
          <FloatIn from="left">
            <div className="space-y-6">
              <p className="text-xs font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
                {craft.eyebrow ?? siteUi.sections.craft.defaultEyebrow}
              </p>
              <h3 className="font-display-face mt-3 text-3xl tracking-[-0.03em] md:text-4xl">
                {craft.title}
              </h3>
              {image ? (
                <div className="overflow-hidden rounded-[var(--radius-panel)] border border-[var(--color-line)] bg-[var(--color-shell)] shadow-[var(--shadow-card)]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(min-width: 1280px) 28vw, (min-width: 768px) 40vw, 92vw"
                    placeholder="blur"
                    blurDataURL={image.blurDataURL}
                    className="aspect-[4/5] h-full w-full object-cover"
                  />
                </div>
              ) : null}
            </div>
          </FloatIn>
          <FloatIn delay={0.08}>
            <div className="space-y-4">
              <p className="text-base leading-8 text-[var(--color-mist)]">
                {craft.body}
              </p>
              {craft.points.length ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {craft.points.map((point, index) => (
                    <FloatIn key={point.title} delay={index * 0.05}>
                      <div className="rounded-[var(--radius-panel)] border border-[var(--color-line)] bg-[var(--surface-panel-soft)] px-4 py-4">
                        <h4 className="font-display-face text-xl tracking-[-0.02em]">
                          {point.title}
                        </h4>
                        <p className="mt-2 text-sm leading-7 text-[var(--color-mist)]">
                          {point.description}
                        </p>
                      </div>
                    </FloatIn>
                  ))}
                </div>
              ) : null}
            </div>
          </FloatIn>
        </div>
      </div>
    </Container>
  );
}
