import { Container } from "components/layout/Container"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Terms of Use" }

export default function Page() {
  return (
    <Container width="prose" className="py-24">
      <h1 className="font-display text-4xl tracking-tight md:text-5xl">Terms of Use</h1>
      <div className="font-body mt-8 space-y-6 text-base leading-relaxed opacity-80">
        <p>
          By using this site you agree to the following terms. The site is provided as-is. Information published here
          is general education and is not a substitute for individualized medical or psychological care.
        </p>
        <p>
          Use of any service requires explicit written or scheduled engagement with Dr. Higgins's practice. Programs
          purchased through Xperiencify are governed by the terms presented at checkout.
        </p>
        <p className="opacity-60">Placeholder copy full terms to be reviewed by counsel before launch.</p>
      </div>
    </Container>
  )
}
