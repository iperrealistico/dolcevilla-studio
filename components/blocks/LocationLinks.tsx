import type { Link as ContentLink } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";

export function LocationLinks({ items }: { items: ContentLink[] }) {
  if (!items.length) {
    return null;
  }

  return (
    <Container className="flex flex-wrap gap-3">
      {items.map((item) => (
        <LinkButton key={item.href} href={item.href} variant="secondary">
          {item.label}
        </LinkButton>
      ))}
    </Container>
  );
}
