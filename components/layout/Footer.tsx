import Link from "next/link";
import { Instagram } from "lucide-react";
import { footerContent } from "@/content/site/footer";
import { siteSettings } from "@/content/site/settings";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function Footer() {
  return (
    <Section className="border-t border-[var(--color-line)] bg-[var(--color-shell)] py-14">
      <Container className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <p className="font-display-face text-3xl tracking-[-0.04em]">
            Dolcevilla Studio
          </p>
          <p className="max-w-xl text-sm leading-7 text-[var(--color-mist)]">
            {footerContent.statement}
          </p>
        </div>
        <div className="space-y-4">
          <p className="text-xs font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
            Navigate
          </p>
          <div className="space-y-2 text-sm text-[var(--color-mist)]">
            {footerContent.navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block hover:text-[var(--color-ink)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-xs font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
            Locations
          </p>
          <div className="space-y-2 text-sm text-[var(--color-mist)]">
            {footerContent.locationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block hover:text-[var(--color-ink)]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={`mailto:${siteSettings.contactEmail}`}
              className="flex items-center gap-2 hover:text-[var(--color-ink)]"
            >
              {siteSettings.contactEmail}
            </Link>
            <Link
              href={siteSettings.instagramUrl}
              className="flex items-center gap-2 hover:text-[var(--color-ink)]"
            >
              <Instagram size={16} /> Instagram
            </Link>
            <div className="flex gap-4 pt-2">
              <Link href="/privacy">Privacy</Link>
              <Link href="/legal">Legal</Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
