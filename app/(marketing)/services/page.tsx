import { ServicesPage } from "components/marketing/ServicesPage"
import { createPageMetadata } from "config/seo"
import { siteConfig } from "config/site"

export const metadata = createPageMetadata({
  title: `Services | ${siteConfig.name}`,
  description:
    "Traditional psychiatric care combined with energy medicine: diagnosis, treatment, and whole-person wellness with Dr. Cynthia Higgins, MD.",
  path: "/services",
})

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": `${siteConfig.url}/#practice`,
  name: siteConfig.name,
  description:
    "Traditional psychiatric care combined with energy medicine: diagnosis, treatment, and whole-person wellness.",
  url: `${siteConfig.url}/services`,
  medicalSpecialty: "Psychiatry",
  founder: { "@id": `${siteConfig.url}/#person` },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Psychiatric and Energy Medicine Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "MedicalProcedure", name: "Psychiatric Evaluation" } },
      { "@type": "Offer", itemOffered: { "@type": "MedicalProcedure", name: "Medication Management" } },
      {
        "@type": "Offer",
        itemOffered: { "@type": "MedicalProcedure", name: "Energy Medicine Session", procedureType: "Therapeutic" },
      },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Whole Life Integration Coaching" } },
    ],
  },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- structured data block
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesPage />
    </>
  )
}
