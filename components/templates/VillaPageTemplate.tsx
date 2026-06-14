import { CTASection } from "@/components/blocks/CTASection";
import { CraftIdentityBlock } from "@/components/blocks/CraftIdentityBlock";
import { EditorialTextBlock } from "@/components/blocks/EditorialTextBlock";
import { FAQBlock } from "@/components/blocks/FAQBlock";
import { GeographyBlock } from "@/components/blocks/GeographyBlock";
import { HeroStatement } from "@/components/blocks/HeroStatement";
import { InvestmentNote } from "@/components/blocks/InvestmentNote";
import { LocationLinks } from "@/components/blocks/LocationLinks";
import { SignatureGallery } from "@/components/blocks/SignatureGallery";
import { StoryCardGrid } from "@/components/blocks/StoryCardGrid";
import { TestimonialsBlock } from "@/components/blocks/TestimonialsBlock";
import { WhyChooseUs } from "@/components/blocks/WhyChooseUs";
import { ScrollParallax } from "@/components/motion/ScrollParallax";
import type { ServicePageContent, StoryCard } from "@/types/content";

type VillaPageTemplateProps = {
  page: ServicePageContent;
  stories: StoryCard[];
};

export function VillaPageTemplate({ page, stories }: VillaPageTemplateProps) {
  return (
    <div className="space-y-10 pb-16 md:space-y-14 md:pb-20">
      {page.hero ? (
        <ScrollParallax intensity="lg">
          <HeroStatement hero={page.hero} />
        </ScrollParallax>
      ) : null}
      <ScrollParallax from="left">
        <EditorialTextBlock section={page.intro} layout="balanced" />
      </ScrollParallax>
      {page.gallery.length ? (
        <ScrollParallax from="right" intensity="lg">
          <SignatureGallery items={page.gallery} />
        </ScrollParallax>
      ) : null}
      {page.highlights.length ? (
        <ScrollParallax from="left">
          <WhyChooseUs items={page.highlights} />
        </ScrollParallax>
      ) : null}
      <ScrollParallax from="right">
        <CraftIdentityBlock craft={page.craft} layout="feature-grid" />
      </ScrollParallax>
      <ScrollParallax from="left">
        <GeographyBlock geography={page.geography} />
      </ScrollParallax>
      <ScrollParallax from="right">
        <LocationLinks items={page.locationLinks} />
      </ScrollParallax>
      <ScrollParallax from="left">
        <TestimonialsBlock items={page.testimonials} />
      </ScrollParallax>
      <ScrollParallax from="right">
        <InvestmentNote section={page.investmentNote} />
      </ScrollParallax>
      <ScrollParallax from="left">
        <FAQBlock items={page.faqs} />
      </ScrollParallax>
      <ScrollParallax from="right">
        <StoryCardGrid stories={stories} maxItems={3} />
      </ScrollParallax>
      <ScrollParallax from="left" intensity="lg">
        <CTASection section={page.cta} />
      </ScrollParallax>
    </div>
  );
}
