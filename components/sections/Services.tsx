"use client"

import { Card } from "components/ui/Card/Card"
import { Section } from "components/ui/Section/Section"
import { modalities } from "content/data/modalities"
import { motion, useInView } from "framer-motion"
import { fadeUp, staggerContainer } from "lib/motion"
import Link from "next/link"
import { useRef } from "react"

function trademarkSuffix(t?: "tm" | "registered") {
  if (t === "registered") return "®"
  if (t === "tm") return "™"
  return ""
}

export function Services() {
  const gridRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(gridRef, { once: true, margin: "-8% 0px" })

  return (
    <Section eyebrow="Modalities" heading="Tools matched to the work" surface="mist">
      <motion.div
        ref={gridRef}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={staggerContainer(0.08)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {modalities.map((m) => (
          <motion.div key={m.slug} variants={fadeUp}>
            <Link href={`/modalities#${m.slug}`} className="group focus-visible:outline-none">
              <Card
                surface="bone"
                accent="gold"
                className="flex h-full flex-col gap-3 group-focus-visible:ring-2 group-focus-visible:ring-gold"
              >
                <h3 className="font-display text-2xl">
                  {m.name}
                  {trademarkSuffix(m.trademark)}
                </h3>
                <p className="font-body text-sm opacity-80">{m.summary}</p>
                <span className="font-body mt-auto text-xs tracking-widest uppercase text-gold transition-colors group-hover:text-gold-hover">
                  Learn more →
                </span>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
