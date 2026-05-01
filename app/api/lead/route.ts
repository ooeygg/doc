import { NextResponse } from "next/server"
import { Resend } from "resend"
import { env } from "config/env"
import { clientIp, rateLimit } from "lib/rateLimit"
import { leadSchema } from "lib/validations/lead"

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

  if (!env.RESEND_AUDIENCE_ID) {
    return NextResponse.json({ ok: false, error: "audience_not_configured" }, { status: 500 })
  }

  const resend = new Resend(env.RESEND_API_KEY)
  try {
    await resend.contacts.create({
      audienceId: env.RESEND_AUDIENCE_ID,
      email: parsed.data.email,
      unsubscribed: false,
    })
  } catch {
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
