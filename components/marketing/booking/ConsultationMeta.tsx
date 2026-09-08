import { Reveal } from "components/ui/Reveal/Reveal"

const details = [
  { label: "30 min", description: "Private consultation" },
  { label: "Virtual", description: "Meet from wherever you feel comfortable." },
  { label: "Private", description: "A focused conversation between you and Dr. Higgins." },
  { label: "No commitment", description: "Simply begin with a conversation." },
] as const

export function ConsultationMeta() {
  return (
    <section className="booking-meta booking-shell" aria-label="Your consultation at a glance">
      <Reveal>
        <dl className="booking-meta-grid">
          {details.map(({ label, description }, index) => (
            <div key={label} className="booking-meta-item">
              <dt>
                <span className="booking-label booking-meta-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <span className="booking-label">{label}</span>
              </dt>
              <dd>{description}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  )
}
