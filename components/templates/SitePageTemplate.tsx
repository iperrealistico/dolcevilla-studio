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
import { StudioIdentityBlock } from "@/components/blocks/StudioIdentityBlock";
import { WhyChooseUs } from "@/components/blocks/WhyChooseUs";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { ScrollParallax } from "@/components/motion/ScrollParallax";
import { Container } from "@/components/ui/Container";
import { Clock3, Film, PhoneCall, ShieldCheck } from "lucide-react";
import type { ServicePageContent, StoryCard } from "@/types/content";

const contactNextStepMeta = [
  {
    title: "Reply window",
    icon: Clock3,
  },
  {
    title: "Next conversation",
    icon: PhoneCall,
  },
  {
    title: "Film priorities",
    icon: Film,
  },
  {
    title: "Discretion",
    icon: ShieldCheck,
  },
] as const;

type SitePageTemplateProps = {
  page: ServicePageContent;
  stories?: StoryCard[];
};

export function SitePageTemplate({
  page,
  stories = [],
}: SitePageTemplateProps) {
  const useBalancedIntro =
    page.pageType === "home" || page.pageType === "about";
  const showIntro = page.pageType !== "about";
  const hasGeography = Boolean(
    page.geography &&
      (page.geography.heading ||
        page.geography.body.length ||
        page.geography.places.length),
  );
  const hasLocationLinks = page.locationLinks.length > 0;
  const hasProcess = page.process.length > 0;
  const hasTestimonials = page.testimonials.length > 0;
  const hasCraft = Boolean(
    page.craft &&
      (page.craft.title ||
        page.craft.body ||
        page.craft.points.length ||
        page.craft.imageId),
  );
  const hasInvestmentNote = Boolean(
    page.investmentNote &&
      (page.investmentNote.heading || page.investmentNote.body.length),
  );
  const hasStudio = Boolean(
    page.studio && (page.studio.title || page.studio.body),
  );
  const hasFaqs = page.faqs.length > 0;

  return (
    <div className="space-y-10 pb-16 md:space-y-14 md:pb-20">
      {page.hero ? (
        <ScrollParallax intensity="lg">
          <HeroStatement hero={page.hero} />
        </ScrollParallax>
      ) : null}
      {showIntro
        ? page.hero
          ? (
              <ScrollParallax from="left">
                <EditorialTextBlock
                  section={page.intro}
                  layout={useBalancedIntro ? "balanced" : "default"}
                />
              </ScrollParallax>
            )
          : (
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
            )
        : null}
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
      {page.highlights.length ? (
        <ScrollParallax from="left">
          <WhyChooseUs items={page.highlights} />
        </ScrollParallax>
      ) : null}
      {hasCraft ? (
        <ScrollParallax from="right">
          <CraftIdentityBlock
            craft={page.craft}
            layout={
              page.pageType === "home" || page.pageType === "contact"
                ? "feature-grid"
                : "default"
            }
          />
        </ScrollParallax>
      ) : null}
      {hasGeography ? (
        <ScrollParallax from="left">
          <GeographyBlock geography={page.geography} />
        </ScrollParallax>
      ) : null}
      {hasLocationLinks ? (
        <ScrollParallax from="right">
          <LocationLinks items={page.locationLinks} />
        </ScrollParallax>
      ) : null}
      {hasProcess && page.pageType !== "contact" ? (
        page.pageType === "home" ? (
          <ScrollParallax from="right">
            <ExperiencePreview steps={page.process} />
          </ScrollParallax>
        ) : (
          <ScrollParallax from="right">
            <ProcessPreviewBlock steps={page.process} />
          </ScrollParallax>
        )
      ) : null}
      {hasTestimonials ? (
        <ScrollParallax from="left">
          <TestimonialsBlock items={page.testimonials} />
        </ScrollParallax>
      ) : null}
      {hasInvestmentNote ? (
        <ScrollParallax from="right">
          <InvestmentNote section={page.investmentNote} />
        </ScrollParallax>
      ) : null}
      {hasStudio ? (
        <ScrollParallax from="left">
          <StudioIdentityBlock studio={page.studio} />
        </ScrollParallax>
      ) : null}
      {hasFaqs ? (
        <ScrollParallax from="right">
          <FAQBlock items={page.faqs} />
        </ScrollParallax>
      ) : null}
      {page.pageType === "contact" ? (
        <>
          {hasProcess ? (
            <ScrollParallax from="right">
              <ProcessPreviewBlock steps={page.process} />
            </ScrollParallax>
          ) : null}
          <ScrollParallax from="left" intensity="lg">
            <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-start xl:gap-14">
              <div className="space-y-8 lg:pr-4">
                {page.formIntro ? (
                  <div className="space-y-4">
                    <p className="text-xs font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
                      {page.formIntro.eyebrow}
                    </p>
                    <h2 className="font-display-face max-w-lg text-4xl leading-[0.94] tracking-[-0.05em] md:text-5xl xl:text-[4.25rem]">
                      {page.formIntro.heading}
                    </h2>
                    <div className="max-w-xl space-y-3 text-base leading-8 text-[var(--color-mist)] md:text-lg">
                      {page.formIntro.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                ) : null}
                {page.nextSteps.length ? (
                  <div className="rounded-[var(--radius-frame)] border border-[var(--color-line)] bg-[var(--surface-panel)] p-5 shadow-[var(--shadow-card)] md:p-6">
                    <p className="text-xs font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
                      What happens next
                    </p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      {page.nextSteps.map((step, index) => {
                        const item = contactNextStepMeta[index];
                        const Icon = item?.icon ?? Clock3;

                        return (
                          <div
                            key={step}
                            className="rounded-[var(--radius-panel)] border border-[var(--color-line)] bg-[var(--surface-panel-soft)] px-4 py-4"
                          >
                            <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-control)] bg-[var(--surface-subtle)] text-[var(--color-ink)]">
                              <Icon size={18} strokeWidth={1.75} />
                            </div>
                            <p className="mt-4 text-[0.68rem] font-semibold tracking-[0.24em] text-[var(--color-mist)] uppercase">
                              {item?.title ?? "Detail"}
                            </p>
                            <p className="mt-2 text-sm leading-7 text-[var(--color-mist)]">
                              {step}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="lg:pl-4">
                <InquiryForm />
              </div>
            </Container>
          </ScrollParallax>
        </>
      ) : null}
      {page.pageType !== "contact" ? (
        <ScrollParallax from="right" intensity="lg">
          <CTASection section={page.cta} />
        </ScrollParallax>
      ) : null}
      {stories.length ? (
        <ScrollParallax from="left">
          <StoryCardGrid stories={stories} maxItems={3} />
        </ScrollParallax>
      ) : null}
    </div>
  );
}
