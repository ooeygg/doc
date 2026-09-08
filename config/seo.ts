import { siteConfig } from "config/site"
import type { Metadata } from "next"

export const siteImage = {
  url: new URL("/assets/images/work-of-angels-cynthia-higgins.jpg", siteConfig.url).toString(),
  width: 1024,
  height: 1024,
  type: "image/jpeg",
  alt: "Work of Angels, LLC — Cynthia Higgins, MD: a luminous blue butterfly above open hands.",
}

export const defaultMetadata: Metadata = {
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: siteConfig.url,
    type: "website",
    locale: "en_US",
    images: [siteImage],
  },
  twitter: {
    // Match the square artwork so the name and hands stay in the card's frame.
    card: "summary",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: siteImage.url, alt: siteImage.alt }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
}

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  const url = new URL(path, siteConfig.url).toString()

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    // Next.js replaces these nested fields rather than merging them with the layout.
    openGraph: { ...defaultMetadata.openGraph, title, description, url },
    twitter: { ...defaultMetadata.twitter, title, description },
  }
}
