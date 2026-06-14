import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { FloatIn } from "@/components/motion/FloatIn";
import { RichText } from "@/components/ui/RichText";
import { cn } from "@/lib/utils/cn";
import type { RichSection } from "@/types/content";

type EditorialTextBlockProps = {
  section: RichSection;
  layout?: "default" | "balanced";
  className?: string;
  headingClassName?: string;
  textClassName?: string;
};

export function EditorialTextBlock({
  section,
  layout = "default",
  className,
  headingClassName,
  textClassName,
}: EditorialTextBlockProps) {
  const isBalanced = layout === "balanced";
  const splitBalancedHeading = isBalanced && Boolean(section.eyebrow);

  return (
    <Container
      className={cn(
        "grid gap-6",
        isBalanced
          ? splitBalancedHeading
            ? "md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:grid-rows-[auto_1fr] md:gap-x-10 md:gap-y-2 lg:gap-x-14 lg:gap-y-3"
            : "md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:items-center md:gap-10 lg:gap-14"
          : "md:grid-cols-[0.9fr_1.1fr]",
        className,
      )}
    >
      {section.eyebrow ? (
        <FloatIn
          from="left"
          className={cn(
            splitBalancedHeading ? "md:col-start-1 md:row-start-1" : null,
          )}
        >
          <Eyebrow>{section.eyebrow}</Eyebrow>
        </FloatIn>
      ) : null}
      <FloatIn
        from="left"
        className={cn(
          splitBalancedHeading ? "md:col-start-1 md:row-start-2" : null,
        )}
      >
        <Heading
          className={cn(
            "text-3xl md:text-5xl",
            isBalanced ? "max-w-[13ch] lg:max-w-[12ch]" : null,
            headingClassName,
          )}
        >
          {section.heading}
        </Heading>
      </FloatIn>
      <FloatIn
        delay={0.08}
        className={cn(
          splitBalancedHeading
            ? "md:col-start-2 md:row-start-2 md:flex md:min-h-full md:items-center md:pb-1 md:pl-2 lg:pb-2 lg:pl-4"
            : isBalanced
              ? "md:flex md:min-h-full md:items-center md:pl-2 lg:pl-4"
              : "md:self-center",
        )}
      >
        <RichText
          body={section.body}
          className={cn(
            isBalanced
              ? "max-w-[40rem] text-[1.02rem] leading-8 md:text-lg"
              : null,
            textClassName,
          )}
        />
      </FloatIn>
    </Container>
  );
}
