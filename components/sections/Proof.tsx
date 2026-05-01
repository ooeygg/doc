import { Badge } from "components/ui/Badge/Badge"
import { Section } from "components/ui/Section/Section"
import { awards, press } from "content/data/credentials"

export function Proof() {
  return (
    <Section eyebrow="Recognition" heading="Decades of clinical practice. Recognized leadership." surface="bone">
      <div className="flex flex-wrap items-center gap-3">
        {awards.map((a) => (
          <Badge key={a.title} variant="accolade">
            {a.title} · {a.year}
          </Badge>
        ))}
      </div>
      <div className="mt-12">
        <p className="font-body text-xs uppercase tracking-widest text-gold-500">As featured in</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {press.map((p) => (
            <Badge key={p.outlet} variant="press">
              {p.outlet}
            </Badge>
          ))}
        </div>
      </div>
    </Section>
  )
}
