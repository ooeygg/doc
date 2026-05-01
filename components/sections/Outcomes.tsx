"use client"

import { Button } from "components/ui/Button/Button"
import { Section } from "components/ui/Section/Section"
import { motion, useInView } from "framer-motion"
import { fadeUp, staggerContainer } from "lib/motion"
import { useRef } from "react"

const OUTCOMES = [
  {
    title: "Heal",
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
  const gridRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(gridRef, { once: true, margin: "-8% 0px" })

  return (
    <Section eyebrow="Outcomes" heading="Heal · Grow · Attract" surface="ink">
      <motion.div
        ref={gridRef}
        className="grid gap-10 md:grid-cols-3"
        variants={staggerContainer(0.12)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {OUTCOMES.map((o) => (
          <motion.div key={o.title} variants={fadeUp} className="border-t border-bone/20 pt-6">
            <h3 className="font-display text-3xl text-bone">{o.title}</h3>
            <p className="font-body mt-3 text-sm leading-relaxed text-bone/70">{o.description}</p>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mt-12"
      >
        <Button href="/book" intent="gold">
          Start the conversation
        </Button>
      </motion.div>
    </Section>
  )
}
