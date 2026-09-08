import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { POST } from "./route"

const mocks = vi.hoisted(() => ({ sync: vi.fn(), rateLimit: vi.fn() }))
vi.mock("lib/hubspot", () => ({ syncHubSpotContact: mocks.sync }))
vi.mock("lib/rateLimit", () => ({ clientIp: () => "test-client", rateLimit: mocks.rateLimit }))

const details = {
  name: "Example Guest",
  email: "guest@example.com",
  topic: "consult",
  message: "I would like to arrange a conversation.",
  hp: "",
}
const request = (body: unknown = details) =>
  new Request("https://example.com/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

describe("contact submission", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.rateLimit.mockReturnValue({ ok: true })
    vi.spyOn(console, "error").mockImplementation(() => {})
  })
  afterEach(() => vi.restoreAllMocks())

  it("delivers the topic and message with the contact details", async () => {
    mocks.sync.mockResolvedValue({ success: true })
    const response = await POST(request())
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ ok: true })
    expect(mocks.sync).toHaveBeenCalledWith({
      email: details.email,
      fullName: details.name,
      message: `Topic: consult\n\n${details.message}`,
    })
  })

  it("returns a safe delivery failure instead of leaking provider errors", async () => {
    mocks.sync.mockResolvedValue({
      success: false,
      errors: ["Private provider details"],
      failure: { stage: "note", status: 403 },
    })
    const response = await POST(request())
    expect(response.status).toBe(502)
    expect(await response.json()).toEqual({ ok: false, error: "delivery_unavailable" })
    expect(console.error).toHaveBeenCalledWith("Contact inquiry delivery failed", { stage: "note", status: 403 })
  })

  it("handles unexpected provider exceptions without exposing a stack trace", async () => {
    mocks.sync.mockRejectedValue(new Error("private details"))
    expect(await (await POST(request())).json()).toEqual({ ok: false, error: "delivery_unavailable" })
  })

  it("rejects invalid details before contacting HubSpot", async () => {
    expect((await POST(request({ ...details, email: "invalid" }))).status).toBe(400)
    expect(mocks.sync).not.toHaveBeenCalled()
  })

  it("returns rate limiting without contacting HubSpot", async () => {
    mocks.rateLimit.mockReturnValue({ ok: false })
    expect((await POST(request())).status).toBe(429)
    expect(mocks.sync).not.toHaveBeenCalled()
  })
})
