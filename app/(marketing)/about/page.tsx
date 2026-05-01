import type { Metadata } from "next"
import { AboutPage } from "components/marketing/AboutPage"

export const metadata: Metadata = {
  title: "About",
  description:
    "Dr. Cynthia Higgins, MD — board-certified psychiatrist with 27 years of clinical practice and 24 years of training in energy medicine and contemplative practice.",
}

export default function Page() {
  return <AboutPage />
}
