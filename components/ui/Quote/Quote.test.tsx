import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Quote } from "./Quote"

describe("Quote", () => {
  it("renders quote, attribution, and optional context", () => {
    render(<Quote quote="A clear shift." attribution="A.B." context="Single session" />)
    expect(screen.getByText("A clear shift.")).toBeInTheDocument()
    expect(screen.getByText("A.B.")).toBeInTheDocument()
    expect(screen.getByText("Single session")).toBeInTheDocument()
  })
})
