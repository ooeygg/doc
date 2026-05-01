import { ImageResponse } from "next/og"
import { siteConfig } from "config/site"
import { getPostBySlug } from "lib/sanity/queries"

export const runtime = "edge"

const JADE_900 = "#0f3a2e"
const BONE = "#f7f3ec"
const GOLD_500 = "#b89255"

type RouteParams = { slug: string[] }

export async function GET(request: Request, ctx: { params: Promise<RouteParams> }) {
  const { slug } = await ctx.params
  const url = new URL(request.url)
  const queryTitle = url.searchParams.get("title")

  let title: string = queryTitle ?? siteConfig.name
  let subtitle: string = siteConfig.description

  if (slug?.[0] === "blog" && slug[1]) {
    const post = await getPostBySlug(slug[1]).catch(() => null)
    if (post) {
      title = post.title
      subtitle = post.excerpt ?? siteConfig.description
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: JADE_900,
          padding: 80,
          color: BONE,
          border: `1px solid ${GOLD_500}`,
        }}
      >
        <div style={{ fontFamily: "serif", fontSize: 24, color: GOLD_500, letterSpacing: 4, textTransform: "uppercase" }}>
          {siteConfig.name}
        </div>
        <div
          style={{
            marginTop: 60,
            fontFamily: "serif",
            fontSize: 80,
            lineHeight: 1.05,
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: "auto",
            fontSize: 28,
            lineHeight: 1.4,
            maxWidth: 900,
            opacity: 0.8,
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
