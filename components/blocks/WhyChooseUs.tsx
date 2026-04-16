import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { FloatIn } from "@/components/motion/FloatIn";
import { siteUi } from "@/content/site/ui";
import type { Point } from "@/types/content";

export function WhyChooseUs({ items }: { items: Point[] }) {
  if (!items.length) {
    return null;
  }

  return (
    <Container className="space-y-8">
      <FloatIn from="left">
        <div>
          <Eyebrow>{siteUi.sections.whyChooseUs.eyebrow}</Eyebrow>
          <Heading className="text-3xl md:text-5xl">
            {siteUi.sections.whyChooseUs.heading}
          </Heading>
        </div>
      </FloatIn>
      <div className="grid gap-5 md:grid-cols-3">
        {items.map((item, index) => (
          <FloatIn
            key={item.title}
            from={index % 2 === 0 ? "bottom" : "right"}
            delay={index * 0.06}
          >
            <div className="rounded-[1.5rem] border border-[var(--color-line)] bg-white/60 p-5">
              <h3 className="font-display-face text-2xl tracking-[-0.03em]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-mist)]">
                {item.description}
              </p>
            </div>
          </FloatIn>
        ))}
      </div>
    </Container>
  );
}
