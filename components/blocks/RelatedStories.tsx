import { StoryCardGrid } from "@/components/blocks/StoryCardGrid";
import type { StoryCard } from "@/types/content";

export function RelatedStories({ stories }: { stories: StoryCard[] }) {
  return <StoryCardGrid stories={stories} maxItems={3} showMoreHref="/journal" />;
}
