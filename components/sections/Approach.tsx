import { Reveal } from "components/ui/Reveal/Reveal"

const PILLARS = [
  {
    num: "01",
    title: "Quantum physics",
    description: "Energy, frequency, and information as the substrate underneath every growth modality.",
  },
  {
    num: "02",
    title: "Biology",
    description: "Nervous-system regulation, biochemistry, and the body's own self-correcting intelligence.",
  },
  {
    num: "03",
    title: "Psychology",
    description: "27 years of clinical psychiatry  diagnosis, integration, and steady evidence-based work.",
  },
  {
    num: "04",
    title: "Spirituality",
    description: "A contemplative through-line that sees the work as more than symptom management.",
  },
] as const

export function Approach() {
  return (
    <section className="bg-ink py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-8 md:px-12 lg:px-16">
        {/* section header */}
        <div className="mb-16 grid gap-4 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-body text-gold text-[0.65rem] tracking-[0.25em] uppercase">Approach</p>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display text-bone text-4xl leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Where science
              <br />
              meets soul
            </h2>
          </div>
        </div>

        {/* editorial row list */}
        <div>
          {PILLARS.map((p) => (
            <Reveal
              key={p.num}
              className="group border-bone/10 last:border-bone/10 relative grid grid-cols-12 items-baseline gap-4 border-t py-8 last:border-b"
            >
              <div className="bg-gold pointer-events-none absolute top-0 left-0 h-px origin-left" aria-hidden />

              <span className="font-body text-gold/80 col-span-1 text-xs tabular-nums">{p.num}</span>
              <h3 className="font-display text-bone group-hover:text-gold col-span-11 text-2xl transition-colors duration-300 md:col-span-5 md:text-3xl lg:text-4xl">
                {p.title}
              </h3>
              <p className="font-body text-bone/50 col-span-11 col-start-2 text-sm leading-relaxed md:col-span-6 md:col-start-7 md:text-base">
                {p.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
