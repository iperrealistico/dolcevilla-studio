import { readdir } from "node:fs/promises";
import { join } from "node:path";

async function walk(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const target = join(directory, entry.name);
      if (entry.isDirectory()) {
        return walk(target);
      }
      return [target];
    }),
  );

  return files.flat();
}

export async function listContentFiles(rootDirectory = join(process.cwd(), "content", "journal")) {
  return (await walk(rootDirectory)).filter((file) => file.endsWith(".mdx"));
}
