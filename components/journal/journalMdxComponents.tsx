import type { CTASection as CTASectionContent } from "@/types/content";
import {
  JournalChecklist,
  JournalCommonMistake,
  JournalFilmNote,
  JournalLocalInsight,
  JournalPlanningNote,
  JournalPullQuote,
  JournalQuickAnswer,
} from "@/components/journal/JournalEditorialBlocks";
import { JournalPhotographerSegue } from "@/components/journal/JournalPhotographerSegue";

export function createJournalMdxComponents({
  photographerSegue,
}: {
  photographerSegue: CTASectionContent;
}) {
  return {
    JournalQuickAnswer,
    JournalPlanningNote,
    JournalChecklist,
    JournalCommonMistake,
    JournalLocalInsight,
    JournalFilmNote,
    JournalPullQuote,
    JournalPhotographerSegue: () => (
      <JournalPhotographerSegue section={photographerSegue} />
    ),
  };
}
