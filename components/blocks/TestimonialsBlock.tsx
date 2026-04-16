import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FloatIn } from "@/components/motion/FloatIn";
import { siteUi } from "@/content/site/ui";
import type { Testimonial } from "@/types/content";

export function TestimonialsBlock({ items }: { items: Testimonial[] }) {
  if (!items.length) {
    return null;
  }

  return (
    <Container className="grid gap-5 md:grid-cols-2">
      {items.map((item, index) => (
        <FloatIn
          key={item.quote}
          from={index % 2 === 0 ? "left" : "right"}
          delay={index * 0.08}
        >
          <figure className="rounded-[1.75rem] border border-[var(--color-line)] bg-white/65 p-6">
            <Eyebrow>{siteUi.sections.testimonials.eyebrow}</Eyebrow>
            <blockquote className="font-display-face text-2xl leading-[1.1] tracking-[-0.03em]">
              “{item.quote}”
            </blockquote>
            <figcaption className="mt-5 text-sm text-[var(--color-mist)]">
              {item.names}
              {item.location ? `, ${item.location}` : ""}
              {item.celebrationType ? ` · ${item.celebrationType}` : ""}
            </figcaption>
          </figure>
        </FloatIn>
      ))}
    </Container>
  );
}
