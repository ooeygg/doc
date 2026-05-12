import { siteConfig } from "config/site"
import type { MetadataRoute } from "next"

// Legal pages are noindexed (placeholder copy) — keep them out of the sitemap
const STATIC_PATHS: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }> = [
  { path: "",           changeFrequency: "weekly",  priority: 1.0 },
  { path: "/about",     changeFrequency: "monthly", priority: 0.8 },
  { path: "/services",  changeFrequency: "monthly", priority: 0.8 },
  { path: "/modalities",changeFrequency: "monthly", priority: 0.7 },
  { path: "/programs",  changeFrequency: "monthly", priority: 0.8 },
  { path: "/book",      changeFrequency: "monthly", priority: 0.9 },
  { path: "/contact",   changeFrequency: "yearly",  priority: 0.6 },
  { path: "/speaking-events", changeFrequency: "monthly", priority: 0.8 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "")

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map(({ path, changeFrequency, priority }) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))

  return staticEntries
}
