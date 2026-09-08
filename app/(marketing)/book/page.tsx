import { BookPage } from "components/marketing/BookPage"
import { createPageMetadata } from "config/seo"
import { siteConfig } from "config/site"

export const metadata = createPageMetadata({
  title: `Begin with a conversation | ${siteConfig.name}`,
  description:
    "A private 30-minute conversation with Dr. Cynthia Higgins. Slow down, share what brought you here, and discover whether working together feels right.",
  path: "/book",
})

export default function Page() {
  return <BookPage />
}
