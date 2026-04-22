import {
  Children,
  isValidElement,
  type HTMLAttributes,
} from "react";
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

const journalBlockComponentSet = new Set<unknown>([
  JournalQuickAnswer,
  JournalPlanningNote,
  JournalChecklist,
  JournalCommonMistake,
  JournalLocalInsight,
  JournalFilmNote,
  JournalPullQuote,
  JournalPhotographerSegue,
]);

function JournalParagraph({
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  const normalizedChildren = Children.toArray(children).filter((child) => {
    if (typeof child !== "string") {
      return true;
    }

    return child.trim().length > 0;
  });

  if (
    normalizedChildren.length === 1 &&
    isValidElement(normalizedChildren[0]) &&
    journalBlockComponentSet.has(normalizedChildren[0].type)
  ) {
    return normalizedChildren[0];
  }

  return <p {...props}>{children}</p>;
}

export function createJournalMdxComponents({
  photographerSegue,
}: {
  photographerSegue: CTASectionContent;
}) {
  return {
    p: JournalParagraph,
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
