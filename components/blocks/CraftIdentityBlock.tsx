import type { ServicePageContent } from "@/types/content";
import { FloatIn } from "@/components/motion/FloatIn";
import { Container } from "@/components/ui/Container";

export function CraftIdentityBlock({
  craft,
}: {
  craft?: ServicePageContent["craft"];
}) {
  if (!craft) {
    return null;
  }

  return (
    <Container>
      <div className="rounded-[2rem] border border-[var(--color-line)] bg-[rgb(255_255_255_/_0.72)] px-6 py-8 shadow-[var(--shadow-soft)] md:px-10">
        <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr]">
          <FloatIn from="left">
            <div>
              <p className="text-xs font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
                {craft.eyebrow ?? "Hybrid craft"}
              </p>
              <h3 className="font-display-face mt-3 text-3xl tracking-[-0.03em] md:text-4xl">
                {craft.title}
              </h3>
            </div>
          </FloatIn>
          <FloatIn delay={0.08}>
            <div className="space-y-4">
              <p className="text-base leading-8 text-[var(--color-mist)]">{craft.body}</p>
              {craft.points.length ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {craft.points.map((point, index) => (
                    <FloatIn key={point.title} delay={index * 0.05}>
                      <div className="rounded-[1.25rem] border border-[var(--color-line)] bg-[var(--color-shell)] px-4 py-4">
                        <h4 className="font-display-face text-xl tracking-[-0.02em]">
                          {point.title}
                        </h4>
                        <p className="mt-2 text-sm leading-7 text-[var(--color-mist)]">
                          {point.description}
                        </p>
                      </div>
                    </FloatIn>
                  ))}
                </div>
              ) : null}
            </div>
          </FloatIn>
        </div>
      </div>
    </Container>
  );
}
