import { BookingHero } from "components/marketing/booking/BookingHero"
import { BookingSteps } from "components/marketing/booking/BookingSteps"
import { ConsultationMeta } from "components/marketing/booking/ConsultationMeta"
import { EditorialStatement } from "components/marketing/booking/EditorialStatement"
import { FinalBookingSection } from "components/marketing/booking/FinalBookingSection"

export function BookPage() {
  return (
    <div className="booking-page">
      <BookingHero />
      <ConsultationMeta />
      <EditorialStatement />
      <BookingSteps />
      <FinalBookingSection />
    </div>
  )
}
