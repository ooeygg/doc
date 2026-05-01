import type { Metadata } from "next"
import { ProgramsPage } from "components/marketing/ProgramsPage"

export const metadata: Metadata = {
  title: "Programs",
  description: "Group and self-paced programs from Dr. Cynthia Higgins, hosted on Xperiencify.",
}

export default function Page() {
  return <ProgramsPage />
}
