import type { RichSection } from "@/types/content";
import { EditorialTextBlock } from "@/components/blocks/EditorialTextBlock";

export function IntroBlock({ section }: { section: RichSection }) {
  return <EditorialTextBlock section={section} />;
}
