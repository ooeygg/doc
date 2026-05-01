import type { MetadataRoute } from "next"
import { siteConfig } from "config/site"
import { getAllPosts } from "lib/sanity/queries"

const STATIC_PATHS = [
  "",
  "/about",
  "/services",
  "/modalities",
  "/programs",
  "/book",
  "/contact",
  "/blog",
  "/legal/privacy",
  "/legal/terms",
  "/legal/disclaimer",
] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "")

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }))

  const posts = await getAllPosts().catch(() => [])
  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p._updatedAt ? new Date(p._updatedAt) : new Date(),
  }))

  return [...staticEntries, ...postEntries]
}
