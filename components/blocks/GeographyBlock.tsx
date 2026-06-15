import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { RichText } from "@/components/ui/RichText";
import { MapPinned } from "lucide-react";
import type { ServicePageContent } from "@/types/content";

export function GeographyBlock({ geography }: { geography: ServicePageContent["geography"] }) {
  if (!geography) {
    return null;
  }

  return (
    <Container className="grid gap-8 rounded-[var(--radius-frame)] bg-[var(--color-shell)] px-6 py-8 shadow-[var(--shadow-card)] md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-10 md:px-10 lg:px-12">
      <div className="flex flex-col gap-6 md:min-h-full md:gap-8">
        <div>
          {geography.eyebrow ? <Eyebrow>{geography.eyebrow}</Eyebrow> : null}
          <Heading className="text-3xl md:text-5xl">{geography.heading}</Heading>
        </div>
        <div className="flex self-start md:mt-auto">
          <div className="flex h-20 w-20 items-center justify-center rounded-[var(--radius-frame)] border border-[var(--color-line)] bg-[var(--surface-panel)] text-[var(--color-ink)] shadow-[var(--shadow-soft)] sm:h-24 sm:w-24">
            <MapPinned size={30} strokeWidth={1.7} className="sm:h-[2.125rem] sm:w-[2.125rem]" />
          </div>
        </div>
      </div>
      <div className="space-y-5 md:pt-1">
        <RichText body={geography.body} />
        <div className="flex flex-wrap gap-2">
          {geography.places.map((place) => (
            <span key={place} className="rounded-[var(--radius-pill)] border border-[var(--color-line)] px-4 py-2 text-sm text-[var(--color-mist)]">
              {place}
            </span>
          ))}
        </div>
      </div>
    </Container>
  );
}
