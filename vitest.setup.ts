import "@testing-library/jest-dom"
import { vi } from "vitest"

// jsdom has no viewport. Visibility and scroll behavior are tested in Playwright.
vi.stubGlobal("matchMedia", (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener() {},
  removeEventListener() {},
  addListener() {},
  removeListener() {},
  dispatchEvent: () => true,
}))

vi.stubGlobal(
  "IntersectionObserver",
  class IntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
)
