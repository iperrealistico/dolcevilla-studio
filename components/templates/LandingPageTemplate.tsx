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
import { ScrollParallax } from "@/components/motion/ScrollParallax";
import type { LocationLanding, StoryCard } from "@/types/content";

type LandingPageTemplateProps = {
  landing: LocationLanding;
  stories: StoryCard[];
};

export function LandingPageTemplate({ landing, stories }: LandingPageTemplateProps) {
  return (
    <div className="space-y-14 pb-20">
      <ScrollParallax intensity="lg">
        <HeroStatement hero={landing.hero} />
      </ScrollParallax>
      <ScrollParallax from="left">
        <EditorialTextBlock section={landing.intro} />
      </ScrollParallax>
      <ScrollParallax from="right">
        <WhyChooseUs items={landing.whyThisPlaceMatters} />
      </ScrollParallax>
      <ScrollParallax from="left" intensity="lg">
        <SignatureGallery items={landing.gallery} />
      </ScrollParallax>
      <ScrollParallax from="right">
        <WhyChooseUs items={landing.whyWeFit} />
      </ScrollParallax>
      <ScrollParallax from="left">
        <StoryCardGrid stories={stories} maxItems={3} showMoreHref="/journal" />
      </ScrollParallax>
      <ScrollParallax from="right">
        <TestimonialsBlock items={[landing.testimonial]} />
      </ScrollParallax>
      <ScrollParallax from="left">
        <InvestmentNote section={landing.investmentNote} />
      </ScrollParallax>
      <ScrollParallax from="right">
        <VillaIdentityBlock
          villa={{
            variant: landing.villaIdentityVariant,
            title: "Villa Raffaelli remains a private source of the brand’s point of view.",
            body: "It appears here only as an origin story, not as a public venue funnel.",
          }}
        />
      </ScrollParallax>
      <ScrollParallax from="left">
        <FAQBlock items={landing.faqItems} />
      </ScrollParallax>
      <ScrollParallax from="right" intensity="lg">
        <CTASection section={landing.cta} />
      </ScrollParallax>
    </div>
  );
}
