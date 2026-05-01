import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Button } from "./Button"

describe("Button", () => {
  it("renders with children", () => {
    render(<Button href="/test">Click me</Button>)
    expect(screen.getByText("Click me")).toBeInTheDocument()
  })

  it("renders primary intent (gold) by default", () => {
    const { container } = render(<Button href="/test">Primary</Button>)
    const link = container.querySelector("a")
    expect(link).toHaveClass("bg-gold")
    expect(link).toHaveClass("text-ink")
  })

  it("renders secondary intent as outlined", () => {
    const { container } = render(
      <Button href="/test" intent="secondary">
        Secondary
      </Button>
    )
    const link = container.querySelector("a")
    expect(link).toHaveClass("bg-transparent")
    expect(link).toHaveClass("text-ink")
    expect(link).toHaveClass("border-divider")
  })

  it("renders ghost intent without border", () => {
    const { container } = render(
      <Button href="/test" intent="ghost">
        Ghost
      </Button>
    )
    const link = container.querySelector("a")
    expect(link).toHaveClass("border-transparent")
    expect(link).toHaveClass("text-ink")
  })

  it("renders gold intent with ink text", () => {
    const { container } = render(
      <Button href="/test" intent="gold">
        Book
      </Button>
    )
    const link = container.querySelector("a")
    expect(link).toHaveClass("bg-gold")
    expect(link).toHaveClass("text-ink")
  })

  it("applies correct size classes", () => {
    const { container } = render(
      <Button href="/test" size="sm">
        Small
      </Button>
    )
    const link = container.querySelector("a")
    expect(link).toHaveClass("text-sm")
    expect(link).toHaveClass("min-w-20")
  })

  it("applies underline when set", () => {
    const { container } = render(
      <Button href="/test" underline>
        Underline
      </Button>
    )
    expect(container.querySelector("a")).toHaveClass("underline")
  })
})
