import { ContactPage } from "components/marketing/ContactPage"
import { createPageMetadata } from "config/seo"
import { siteConfig } from "config/site"

export const metadata = createPageMetadata({
  title: `Contact | ${siteConfig.name}`,
  description: "Reach out to Dr. Cynthia Higgins for programs, media, or partnership inquiries.",
  path: "/contact",
})

export default function Page() {
  return <ContactPage />
}
