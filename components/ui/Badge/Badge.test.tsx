import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Badge } from "./Badge"

describe("Badge", () => {
  it("renders accolade with gold border", () => {
    render(<Badge variant="accolade">Empowered Woman</Badge>)
    expect(screen.getByText("Empowered Woman")).toHaveClass("border-gold-500")
  })

  it("renders category with jade background", () => {
    render(<Badge variant="category">Energy medicine</Badge>)
    expect(screen.getByText("Energy medicine")).toHaveClass("bg-jade-900")
  })

  it("renders press with mist background", () => {
    render(<Badge variant="press">MysticMag</Badge>)
    expect(screen.getByText("MysticMag")).toHaveClass("bg-mist-100")
  })
})
