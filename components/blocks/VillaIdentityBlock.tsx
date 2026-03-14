import type { ServicePageContent } from "@/types/content";
import { Container } from "@/components/ui/Container";

export function VillaIdentityBlock({
  villa,
}: {
  villa?: ServicePageContent["villa"];
}) {
  if (!villa) {
    return null;
  }

  return (
    <Container>
      <div className="rounded-[2rem] border border-[var(--color-line)] bg-[var(--color-shell)] px-6 py-8 md:px-10">
        <p className="text-xs font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
          Villa Raffaelli
        </p>
        <h3 className="font-display-face mt-3 text-3xl tracking-[-0.03em] md:text-4xl">
          {villa.title}
        </h3>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-mist)]">
          {villa.body}
        </p>
      </div>
    </Container>
  );
}
