import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70dvh] flex-col items-start justify-center gap-5 py-20">
      <p className="text-xs font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
        Not found
      </p>
      <h1 className="font-display-face text-5xl tracking-[-0.05em] md:text-7xl">
        This page wandered off.
      </h1>
      <p className="max-w-2xl text-base leading-8 text-[var(--color-mist)]">
        The route may have changed, or the story may not exist yet.
      </p>
      <Link
        href="/"
        className="rounded-full bg-[var(--color-ink)] px-5 py-3 text-sm font-semibold text-[var(--color-paper)]"
      >
        Return home
      </Link>
    </Container>
  );
}
