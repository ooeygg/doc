"use client"

import { Button } from "components/ui/Button/Button"
import { track } from "lib/analytics"
import { bookingUrl } from "lib/booking"

export function BookingCTA({ placement }: { placement: "hero" | "final" }) {
  const noteId = `booking-note-${placement}`

  return (
    <div className="booking-action">
      <Button
        href={bookingUrl ?? "/contact"}
        target={bookingUrl ? "_blank" : undefined}
        rel={bookingUrl ? "noopener noreferrer" : undefined}
        className="booking-link"
        aria-describedby={noteId}
        data-booking-link={bookingUrl ? "calendly" : "contact"}
        // The shared gold pill stays still; only its arrow moves on this page.
        onMouseMove={undefined}
        onMouseLeave={undefined}
        onClick={() => {
          if (bookingUrl) track("booking_started", { source: "book_page", provider: "calendly", placement })
        }}
      >
        <span>{bookingUrl ? "Schedule my consultation" : "Request a consultation"}</span>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="booking-link-arrow">
          <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.25" />
        </svg>
        {bookingUrl && <span className="sr-only"> (opens in a new tab)</span>}
      </Button>
      <p id={noteId} className="booking-scheduling-note">
        {bookingUrl
          ? "Secure online scheduling powered by Calendly."
          : "Contact the practice to arrange your conversation."}
      </p>
    </div>
  )
}
