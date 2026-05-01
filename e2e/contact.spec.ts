import { expect, test } from "@playwright/test"

test.describe("contact form", () => {
  test("happy path submits successfully", async ({ page }) => {
    await page.route("**/api/contact", (route) => route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) }))

    await page.goto("/contact")

    await page.getByLabel("Name").fill("Test User")
    await page.getByLabel("Email").fill("test@example.com")
    await page.getByLabel("Message").fill("This is a placeholder message for testing.")

    await page.getByRole("button", { name: /send message/i }).click()

    await expect(page.getByText(/thank you/i)).toBeVisible()
  })

  test("validation error on missing email", async ({ page }) => {
    await page.goto("/contact")

    await page.getByLabel("Name").fill("Test User")
    await page.getByLabel("Message").fill("Long enough message here.")

    await page.getByRole("button", { name: /send message/i }).click()

    await expect(page.getByText(/please enter a valid email/i)).toBeVisible()
  })
})
