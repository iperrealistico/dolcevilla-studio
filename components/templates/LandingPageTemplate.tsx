import { CTASection } from "@/components/blocks/CTASection";
import { FAQBlock } from "@/components/blocks/FAQBlock";
import { HeroStatement } from "@/components/blocks/HeroStatement";
import { InvestmentNote } from "@/components/blocks/InvestmentNote";
import { StoryCardGrid } from "@/components/blocks/StoryCardGrid";
import { VillaIdentityBlock } from "@/components/blocks/VillaIdentityBlock";
import { WhyChooseUs } from "@/components/blocks/WhyChooseUs";
import { SignatureGallery } from "@/components/blocks/SignatureGallery";
import { TestimonialsBlock } from "@/components/blocks/TestimonialsBlock";
import { EditorialTextBlock } from "@/components/blocks/EditorialTextBlock";
import type { LocationLanding, StoryCard } from "@/types/content";

type LandingPageTemplateProps = {
  landing: LocationLanding;
  stories: StoryCard[];
};

export function LandingPageTemplate({ landing, stories }: LandingPageTemplateProps) {
  return (
    <div className="space-y-14 pb-20">
      <HeroStatement hero={landing.hero} />
      <EditorialTextBlock section={landing.intro} />
      <WhyChooseUs items={landing.whyThisPlaceMatters} />
      <SignatureGallery items={landing.gallery} />
      <WhyChooseUs items={landing.whyWeFit} />
      <StoryCardGrid stories={stories} />
      <TestimonialsBlock items={[landing.testimonial]} />
      <InvestmentNote section={landing.investmentNote} />
      <VillaIdentityBlock
        villa={{
          variant: landing.villaIdentityVariant,
          title: "Villa Raffaelli remains a private source of the brand’s point of view.",
          body: "It appears here only as an origin story, not as a public venue funnel.",
        }}
      />
      <FAQBlock items={landing.faqItems} />
      <CTASection section={landing.cta} />
    </div>
  );
}
