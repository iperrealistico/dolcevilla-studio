export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only z-50 rounded-md bg-[var(--color-ink)] px-4 py-3 text-[var(--color-paper)] focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
    >
      Skip to main content
    </a>
  );
}
