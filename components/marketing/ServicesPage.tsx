import { Button } from "components/ui/Button/Button"
import { Card } from "components/ui/Card/Card"
import { Section } from "components/ui/Section/Section"

const TRADITIONAL = [
  "Initial psychiatric evaluation",
  "Medication management when clinically appropriate",
  "Treatment planning and integration with existing care",
  "Diagnostic clarification across complex presentations",
] as const

const ALTERNATIVE = [
  "Energy-medicine sessions (IET®, EFT, Source Tapping™)",
  "Whole Life Integration™ private work",
  "Trauma resolution combining clinical and energetic tools",
  "Spiritual integration alongside ongoing therapy",
] as const

const SESSION_FLOW = [
  {
    step: "1",
    title: "Centering",
    description: "We open with a short check-in so you can settle in, name what's present, and set the focus.",
  },
  {
    step: "2",
    title: "Mapping",
    description: "We trace the presenting concern back to its actual root biographical, somatic, and energetic.",
  },
  {
    step: "3",
    title: "Working",
    description: "Targeted intervention clinical, energetic, or both calibrated to what the system is ready for.",
  },
  {
    step: "4",
    title: "Integration",
    description: "We close with practices and language so the shift can hold beyond the session.",
  },
] as const

export function ServicesPage() {
  return (
    <>
      <Section eyebrow="Services" heading="Care, end to end" surface="bone">
        <p className="font-body max-w-2xl text-lg leading-relaxed opacity-80">
          A single practice that holds traditional psychiatric care and energy medicine without forcing a choice between
          them.
        </p>
      </Section>

      <Section eyebrow="Clinical" heading="Traditional offerings" surface="mist">
        <div className="grid gap-6 md:grid-cols-2">
          {TRADITIONAL.map((item) => (
            <Card key={item} surface="bone" className="font-body text-base">
              {item}
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Integrative" heading="Alternative offerings" surface="bone">
        <div className="grid gap-6 md:grid-cols-2">
          {ALTERNATIVE.map((item) => (
            <Card key={item} surface="mist" accent="gold" className="font-body text-base">
              {item}
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="What to expect" heading="Inside a session" surface="ink">
        <div className="grid gap-8 md:grid-cols-4">
          {SESSION_FLOW.map((s) => (
            <div key={s.step}>
              <p className="font-display text-gold text-4xl">{s.step}</p>
              <p className="font-display mt-2 text-2xl text-bone">{s.title}</p>
              <p className="font-body text-bone/70 mt-3 text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-4">
          <Button href="/book" intent="gold">
            Book a consult
          </Button>
          <Button href="/modalities" intent="secondary" className="text-bone border-bone hover:enabled:bg-bone hover:enabled:text-ink">
            Explore modalities
          </Button>
        </div>
      </Section>
    </>
  )
}
