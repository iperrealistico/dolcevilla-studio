import type { ProcessStep } from "@/types/content";
import { FloatIn } from "@/components/motion/FloatIn";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { siteUi } from "@/content/site/ui";

export function ProcessPreviewBlock({ steps }: { steps: ProcessStep[] }) {
  if (!steps.length) {
    return null;
  }

  return (
    <Container className="space-y-8">
      <FloatIn from="left">
        <div>
          <Eyebrow>{siteUi.sections.process.eyebrow}</Eyebrow>
          <Heading className="text-3xl md:text-5xl">
            {siteUi.sections.process.heading}
          </Heading>
        </div>
      </FloatIn>
      <div className="grid gap-5 md:grid-cols-4">
        {steps.map((step, index) => (
          <FloatIn
            key={step.title}
            from={index % 2 === 0 ? "bottom" : "right"}
            delay={index * 0.06}
          >
            <div className="rounded-[1.5rem] border border-[var(--color-line)] bg-white/60 p-5">
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
          </FloatIn>
        ))}
      </div>
    </Container>
  );
}
