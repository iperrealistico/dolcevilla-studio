import { expect, test } from "@playwright/test";

test("consent doorway appears and the home page remains accessible after opting into essential only", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByText("Step quietly into our world.")).toBeVisible();

  await page.getByRole("button", { name: "Essential only" }).click();

  await expect(
    page.getByRole("heading", {
      name: "A private Tuscan world for couples who want beauty with depth.",
    }),
  ).toBeVisible();
});

test("journal index is reachable after consent", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Essential only" }).click();
  await page.getByRole("navigation").getByRole("link", { name: "Journal" }).click();

  await expect(
    page.getByRole("heading", {
      name: "Stories, guides, and proof pages that deepen trust without losing atmosphere.",
    }),
  ).toBeVisible();
});
