import type { Point, RichSection } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { RichText } from "@/components/ui/RichText";
import { cn } from "@/lib/utils/cn";

type PointsEditorialBlockProps = {
  section: RichSection;
  items: Point[];
  columns?: 2 | 3;
};

export function PointsEditorialBlock({
  section,
  items,
  columns = 3,
}: PointsEditorialBlockProps) {
  if (!items.length) {
    return null;
  }

  return (
    <Container className="space-y-8">
      <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          {section.eyebrow ? <Eyebrow>{section.eyebrow}</Eyebrow> : null}
          <Heading className="text-3xl md:text-5xl">{section.heading}</Heading>
        </div>
        <RichText body={section.body} />
      </div>
      <div
        className={cn(
          "grid gap-5",
          columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-3",
        )}
      >
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-[1.5rem] border border-[var(--color-line)] bg-white/60 p-5"
          >
            <h3 className="font-display-face text-2xl tracking-[-0.03em]">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-mist)]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}
