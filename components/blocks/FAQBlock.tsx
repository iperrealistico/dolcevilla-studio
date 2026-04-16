import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { siteUi } from "@/content/site/ui";
import type { FAQItem } from "@/types/content";

export function FAQBlock({ items }: { items: FAQItem[] }) {
  if (!items.length) {
    return null;
  }

  return (
    <Container className="space-y-6">
      <div>
        <Eyebrow>{siteUi.sections.faq.eyebrow}</Eyebrow>
        <Heading className="text-3xl md:text-5xl">
          {siteUi.sections.faq.heading}
        </Heading>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="rounded-[1.5rem] border border-[var(--color-line)] bg-white/70 px-5 py-4"
          >
            <summary className="cursor-pointer list-none text-lg font-semibold text-[var(--color-ink)]">
              {item.question}
            </summary>
            <p className="mt-3 text-sm leading-7 text-[var(--color-mist)]">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </Container>
  );
}
