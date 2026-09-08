import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { syncHubSpotContact } from "./hubspot"

const config = vi.hoisted(() => ({ token: "test-token" as string | undefined }))
vi.mock("config/env", () => ({
  env: {
    get HUBSPOT_PRIVATE_APP_TOKEN() {
      return config.token
    },
  },
}))

const reply = (status: number, body: unknown) => new Response(JSON.stringify(body), { status })
const input = { email: "Guest@Example.com", fullName: "Example Guest", message: "A question about a consultation." }

describe("syncHubSpotContact", () => {
  const fetchMock = vi.fn<typeof fetch>()

  beforeEach(() => {
    config.token = "test-token"
    fetchMock.mockReset()
    vi.stubGlobal("fetch", fetchMock)
  })
  afterEach(() => vi.unstubAllGlobals())

  it("updates by email with write permission and saves an associated inquiry without reading contacts", async () => {
    fetchMock.mockResolvedValueOnce(reply(200, { id: "contact-1" })).mockResolvedValueOnce(reply(201, { id: "note-1" }))
    const result = await syncHubSpotContact(input)
    expect(result).toMatchObject({ success: true, actionTaken: "updated", contactId: "contact-1", noteId: "note-1" })
    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(fetchMock.mock.calls[0]).toEqual([
      "https://api.hubapi.com/crm/v3/objects/contacts/guest%40example.com?idProperty=email",
      expect.objectContaining({
        method: "PATCH",
        body: JSON.stringify({ properties: { email: "guest@example.com", firstname: "Example", lastname: "Guest" } }),
      }),
    ])
    const note = JSON.parse(fetchMock.mock.calls[1]![1]!.body as string)
    expect(note).toMatchObject({
      properties: { hs_note_body: input.message },
      associations: [
        { to: { id: "contact-1" }, types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 202 }] },
      ],
    })
    expect(fetchMock.mock.calls.every(([, options]) => options?.method !== "GET")).toBe(true)
  })

  it("creates a new contact only when the email update returns 404", async () => {
    fetchMock
      .mockResolvedValueOnce(reply(404, {}))
      .mockResolvedValueOnce(reply(201, { id: "new-contact" }))
      .mockResolvedValueOnce(reply(201, { id: "note-1" }))
    expect(await syncHubSpotContact(input)).toMatchObject({
      success: true,
      actionTaken: "created",
      contactId: "new-contact",
    })
    expect(fetchMock.mock.calls[1]).toEqual([
      "https://api.hubapi.com/crm/v3/objects/contacts",
      expect.objectContaining({ method: "POST" }),
    ])
  })

  it("recovers when another submission creates the email between update and create", async () => {
    fetchMock
      .mockResolvedValueOnce(reply(404, {}))
      .mockResolvedValueOnce(reply(409, {}))
      .mockResolvedValueOnce(reply(200, { id: "racing-contact" }))
      .mockResolvedValueOnce(reply(201, { id: "note-1" }))
    expect(await syncHubSpotContact(input)).toMatchObject({
      success: true,
      actionTaken: "updated",
      contactId: "racing-contact",
    })
    expect(fetchMock.mock.calls.map(([, options]) => options?.method)).toEqual(["PATCH", "POST", "PATCH", "POST"])
  })

  it("does not erase existing contact properties with blank fields", async () => {
    fetchMock.mockResolvedValueOnce(reply(200, { id: "contact-1" }))
    const result = await syncHubSpotContact({ email: input.email, firstname: "", phone: " " })
    expect(result).toMatchObject({ success: true, propertiesSent: { email: "guest@example.com" } })
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it("does not report delivery success when the message could not be saved", async () => {
    fetchMock
      .mockResolvedValueOnce(reply(200, { id: "contact-1" }))
      .mockResolvedValueOnce(
        reply(403, { category: "MISSING_SCOPES", correlationId: "diagnostic-id", message: "Private upstream data" })
      )
    const result = await syncHubSpotContact(input)
    expect(result).toMatchObject({
      success: false,
      failure: { stage: "note", status: 403, category: "MISSING_SCOPES", correlationId: "diagnostic-id" },
    })
    expect(result.errors.join(" ")).not.toContain("Private upstream data")
  })

  it("does not attempt to create contacts when updates are forbidden", async () => {
    fetchMock.mockResolvedValueOnce(reply(403, { category: "MISSING_SCOPES" }))
    expect(await syncHubSpotContact(input)).toMatchObject({
      success: false,
      failure: { stage: "contact", status: 403 },
    })
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it("preserves literal visitor text and line breaks in the rich-text note", async () => {
    fetchMock.mockResolvedValueOnce(reply(200, { id: "contact-1" })).mockResolvedValueOnce(reply(201, { id: "note-1" }))
    await syncHubSpotContact({ ...input, message: "A & B\n<script>text</script>" })
    expect(JSON.parse(fetchMock.mock.calls[1]![1]!.body as string)).toMatchObject({
      properties: { hs_note_body: "A &amp; B<br>&lt;script&gt;text&lt;/script&gt;" },
    })
  })

  it.each([new TypeError("fetch failed"), new DOMException("Timed out", "TimeoutError")])(
    "returns a structured failure for network errors and timeouts",
    async (error) => {
      fetchMock.mockRejectedValueOnce(error)
      expect(await syncHubSpotContact(input)).toMatchObject({ success: false, failure: { stage: "contact" } })
    }
  )

  it("requires a note ID before reporting message delivery", async () => {
    fetchMock.mockResolvedValueOnce(reply(200, { id: "contact-1" })).mockResolvedValueOnce(reply(201, {}))
    expect(await syncHubSpotContact(input)).toMatchObject({ success: false, failure: { stage: "note" } })
  })

  it("fails without making requests when credentials are missing", async () => {
    config.token = undefined
    expect(await syncHubSpotContact(input)).toMatchObject({ success: false })
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
