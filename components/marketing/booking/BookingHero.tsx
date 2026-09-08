import Image from "next/image"
import { BookingCTA } from "components/marketing/booking/BookingCTA"
import { Eyebrow } from "components/ui/Eyebrow/Eyebrow"
import { doctor } from "content/data/doctor"

export function BookingHero() {
  return (
    <section className="booking-hero booking-shell" aria-labelledby="booking-heading">
      <div className="booking-masthead">
        <Eyebrow tone="muted" className="booking-label booking-eyebrow">
          Book
        </Eyebrow>
        <span className="booking-label booking-masthead-note">A little time. Just for you.</span>
      </div>
      <div className="booking-hero-grid">
        <h1 id="booking-heading" className="booking-headline font-display">
          <span>Begin with</span> <em>a conversation.</em>
        </h1>
        <div className="booking-hero-copy">
          <p className="booking-introduction">A private 30-minute conversation with Dr. Cynthia Higgins.</p>
          <p className="booking-supporting-copy">
            An opportunity to slow down, talk about what brought you here, and discover whether working together feels
            right.
          </p>
          <BookingCTA placement="hero" />
          <a href="#what-to-expect" className="booking-expect-link">
            What to expect <span aria-hidden="true">↓</span>
          </a>
        </div>
        <figure className="booking-portrait">
          <div className="booking-portrait-image">
            <Image
              src={doctor.portrait.src}
              alt={doctor.portrait.alt}
              fill
              priority
              fetchPriority="high"
              quality={60}
              sizes="(min-width: 1920px) 510px, (min-width: 1024px) 30vw, (min-width: 768px) 38vw, 88vw"
              className="object-cover"
            />
          </div>
          <figcaption>
            <span>Dr. Cynthia Higgins, MD</span>
            <span className="booking-portrait-caption">A space to be heard.</span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
