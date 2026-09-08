import { Eyebrow } from "components/ui/Eyebrow/Eyebrow"
import { Reveal } from "components/ui/Reveal/Reveal"

const steps = [
  { title: "Choose a time", copy: "Find an appointment that feels comfortable for your schedule." },
  { title: "Tell us a little about you", copy: "Share only the information needed to prepare for your conversation." },
  { title: "Meet Dr. Higgins", copy: "Begin with a private 30-minute conversation." },
] as const

export function BookingSteps() {
  return (
    <section id="what-to-expect" tabIndex={-1} className="booking-steps" aria-labelledby="booking-steps-heading">
      <div className="booking-shell booking-steps-grid">
        <header className="booking-steps-header">
          <Eyebrow tone="muted" className="booking-label">
            What to expect
          </Eyebrow>
          <h2 id="booking-steps-heading" className="font-display">
            A simple
            <br />
            beginning.
          </h2>
          <p>
            One step at a time.
            <br />
            At your own pace.
          </p>
        </header>
        <ol className="booking-step-list">
          {steps.map(({ title, copy }, index) => (
            <li key={title}>
              <Reveal className="booking-step">
                <span className="booking-step-number font-display" aria-hidden="true">
                  0{index + 1}
                </span>
                <div className="booking-step-copy">
                  <h3 className="font-display">{title}</h3>
                  <p>{copy}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
