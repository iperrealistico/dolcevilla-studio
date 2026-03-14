import { CTASection } from "@/components/blocks/CTASection";
import { EditorialTextBlock } from "@/components/blocks/EditorialTextBlock";
import { StoryCardGrid } from "@/components/blocks/StoryCardGrid";
import { getFeaturedStoryCards } from "@/lib/content/storyCards";
import { journalPageContent } from "@/content/pages/journal";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata(journalPageContent.seo);

export default async function JournalIndexPage() {
  const stories = await getFeaturedStoryCards(6);

  return (
    <div className="space-y-14 pb-20 pt-12">
      <EditorialTextBlock section={journalPageContent.intro} />
      <StoryCardGrid stories={stories} />
      <CTASection section={journalPageContent.cta} />
    </div>
  );
}
