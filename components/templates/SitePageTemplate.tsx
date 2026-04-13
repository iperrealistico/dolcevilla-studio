import { CTASection } from "@/components/blocks/CTASection";
import { CraftIdentityBlock } from "@/components/blocks/CraftIdentityBlock";
import { EditorialTextBlock } from "@/components/blocks/EditorialTextBlock";
import { ExperiencePreview } from "@/components/blocks/ExperiencePreview";
import { FAQBlock } from "@/components/blocks/FAQBlock";
import { GeographyBlock } from "@/components/blocks/GeographyBlock";
import { HeroStatement } from "@/components/blocks/HeroStatement";
import { InvestmentNote } from "@/components/blocks/InvestmentNote";
import { LocationLinks } from "@/components/blocks/LocationLinks";
import { ProcessPreviewBlock } from "@/components/blocks/ProcessPreviewBlock";
import { SignatureGallery } from "@/components/blocks/SignatureGallery";
import { StudioTeamBlock } from "@/components/blocks/StudioTeamBlock";
import { StoryCardGrid } from "@/components/blocks/StoryCardGrid";
import { TestimonialsBlock } from "@/components/blocks/TestimonialsBlock";
import { VillaIdentityBlock } from "@/components/blocks/VillaIdentityBlock";
import { WhyChooseUs } from "@/components/blocks/WhyChooseUs";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { ScrollParallax } from "@/components/motion/ScrollParallax";
import { Container } from "@/components/ui/Container";
import { Mail } from "lucide-react";
import type { ServicePageContent, StoryCard } from "@/types/content";

type SitePageTemplateProps = {
  page: ServicePageContent;
  stories?: StoryCard[];
};

export function SitePageTemplate({
  page,
  stories = [],
}: SitePageTemplateProps) {
  return (
    <div className="space-y-10 pb-16 md:space-y-14 md:pb-20">
      {page.hero ? (
        <ScrollParallax intensity="lg">
          <HeroStatement hero={page.hero} />
        </ScrollParallax>
      ) : null}
      {page.hero ? (
        <ScrollParallax from="left">
          <EditorialTextBlock section={page.intro} />
        </ScrollParallax>
      ) : (
        <ScrollParallax from="left">
          <Container className="pt-10 md:pt-12">
            <p className="mb-3 text-xs font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
              {page.intro.eyebrow ?? page.slug}
            </p>
            <h1 className="font-display-face max-w-4xl text-5xl leading-[0.94] tracking-[-0.05em] md:text-7xl">
              {page.intro.heading}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--color-mist)]">
              {page.intro.body[0]}
            </p>
          </Container>
        </ScrollParallax>
      )}
      {page.team ? (
        <ScrollParallax from="right" intensity="lg">
          <StudioTeamBlock team={page.team} />
        </ScrollParallax>
      ) : null}
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
      {stories.length ? (
        <ScrollParallax from="left">
          <StoryCardGrid stories={stories} maxItems={3} showMoreHref="/journal" />
        </ScrollParallax>
      ) : null}
      {page.pageType === "home" ? (
        <ScrollParallax from="right">
          <ExperiencePreview steps={page.process} />
        </ScrollParallax>
      ) : (
        <ScrollParallax from="right">
          <ProcessPreviewBlock steps={page.process} />
        </ScrollParallax>
      )}
      <ScrollParallax from="left">
        <TestimonialsBlock items={page.testimonials} />
      </ScrollParallax>
      <ScrollParallax from="right">
        <InvestmentNote section={page.investmentNote} />
      </ScrollParallax>
      <ScrollParallax from="left">
        <VillaIdentityBlock villa={page.villa} />
      </ScrollParallax>
      <ScrollParallax from="right">
        <FAQBlock items={page.faqs} />
      </ScrollParallax>
      {page.pageType === "contact" ? (
        <ScrollParallax from="left" intensity="lg">
          <Container className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              {page.formIntro ? (
                <>
                  <p className="text-xs font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
                    {page.formIntro.eyebrow}
                  </p>
                  <h2 className="font-display-face text-3xl tracking-[-0.03em] md:text-4xl">
                    {page.formIntro.heading}
                  </h2>
                  <div className="space-y-3 text-sm leading-7 text-[var(--color-mist)]">
                    {page.formIntro.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </>
              ) : null}
              {page.directEmail ? (
                <div className="flex items-center gap-3 rounded-[1.2rem] border border-[var(--color-line)] bg-[rgb(255_255_255_/_0.68)] px-4 py-3 text-sm text-[var(--color-mist)] shadow-[0_18px_38px_rgba(30,20,12,0.08)]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgb(95_113_103_/_0.1)] text-[var(--color-ink)]">
                    <Mail size={18} strokeWidth={1.7} />
                  </div>
                  <p>
                    Prefer email? <a href={`mailto:${page.directEmail}`}>{page.directEmail}</a>
                  </p>
                </div>
              ) : null}
              {page.nextSteps.length ? (
                <ul className="space-y-2 text-sm leading-7 text-[var(--color-mist)]">
                  {page.nextSteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              ) : null}
            </div>
            <InquiryForm />
          </Container>
        </ScrollParallax>
      ) : null}
      <ScrollParallax from="right" intensity="lg">
        <CTASection section={page.cta} />
      </ScrollParallax>
    </div>
  );
}
