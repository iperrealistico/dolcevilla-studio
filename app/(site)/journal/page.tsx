import { CTASection } from "@/components/blocks/CTASection";
import { EditorialTextBlock } from "@/components/blocks/EditorialTextBlock";
import { StoryCardGrid } from "@/components/blocks/StoryCardGrid";
import { NonBlogPageStructuredData } from "@/components/seo/NonBlogPageStructuredData";
import { getAllStoryCards } from "@/lib/content/storyCards";
import { journalPageContent } from "@/content/pages/journal";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata(journalPageContent.seo);

export default async function JournalIndexPage() {
  const stories = await getAllStoryCards();

  return (
    <>
      <NonBlogPageStructuredData
        title={journalPageContent.seo.title}
        description={journalPageContent.seo.description}
        path={journalPageContent.seo.path}
        pageType="journal"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Journal", path: "/journal" },
        ]}
      />
      <div className="space-y-10 pb-16 pt-10 md:space-y-14 md:pb-20 md:pt-12">
        <EditorialTextBlock section={journalPageContent.intro} />
        <StoryCardGrid stories={stories} />
        <CTASection section={journalPageContent.cta} />
      </div>
    </>
  );
}
