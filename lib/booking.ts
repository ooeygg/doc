import { env } from "config/env"

// Booksy owns availability, intake, and scheduling. Never embed its appointment UI.
export const bookingUrl = env.NEXT_PUBLIC_BOOKSY_BOOKING_URL
