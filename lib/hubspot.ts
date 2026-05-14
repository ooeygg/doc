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

// batch/upsert doesn't return an explicit "created" vs "updated" flag.
// If createdAt and updatedAt are within 5 seconds the record was just created.
function inferActionTaken(createdAt: string, updatedAt: string): "created" | "updated" {
  return Math.abs(new Date(updatedAt).getTime() - new Date(createdAt).getTime()) < 5_000
    ? "created"
    : "updated"
}

async function hsErrorDetail(res: Response): Promise<string> {
  try {
    const body = (await res.json()) as { message?: string; category?: string }
    return body.message ? ` — ${body.message}` : ""
  } catch {
    return ` — ${await res.text().catch(() => "")}`
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

  // ── Contact upsert ─────────────────────────────────────────────────────────
  // batch/upsert with idProperty "email" handles create and update in one call.
  // Existing contacts are matched by email; only propertiesSent fields are written,
  // so unrelated HubSpot properties set by your sales team are preserved.
  // Required scope: crm.objects.contacts.write
  const upsertRes = await fetch("https://api.hubapi.com/crm/v3/objects/contacts/batch/upsert", {
    method: "POST",
    headers: hsHeaders(token),
    body: JSON.stringify({
      inputs: [
        {
          idProperty: "email",
          id: email,
          properties: propertiesSent,
        },
      ],
    }),
  })

  if (!upsertRes.ok) {
    const detail = await hsErrorDetail(upsertRes)
    return {
      success: false,
      email,
      propertiesSent,
      skippedEmptyFields,
      warnings,
      errors: [`HubSpot contact upsert failed (${upsertRes.status})${detail}`],
    }
  }

  const upsertData = (await upsertRes.json()) as {
    results?: Array<{ id: string; createdAt: string; updatedAt: string }>
  }

  const contact = upsertData.results?.[0]
  if (!contact?.id) {
    return {
      success: false,
      email,
      propertiesSent,
      skippedEmptyFields,
      warnings,
      errors: ["HubSpot returned no contact ID — unexpected response shape"],
    }
  }

  const contactId = contact.id
  const actionTaken = inferActionTaken(contact.createdAt, contact.updatedAt)
  let noteId: string | undefined

  // ── Note creation (non-fatal) ───────────────────────────────────────────────
  // Creates a timestamped note and attaches it to the contact's activity timeline.
  // Failures are collected as warnings so the contact sync still returns success.
  // Required scope: crm.objects.notes.write
  if (messageToLog) {
    const noteRes = await fetch("https://api.hubapi.com/crm/v3/objects/notes", {
      method: "POST",
      headers: hsHeaders(token),
      body: JSON.stringify({
        properties: {
          hs_note_body: messageToLog,
          hs_timestamp: new Date().toISOString(),
        },
      }),
    })

    if (!noteRes.ok) {
      const detail = await hsErrorDetail(noteRes)
      warnings.push(`Note creation failed (${noteRes.status})${detail}`)
    } else {
      const noteData = (await noteRes.json()) as { id: string }
      noteId = noteData.id

      // ── Note association ──────────────────────────────────────────────────
      // Uses the v4 "default" association shorthand which resolves the correct
      // note-to-contact association type automatically.
      const assocRes = await fetch(
        `https://api.hubapi.com/crm/v4/objects/notes/${noteId}/associations/default/contacts/${contactId}`,
        { method: "PUT", headers: hsHeaders(token) }
      )

      if (!assocRes.ok) {
        const detail = await hsErrorDetail(assocRes)
        warnings.push(
          `Note ${noteId} was created but could not be linked to contact ${contactId} (${assocRes.status})${detail}`
        )
      }
    }
  }

  return {
    success: true,
    actionTaken,
    email,
    contactId,
    noteId,
    propertiesSent,
    skippedEmptyFields,
    warnings,
    errors: [],
  }
}
