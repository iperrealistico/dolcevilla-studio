import { cache } from "react";
import { listContentFiles } from "@/lib/content/listContentFiles";
import { parseFrontmatter } from "@/lib/content/parseFrontmatter";
import { imageManifest } from "@/lib/images/imageManifest";

export type JournalEntry = Awaited<ReturnType<typeof getJournalEntries>>[number];

export const getJournalEntries = cache(async () => {
  const files = await listContentFiles();

  const entries = await Promise.all(
    files.map(async (filePath) => {
      const { frontmatter, source } = await parseFrontmatter(filePath);
      return {
        ...frontmatter,
        source,
        heroImage: imageManifest[frontmatter.coverImage as keyof typeof imageManifest],
      };
    }),
  );

  return entries.sort(
    (left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime(),
  );
});
