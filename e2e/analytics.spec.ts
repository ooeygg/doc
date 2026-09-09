import type { Page } from "@playwright/test"
import { expect, test } from "./fixtures"

async function events(page: Page) {
  return page.evaluate(() =>
    (window.dataLayer ?? [])
      .map((entry) => Array.from(entry as ArrayLike<unknown>))
      .filter((entry) => entry[0] === "event")
      .map((entry) => ({ name: entry[1] as string, params: entry[2] as Record<string, unknown> }))
  )
}

test("contact fields and successful retries are measured without sending their contents", async ({ page }) => {
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
  await page.getByLabel("Name", { exact: true }).fill("Private Visitor Sentinel")
  await page.getByLabel("Email", { exact: true }).fill("private-sentinel@example.com")
  await page.getByRole("combobox", { name: "What's this about?" }).click()
  await page.getByRole("option", { name: "Booking a consult", exact: true }).click()
  await page
    .getByLabel("Message", { exact: true })
    .fill("Private health details sentinel that must stay out of analytics.")
  await page.getByRole("button", { name: "Send message", exact: true }).click()
  await expect(page.getByRole("main").getByRole("alert")).toBeVisible()
  await page.getByRole("button", { name: "Send message", exact: true }).click()
  await expect(page.getByRole("status")).toBeVisible()
  const captured = await events(page)
  expect(captured.filter((event) => event.name === "field_focus").map((event) => event.params.field_id)).toEqual(
    expect.arrayContaining(["name", "email", "topic", "message"])
  )
  expect(captured.filter((event) => event.name === "form_attempt")).toHaveLength(2)
  expect(captured.filter((event) => event.name === "form_result").map((event) => event.params.outcome)).toEqual([
    "server_error",
    "success",
  ])
  expect(captured).toContainEqual(
    expect.objectContaining({
      name: "field_change",
      params: expect.objectContaining({ field_id: "topic", has_value: true }),
    })
  )
  expect(JSON.stringify(captured)).not.toMatch(
    /Private Visitor|private-sentinel|Private health|Booking a consult|"consult"/
  )
  await page
    .getByRole("navigation", { name: "Primary", exact: true })
    .getByRole("link", { name: "About", exact: true })
    .click()
  await expect(page).toHaveURL(/\/about$/)
  expect(
    (await events(page)).filter((event) => event.name === "form_abandon" && event.params.form_id === "contact")
  ).toHaveLength(0)
})

test("scroll milestones, keyboard FAQ clicks, and active time reset correctly across client navigation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.clock.install()
  await page.goto("/")
  await page.bringToFront()
  await page.evaluate(() => document.fonts.ready)
  await page.waitForFunction(() => typeof window.gtag === "function")
  await page.clock.runFor(31_000)
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  await page.clock.runFor(100)
  const faq = page.locator("#faq summary").first()
  await faq.focus()
  await page.keyboard.press("Enter")
  const captured = await events(page)
  expect(
    captured.filter((event) => event.name === "scroll_depth").map((event) => event.params.percent_scrolled)
  ).toEqual([10, 25, 50, 75, 90, 100])
  expect(captured).toContainEqual(
    expect.objectContaining({ name: "ui_click", params: expect.objectContaining({ element_id: "faq-1" }) })
  )
  expect(captured).toContainEqual(
    expect.objectContaining({
      name: "page_time",
      params: expect.objectContaining({ page_path: "/", reason: "heartbeat" }),
    })
  )
  await page
    .getByRole("navigation", { name: "Primary", exact: true })
    .getByRole("link", { name: "About", exact: true })
    .click()
  await expect(page).toHaveURL(/\/about$/)
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Dr\. Cynthia\s*Higgins,\s*MD/)
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  await expect
    .poll(async () => {
      // Browser scroll delivery is asynchronous; advance the fake animation frame after it arrives.
      await page.clock.runFor(100)
      return (await events(page))
        .filter((event) => event.name === "scroll_depth" && event.params.page_path === "/about")
        .map((event) => event.params.percent_scrolled)
    })
    .toEqual([10, 25, 50, 75, 90, 100])
})

test("newsletter results and unfinished fields are measured without capturing email addresses", async ({ page }) => {
  await page.route("**/api/lead", (route) =>
    route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) })
  )
  await page.goto("/")
  await page.getByLabel("Stay in touch", { exact: true }).fill("private-newsletter@example.com")
  await page.getByRole("button", { name: "Join", exact: true }).click()
  await expect(page.getByText("Thank you. We'll be in touch.", { exact: true })).toBeVisible()
  expect(await events(page)).toContainEqual(
    expect.objectContaining({
      name: "form_result",
      params: expect.objectContaining({ form_id: "newsletter", outcome: "success" }),
    })
  )
  await page.getByLabel("Stay in touch", { exact: true }).fill("unfinished-newsletter@example.com")
  await page
    .getByRole("navigation", { name: "Primary", exact: true })
    .getByRole("link", { name: "About", exact: true })
    .click()
  await expect(page).toHaveURL(/\/about$/)
  const captured = await events(page)
  expect(captured).toContainEqual(
    expect.objectContaining({
      name: "form_abandon",
      params: expect.objectContaining({ form_id: "newsletter", completed_fields: 1 }),
    })
  )
  expect(JSON.stringify(captured)).not.toMatch(/private-newsletter|unfinished-newsletter|@example/)
})
