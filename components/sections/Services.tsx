import Link from "next/link"
import { Card } from "components/ui/Card/Card"
import { Section } from "components/ui/Section/Section"
import { modalities } from "content/data/modalities"

function trademarkSuffix(t?: "tm" | "registered") {
  if (t === "registered") return "®"
  if (t === "tm") return "™"
  return ""
}

export function Services() {
  return (
    <Section eyebrow="Modalities" heading="Tools matched to the work" surface="mist">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modalities.map((m) => (
          <Link key={m.slug} href={`/modalities#${m.slug}`} className="group focus-visible:outline-none">
            <Card
              surface="bone"
              accent="gold"
              className="flex h-full flex-col gap-3 transition-transform group-hover:-translate-y-0.5 group-focus-visible:ring-2 group-focus-visible:ring-jade-600"
            >
              <h3 className="font-display text-2xl">
                {m.name}
                {trademarkSuffix(m.trademark)}
              </h3>
              <p className="font-body text-sm opacity-80">{m.summary}</p>
              <span className="font-body mt-auto text-xs tracking-widest uppercase text-jade-600">
                Learn more →
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  )
}
