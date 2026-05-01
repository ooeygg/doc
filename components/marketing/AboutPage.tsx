import Image from "next/image"
import { Badge } from "components/ui/Badge/Badge"
import { Button } from "components/ui/Button/Button"
import { Section } from "components/ui/Section/Section"
import { awards, credentials, press } from "content/data/credentials"
import { doctor } from "content/data/doctor"

export function AboutPage() {
  return (
    <>
      <Section eyebrow="About" heading={doctor.name} surface="bone">
        <div className="grid items-start gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="bg-mist-100 ring-gold-500/30 relative aspect-[4/5] w-full overflow-hidden rounded-3xl ring-1">
              <Image
                src={doctor.portrait.src}
                alt={doctor.portrait.alt}
                fill
                priority
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="font-body text-xs uppercase tracking-widest text-gold-500">{doctor.tagline}</p>
            <div className="font-body mt-6 space-y-6 text-lg leading-relaxed">
              {doctor.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-10">
              <Button href="/book" intent="primary">
                Book a consult
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="Credentials" heading="Training and lineage" surface="mist">
        <ul className="grid gap-4 md:grid-cols-2">
          {credentials.map((c) => (
            <li key={c.title} className="border-l-2 border-gold-500 pl-4">
              <p className="font-display text-xl">{c.title}</p>
              {c.detail ? <p className="font-body text-sm opacity-70">{c.detail}</p> : null}
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Recognition" heading="Awards & press" surface="bone">
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
    </>
  )
}
