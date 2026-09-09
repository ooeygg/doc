import Image from "next/image"
import { Button } from "components/ui/Button/Button"
import { Reveal } from "components/ui/Reveal/Reveal"

const HEADING_LINES = [
  { text: "Start Your", gold: false },
  { text: "Growth", gold: true },
  { text: "Journey", gold: false },
] as const

export function CTA() {
  return (
    <section className="bg-ink relative flex min-h-[90vh] items-center justify-center overflow-hidden">
      {/* full-bleed background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/assets/images/sand-hands.png"
          alt=""
          fill
          sizes="100vw"
          quality={60}
          className="object-cover opacity-25"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(17,17,17,0.88) 0%, rgba(17,17,17,0.65) 100%)",
          }}
        />
      </div>

      <Reveal className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-8 py-24 text-center md:px-12">
        <p className="font-body text-gold text-[0.65rem] tracking-[0.25em] uppercase">Begin here</p>

        <h2 className="font-display text-bone mt-6 text-[clamp(2.8rem,7vw,5rem)] leading-[1.06] tracking-tight md:text-6xl lg:text-7xl">
          {HEADING_LINES.map(({ text, gold }, i) => (
            <span key={i} className="block overflow-hidden leading-[1.1]">
              <span className={gold ? "text-gold block" : "block"}>{text}</span>
            </span>
          ))}
        </h2>

        <p className="font-body text-bone/60 mt-8 max-w-md text-lg leading-relaxed">
          A single conversation is often enough to know whether this is the right work for where you actually are.
        </p>
        <div className="mt-12">
          <Button href="/book" intent="gold">
            Book a consult
          </Button>
        </div>
      </Reveal>
    </section>
  )
}
