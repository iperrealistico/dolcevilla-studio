import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import type { Point } from "@/types/content";

export function WhyChooseUs({ items }: { items: Point[] }) {
  if (!items.length) {
    return null;
  }

  return (
    <Container className="space-y-8">
      <div>
        <Eyebrow>Why choose us</Eyebrow>
        <Heading className="text-3xl md:text-5xl">
          A premium experience held together by place, craft, and clarity.
        </Heading>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
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
