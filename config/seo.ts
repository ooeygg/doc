import type { Metadata } from "next"
import { siteConfig } from "config/site"

export const defaultMetadata: Metadata = {
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    siteName: siteConfig.name,
    url: siteConfig.url,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
}
