import Link from "next/link";
import { siteUi } from "@/content/site/ui";

type BreadcrumbsProps = {
  items: { label: string; href: string }[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav
      aria-label={siteUi.breadcrumbs.navigationLabel}
      className="text-sm text-[var(--color-mist)]"
    >
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 ? <span>/</span> : null}
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
