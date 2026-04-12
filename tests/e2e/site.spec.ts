import { expect, test } from "@playwright/test";

test("consent doorway appears and the home page remains accessible after opting into essential only", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByText("A Tuscan studio where film, light, and modern restraint still belong together."),
  ).toBeVisible();

  await page.getByRole("button", { name: "Continue with essential only" }).click();

  await expect(
    page.getByRole("heading", {
      name: "A private Tuscan world for couples who want beauty with depth.",
    }),
  ).toBeVisible();
});

test("mobile consent doorway can be dismissed without hidden fixed UI intercepting taps", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("button", { name: "Continue with essential only" })).toBeVisible();

  await page.getByRole("button", { name: "Continue with essential only" }).click();

  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(page.getByRole("link", { name: "Start your inquiry" }).last()).toBeVisible();
});

test("journal index is reachable after consent", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Continue with essential only" }).click();
  await page.getByRole("navigation").getByRole("link", { name: "Journal" }).click();

  await expect(
    page.getByRole("heading", {
      name: "Stories, guides, and proof pages about place, process, and the craft behind the photographs.",
    }),
  ).toBeVisible();
});

test("public pages no longer render preview contact-sheet imagery", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Continue with essential only" }).click();

  const homeImageSources = await page.locator("img").evaluateAll((images) =>
    images
      .map((image) => image.getAttribute("src") ?? "")
      .filter(Boolean),
  );
  expect(homeImageSources.some((src) => src.includes("contact-sheet"))).toBe(false);

  await page.getByRole("navigation").getByRole("link", { name: "Film" }).click();
  await expect(
    page.getByRole("heading", {
      name: "Hybrid wedding photography for couples who want film to mean something real.",
    }),
  ).toBeVisible();

  const filmImageSources = await page.locator("img").evaluateAll((images) =>
    images
      .map((image) => image.getAttribute("src") ?? "")
      .filter(Boolean),
  );
  expect(filmImageSources.some((src) => src.includes("contact-sheet"))).toBe(false);
});
