import { Button } from "components/ui/Button/Button"
import { Section } from "components/ui/Section/Section"

export function CTA() {
  return (
    <Section surface="ink">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className="font-display text-bone text-4xl tracking-tight md:text-6xl">Start Your Healing Journey</h2>
        <p className="font-body text-bone/70 mt-6 max-w-2xl text-lg leading-relaxed">
          A single conversation is often enough to know whether this is the right work for where you actually are.
        </p>
        <div className="mt-10">
          <Button href="/book" intent="gold">
            Book a consult
          </Button>
        </div>
      </div>
    </Section>
  )
}
