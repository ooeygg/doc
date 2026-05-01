import { Button } from "components/ui/Button/Button"
import { Section } from "components/ui/Section/Section"
import { modalities } from "content/data/modalities"

function trademarkSuffix(t?: "tm" | "registered") {
  if (t === "registered") return "®"
  if (t === "tm") return "™"
  return ""
}

export function ModalitiesPage() {
  return (
    <>
      <Section eyebrow="Modalities" heading="The toolkit, in detail" surface="bone">
        <p className="font-body max-w-2xl text-lg leading-relaxed opacity-80">
          The work uses a small, deliberate set of modalities. Each one earns its place by reaching what the others
          can't and they're chosen for the moment, not deployed by default.
        </p>
      </Section>

      {modalities.map((m, i) => (
        <Section
          key={m.slug}
          id={m.slug}
          eyebrow={`0${i + 1}`}
          heading={
            <>
              {m.name}
              {trademarkSuffix(m.trademark)}
            </>
          }
          surface={i % 2 === 0 ? "mist" : "bone"}
        >
          <div className="max-w-3xl">
            <p className="font-body text-lg leading-relaxed">{m.description}</p>
          </div>
        </Section>
      ))}

      <Section surface="ink">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-bone max-w-xl text-3xl">Not sure which fits where you are?</p>
          <Button href="/book" intent="gold">
            Book a consult
          </Button>
        </div>
      </Section>
    </>
  )
}
