import { fireEvent } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { type AnalyticsParameters, reportFieldChange, reportFormResult, trackEvent } from "lib/analytics"
import { startInteractionTracking } from "lib/interactionTracking"

let stop: (() => void) | undefined
let now = 0
let focused = true
let visible: DocumentVisibilityState = "visible"
const gtag = vi.fn()
const calls = (name: string) => gtag.mock.calls.filter((call) => call[1] === name).map((call) => call[2])

beforeEach(() => {
  vi.useFakeTimers()
  now = 0
  focused = true
  visible = "visible"
  gtag.mockClear()
  window.gtag = gtag
  delete window.dataLayer
  vi.spyOn(performance, "now").mockImplementation(() => now)
  vi.spyOn(document, "hasFocus").mockImplementation(() => focused)
  vi.spyOn(document, "visibilityState", "get").mockImplementation(() => visible)
  vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => window.setTimeout(() => callback(now), 16))
  vi.spyOn(window, "cancelAnimationFrame").mockImplementation((id) => window.clearTimeout(id))
  document.body.innerHTML = `<main><section id="contact">
    <form data-analytics-form="contact">
      <input id="name" data-analytics-field="name">
      <input id="email" data-analytics-field="email" type="email">
      <textarea id="message" data-analytics-field="message"></textarea>
      <input id="hp" name="hp" hidden>
      <input id="password" data-analytics-field="name" type="password">
      <button type="submit" data-analytics-id="contact-submit">Send</button>
    </form>
    <a href="/book?email=private@example.com#private-message">Private Name</a>
  </section></main>`
})

afterEach(() => {
  stop?.()
  stop = undefined
  vi.restoreAllMocks()
  vi.useRealTimers()
  delete window.gtag
  delete window.dataLayer
  document.body.innerHTML = ""
})

