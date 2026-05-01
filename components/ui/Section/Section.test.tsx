import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Section } from "./Section"

describe("Section", () => {
  it("renders children", () => {
    render(
      <Section>
        <p>Body</p>
      </Section>
    )
    expect(screen.getByText("Body")).toBeInTheDocument()
  })

  it("renders eyebrow + heading and links via aria-labelledby", () => {
    const { container } = render(
      <Section eyebrow="Approach" heading="A new path forward">
        <p>Body</p>
      </Section>
    )
    const sectionEl = container.querySelector("section")
    const headingEl = screen.getByRole("heading", { name: /a new path forward/i })
    expect(sectionEl).toHaveAttribute("aria-labelledby", headingEl.id)
    expect(screen.getByText("Approach")).toBeInTheDocument()
  })

  it("applies ink surface classes", () => {
    const { container } = render(
      <Section surface="ink">
        <p>Body</p>
      </Section>
    )
    expect(container.querySelector("section")).toHaveClass("bg-ink")
  })
})
