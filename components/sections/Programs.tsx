"use client"

import { Card } from "components/ui/Card/Card"
import { Section } from "components/ui/Section/Section"
import { programs } from "content/data/programs"
import { track } from "lib/analytics"

export function Programs() {
  return (
    <Section eyebrow="Programs" heading="Self-paced and group offerings" surface="bone">
      <div className="grid gap-6 md:grid-cols-3">
        {programs.map((p) => (
          <a
            key={p.slug}
            href={p.xperiencifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track(`program_link_click_${p.slug}`, { source: "home-section" })}
            className="group focus-visible:outline-none"
          >
            <Card
              surface="bone"
              accent="gold"
              className="flex h-full flex-col gap-3 transition-transform group-hover:-translate-y-0.5"
            >
              <h3 className="font-display text-2xl">{p.title}</h3>
              <p className="font-body text-sm opacity-80">{p.description}</p>
              {p.durationWeeks ? (
                <p className="font-body mt-auto text-xs tracking-widest uppercase text-jade-600">
                  {p.durationWeeks} weeks
                </p>
              ) : null}
            </Card>
          </a>
        ))}
      </div>
    </Section>
  )
}
