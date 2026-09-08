import { fireEvent, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { BookingCTA } from "./BookingCTA"

const config = vi.hoisted(() => ({ url: undefined as string | undefined }))
vi.mock("lib/booking", () => ({
  get bookingUrl() {
    return config.url
  },
}))

describe("BookingCTA", () => {
  beforeEach(() => {
    // A test-only URL; the production destination must come from configuration.
    config.url = "https://booksy.com/en-us/123_test-practice"
    window.plausible = vi.fn()
  })

  afterEach(() => {
    delete window.plausible
  })

  it.each(["hero", "final"] as const)("opens Booksy securely and records the %s handoff", (placement) => {
    render(<BookingCTA placement={placement} />)
    const link = screen.getByRole("link", { name: /schedule my consultation/i })
    expect(link).toHaveAttribute("href", config.url)
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", "noopener noreferrer")
    expect(link).toHaveAccessibleDescription("Secure online scheduling powered by Booksy.")
    expect(window.plausible).not.toHaveBeenCalled()
    fireEvent.click(link)
    expect(window.plausible).toHaveBeenCalledExactlyOnceWith("booking_started", {
      props: { source: "book_page", provider: "booksy", placement },
    })
  })

  it("still allows booking without an analytics script", () => {
    delete window.plausible
    render(<BookingCTA placement="hero" />)
    expect(() => fireEvent.click(screen.getByRole("link"))).not.toThrow()
    expect(screen.getByRole("link")).toHaveAttribute("href", config.url)
  })

  it("offers an honest contact fallback when no Booksy destination is configured", () => {
    config.url = undefined
    render(<BookingCTA placement="hero" />)
    const link = screen.getByRole("link", { name: /request a consultation/i })
    expect(link).toHaveAttribute("href", "/contact")
    expect(link).not.toHaveAttribute("target")
    expect(screen.queryByText(/powered by booksy/i)).not.toBeInTheDocument()
    expect(window.plausible).not.toHaveBeenCalled()
  })
})
