import type { Metadata } from "next"
import { HomePage } from "components/marketing/HomePage"
import { defaultMetadata } from "config/seo"
import { siteConfig } from "config/site"

export const metadata: Metadata = {
  ...defaultMetadata,
  title: `${siteConfig.name} — Energy-medicine psychiatry`,
  description: siteConfig.description,
}

export default function Page() {
  return <HomePage />
}
