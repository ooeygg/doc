import { syncHubSpotContact } from "lib/hubspot"
import { clientIp, rateLimit } from "lib/rateLimit"
import { leadSchema } from "lib/validations/lead"
import { NextResponse } from "next/server"

const CORS = {
  "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN ?? "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS })
}

export async function POST(request: Request) {
  const ip = clientIp(request)
  const limited = rateLimit({ key: `lead:${ip}`, limit: 10, windowMs: 60 * 60 * 1000 })
  if (!limited.ok) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429, headers: CORS })
  }

  const body = (await request.json().catch(() => null)) as unknown
  const parsed = leadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400, headers: CORS })
  }

  if (parsed.data.hp && parsed.data.hp.length > 0) {
    return NextResponse.json({ ok: true }, { headers: CORS })
  }

  const result = await syncHubSpotContact({
    email: parsed.data.email,
  })

  if (!result.success) {
    return NextResponse.json(
      { ok: false, error: result.errors[0] ?? "sync_failed" },
      { status: 502, headers: CORS }
    )
  }

  return NextResponse.json({ ok: true }, { headers: CORS })
}
