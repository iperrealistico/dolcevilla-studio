import type { RichSection } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { RichText } from "@/components/ui/RichText";

export function InvestmentNote({ section }: { section?: RichSection }) {
  if (!section) {
    return null;
  }

  return (
    <Container className="rounded-[var(--radius-frame)] border border-[var(--color-line)] bg-[var(--surface-panel)] px-6 py-8 shadow-[var(--shadow-card)] md:px-10">
      {section.eyebrow ? <Eyebrow>{section.eyebrow}</Eyebrow> : null}
      <Heading className="text-3xl md:text-5xl">{section.heading}</Heading>
      <RichText body={section.body} className="mt-4" />
    </Container>
  );
}
