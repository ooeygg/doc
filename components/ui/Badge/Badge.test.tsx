import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Badge } from "./Badge"

describe("Badge", () => {
  it("renders accolade with gold border", () => {
    render(<Badge variant="accolade">Empowered Woman</Badge>)
    expect(screen.getByText("Empowered Woman")).toHaveClass("border-gold")
  })

  it("renders category with gold background", () => {
    render(<Badge variant="category">Energy medicine</Badge>)
    expect(screen.getByText("Energy medicine")).toHaveClass("bg-gold")
  })

  it("renders press with surface-alt background", () => {
    render(<Badge variant="press">MysticMag</Badge>)
    expect(screen.getByText("MysticMag")).toHaveClass("bg-surface-alt")
  })
})
