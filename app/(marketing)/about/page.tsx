import { AboutPage } from "components/marketing/AboutPage"
import { siteConfig } from "config/site"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Dr. Cynthia Higgins",
  description:
    "Dr. Cynthia Higgins, MD is a psychiatrist with 27 years of clinical practice and 24 years of training in energy medicine. Named Energy Psychiatrist of the Year 2019.",
  openGraph: {
    title: "About Dr. Cynthia Higgins",
    description:
      "Psychiatrist, energy medicine practitioner, and author. 27 years of clinical practice.",
    images: [{ url: "/api/og/about?title=About+Dr.+Cynthia+Higgins", width: 1200, height: 630 }],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Person", "Physician"],
  "@id": `${siteConfig.url}/#person`,
  name: "Dr. Cynthia Higgins, MD",
  jobTitle: "Psychiatrist",
  description:
    " Psychiatrist with 27 years of clinical practice and 24 years of training in energy medicine. Recognized as Energy Psychiatrist of the Year (2019) and Empowered Woman of the Year (2022).",
  url: `${siteConfig.url}/about`,
  image: `${siteConfig.url}/assets/images/higgins-1.png`,
  alumniOf: [{ "@type": "CollegeOrUniversity", name: "USF Morsani College of Medicine" }],
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "MD" },
  ],
  award: ["Energy Psychiatrist of the Year 2019", "Empowered Woman of the Year 2022"],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- structured data block
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutPage />
    </>
  )
}
