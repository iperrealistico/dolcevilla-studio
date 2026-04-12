import { Mail } from "lucide-react";
import type { CTASection as CTASectionContent } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { LinkButton } from "@/components/ui/LinkButton";

export function CTASection({ section }: { section: CTASectionContent }) {
  const showMailAccent =
    section.primaryCta.href.startsWith("/contact") || section.primaryCta.href.startsWith("mailto:");

  return (
    <Container className="rounded-[2rem] bg-[linear-gradient(135deg,#1D1916,#4B4034)] px-6 py-10 text-[var(--color-paper)] md:px-10">
      <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          {section.eyebrow ? (
            <Eyebrow className="text-[rgb(244_235_224_/_0.7)]">{section.eyebrow}</Eyebrow>
          ) : null}
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
        </div>
        {showMailAccent ? (
          <div className="hidden md:flex md:justify-end">
            <div className="flex h-24 w-24 items-center justify-center rounded-[1.75rem] border border-white/12 bg-[rgb(255_255_255_/_0.07)] text-[rgb(244_235_224_/_0.88)] shadow-[0_18px_36px_rgba(0,0,0,0.2)]">
              <Mail size={34} strokeWidth={1.7} />
            </div>
          </div>
        ) : null}
      </div>
    </Container>
  );
}
