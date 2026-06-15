import Link from "next/link";
import { Mail } from "lucide-react";
import type { CTASection as CTASectionContent } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { LinkButton } from "@/components/ui/LinkButton";

export function CTASection({ section }: { section: CTASectionContent }) {
  const showMailAccent =
    section.primaryCta.href.startsWith("/contact") || section.primaryCta.href.startsWith("mailto:");
  const buttonClassName =
    "min-h-14 w-full px-6 text-base sm:w-auto md:min-h-16 md:px-8 md:text-lg";

  return (
    <Container className="rounded-[var(--radius-frame)] bg-[linear-gradient(135deg,#14100d,#3a3027)] px-6 py-10 text-[var(--color-paper)] shadow-[var(--shadow-card)] md:px-10">
      <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          {section.eyebrow ? (
            <Eyebrow className="text-[rgb(244_235_224_/_0.7)]">{section.eyebrow}</Eyebrow>
          ) : null}
          <Heading className="max-w-3xl text-[var(--color-paper)]">{section.title}</Heading>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[rgb(244_235_224_/_0.78)]">{section.body}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <LinkButton
              href={section.primaryCta.href}
              variant="secondary"
              className={buttonClassName}
              style={{
                backgroundColor: "rgb(246 239 230 / 0.98)",
                borderColor: "rgba(255,255,255,0.18)",
                color: "rgb(15 12 10 / 0.96)",
              }}
            >
              {section.primaryCta.label}
            </LinkButton>
            {section.secondaryCta ? (
              <Link
                href={section.secondaryCta.href}
                className="inline-flex items-center py-2 text-base font-semibold text-[rgb(244_235_224_/_0.88)] no-underline transition hover:text-[var(--color-paper)] hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-4 focus-visible:ring-offset-[rgb(28_22_18)] md:text-lg"
              >
                {section.secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>
        {showMailAccent ? (
          <div className="hidden md:flex md:justify-end">
            <div className="flex h-24 w-24 items-center justify-center rounded-[var(--radius-frame)] border border-white/12 bg-[rgb(255_255_255_/_0.07)] text-[rgb(244_235_224_/_0.88)] shadow-[0_18px_36px_rgba(0,0,0,0.2)]">
              <Mail size={34} strokeWidth={1.7} />
            </div>
          </div>
        ) : null}
      </div>
    </Container>
  );
}
