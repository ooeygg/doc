import { Button } from "components/ui/Button/Button"
import { Card } from "components/ui/Card/Card"
import { Section } from "components/ui/Section/Section"

const speakingFormats = [
  "Conference keynotes",
  "Retreat teaching sessions",
  "Private leadership circles",
  "Clinical and practitioner workshops",
] as const

const speakingTopics = [
  "Energy psychiatry in modern clinical care",
  "Nervous system regulation and emotional resilience",
  "Healing after trauma, loss, and life transition",
  "Whole-person integration in career, relationships, and health",
] as const

export function SpeakingEventsPage() {
  return (
    <>
      <Section eyebrow="Speaking" heading="Speaking Events" surface="bone">
        <div className="max-w-3xl space-y-5">
          <p className="font-body text-lg leading-relaxed opacity-80">
            Dr. Cynthia Higgins speaks on the intersection of psychiatry, energy medicine, and spiritual integration.
            Each event is tailored to your audience so participants leave with practical tools, a clearer inner compass,
            and a felt sense of possibility.
          </p>
          <p className="font-body text-base leading-relaxed opacity-75">
            Available for conferences, retreats, private communities, and professional organizations.
          </p>
        </div>
      </Section>

      <Section eyebrow="Formats" heading="Event Types" surface="mist">
        <div className="grid gap-6 md:grid-cols-2">
          {speakingFormats.map((format) => (
            <Card key={format} surface="bone">
              <p className="font-display text-2xl leading-snug">{format}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Topics" heading="Popular Speaking Topics" surface="bone">
        <ul className="grid gap-5 md:grid-cols-2">
          {speakingTopics.map((topic) => (
            <li
              key={topic}
              className="font-body rounded-2xl border border-divider bg-surface-alt px-5 py-4 text-lg leading-relaxed"
            >
              {topic}
            </li>
          ))}
        </ul>
      </Section>

      <Section surface="ink">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <p className="font-display max-w-xl text-3xl text-bone">Planning an event and want to explore a fit?</p>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact" intent="secondary">
              Contact
            </Button>
            <Button href="/book" intent="gold">
              Book a consult
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