describe("interaction tracking", () => {
  it("tracks field engagement once per field without capturing typed contents or URL parameters", () => {
    stop = startInteractionTracking("/contact?email=private@example.com")
    const email = document.querySelector<HTMLInputElement>("#email")!
    fireEvent.focusIn(email)
    fireEvent.input(email, { target: { value: "private@example.com" } })
    fireEvent.input(email, { target: { value: "other-private@example.com" } })
    fireEvent.focusOut(email)
    fireEvent.focusIn(email)
    expect(calls("form_begin")).toHaveLength(1)
    expect(calls("field_focus")).toHaveLength(1)
    expect(calls("field_edit")).toHaveLength(1)
    expect(calls("field_complete")).toEqual([
      expect.objectContaining({ field_id: "email", has_value: true, page_path: "/contact" }),
    ])
    const anchor = document.querySelector("a")!
    anchor.addEventListener("click", (event) => event.preventDefault())
    fireEvent.click(anchor)
    expect(calls("ui_click")[0]).toMatchObject({ link_target: "/book", link_kind: "internal" })
    expect(JSON.stringify(gtag.mock.calls)).not.toMatch(/private|@|Private Name|email=/)
  })

  it("ignores passwords, honeypots, hidden content, and disabled fields", () => {
    stop = startInteractionTracking("/contact")
    const email = document.querySelector<HTMLInputElement>("#email")!
    email.disabled = true
    for (const id of ["password", "hp", "email"]) {
      const field = document.getElementById(id)!
      fireEvent.focusIn(field)
      fireEvent.input(field, { target: { value: "secret-value" } })
    }
    expect(gtag).not.toHaveBeenCalled()
  })

  it("records select interaction state without the selected option", () => {
    stop = startInteractionTracking("/contact")
    reportFieldChange("contact", "topic", true)
    expect(calls("field_change")).toEqual([
      expect.objectContaining({ form_id: "contact", field_id: "topic", has_value: true }),
    ])
    expect(calls("field_change")[0]).not.toHaveProperty("value")
  })

  it("counts active time once and excludes unfocused and hidden intervals", () => {
    stop = startInteractionTracking("/contact")
    now = 5_000
    focused = false
    window.dispatchEvent(new Event("blur"))
    now = 65_000
    vi.advanceTimersByTime(60_000)
    expect(calls("page_time")).toHaveLength(1)
    focused = true
    window.dispatchEvent(new Event("focus"))
    now = 70_000
    visible = "hidden"
    document.dispatchEvent(new Event("visibilitychange"))
    now = 130_000
    vi.advanceTimersByTime(60_000)
    window.dispatchEvent(new Event("pagehide"))
    stop()
    stop = undefined
    expect(calls("page_time").map((event) => event.active_time_ms)).toEqual([5000, 5000])
    expect(calls("page_time")[1]).toMatchObject({ total_active_time_ms: 10_000, reason: "hidden" })
  })

  it("captures pointer activation of custom fields and clicks on decorative button icons", () => {
    document
      .querySelector("form")!
      .insertAdjacentHTML(
        "beforeend",
        `<button type="button" role="combobox" data-analytics-field="topic" data-analytics-id="topic-control"><span aria-hidden="true">Icon</span></button>`
      )
    stop = startInteractionTracking("/contact")
    const trigger = document.querySelector('[role="combobox"]')!
    fireEvent.pointerDown(trigger)
    // Radix hides the page from assistive technology while its popup owns focus.
    document.querySelector("main")!.setAttribute("aria-hidden", "true")
    fireEvent.click(trigger.querySelector("span")!)
    expect(calls("field_focus")).toEqual([expect.objectContaining({ field_id: "topic" })])
    expect(calls("ui_click")).toEqual([expect.objectContaining({ element_id: "topic-control" })])
  })

  it("deduplicates scroll milestones and resets them for a new route", () => {
    vi.spyOn(document.documentElement, "scrollHeight", "get").mockReturnValue(2000)
    vi.spyOn(window, "innerHeight", "get").mockReturnValue(500)
    vi.spyOn(window, "scrollY", "get").mockReturnValue(1500)
    stop = startInteractionTracking("/")
    fireEvent.scroll(window)
    vi.advanceTimersByTime(20)
    fireEvent.scroll(window)
    vi.advanceTimersByTime(20)
    expect(calls("scroll_depth").map((event) => event.percent_scrolled)).toEqual([10, 25, 50, 75, 90, 100])
    stop()
    stop = startInteractionTracking("/about")
    fireEvent.scroll(window)
    vi.advanceTimersByTime(20)
    expect(calls("scroll_depth").filter((event) => event.page_path === "/about")).toHaveLength(6)
  })

  it("reports attempts and failure, then excludes a successful retry from abandonment", () => {
    stop = startInteractionTracking("/contact")
    const form = document.querySelector("form")!
    fireEvent.submit(form)
    reportFormResult("contact", "server_error")
    fireEvent.submit(form)
    reportFormResult("contact", "success")
    window.dispatchEvent(new Event("pagehide"))
    expect(calls("form_attempt")).toHaveLength(2)
    expect(calls("form_result").map((event) => event.outcome)).toEqual(["server_error", "success"])
    expect(calls("form_abandon")).toHaveLength(0)
  })

  it("reports unfinished forms once on exit and removes listeners during cleanup", () => {
    stop = startInteractionTracking("/contact")
    fireEvent.input(document.getElementById("name")!, { target: { value: "Private Name" } })
    window.dispatchEvent(new Event("pagehide"))
    stop()
    stop = undefined
    expect(calls("form_abandon")).toEqual([
      expect.objectContaining({ form_id: "contact", touched_fields: 1, completed_fields: 1 }),
    ])
    gtag.mockClear()
    fireEvent.input(document.getElementById("email")!, { target: { value: "private@example.com" } })
    fireEvent.scroll(window)
    vi.advanceTimersByTime(60_000)
    expect(gtag).not.toHaveBeenCalled()
  })

  it("queues early events and drops unapproved parameter keys", () => {
    delete window.gtag
    trackEvent(
      "field_edit",
      { field_id: "email", value: "private@example.com" } as AnalyticsParameters,
      "/contact?email=private@example.com"
    )
    expect(window.dataLayer).toHaveLength(1)
    expect(Object.prototype.toString.call(window.dataLayer![0])).toBe("[object Arguments]")
    expect(Array.from(window.dataLayer![0] as ArrayLike<unknown>)).toEqual([
      "event",
      "field_edit",
      {
        field_id: "email",
        page_path: "/contact",
        page_location: "https://www.workofangelsllc.com/contact",
        send_to: "G-9G0FZQF6PT",
      },
    ])
  })

  it("does not let a broken analytics provider prevent form completion", () => {
    window.gtag = () => {
      throw new Error("Blocked analytics")
    }
    expect(() => reportFormResult("contact", "success")).not.toThrow()
  })
})
