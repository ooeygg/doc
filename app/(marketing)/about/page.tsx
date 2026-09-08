import { AboutPage } from "components/marketing/AboutPage"
import { createPageMetadata } from "config/seo"
import { siteConfig } from "config/site"

export const metadata = createPageMetadata({
  title: "About Dr. Cynthia Higgins",
  description:
    "Dr. Cynthia Higgins, MD is a psychiatrist with 27 years of clinical practice and 24 years of training in energy medicine. Named Energy Psychiatrist of the Year 2019.",
  path: "/about",
})

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
  hasCredential: [{ "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "MD" }],
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
