import { expect, test } from "@playwright/test"

test.describe("book page", () => {
  for (const width of [375, 430, 768, 1024, 1440, 1920]) {
    test(`has a usable editorial layout at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 })
      const errors: string[] = []
      const schedulerRequests: string[] = []
      page.on("pageerror", (error) => errors.push(error.message))
      page.on("request", (request) => {
        if (/booksy|calendly/i.test(request.url())) schedulerRequests.push(request.url())
      })
      await page.goto("/book")
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("Begin with a conversation.")
      await expect(page.locator("iframe")).toHaveCount(0)
      const links = page.locator("[data-booking-link]")
      await expect(links).toHaveCount(2)
      await expect(links.first()).toBeVisible()
      expect(await links.first().evaluate((el) => el.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44)
      await page.getByRole("link", { name: "What to expect" }).click()
      await expect(page.locator("#what-to-expect")).toBeInViewport()
      await expect(page.locator(".booking-step-list > li")).toHaveCount(3)
      await links.last().scrollIntoViewIfNeeded()
      await expect(links.last()).toBeVisible()
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
      expect(schedulerRequests).toEqual([])
      expect(errors).toEqual([])
    })
  }

  test("supports keyboard navigation and visible focus", async ({ page, browserName }) => {
    await page.goto("/book")
    await page.evaluate(() => document.fonts.ready)
    const cta = page.locator("[data-booking-link]").first()
    // macOS WebKit uses Option+Tab to include links in keyboard navigation.
    const tabKey = browserName === "webkit" && process.platform === "darwin" ? "Alt+Tab" : "Tab"
    for (let i = 0; i < 15; i++) {
      await page.keyboard.press(tabKey)
      if (await cta.evaluate((el) => el === document.activeElement)) break
    }
    await expect(cta).toBeFocused()
    expect(await cta.evaluate((el) => getComputedStyle(el).outlineStyle)).toBe("solid")
    await page.keyboard.press(tabKey)
    await expect(page.getByRole("link", { name: "What to expect" })).toBeFocused()
    await page.keyboard.press("Enter")
    await expect(page.locator("#what-to-expect")).toBeInViewport()
  })

  test("keeps content visible and still with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" })
    await page.goto("/book")
    for (const selector of [".booking-meta-grid", ".booking-statement", ".booking-step", ".booking-final h2"]) {
      const element = page.locator(selector).first()
      await element.scrollIntoViewIfNeeded()
      await expect(element).toBeVisible()
      expect(
        await element.evaluate((el) => {
          for (let node: Element | null = el; node && node.closest(".booking-page"); node = node.parentElement) {
            const style = getComputedStyle(node)
            if (style.opacity !== "1" || (style.transform !== "none" && style.transform !== "matrix(1, 0, 0, 1, 0, 0)"))
              return false
          }
          return true
        })
      ).toBe(true)
    }
    const arrow = page.locator(".booking-link-arrow").last()
    await page.locator("[data-booking-link]").last().hover()
    await expect(arrow).toHaveCSS("transform", "none")
  })

  test("provides the content and consultation link without JavaScript", async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, baseURL })
    const page = await context.newPage()
    await page.goto("/book")
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
    await expect(page.locator(".booking-statement")).toBeVisible()
    await expect(page.locator("[data-booking-link]").last()).toBeVisible()
    await context.close()
  })

  test("opens the configured Booksy URL in a new tab on keyboard activation", async ({ page, context }) => {
    await page.goto("/book")
    const link = page.locator('[data-booking-link="booksy"]').first()
    test.skip((await link.count()) === 0, "The existing Booksy URL has not been supplied.")
    const destination = await link.getAttribute("href")
    expect(destination).toMatch(/^https:\/\//)
    await expect(link).toHaveAttribute("target", "_blank")
    await expect(link).toHaveAttribute("rel", "noopener noreferrer")
    // Verify the handoff without submitting anything to the scheduling provider.
    await context.route(destination!, (route) =>
      route.fulfill({ contentType: "text/html", body: "Booking handoff verified" })
    )
    await link.focus()
    const popupPromise = page.waitForEvent("popup")
    await page.keyboard.press("Enter")
    const popup = await popupPromise
    await expect(popup).toHaveURL(destination!)
    expect(await popup.evaluate(() => window.opener)).toBeNull()
    await popup.close()
  })
})
