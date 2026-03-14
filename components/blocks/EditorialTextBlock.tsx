import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { RichText } from "@/components/ui/RichText";
import type { RichSection } from "@/types/content";

export function EditorialTextBlock({ section }: { section: RichSection }) {
  return (
    <Container className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
      <div>
        {section.eyebrow ? <Eyebrow>{section.eyebrow}</Eyebrow> : null}
        <Heading className="text-3xl md:text-5xl">{section.heading}</Heading>
      </div>
      <RichText body={section.body} />
    </Container>
  );
}
