import { CTASection } from "@/components/blocks/CTASection";
import { CraftIdentityBlock } from "@/components/blocks/CraftIdentityBlock";
import { EditorialTextBlock } from "@/components/blocks/EditorialTextBlock";
import { FAQBlock } from "@/components/blocks/FAQBlock";
import { GeographyBlock } from "@/components/blocks/GeographyBlock";
import { HeroStatement } from "@/components/blocks/HeroStatement";
import { InvestmentNote } from "@/components/blocks/InvestmentNote";
import { LocationLinks } from "@/components/blocks/LocationLinks";
import { PointsEditorialBlock } from "@/components/blocks/PointsEditorialBlock";
import { SignatureGallery } from "@/components/blocks/SignatureGallery";
import { StoryCardGrid } from "@/components/blocks/StoryCardGrid";
import { TestimonialsBlock } from "@/components/blocks/TestimonialsBlock";
import { WhyChooseUs } from "@/components/blocks/WhyChooseUs";
import { ScrollParallax } from "@/components/motion/ScrollParallax";
import type {
  Point,
  RichSection,
  ServicePageContent,
  StoryCard,
} from "@/types/content";

type VillaPageTemplateProps = {
  page: ServicePageContent;
  stories: StoryCard[];
  details: {
    identityIntro: RichSection;
    identity: Point[];
    celebrationsIntro: RichSection;
    celebrations: Point[];
    privacyIntro: RichSection;
    privacy: Point[];
    accessNote: RichSection;
  };
};

export function VillaPageTemplate({
  page,
  stories,
  details,
}: VillaPageTemplateProps) {
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
        <GeographyBlock geography={page.geography} />
      </ScrollParallax>
      <ScrollParallax from="right">
        <LocationLinks items={page.locationLinks} />
      </ScrollParallax>
      <ScrollParallax from="left">
        <PointsEditorialBlock
          section={details.identityIntro}
          items={details.identity}
          columns={2}
        />
      </ScrollParallax>
      <ScrollParallax from="right">
        <PointsEditorialBlock
          section={details.celebrationsIntro}
          items={details.celebrations}
          columns={2}
        />
      </ScrollParallax>
      <ScrollParallax from="left">
        <PointsEditorialBlock
          section={details.privacyIntro}
          items={details.privacy}
          columns={2}
        />
      </ScrollParallax>
      <ScrollParallax from="right">
        <EditorialTextBlock section={details.accessNote} />
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
        <StoryCardGrid stories={stories} maxItems={3} showMoreHref="/journal" />
      </ScrollParallax>
      <ScrollParallax from="left" intensity="lg">
        <CTASection section={page.cta} />
      </ScrollParallax>
    </div>
  );
}
