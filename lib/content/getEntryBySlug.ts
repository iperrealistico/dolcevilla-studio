import { cache } from "react";
import { listContentFiles } from "@/lib/content/listContentFiles";
import { parseFrontmatter } from "@/lib/content/parseFrontmatter";
import { imageManifest } from "@/lib/images/imageManifest";

export const getEntryBySlug = cache(async (slug: string) => {
  const files = await listContentFiles();

  for (const filePath of files) {
    const parsed = await parseFrontmatter(filePath);
    if (parsed.frontmatter.slug === slug) {
      return {
        ...parsed.frontmatter,
        source: parsed.source,
        coverAsset: imageManifest[parsed.frontmatter.coverImage as keyof typeof imageManifest],
        ornamentWashAsset: parsed.frontmatter.ornamentWashImage
          ? imageManifest[
              parsed.frontmatter.ornamentWashImage as keyof typeof imageManifest
            ]
          : null,
        ornamentOrbitAsset: parsed.frontmatter.ornamentOrbitImage
          ? imageManifest[
              parsed.frontmatter.ornamentOrbitImage as keyof typeof imageManifest
            ]
          : null,
      };
    }
  }

  return null;
});
