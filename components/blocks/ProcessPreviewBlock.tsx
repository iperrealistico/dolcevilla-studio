import type { ProcessStep } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";

export function ProcessPreviewBlock({ steps }: { steps: ProcessStep[] }) {
  if (!steps.length) {
    return null;
  }

  return (
    <Container className="space-y-8">
      <div>
        <Eyebrow>Process</Eyebrow>
        <Heading className="text-3xl md:text-5xl">
          How the experience unfolds.
        </Heading>
      </div>
      <div className="grid gap-5 md:grid-cols-4">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="rounded-[1.5rem] border border-[var(--color-line)] bg-white/60 p-5"
          >
            <p className="text-xs font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="font-display-face mt-3 text-2xl tracking-[-0.03em]">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-mist)]">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}
