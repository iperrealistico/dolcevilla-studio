import type { ReactNode } from "react";
import { PageShell } from "@/components/layout/PageShell";

export default function AdsLayout({ children }: { children: ReactNode }) {
  return <PageShell simplifiedHeader>{children}</PageShell>;
}
