import { Button } from "components/ui/Button/Button"
import { Section } from "components/ui/Section/Section"

const OUTCOMES = [
  {
    title: "Heal",
    description: "Trauma, chronic anxiety, depression, and the patterns that have outlasted talk therapy alone.",
  },
  {
    title: "Grow",
    description: "Reclaim agency, integrate biography, and build a steadier nervous system to live from.",
  },
  {
    title: "Attract",
    description: "Move from contraction into clarity — the relationships, work, and life that meet who you've become.",
  },
] as const

export function Outcomes() {
  return (
    <Section eyebrow="Outcomes" heading="Heal · Grow · Attract" surface="ink">
      <div className="grid gap-10 md:grid-cols-3">
        {OUTCOMES.map((o) => (
          <div key={o.title} className="border-t border-bone/20 pt-6">
            <h3 className="font-display text-3xl text-bone">{o.title}</h3>
            <p className="font-body text-bone/70 mt-3 text-sm leading-relaxed">{o.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-12">
        <Button href="/book" intent="gold">
          Start the conversation
        </Button>
      </div>
    </Section>
  )
}
