import type { Metadata } from "next"
import { BookPage } from "components/marketing/BookPage"

export const metadata: Metadata = {
  title: "Book a consult",
  description: "Schedule a 30-minute consult with Dr. Cynthia Higgins.",
}

export default function Page() {
  return <BookPage />
}
