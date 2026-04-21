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
          <StoryCardGrid
            stories={stories}
            maxItems={3}
            showMoreHref="/journal"
          />
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
                <div className="rounded-[1.85rem] border border-[var(--color-line)] bg-[rgb(255_255_255_/_0.76)] p-5 shadow-[var(--shadow-soft)] md:p-6">
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
                          className="rounded-[1.35rem] border border-[var(--color-line)] bg-[var(--color-shell)] px-4 py-4"
                        >
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgb(95_113_103_/_0.1)] text-[var(--color-ink)]">
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
      ) : null}
      {page.pageType !== "contact" ? (
        <ScrollParallax from="right" intensity="lg">
          <CTASection section={page.cta} />
        </ScrollParallax>
      ) : null}
    </div>
  );
}
