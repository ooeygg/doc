import { expect, test } from "@playwright/test"

test.describe("book page", () => {
  test("renders Calendly embed and fires analytics event", async ({ page }) => {
    const events: string[] = []
    await page.exposeFunction("__captureEvent", (name: string) => {
      events.push(name)
    })
    await page.addInitScript(() => {
      ;(window as unknown as { plausible: (n: string) => void }).plausible = (name: string) => {
        ;(window as unknown as { __captureEvent: (n: string) => void }).__captureEvent(name)
      }
    })

    await page.goto("/book")

    const calendlyFrame = page.locator('iframe[src*="calendly.com"]')
    await expect(calendlyFrame).toBeVisible({ timeout: 15_000 })

    await expect.poll(() => events).toContain("calendly_embed_loaded")
  })
})
