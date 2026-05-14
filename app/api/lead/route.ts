import { syncHubSpotContact } from "lib/hubspot"
import { clientIp, rateLimit } from "lib/rateLimit"
import { leadSchema } from "lib/validations/lead"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const ip = clientIp(request)
  const limited = rateLimit({ key: `lead:${ip}`, limit: 10, windowMs: 60 * 60 * 1000 })
  if (!limited.ok) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 })
  }

  const body = (await request.json().catch(() => null)) as unknown
  const parsed = leadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 })
  }

  if (parsed.data.hp && parsed.data.hp.length > 0) {
    return NextResponse.json({ ok: true })
  }

  const result = await syncHubSpotContact({
    email: parsed.data.email,
  })

  if (!result.success) {
    return NextResponse.json(
      { ok: false, error: result.errors[0] ?? "sync_failed" },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}
