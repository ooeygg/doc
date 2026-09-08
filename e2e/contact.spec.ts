import { expect, test } from "@playwright/test"

test.describe("contact form", () => {
  test("happy path submits successfully", async ({ page }) => {
    await page.route("**/api/contact", (route) => route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) }))

    await page.goto("/contact")

    await page.getByLabel("Name").fill("Test User")
    await page.getByLabel("Email").fill("test@example.com")
    await page.getByLabel("Message").fill("This is a placeholder message for testing.")

    await page.getByRole("button", { name: /send message/i }).click()

    await expect(page.getByRole("status")).toHaveText("Thank you. Your message has been sent.")
    await expect(page.getByLabel("Message")).toHaveValue("")
  })

  test("validation error on missing email", async ({ page }) => {
    await page.goto("/contact")

    await page.getByLabel("Name").fill("Test User")
    await page.getByLabel("Message").fill("Long enough message here.")

    await page.getByRole("button", { name: /send message/i }).click()

    await expect(page.getByText(/please enter a valid email/i)).toBeVisible()
  })

  test("includes the selected topic in the inquiry", async ({ page }) => {
    let submitted: unknown
    await page.route("**/api/contact", async (route) => {
      submitted = route.request().postDataJSON()
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) })
    })
    await page.goto("/contact")
    await page.getByLabel("Name").fill("Example Guest")
    await page.getByLabel("Email", { exact: true }).fill("guest@example.com")
    await page.getByRole("combobox", { name: "What's this about?" }).click()
    await page.getByRole("option", { name: "Booking a consult" }).click()
    await page.getByLabel("Message").fill("Please help me arrange a conversation.")
    await page.getByRole("button", { name: /send message/i }).click()
    await expect(page.getByRole("status")).toBeVisible()
    expect(submitted).toMatchObject({ topic: "consult", message: "Please help me arrange a conversation." })
    await expect(page.getByRole("combobox", { name: "What's this about?" })).toHaveText(/select an option/i)
  })

  test("keeps the inquiry and allows a retry when delivery fails", async ({ page }) => {
    let attempts = 0
    await page.route("**/api/contact", (route) => {
      attempts++
      return route.fulfill({
        status: attempts === 1 ? 502 : 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: attempts > 1 }),
      })
    })
    await page.goto("/contact")
    await page.getByLabel("Name").fill("Example Guest")
    await page.getByLabel("Email", { exact: true }).fill("guest@example.com")
    await page.getByLabel("Message").fill("Please help me arrange a conversation.")
    await page.getByRole("button", { name: /send message/i }).click()
    await expect(page.getByRole("main").getByRole("alert")).toContainText("We couldn't deliver your message")
    await expect(page.getByLabel("Message")).toHaveValue("Please help me arrange a conversation.")
    await expect(page.getByLabel("Email", { exact: true })).toHaveValue("guest@example.com")
    await page.getByRole("button", { name: /send message/i }).click()
    await expect(page.getByRole("status")).toBeVisible()
  })

  test("explains rate limiting and preserves the inquiry", async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({
        status: 429,
        contentType: "application/json",
        body: JSON.stringify({ ok: false, error: "rate_limited" }),
      })
    )
    await page.goto("/contact")
    await page.getByLabel("Name").fill("Example Guest")
    await page.getByLabel("Email", { exact: true }).fill("guest@example.com")
    await page.getByLabel("Message").fill("Please help me arrange a conversation.")
    await page.getByRole("button", { name: /send message/i }).click()
    await expect(page.getByRole("main").getByRole("alert")).toContainText("Please wait an hour")
    await expect(page.getByLabel("Message")).toHaveValue("Please help me arrange a conversation.")
  })
})
