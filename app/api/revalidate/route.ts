import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"
import { env } from "config/env"

export async function POST(request: Request) {
  const auth = request.headers.get("authorization") ?? ""
  const expected = `Bearer ${env.SANITY_REVALIDATE_SECRET}`
  if (auth !== expected) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })
  }

  const body = (await request.json().catch(() => null)) as { _type?: string; slug?: { current?: string } } | null
  if (!body?._type) {
    return NextResponse.json({ ok: false, error: "invalid payload" }, { status: 400 })
  }

  const tags: string[] = []
  if (body._type === "post") {
    tags.push("posts")
    if (body.slug?.current) tags.push(`post:${body.slug.current}`)
  } else if (body._type === "testimonial") {
    tags.push("testimonials")
  }

  for (const tag of tags) revalidateTag(tag, "default")

  return NextResponse.json({ ok: true, revalidated: tags })
}
