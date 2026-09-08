import { syncHubSpotContact } from "lib/hubspot"
import { clientIp, rateLimit } from "lib/rateLimit"
import { leadSchema } from "lib/validations/lead"
import { NextResponse } from "next/server"

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGIN ?? "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean)

function corsHeaders(requestOrigin: string | null): HeadersInit {
  const allowed =
    requestOrigin && ALLOWED_ORIGINS.includes(requestOrigin)
      ? requestOrigin
      : (ALLOWED_ORIGINS[0] ?? "*")
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  }
}

export function OPTIONS(request: Request) {
  const origin = request.headers.get("origin")
  return new Response(null, { status: 204, headers: corsHeaders(origin) })
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin")
  const cors = corsHeaders(origin)

  const ip = clientIp(request)
  const limited = rateLimit({ key: `lead:${ip}`, limit: 10, windowMs: 60 * 60 * 1000 })
  if (!limited.ok) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429, headers: cors })
  }

  const body = (await request.json().catch(() => null)) as unknown
  const parsed = leadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400, headers: cors })
  }

  if (parsed.data.hp && parsed.data.hp.length > 0) {
    return NextResponse.json({ ok: true }, { headers: cors })
  }

  const result = await syncHubSpotContact({
    email: parsed.data.email,
  })

  if (!result.success) {
    return NextResponse.json(
      { ok: false, error: result.errors[0] ?? "sync_failed" },
      { status: 502, headers: cors }
    )
  }

  return NextResponse.json({ ok: true }, { headers: cors })
}
