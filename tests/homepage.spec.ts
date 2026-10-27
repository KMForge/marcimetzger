import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";
const assets = JSON.parse(readFileSync("docs/assets.json", "utf8")) as {
  file: string;
}[];
for (const width of [360, 390, 640, 768, 1024, 1440]) {
  test(`Production layout at ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    for (
      let y = 0;
      y < (await page.evaluate(() => document.body.scrollHeight));
      y += 650
    ) {
      await page.evaluate((y) => scrollTo(0, y), y);
      await page.waitForTimeout(60);
    }
    await page.locator("footer").scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        page.evaluate(() =>
          [...document.images]
            .filter(
              (i) =>
                i.getBoundingClientRect().width > 0 &&
                (!i.complete || i.naturalWidth === 0),
            )
            .map((i) => i.src),
        ),
      )
      .toEqual([]);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    const outside = await page
      .locator(
        "main a, main button, main input, main select, main textarea, header a",
      )
      .evaluateAll((nodes) =>
        nodes
          .filter((n) => {
            const r = n.getBoundingClientRect();
            return r.width > 0 && (r.left < -1 || r.right > innerWidth + 1);
          })
          .map((n) => n.outerHTML.slice(0, 200)),
      );
    expect(outside).toEqual([]);
    expect(errors).toEqual([]);
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(400);
    await page.screenshot({
      path: `research/redesign-${width}.png`,
      fullPage: true,
    });
    if (width === 360 || width === 1440) {
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(
        result.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.map((n) => n.target),
        })),
      ).toEqual([]);
    }
  });
}
test("Mobile menu, Escape, focus return, anchor clearance and reduced motion", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  const menu = page.getByRole("button", { name: "Menu" });
  await menu.click();
  await expect(page.locator("#mobile-navigation a").first()).toBeFocused();
  await expect(
    page.getByRole("button", { name: "Close", exact: false }),
  ).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Find a home" })
    .click();
  await expect(page.locator("#search")).toBeFocused();
  await expect(page.locator("#mobile-navigation")).toBeHidden();
  expect(
    (await page.locator("#search").boundingBox())!.y,
  ).toBeGreaterThanOrEqual(76);
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
});
test("Every gallery photo, lightbox keyboard navigation and focus restoration", async ({
  page,
}) => {
  await page.goto("/");
  for (let i = 1; i <= 7; i++) {
    await page
      .getByRole("button", { name: new RegExp(`^Show photo ${i}:`) })
      .click();
    await expect(
      page.getByRole("button", { name: new RegExp(`^Enlarge photo ${i}:`) }),
    ).toBeVisible();
  }
  await page.getByRole("button", { name: "Next photo", exact: true }).click();
  const opener = page.getByRole("button", { name: /^Enlarge photo 1:/ });
  await opener.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("dialog")).toContainText("Photo 2 of 7");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(
    page.getByRole("button", { name: /^Enlarge photo 2:/ }),
  ).toBeFocused();
});
test("Contact validation, private draft and clipboard fallback", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.getByRole("button", { name: "Prepare message" }).click();
  expect(
    await page
      .locator("#email")
      .evaluate((e: HTMLInputElement) => e.validity.valueMissing),
  ).toBe(true);
  await page.locator("#email").fill("invalid");
  await page.getByRole("button", { name: "Prepare message" }).click();
  expect(
    await page
      .locator("#email")
      .evaluate((e: HTMLInputElement) => e.validity.typeMismatch),
  ).toBe(true);
  await page.locator("#name").fill("Assessment Test");
  await page.locator("#email").fill("test@example.com");
  await page.locator("#message").fill("Draft only — please do not send.");
  await page.getByRole("button", { name: "Prepare message" }).click();
  await expect(page.getByRole("status")).toContainText("Nothing has been sent");
  await expect(page.locator("#draft")).toHaveValue(/test@example.com/);
  await page.getByRole("button", { name: "Copy draft" }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "Draft only",
  );
  await expect(
    page.getByRole("link", { name: "Open Marci’s contact form" }),
  ).toHaveAttribute("href", /marcimetzger.com\/#63878283/);
});
test("Search validates price range and serializes verified IDX filters", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByLabel("Min price").fill("500000");
  await page.getByLabel("Max price").fill("100000");
  await page.getByRole("button", { name: "Search now" }).click();
  expect(
    await page
      .getByLabel("Max price")
      .evaluate((e: HTMLInputElement) => e.validationMessage),
  ).toContain("Maximum price");
  await page.getByLabel("Max price").fill("700000");
  await page.getByLabel("Type", { exact: true }).selectOption("1");
  await page.getByLabel("Bedrooms", { exact: true }).selectOption("2");
  await page.route("https://theridgerealty.idxbroker.com/**", (route) =>
    route.fulfill({
      status: 200,
      body: "Verified search destination intercepted for test",
    }),
  );
  await page.getByRole("button", { name: "Search now" }).click();
  await page.waitForURL(/idxbroker/);
  const url = new URL(page.url());
  expect(url.searchParams.get("city[]")).toBe("35146");
  expect(url.searchParams.get("lp")).toBe("500000");
  expect(url.searchParams.get("hp")).toBe("700000");
  expect(url.searchParams.get("bd")).toBe("2");
});
test("All source images and anchors exist; no placeholder links", async ({
  page,
  request,
}) => {
  await page.goto("/");
  for (const asset of assets) {
    const r = await request.get(asset.file);
    expect(r.ok(), asset.file).toBe(true);
  }
  const bad = await page.locator("a").evaluateAll((nodes) =>
    nodes
      .filter((a) => {
        const href = a.getAttribute("href");
        return (
          !href ||
          href === "#" ||
          (href.startsWith("#") && !document.getElementById(href.slice(1)))
        );
      })
      .map((a) => a.outerHTML),
  );
  expect(bad).toEqual([]);
  const used = await page
    .locator("img")
    .evaluateAll((nodes) => nodes.map((i) => new URL(i.src).pathname));
  for (const asset of assets) expect(used).toContain(asset.file);
});

test("Map loads only on request and clipboard failure offers manual copying", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".office-map iframe")).toHaveCount(0);
  await page.route("https://maps.google.com/**", (route) =>
    route.fulfill({
      status: 200,
      body: "Map provider intercepted for deterministic testing",
    }),
  );
  await page.getByRole("button", { name: "Load office map" }).click();
  await expect(
    page.getByTitle("The Ridge Realty Group office in Pahrump"),
  ).toBeVisible();
  await page.evaluate(() =>
    Object.defineProperty(navigator.clipboard, "writeText", {
      value: () => Promise.reject(new Error("Clipboard permission denied")),
    }),
  );
  await page.locator("#email").fill("test@example.com");
  await page.getByRole("button", { name: "Prepare message" }).click();
  await page.getByRole("button", { name: "Copy draft" }).click();
  await expect(page.getByRole("status")).toContainText("Select and copy");
  await expect(page.locator("#draft")).toBeFocused();
  expect(await page.locator("body").innerText()).not.toMatch(/[A-Za-z]\?[a-z]/);
});
test("Zero maximum price is validated and missing maximum remains optional", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByLabel("Min price").fill("100");
  await page.getByLabel("Max price").fill("0");
  await page.getByRole("button", { name: "Search now" }).click();
  expect(
    await page
      .getByLabel("Max price")
      .evaluate((e: HTMLInputElement) => e.validity.customError),
  ).toBe(true);
  await page.getByLabel("Max price").fill("");
  expect(
    await page
      .getByLabel("Max price")
      .evaluate((e: HTMLInputElement) => e.validity.valid),
  ).toBe(true);
});
