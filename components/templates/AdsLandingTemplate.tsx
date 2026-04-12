import { CTASection } from "@/components/blocks/CTASection";
import { FAQBlock } from "@/components/blocks/FAQBlock";
import { HeroStatement } from "@/components/blocks/HeroStatement";
import { WhyChooseUs } from "@/components/blocks/WhyChooseUs";
import { SignatureGallery } from "@/components/blocks/SignatureGallery";
import { StoryCardGrid } from "@/components/blocks/StoryCardGrid";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { ScrollParallax } from "@/components/motion/ScrollParallax";
import { Container } from "@/components/ui/Container";
import type { AdsLanding, StoryCard } from "@/types/content";

export function AdsLandingTemplate({ landing, story }: { landing: AdsLanding; story: StoryCard }) {
  return (
    <div className="space-y-14 pb-20">
      <ScrollParallax intensity="lg">
        <HeroStatement hero={landing.hero} />
      </ScrollParallax>
      <ScrollParallax from="left">
        <WhyChooseUs items={landing.proof} />
      </ScrollParallax>
      <ScrollParallax from="right" intensity="lg">
        <SignatureGallery items={landing.gallery} />
      </ScrollParallax>
      <ScrollParallax from="left">
        <Container>
          <div className="max-w-2xl rounded-[1.75rem] border border-[var(--color-line)] bg-white/70 p-6 text-sm leading-7 text-[var(--color-mist)]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-mist)]">Pricing signal</p>
            <p className="mt-3">{landing.pricingSignal}</p>
          </div>
        </Container>
      </ScrollParallax>
      <ScrollParallax from="right">
        <StoryCardGrid stories={[story]} />
      </ScrollParallax>
      <ScrollParallax from="left">
        <FAQBlock items={landing.faqItems} />
      </ScrollParallax>
      <ScrollParallax from="right" intensity="lg">
        <Container>
          <InquiryForm />
        </Container>
      </ScrollParallax>
      <ScrollParallax from="left" intensity="lg">
        <CTASection section={landing.cta} />
      </ScrollParallax>
    </div>
  );
}
