import "@testing-library/jest-dom"
import { vi } from "vitest"

// jsdom has no viewport. Visibility and scroll behavior are tested in Playwright.
vi.stubGlobal(
  "IntersectionObserver",
  class IntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
)
