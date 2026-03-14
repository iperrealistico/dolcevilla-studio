import type { CTASection as CTASectionContent } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { LinkButton } from "@/components/ui/LinkButton";

export function CTASection({ section }: { section: CTASectionContent }) {
  return (
    <Container className="rounded-[2rem] bg-[linear-gradient(135deg,#1D1916,#4B4034)] px-6 py-10 text-[var(--color-paper)] md:px-10">
      {section.eyebrow ? <Eyebrow className="text-[rgb(244_235_224_/_0.7)]">{section.eyebrow}</Eyebrow> : null}
      <Heading className="max-w-3xl text-[var(--color-paper)]">{section.title}</Heading>
      <p className="mt-4 max-w-2xl text-base leading-8 text-[rgb(244_235_224_/_0.78)]">{section.body}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <LinkButton href={section.primaryCta.href}>{section.primaryCta.label}</LinkButton>
        {section.secondaryCta ? (
          <LinkButton href={section.secondaryCta.href} variant="secondary">
            {section.secondaryCta.label}
          </LinkButton>
        ) : null}
      </div>
    </Container>
  );
}
