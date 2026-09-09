import { render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
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
    config.url = "https://calendly.com/test-practice/consultation"
  })

  it.each(["hero", "final"] as const)("opens Calendly securely from the %s placement", (placement) => {
    render(<BookingCTA placement={placement} />)
    const link = screen.getByRole("link", { name: /schedule my consultation/i })
    expect(link).toHaveAttribute("href", config.url)
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", "noopener noreferrer")
    expect(link).toHaveAccessibleDescription("Secure online scheduling powered by Calendly.")
  })

  it("offers an honest contact fallback when no Calendly destination is configured", () => {
    config.url = undefined
    render(<BookingCTA placement="hero" />)
    const link = screen.getByRole("link", { name: /request a consultation/i })
    expect(link).toHaveAttribute("href", "/contact")
    expect(link).not.toHaveAttribute("target")
    expect(screen.queryByText(/powered by calendly/i)).not.toBeInTheDocument()
  })
})
