import { ModalitiesPage } from "components/marketing/ModalitiesPage"
import { createPageMetadata } from "config/seo"
import { siteConfig } from "config/site"
import { modalities } from "content/data/modalities"

export const metadata = createPageMetadata({
  title: `Modalities | ${siteConfig.name}`,
  description:
    "Integrated Energy Therapy®, EFT, Source Tapping™, Whole Life Integration™, and Instant Miracle Mastery™ the modalities used in the practice.",
  path: "/modalities",
})

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": modalities.map((m) => ({
      "@type": "MedicalProcedure",
      name: m.name,
      alternateName: m.slug,
      description: m.summary,
      procedureType: "Therapeutic",
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- structured data block
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ModalitiesPage />
    </>
  )
}
