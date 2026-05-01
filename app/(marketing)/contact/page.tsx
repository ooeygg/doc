import type { Metadata } from "next"
import { ContactPage } from "components/marketing/ContactPage"

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach out to Dr. Cynthia Higgins for programs, media, or partnership inquiries.",
}

export default function Page() {
  return <ContactPage />
}
