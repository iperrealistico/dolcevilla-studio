import { validateContent } from "@/lib/content/validateContent";

async function main() {
  const summary = await validateContent();
  console.log("Content validation passed.");
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
  console.error("Content validation failed.");
  console.error(error);
  process.exit(1);
});
