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

test("privacy details open inside the consent overlay instead of navigating away", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Read privacy details" }).click();

  await expect(page.getByRole("dialog", { name: "Privacy details" })).toBeVisible();
  await expect(
    page.getByText(
      "Inquiry information is used only to respond to you. Optional analytics and marketing remain blocked unless you explicitly allow them.",
    ),
  ).toBeVisible();
  await expect(page).toHaveURL(/\/$/);
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

test("desktop mouse movement activates the custom studio cursor", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Cursor activation is validated in the Chromium stack.");

  await page.goto("/");
  await page.getByRole("button", { name: "Continue with essential only" }).click();
  await page.evaluate(() => window.scrollTo(0, 1600));
  await page.mouse.move(640, 280);
  await page.waitForTimeout(100);

  await expect(page.locator("html")).toHaveAttribute("data-custom-cursor", "enabled");
  await expect(page.locator(".studio-cursor")).toHaveAttribute("data-visible", "true");

  const cursorMetrics = await page.locator(".studio-cursor").evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return {
      centerX: rect.left + rect.width / 2,
      centerY: rect.top + rect.height / 2,
    };
  });

  expect(Math.abs(cursorMetrics.centerX - 640)).toBeLessThan(22);
  expect(Math.abs(cursorMetrics.centerY - 280)).toBeLessThan(22);
});

test("gallery images open a visible viewport-anchored lightbox", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Continue with essential only" }).click();

  const galleryCard = page.locator("button:has(img)").first();
  await galleryCard.scrollIntoViewIfNeeded();
  await galleryCard.click();

  const lightbox = page.getByRole("dialog", { name: "Gallery lightbox" });
  await expect(lightbox).toBeVisible();
  await expect(lightbox.getByRole("button", { name: "Close gallery lightbox" })).toBeVisible();

  const imageBox = await lightbox.locator("img").boundingBox();
  const viewport = page.viewportSize();

  expect(imageBox).not.toBeNull();
  expect(viewport).not.toBeNull();

  if (imageBox && viewport) {
    expect(imageBox.y).toBeGreaterThanOrEqual(0);
    expect(imageBox.y + imageBox.height).toBeLessThanOrEqual(viewport.height);
  }
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
