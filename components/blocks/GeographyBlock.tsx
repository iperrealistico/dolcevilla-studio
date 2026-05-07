import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { RichText } from "@/components/ui/RichText";
import type { ServicePageContent } from "@/types/content";

export function GeographyBlock({ geography }: { geography: ServicePageContent["geography"] }) {
  if (!geography) {
    return null;
  }

  return (
    <Container className="grid gap-8 rounded-[2rem] bg-[var(--color-shell)] px-6 py-8 md:grid-cols-[1fr_1fr] md:px-10">
      <div>
        {geography.eyebrow ? <Eyebrow>{geography.eyebrow}</Eyebrow> : null}
        <Heading className="text-3xl md:text-5xl">{geography.heading}</Heading>
      </div>
      <div className="space-y-5">
        <RichText body={geography.body} />
        <div className="flex flex-wrap gap-2">
          {geography.places.map((place) => (
            <span key={place} className="rounded-full border border-[var(--color-line)] px-4 py-2 text-sm text-[var(--color-mist)]">
              {place}
            </span>
          ))}
        </div>
      </div>
    </Container>
  );
}
