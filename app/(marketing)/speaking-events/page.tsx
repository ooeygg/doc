import { SpeakingEventsPage } from "components/marketing/SpeakingEventsPage"
import { createPageMetadata } from "config/seo"
import { siteConfig } from "config/site"

export const metadata = createPageMetadata({
  title: `Speaking Events | ${siteConfig.name}`,
  description: "Invite Dr. Cynthia Higgins for keynotes, workshops, retreats, and transformational speaking events.",
  path: "/speaking-events",
})

export default function Page() {
  return <SpeakingEventsPage />
}
