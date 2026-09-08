import { ProgramsPage } from "components/marketing/ProgramsPage"
import { createPageMetadata } from "config/seo"
import { siteConfig } from "config/site"

export const metadata = createPageMetadata({
  title: `Programs | ${siteConfig.name}`,
  description: "Group and self-paced programs from Dr. Cynthia Higgins, hosted on Xperiencify.",
  path: "/programs",
})

export default function Page() {
  return <ProgramsPage />
}
