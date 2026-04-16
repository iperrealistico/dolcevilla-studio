import Link from "next/link";
import { notFoundPageContent } from "@/content/pages/not-found";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70dvh] flex-col items-start justify-center gap-5 py-20">
      <p className="text-xs font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
        {notFoundPageContent.eyebrow}
      </p>
      <h1 className="font-display-face text-5xl tracking-[-0.05em] md:text-7xl">
        {notFoundPageContent.title}
      </h1>
      <p className="max-w-2xl text-base leading-8 text-[var(--color-mist)]">
        {notFoundPageContent.body}
      </p>
      <Link
        href={notFoundPageContent.primaryCta.href}
        className="rounded-full bg-[var(--color-ink)] px-5 py-3 text-sm font-semibold text-[var(--color-paper)]"
      >
        {notFoundPageContent.primaryCta.label}
      </Link>
    </Container>
  );
}
