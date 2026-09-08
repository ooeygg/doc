import { env } from "config/env"

// Calendly owns availability, intake, and scheduling at the external destination.
export const bookingUrl = env.NEXT_PUBLIC_CALENDLY_URL
