import type { ProcessStep } from "@/types/content";
import { ProcessPreviewBlock } from "@/components/blocks/ProcessPreviewBlock";

export function ExperiencePreview({ steps }: { steps: ProcessStep[] }) {
  return <ProcessPreviewBlock steps={steps} />;
}
