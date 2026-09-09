import { afterEach, describe, expect, it, vi } from "vitest"
import { track } from "./analytics"

afterEach(() => {
  delete window.plausible
})

describe("analytics", () => {
  it("preserves early events until the deferred Plausible script loads", () => {
    track("cta_click_hero", { target: "/book" })
    track("booking_started")
    expect(window.plausible?.q).toEqual([
      ["cta_click_hero", { props: { target: "/book" } }],
      ["booking_started", undefined],
    ])
  })

  it("sends subsequent events directly to an already loaded tracker", () => {
    const plausible = vi.fn()
    window.plausible = plausible
    track("contact_form_submitted", { source: "contact" })
    expect(plausible).toHaveBeenCalledWith("contact_form_submitted", { props: { source: "contact" } })
  })
})
