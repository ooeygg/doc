"use client"

import { Card } from "components/ui/Card/Card"
import { Section } from "components/ui/Section/Section"
import { programs } from "content/data/programs"

const TIER_LABEL: Record<NonNullable<(typeof programs)[number]["priceTier"]>, string> = {
  foundation: "Foundation",
  signature: "Signature",
  intensive: "Intensive",
}

export function ProgramsPage() {
  return (
    <>
      <Section eyebrow="Programs" heading="Group containers and self-paced work" surface="bone">
        <p className="font-body max-w-2xl text-lg leading-relaxed opacity-80">
          For clients who want structure beyond 1:1 sessions. Each program is hosted on Xperiencify and uses the same
          framework Dr. Higgins teaches in private practice.
        </p>
      </Section>

      <Section surface="mist">
        <div className="grid gap-6 md:grid-cols-3">
          {programs.map((p) => (
            <a
              key={p.slug}
              href={p.xperiencifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group focus-visible:outline-none"
            >
              <Card
                surface="bone"
                accent="gold"
                className="flex h-full flex-col gap-3 transition-transform group-hover:-translate-y-0.5"
              >
                {p.priceTier ? (
                  <p className="font-body text-gold text-xs tracking-widest uppercase">{TIER_LABEL[p.priceTier]}</p>
                ) : null}
                <h2 className="font-display text-3xl">{p.title}</h2>
                <p className="font-body text-sm opacity-80">{p.description}</p>
                <p className="font-body text-gold mt-auto text-xs tracking-widest uppercase">
                  {p.durationWeeks ? `${p.durationWeeks} weeks · ` : ""}Schedule a consult →
                </p>
              </Card>
            </a>
          ))}
        </div>
      </Section>
    </>
  )
}
