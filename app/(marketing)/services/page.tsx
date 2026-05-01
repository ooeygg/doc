import type { Metadata } from "next"
import { ServicesPage } from "components/marketing/ServicesPage"

export const metadata: Metadata = {
  title: "Services",
  description: "Traditional psychiatric care integrated with energy medicine — diagnosis, treatment, and integration.",
}

export default function Page() {
  return <ServicesPage />
}
