import Link from "next/link";
import { siteUi } from "@/content/site/ui";

type BreadcrumbsProps = {
  items: { label: string; href: string }[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav
      aria-label={siteUi.breadcrumbs.navigationLabel}
      className="text-[0.7rem] font-normal leading-[1.1] tracking-[0.05em] text-[rgb(125_109_92_/_0.72)] md:text-[0.76rem]"
    >
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-1.5">
            {index > 0 ? (
              <span aria-hidden="true" className="opacity-45">
                /
              </span>
            ) : null}
            <Link
              href={item.href}
              className="transition-colors duration-200 hover:text-[rgb(63_49_38_/_0.82)]"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
