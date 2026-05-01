import { Container } from "components/layout/Container"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Privacy Policy" }

export default function Page() {
  return (
    <Container width="prose" className="py-24">
      <h1 className="font-display text-4xl tracking-tight md:text-5xl">Privacy Policy</h1>
      <div className="font-body mt-8 space-y-6 text-base leading-relaxed opacity-80">
        <p>
          This site collects only the information necessary to respond to your inquiries and run the practice. We do
          not sell or share personal information with third parties for marketing purposes.
        </p>
        <p>
          Information you submit through the contact or booking forms is transmitted over encrypted connections and
          stored only as long as needed to serve your request.
        </p>
        <p>
          For questions about how your information is handled, please reach out via the contact page.
        </p>
        <p className="opacity-60">Placeholder copy full policy to be reviewed by counsel before launch.</p>
      </div>
    </Container>
  )
}
