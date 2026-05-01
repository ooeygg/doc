import { Card } from "components/ui/Card/Card"
import { Section } from "components/ui/Section/Section"

const PILLARS = [
  {
    title: "Quantum physics",
    description: "Energy, frequency, and information as the substrate underneath every healing modality.",
  },
  {
    title: "Biology",
    description: "Nervous-system regulation, biochemistry, and the body's own self-correcting intelligence.",
  },
  {
    title: "Psychology",
    description: "27 years of clinical psychiatry — diagnosis, integration, and steady, evidence-based work.",
  },
  {
    title: "Spirituality",
    description: "A contemplative through-line that sees the work as more than symptom management.",
  },
] as const

export function Approach() {
  return (
    <Section eyebrow="Approach" heading="Where science meets soul" surface="bone">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map((p) => (
          <Card key={p.title} surface="mist" className="flex h-full flex-col gap-3">
            <h3 className="font-display text-2xl">{p.title}</h3>
            <p className="font-body text-sm opacity-80">{p.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}
