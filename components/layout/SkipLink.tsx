import { siteUi } from "@/content/site/ui";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only z-50 rounded-md px-4 py-3 focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
      style={{
        backgroundColor: "var(--button-primary-bg)",
        color: "var(--button-primary-fg)",
      }}
    >
      {siteUi.skipLinkLabel}
    </a>
  );
}
