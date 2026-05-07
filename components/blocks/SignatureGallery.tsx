import type { GalleryItem } from "@/types/gallery";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ImageGallery } from "@/components/galleries/ImageGallery";

export function SignatureGallery({ items }: { items: GalleryItem[] }) {
  return (
    <Section className="pt-0">
      <Container className="max-w-[var(--gallery-max)]">
        <ImageGallery items={items} variant="editorial" />
      </Container>
    </Section>
  );
}
