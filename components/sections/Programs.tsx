"use client"

import { Card } from "components/ui/Card/Card"
import { Section } from "components/ui/Section/Section"
import { programs } from "content/data/programs"
import { motion, useInView } from "framer-motion"
import { track } from "lib/analytics"
import { fadeUp, staggerContainer } from "lib/motion"
import { useRef } from "react"

export function Programs() {
  const gridRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(gridRef, { once: true, margin: "-8% 0px" })

  return (
    <Section eyebrow="Programs" heading="Self-paced and group offerings" surface="bone">
      <motion.div
        ref={gridRef}
        className="grid gap-6 md:grid-cols-3"
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {programs.map((p) => (
          <motion.div key={p.slug} variants={fadeUp}>
            <a
              href={p.xperiencifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track(`program_link_click_${p.slug}`, { source: "home-section" })}
              className="group focus-visible:outline-none"
            >
              <Card surface="bone" accent="gold" className="flex h-full flex-col gap-3">
                <h3 className="font-display text-2xl">{p.title}</h3>
                <p className="font-body text-sm opacity-80">{p.description}</p>
                {p.durationWeeks ? (
                  <p className="font-body mt-auto text-xs tracking-widest uppercase text-gold">
                    {p.durationWeeks} weeks
                  </p>
                ) : null}
              </Card>
            </a>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
