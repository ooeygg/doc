import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Select } from "./Select"

describe("Select", () => {
  it("renders the trigger with label and placeholder", () => {
    render(
      <Select
        label="Topic"
        placeholder="Choose"
        options={[
          { value: "a", label: "A" },
          { value: "b", label: "B" },
        ]}
      />
    )
    expect(screen.getByText("Topic")).toBeInTheDocument()
    expect(screen.getByText("Choose")).toBeInTheDocument()
  })
})
