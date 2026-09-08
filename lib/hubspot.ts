import { env } from "config/env"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export interface HubSpotSyncInput {
  email?: string
  firstname?: string
  lastname?: string
  fullName?: string
  phone?: string
  company?: string
  website?: string
  jobtitle?: string
  message?: string
}

export interface HubSpotSyncResult {
  success: boolean
  actionTaken?: "created" | "updated"
  email?: string
  contactId?: string
  noteId?: string
  propertiesSent: Record<string, string>
  skippedEmptyFields: string[]
  warnings: string[]
  errors: string[]
  failure?: {
    stage: "contact" | "note"
    status?: number
    category?: string
    correlationId?: string
  }
}

export function splitName(fullName: string): { firstname: string; lastname: string } {
  const parts = fullName.trim().split(/\s+/)
  const firstname = parts[0] ?? fullName
  const lastname = parts.slice(1).join(" ")
  return { firstname, lastname }
}

function hsHeaders(token: string): HeadersInit {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
}

export async function syncHubSpotContact(raw: HubSpotSyncInput): Promise<HubSpotSyncResult> {
  const email = raw.email?.trim().toLowerCase() ?? ""
  if (!email || !EMAIL_RE.test(email)) {
    return {
      success: false,
      propertiesSent: {},
      skippedEmptyFields: [],
      warnings: [],
      errors: [!email ? "Email is required" : `"${email}" is not a valid email address`],
    }
  }

  // Resolve names — use fullName as fallback only when both parts are absent
  let { firstname, lastname } = raw
  if (!firstname && !lastname && raw.fullName) {
    const split = splitName(raw.fullName)
    firstname = split.firstname
    lastname = split.lastname
  }

  const candidates: Record<string, string | undefined> = {
    email,
    firstname: firstname?.trim(),
    lastname: lastname?.trim(),
    phone: raw.phone?.trim(),
    company: raw.company?.trim(),
    website: raw.website?.trim(),
    jobtitle: raw.jobtitle?.trim(),
  }

  const propertiesSent: Record<string, string> = {}
  const skippedEmptyFields: string[] = []

  for (const [key, val] of Object.entries(candidates)) {
    if (val && val.length > 0) {
      propertiesSent[key] = val
    } else if (key !== "email") {
      // Never send blank strings — HubSpot would overwrite existing values
      skippedEmptyFields.push(key)
    }
  }

  const messageToLog = raw.message?.trim() || undefined
  const warnings: string[] = []

  const token = env.HUBSPOT_PRIVATE_APP_TOKEN
  if (!token) {
    return {
      success: false,
      email,
      propertiesSent,
      skippedEmptyFields,
      warnings,
      errors: ["HUBSPOT_PRIVATE_APP_TOKEN is not configured"],
    }
  }

  const context = { email, propertiesSent, skippedEmptyFields, warnings }
  let stage: "contact" | "note" = "contact"

  const request = (path: string, method: "POST" | "PATCH", body: unknown) =>
    fetch(`https://api.hubapi.com${path}`, {
      method,
      headers: hsHeaders(token),
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
    })

  const failedResponse = async (response: Response): Promise<HubSpotSyncResult> => {
    const detail = (await response.json().catch(() => null)) as { category?: string; correlationId?: string } | null
    return {
      ...context,
      success: false,
      errors: [`HubSpot ${stage} save failed (${response.status})`],
      // Diagnostic metadata only; never return upstream message text containing contact data.
      failure: { stage, status: response.status, category: detail?.category, correlationId: detail?.correlationId },
    }
  }

  try {
    // PATCH by email needs only crm.objects.contacts.write, which the website
    // token already has. Unlike batch upsert by email, it supports partial updates.
    const contactPath = `/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email`
    const contactBody = { properties: propertiesSent }
    let response = await request(contactPath, "PATCH", contactBody)
    let actionTaken: "created" | "updated" = "updated"
    if (response.status === 404) {
      response = await request("/crm/v3/objects/contacts", "POST", contactBody)
      actionTaken = "created"
      // Another submission can create this email between PATCH and POST.
      if (response.status === 409) {
        response = await request(contactPath, "PATCH", contactBody)
        actionTaken = "updated"
      }
    }
    if (!response.ok) return await failedResponse(response)

    const contact = (await response.json()) as { id?: string }
    if (!contact.id) {
      return { ...context, success: false, errors: ["HubSpot returned no contact ID"], failure: { stage } }
    }

    let noteId: string | undefined
    if (messageToLog) {
      stage = "note"
      // Notes use rich text. Preserve the visitor's literal text and line breaks.
      const noteBody = messageToLog
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\r?\n/g, "<br>")
      const noteResponse = await request("/crm/v3/objects/notes", "POST", {
        properties: { hs_note_body: noteBody, hs_timestamp: new Date().toISOString() },
        // Create and associate together so an inquiry cannot become an orphan note.
        associations: [
          { to: { id: contact.id }, types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 202 }] },
        ],
      })
      if (!noteResponse.ok) return await failedResponse(noteResponse)
      const note = (await noteResponse.json()) as { id?: string }
      if (!note.id) {
        return { ...context, success: false, errors: ["HubSpot returned no note ID"], failure: { stage } }
      }
      noteId = note.id
    }

    return { ...context, success: true, actionTaken, contactId: contact.id, noteId, errors: [] }
  } catch {
    return {
      ...context,
      success: false,
      errors: [`HubSpot ${stage} request could not be completed`],
      failure: { stage },
    }
  }
}
