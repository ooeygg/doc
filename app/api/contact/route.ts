import { NextResponse } from "next/server"
import { Resend } from "resend"
import { ContactInquiry } from "emails/ContactInquiry"
import { env } from "config/env"
import { clientIp, rateLimit } from "lib/rateLimit"
import { contactSchema } from "lib/validations/contact"

export async function POST(request: Request) {
  const ip = clientIp(request)
  const limited = rateLimit({ key: `contact:${ip}`, limit: 10, windowMs: 60 * 60 * 1000 })
  if (!limited.ok) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 })
  }

  const body = (await request.json().catch(() => null)) as unknown
  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "invalid_input", issues: parsed.error.flatten() },
      { status: 400 }
    )
  }

  // Honeypot — silently succeed for bots
  if (parsed.data.hp && parsed.data.hp.length > 0) {
    return NextResponse.json({ ok: true })
  }

  const resend = new Resend(env.RESEND_API_KEY)
  const submittedAt = new Date().toISOString()
  const { name, email, topic, message } = parsed.data

  try {
    await resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      to: env.RESEND_TO_EMAIL,
      replyTo: email,
      subject: `New inquiry from ${name}`,
      react: ContactInquiry({ name, email, topic, message, submittedAt }),
    })
  } catch {
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
