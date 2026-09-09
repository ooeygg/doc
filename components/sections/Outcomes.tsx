import Image from "next/image"
import { Button } from "components/ui/Button/Button"
import { Reveal } from "components/ui/Reveal/Reveal"
import { Section } from "components/ui/Section/Section"

const OUTCOMES = [
  {
    title: "Scale",
    description: "Trauma, chronic anxiety, depression, and the patterns that have outlasted talk therapy alone.",
  },
  {
    title: "Grow",
    description: "Reclaim agency, integrate biography, and build a steadier nervous system to live from.",
  },
  {
    title: "Attract",
    description: "Move from contraction into clarity the relationships, work, and life that meet who you've become.",
  },
] as const

export function Outcomes() {
  return (
    <Section eyebrow="Outcomes" heading="Scale · Grow · Attract" surface="ink">
      <div className="grid gap-12 md:grid-cols-12 md:items-center">
        {/* Outcomes grid + CTA */}
        <div className="md:col-span-8">
          <div className="grid gap-10 sm:grid-cols-3">
            {OUTCOMES.map((o) => (
              <Reveal key={o.title} className="border-bone/20 border-t pt-6">
                <h3 className="font-display text-bone text-3xl">{o.title}</h3>
                <p className="font-body text-bone/70 mt-3 text-sm leading-relaxed">{o.description}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12">
            <Button href="/book" intent="gold">
              Start the conversation
            </Button>
          </Reveal>
        </div>

        {/* Portrait image */}
        <div className="order-first md:order-last md:col-span-4">
          <div className="relative aspect-3/4 w-full overflow-hidden rounded-3xl shadow-[0_32px_64px_rgba(0,0,0,0.3)]">
            <Image
              src="/assets/images/higgins-5.png"
              alt="Dr. Cynthia Higgins holding a luminous orb on the beach"
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </Section>
  )
}
