import { expect, test } from "@playwright/test"

test("homepage shows its content and consultation links without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL })
  const page = await context.newPage()
  await page.goto("/")
  await expect(page).toHaveTitle(/Dr\. Cynthia Higgins/)
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Growth Begins Here")
  await expect(page.getByRole("img", { name: "Portrait of Dr. Cynthia Higgins", exact: true })).toBeVisible()
  await expect(page.getByRole("link", { name: "Meet Dr. Higgins", exact: true })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Scale · Grow · Attract", exact: true })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Questions, answered.", exact: true })).toBeVisible()
  await page.locator("#faq summary").first().click()
  await expect(page.locator("#faq details").first()).toHaveAttribute("open", "")
  await context.close()
})

for (const width of [375, 768, 1440]) {
  test(`homepage stays usable at ${width}px with reduced motion`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.emulateMedia({ reducedMotion: "reduce" })
    const errors: string[] = []
    page.on("pageerror", (error) => errors.push(error.message))
    await page.goto("/")
    await page.evaluate(() => document.fonts.ready)
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
    await expect(page.locator(".credential-marquee").first()).toHaveCSS("animation-name", "none")
    const faq = page.locator("#faq summary").first()
    await faq.scrollIntoViewIfNeeded()
    await faq.click()
    await expect(page.locator("#faq details").first()).toHaveAttribute("open", "")
    await faq.click()
    await expect(page.locator("#faq details").first()).not.toHaveAttribute("open", "")
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    expect(errors).toEqual([])
  })
}

test("mobile menu supports navigation and Escape restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")
  const trigger = page.getByRole("button", { name: "Open menu" })
  await trigger.click()
  await expect(page.getByRole("dialog")).toBeVisible()
  await expect(page.getByRole("navigation", { name: "Mobile", exact: true })).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(page.getByRole("dialog")).not.toBeVisible()
  await expect(trigger).toBeFocused()
  await trigger.click()
  await page
    .getByRole("navigation", { name: "Mobile", exact: true })
    .getByRole("link", { name: "About", exact: true })
    .click()
  await expect(page).toHaveURL(/\/about$/)
  await expect(page.getByRole("dialog")).not.toBeVisible()
})
