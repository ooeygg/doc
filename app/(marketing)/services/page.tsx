import { ServicesPage } from "components/marketing/ServicesPage"
import { siteConfig } from "config/site"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Traditional psychiatric care combined with energy medicine: diagnosis, treatment, and whole-person wellness with Dr. Cynthia Higgins, MD.",
  openGraph: {
    title: "Services | Dr. Cynthia Higgins",
    description:
      "Psychiatric evaluation, medication management, energy medicine sessions, and Whole Life Integration programs.",
    images: [{ url: "/api/og/services?title=Services", width: 1200, height: 630 }],
  },
}

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
      { "@type": "Offer", itemOffered: { "@type": "MedicalProcedure", name: "Energy Medicine Session", procedureType: "Therapeutic" } },
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
