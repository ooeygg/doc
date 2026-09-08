import Image from "next/image"
import { Eyebrow } from "components/ui/Eyebrow/Eyebrow"
import { Reveal } from "components/ui/Reveal/Reveal"

export function EditorialStatement() {
  return (
    <section className="booking-editorial" aria-labelledby="booking-statement">
      <div className="booking-editorial-image" aria-hidden="true">
        <Image
          src="/assets/images/sand-hands.png"
          alt=""
          fill
          quality={60}
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="booking-shell booking-editorial-content">
        <Eyebrow tone="gold" className="booking-label">
          A place to begin
        </Eyebrow>
        <Reveal>
          <h2 id="booking-statement" className="booking-statement font-display">
            Before anything
            <br className="booking-desktop-break" /> begins, there is simply <em>a conversation.</em>
          </h2>
        </Reveal>
        <div className="booking-editorial-caption">
          <span aria-hidden="true" />
          <p>The most meaningful work begins with feeling understood.</p>
        </div>
      </div>
    </section>
  )
}
