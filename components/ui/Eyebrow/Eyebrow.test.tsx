import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Eyebrow } from "./Eyebrow"

describe("Eyebrow", () => {
  it("renders children with default gold tone", () => {
    render(<Eyebrow>Approach</Eyebrow>)
    const label = screen.getByText("Approach")
    expect(label).toBeInTheDocument()
    expect(label).toHaveClass("text-gold")
  })

  it("supports tone variants", () => {
    render(<Eyebrow tone="ink">Modalities</Eyebrow>)
    expect(screen.getByText("Modalities")).toHaveClass("text-ink")
  })
})
