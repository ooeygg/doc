import type { Program } from "types/content"

const BOOKING_URL = "https://calendly.com/chiggins1806"

export const programs: ReadonlyArray<Program> = [
  {
    slug: "foundations",
    title: "Foundations",
    description:
      "A guided on-ramp into the Whole Life Integration framework. Daily practices, short teachings, and clear weekly milestones.",
    xperiencifyUrl: BOOKING_URL,
    durationWeeks: 6,
    priceTier: "foundation",
  },
  {
    slug: "signature-immersion",
    title: "Signature Immersion",
    description:
      "Dr. Higgins's flagship program. Combines weekly group teaching, paired practice, and direct energy-medicine sessions.",
    xperiencifyUrl: BOOKING_URL,
    durationWeeks: 12,
    priceTier: "signature",
  },
  {
    slug: "private-intensive",
    title: "Private Intensive",
    description:
      "A short, high-touch container for clients who want to move significant material in a focused window.",
    xperiencifyUrl: BOOKING_URL,
    durationWeeks: 4,
    priceTier: "intensive",
  },
] as const
