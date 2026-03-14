import type { ReactNode } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { siteSettings } from "@/content/site/settings";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return <PageShell stickyCta={siteSettings.primaryCTA}>{children}</PageShell>;
}
