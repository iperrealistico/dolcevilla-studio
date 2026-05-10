import type { FAQItem, ImageAsset } from "@/types/content";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildNonBlogPageJsonLd,
  type NonBlogStructuredPageType,
  type StructuredBreadcrumbItem,
} from "@/lib/seo/structuredData";

type NonBlogPageStructuredDataProps = {
  title: string;
  description: string;
  path: string;
  pageType: NonBlogStructuredPageType;
  image?: ImageAsset | null;
  breadcrumbs?: StructuredBreadcrumbItem[];
  faqItems?: FAQItem[];
};

export function NonBlogPageStructuredData({
  title,
  description,
  path,
  pageType,
  image,
  breadcrumbs = [],
  faqItems = [],
}: NonBlogPageStructuredDataProps) {
  return (
    <>
      <JsonLd
        data={buildNonBlogPageJsonLd({
          title,
          description,
          path,
          pageType,
          image,
          hasBreadcrumbs: breadcrumbs.length > 0,
        })}
      />
      {breadcrumbs.length ? (
        <JsonLd data={buildBreadcrumbJsonLd(breadcrumbs, path)} />
      ) : null}
      {faqItems.length ? <JsonLd data={buildFaqJsonLd(faqItems, path)} /> : null}
    </>
  );
}
