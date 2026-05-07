import { siteUi } from "@/content/site/ui";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only z-50 rounded-md bg-[var(--button-primary-bg)] px-4 py-3 text-[var(--button-primary-fg)] focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
    >
      {siteUi.skipLinkLabel}
    </a>
  );
}
