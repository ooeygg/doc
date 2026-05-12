import { SpeakingEventsPage } from "components/marketing/SpeakingEventsPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Speaking Events",
  description: "Invite Dr. Cynthia Higgins for keynotes, workshops, retreats, and transformational speaking events.",
}

export default function Page() {
  return <SpeakingEventsPage />
}
