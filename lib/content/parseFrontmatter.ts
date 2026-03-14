import { readFile } from "node:fs/promises";
import matter from "gray-matter";
import { journalEntryFrontmatterSchema } from "@/lib/content/schemas";

export async function parseFrontmatter(filePath: string) {
  const source = await readFile(filePath, "utf8");
  const { content, data } = matter(source);
  const normalizedData = {
    ...data,
    publishedAt:
      data.publishedAt instanceof Date ? data.publishedAt.toISOString().slice(0, 10) : data.publishedAt,
    updatedAt:
      data.updatedAt instanceof Date ? data.updatedAt.toISOString().slice(0, 10) : data.updatedAt,
  };

  return {
    source: content,
    frontmatter: journalEntryFrontmatterSchema.parse(normalizedData),
  };
}
