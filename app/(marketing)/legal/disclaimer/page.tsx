import type { Metadata } from "next"
import { Container } from "components/layout/Container"

export const metadata: Metadata = { title: "Medical Disclaimer" }

export default function Page() {
  return (
    <Container width="prose" className="py-24">
      <h1 className="font-display text-4xl tracking-tight md:text-5xl">Medical Disclaimer</h1>
      <div className="font-body mt-8 space-y-6 text-base leading-relaxed opacity-80">
        <p>
          The content on this site is for educational purposes only. It is not medical advice, does not establish a
          doctor–patient relationship, and is not intended to diagnose, treat, cure, or prevent any condition.
        </p>
        <p>
          Always consult a qualified clinician for medical questions. If you are experiencing a medical or psychiatric
          emergency, call 911 or your local emergency number, or go to your nearest emergency room.
        </p>
        <p>
          Energy-medicine modalities described here are complementary practices, used alongside — not in place of —
          conventional medical and mental-health care.
        </p>
        <p className="opacity-60">Placeholder copy — to be reviewed by stakeholder before launch.</p>
      </div>
    </Container>
  )
}
