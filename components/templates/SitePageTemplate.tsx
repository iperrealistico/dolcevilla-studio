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
import { StoryCardGrid } from "@/components/blocks/StoryCardGrid";
import { TestimonialsBlock } from "@/components/blocks/TestimonialsBlock";
import { VillaIdentityBlock } from "@/components/blocks/VillaIdentityBlock";
import { WhyChooseUs } from "@/components/blocks/WhyChooseUs";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Container } from "@/components/ui/Container";
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
    <div className="space-y-14 pb-20">
      {page.hero ? <HeroStatement hero={page.hero} /> : null}
      {page.hero ? (
        <EditorialTextBlock section={page.intro} />
      ) : (
        <Container className="pt-12">
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
      )}
      {page.gallery.length ? <SignatureGallery items={page.gallery} /> : null}
      <WhyChooseUs items={page.highlights} />
      <CraftIdentityBlock craft={page.craft} />
      <GeographyBlock geography={page.geography} />
      <LocationLinks items={page.locationLinks} />
      {stories.length ? <StoryCardGrid stories={stories} /> : null}
      {page.pageType === "home" ? (
        <ExperiencePreview steps={page.process} />
      ) : (
        <ProcessPreviewBlock steps={page.process} />
      )}
      <TestimonialsBlock items={page.testimonials} />
      <InvestmentNote section={page.investmentNote} />
      <VillaIdentityBlock villa={page.villa} />
      <FAQBlock items={page.faqs} />
      {page.pageType === "contact" ? (
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
              <p className="text-sm text-[var(--color-mist)]">
                Prefer email?{" "}
                <a href={`mailto:${page.directEmail}`}>{page.directEmail}</a>
              </p>
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
      ) : null}
      <CTASection section={page.cta} />
    </div>
  );
}
