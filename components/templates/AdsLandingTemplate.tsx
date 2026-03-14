import { CTASection } from "@/components/blocks/CTASection";
import { FAQBlock } from "@/components/blocks/FAQBlock";
import { HeroStatement } from "@/components/blocks/HeroStatement";
import { WhyChooseUs } from "@/components/blocks/WhyChooseUs";
import { SignatureGallery } from "@/components/blocks/SignatureGallery";
import { StoryCardGrid } from "@/components/blocks/StoryCardGrid";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Container } from "@/components/ui/Container";
import type { AdsLanding, StoryCard } from "@/types/content";

export function AdsLandingTemplate({ landing, story }: { landing: AdsLanding; story: StoryCard }) {
  return (
    <div className="space-y-14 pb-20">
      <HeroStatement hero={landing.hero} />
      <WhyChooseUs items={landing.proof} />
      <SignatureGallery items={landing.gallery} />
      <Container>
        <div className="max-w-2xl rounded-[1.75rem] border border-[var(--color-line)] bg-white/70 p-6 text-sm leading-7 text-[var(--color-mist)]">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-mist)]">Pricing signal</p>
          <p className="mt-3">{landing.pricingSignal}</p>
        </div>
      </Container>
      <StoryCardGrid stories={[story]} />
      <FAQBlock items={landing.faqItems} />
      <Container>
        <InquiryForm />
      </Container>
      <CTASection section={landing.cta} />
    </div>
  );
}
