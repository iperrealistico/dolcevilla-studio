import { CTASection } from "@/components/blocks/CTASection";
import { CraftIdentityBlock } from "@/components/blocks/CraftIdentityBlock";
import { EditorialTextBlock } from "@/components/blocks/EditorialTextBlock";
import { FAQBlock } from "@/components/blocks/FAQBlock";
import { PointsEditorialBlock } from "@/components/blocks/PointsEditorialBlock";
import { SignatureGallery } from "@/components/blocks/SignatureGallery";
import { StoryCardGrid } from "@/components/blocks/StoryCardGrid";
import { TestimonialsBlock } from "@/components/blocks/TestimonialsBlock";
import { WhyChooseUs } from "@/components/blocks/WhyChooseUs";
import { HeroStatement } from "@/components/blocks/HeroStatement";
import { InvestmentNote } from "@/components/blocks/InvestmentNote";
import type { FAQItem, Point, RichSection, ServicePageContent, StoryCard } from "@/types/content";

type FilmPageTemplateProps = {
  page: ServicePageContent;
  stories: StoryCard[];
  details: {
    reasonsIntro: RichSection;
    reasons: Point[];
    whyBothIntro: RichSection;
    whyBoth: Point[];
    formatsIntro: RichSection;
    formats: Point[];
    skillsIntro: RichSection;
    skills: Point[];
    darkroom: RichSection;
    faqs: FAQItem[];
  };
};

export function FilmPageTemplate({
  page,
  stories,
  details,
}: FilmPageTemplateProps) {
  return (
    <div className="space-y-14 pb-20">
      {page.hero ? <HeroStatement hero={page.hero} /> : null}
      <EditorialTextBlock section={page.intro} />
      {page.gallery.length ? <SignatureGallery items={page.gallery} /> : null}
      <WhyChooseUs items={page.highlights} />
      <CraftIdentityBlock craft={page.craft} />
      <PointsEditorialBlock section={details.reasonsIntro} items={details.reasons} columns={2} />
      <PointsEditorialBlock section={details.whyBothIntro} items={details.whyBoth} columns={3} />
      <PointsEditorialBlock section={details.formatsIntro} items={details.formats} columns={3} />
      <PointsEditorialBlock section={details.skillsIntro} items={details.skills} columns={3} />
      <EditorialTextBlock section={details.darkroom} />
      <TestimonialsBlock items={page.testimonials} />
      <InvestmentNote section={page.investmentNote} />
      <FAQBlock items={details.faqs} />
      <StoryCardGrid stories={stories} />
      <CTASection section={page.cta} />
    </div>
  );
}
