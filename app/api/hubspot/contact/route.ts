import { syncHubSpotContact } from "lib/hubspot"
import { NextResponse } from "next/server"

const CORS = {
  "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN ?? "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

// Preflight — browsers send this before cross-origin POST requests
export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS })
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, errors: ["Invalid JSON body"] }, { status: 400 })
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ success: false, errors: ["Request body must be an object"] }, { status: 400 })
  }

  const raw = body as Record<string, unknown>
  const str = (v: unknown) => (typeof v === "string" ? v : undefined)

  const email = str(raw.email)
  if (!email?.trim()) {
    return NextResponse.json({ success: false, errors: ["email is required"] }, { status: 400 })
  }

  const result = await syncHubSpotContact({
    email,
    // Accept both camelCase (firstName) and HubSpot-style lowercase (firstname)
    firstname: str(raw.firstname) ?? str(raw.firstName),
    lastname: str(raw.lastname) ?? str(raw.lastName),
    fullName: str(raw.fullName),
    phone: str(raw.phone),
    company: str(raw.company),
    website: str(raw.website),
    jobtitle: str(raw.jobtitle) ?? str(raw.jobTitle),
    message: str(raw.message),
  })

  if (!result.success) {
    const status = result.errors.some((e) => e.includes("not configured")) ? 503 : 502
    return NextResponse.json(
      {
        success: false,
        actionTaken: null,
        email: result.email ?? email,
        hubspot: {},
        warnings: result.warnings,
        errors: result.errors,
      },
      { status, headers: CORS }
    )
  }

  return NextResponse.json(
    {
      success: true,
      actionTaken: result.actionTaken,
      email: result.email,
      hubspot: {
        contactId: result.contactId,
        noteId: result.noteId,
        propertiesSent: result.propertiesSent,
        skippedEmptyFields: result.skippedEmptyFields,
      },
      warnings: result.warnings,
      errors: [],
    },
    { headers: CORS }
  )
}
