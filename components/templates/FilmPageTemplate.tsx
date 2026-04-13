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
import { ScrollParallax } from "@/components/motion/ScrollParallax";
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
    <div className="space-y-10 pb-16 md:space-y-14 md:pb-20">
      {page.hero ? (
        <ScrollParallax intensity="lg">
          <HeroStatement hero={page.hero} />
        </ScrollParallax>
      ) : null}
      <ScrollParallax from="left">
        <EditorialTextBlock section={page.intro} />
      </ScrollParallax>
      {page.gallery.length ? (
        <ScrollParallax from="right" intensity="lg">
          <SignatureGallery items={page.gallery} />
        </ScrollParallax>
      ) : null}
      <ScrollParallax from="left">
        <WhyChooseUs items={page.highlights} />
      </ScrollParallax>
      <ScrollParallax from="right">
        <CraftIdentityBlock craft={page.craft} />
      </ScrollParallax>
      <ScrollParallax from="left">
        <PointsEditorialBlock section={details.reasonsIntro} items={details.reasons} columns={2} />
      </ScrollParallax>
      <ScrollParallax from="right">
        <PointsEditorialBlock section={details.whyBothIntro} items={details.whyBoth} columns={3} />
      </ScrollParallax>
      <ScrollParallax from="left">
        <PointsEditorialBlock section={details.formatsIntro} items={details.formats} columns={3} />
      </ScrollParallax>
      <ScrollParallax from="right">
        <PointsEditorialBlock section={details.skillsIntro} items={details.skills} columns={3} />
      </ScrollParallax>
      <ScrollParallax from="left">
        <EditorialTextBlock section={details.darkroom} />
      </ScrollParallax>
      <ScrollParallax from="right">
        <TestimonialsBlock items={page.testimonials} />
      </ScrollParallax>
      <ScrollParallax from="left">
        <InvestmentNote section={page.investmentNote} />
      </ScrollParallax>
      <ScrollParallax from="right">
        <FAQBlock items={details.faqs} />
      </ScrollParallax>
      <ScrollParallax from="left">
        <StoryCardGrid stories={stories} maxItems={3} showMoreHref="/journal" />
      </ScrollParallax>
      <ScrollParallax from="right" intensity="lg">
        <CTASection section={page.cta} />
      </ScrollParallax>
    </div>
  );
}
