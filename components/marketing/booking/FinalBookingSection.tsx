import { BookingCTA } from "components/marketing/booking/BookingCTA"
import { Eyebrow } from "components/ui/Eyebrow/Eyebrow"
import { Reveal } from "components/ui/Reveal/Reveal"

export function FinalBookingSection() {
  return (
    <section className="booking-final booking-shell" aria-labelledby="booking-final-heading">
      <Eyebrow tone="muted" className="booking-label booking-eyebrow">
        Ready when you are
      </Eyebrow>
      <Reveal>
        <h2 id="booking-final-heading" className="font-display">
          Begin with
          <br />
          <em>a conversation.</em>
        </h2>
      </Reveal>
      <div className="booking-final-bottom">
        <p>
          A private 30-minute consultation
          <br />
          with Dr. Cynthia Higgins.
        </p>
        <BookingCTA placement="final" />
      </div>
    </section>
  )
}
