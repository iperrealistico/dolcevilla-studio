import Image from "next/image";
import { FloatIn } from "@/components/motion/FloatIn";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { RichText } from "@/components/ui/RichText";
import {
  getImageAsset,
  type ImageManifestKey,
} from "@/lib/images/imageManifest";
import type { RichSection } from "@/types/content";

export type FilmFormatItem = {
  medium: "photography" | "video";
  title: string;
  description: string;
  imageId: ImageManifestKey;
};

type FilmFormatSectionProps = {
  section: RichSection;
  items: readonly FilmFormatItem[];
};

export function FilmFormatSection({ section, items }: FilmFormatSectionProps) {
  const photographyItems = items.filter(
    (item) => item.medium === "photography",
  );
  const videoItems = items.filter((item) => item.medium === "video");

  return (
    <Container>
      <div className="rounded-[var(--radius-frame)] border border-[var(--color-line)] bg-[var(--surface-panel)] px-6 py-8 shadow-[var(--shadow-card)] md:px-10 md:py-10 xl:px-12 xl:py-12">
        <div className="grid gap-6 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:grid-rows-[auto_1fr] md:gap-x-10 md:gap-y-2 lg:gap-x-14 lg:gap-y-3">
          {section.eyebrow ? (
            <FloatIn from="left" className="md:col-start-1 md:row-start-1">
              <Eyebrow>{section.eyebrow}</Eyebrow>
            </FloatIn>
          ) : null}
          <FloatIn from="left" className="md:col-start-1 md:row-start-2">
            <Heading className="max-w-[10.5ch] text-3xl md:text-5xl">
              {section.heading}
            </Heading>
          </FloatIn>
          <FloatIn
            delay={0.08}
            className="md:col-start-2 md:row-start-2 md:flex md:min-h-full md:items-center md:pb-1 md:pl-2 lg:pb-2 lg:pl-4"
          >
            <RichText
              body={section.body}
              className="max-w-[40rem] text-[1.02rem] leading-8 md:text-lg"
            />
          </FloatIn>
        </div>

        <div className="mt-10 space-y-10">
          <FormatGroup
            title="Photography"
            description="These four tools belong to the still-photography side of the coverage."
            items={photographyItems}
          />
          <FormatGroup
            title="Video on film"
            description="These two belong to motion-picture coverage and stay separate from the photographic job."
            items={videoItems}
          />
        </div>
      </div>
    </Container>
  );
}

function FormatGroup({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: readonly FilmFormatItem[];
}) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 border-b border-[var(--color-line)] pb-4 md:flex-row md:items-end md:justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex rounded-full border border-[var(--color-line)] bg-[var(--color-shell)] px-3 py-1 text-[0.68rem] font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
            {title}
          </span>
        </div>
        <p className="max-w-[42rem] text-sm leading-7 text-[var(--color-mist)] md:text-base">
          {description}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {items.map((item, index) => (
          <FloatIn key={item.title} delay={index * 0.05}>
            <FormatCard item={item} />
          </FloatIn>
        ))}
      </div>
    </div>
  );
}

function FormatCard({ item }: { item: FilmFormatItem }) {
  const image = getImageAsset(item.imageId);
  const mediumLabel =
    item.medium === "photography" ? "Still photography" : "Motion picture";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-panel)] border border-[var(--color-line)] bg-[var(--surface-panel-soft)] shadow-[var(--shadow-soft)]">
      <div className="overflow-hidden border-b border-[var(--color-line)] bg-[var(--color-shell)]">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(min-width: 1280px) 23vw, (min-width: 768px) 44vw, 92vw"
          placeholder="blur"
          blurDataURL={image.blurDataURL}
          className="aspect-[5/4] h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col px-5 py-5 md:px-6 md:py-6">
        <span className="text-[0.68rem] font-semibold tracking-[0.24em] text-[var(--color-mist)] uppercase">
          {mediumLabel}
        </span>
        <h3 className="font-display-face mt-3 text-[2rem] leading-[0.98] tracking-[-0.03em] md:text-[2.2rem]">
          {item.title}
        </h3>
        <p className="mt-4 text-[0.98rem] leading-8 text-[var(--color-mist)]">
          {item.description}
        </p>
      </div>
    </article>
  );
}
