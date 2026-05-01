import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Textarea } from "./Textarea"

describe("Textarea", () => {
  it("renders label associated with control", () => {
    render(<Textarea label="Message" />)
    const ta = screen.getByLabelText("Message")
    expect(ta).toBeInTheDocument()
  })

  it("shows error and marks aria-invalid", () => {
    render(<Textarea label="Message" error="Required" />)
    expect(screen.getByText("Required")).toBeInTheDocument()
    expect(screen.getByLabelText("Message")).toHaveAttribute("aria-invalid", "true")
  })
})
