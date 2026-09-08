import { HomePage } from "components/marketing/HomePage"
import { createPageMetadata, siteImage } from "config/seo"
import { siteConfig } from "config/site"

export const metadata = createPageMetadata({
  title: `${siteConfig.name} | Energy-Medicine Psychiatrist`,
  description: siteConfig.description,
  path: "/",
})

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Person", "Physician"],
      "@id": `${siteConfig.url}/#person`,
      name: "Dr. Cynthia Higgins, MD",
      jobTitle: "Psychiatrist",
      description:
        "Psychiatrist with 27 years of clinical practice and 24 years of training in energy medicine and contemplative practice.",
      url: siteConfig.url,
      image: `${siteConfig.url}/assets/images/higgins-1.png`,
      alumniOf: [{ "@type": "CollegeOrUniversity", name: "USF Morsani College of Medicine" }],
      hasCredential: [{ "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "MD" }],
      award: ["Energy Psychiatrist of the Year 2019", "Empowered Woman of the Year 2022"],
    },
    {
      "@type": "MedicalBusiness",
      "@id": `${siteConfig.url}/#practice`,
      name: siteConfig.name,
      legalName: "Work of Angels, LLC",
      description: siteConfig.description,
      url: siteConfig.url,
      image: siteImage.url,
      logo: {
        "@type": "ImageObject",
        url: siteImage.url,
        width: siteImage.width,
        height: siteImage.height,
        caption: siteImage.alt,
      },
      medicalSpecialty: "Psychiatry",
      founder: { "@id": `${siteConfig.url}/#person` },
    },
  ],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- structured data block
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePage />
    </>
  )
}
