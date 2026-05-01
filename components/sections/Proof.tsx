"use client"

import { Badge } from "components/ui/Badge/Badge"
import { Section } from "components/ui/Section/Section"
import { awards, press } from "content/data/credentials"
import { motion, useInView } from "framer-motion"
import { fadeUp, staggerContainer } from "lib/motion"
import { useRef } from "react"

export function Proof() {
  const awardsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(awardsRef, { once: true, margin: "-8% 0px" })

  return (
    <Section eyebrow="Recognition" heading="Decades of clinical practice. Recognized leadership." surface="bone">
      <motion.div
        ref={awardsRef}
        className="flex flex-wrap items-center gap-3"
        variants={staggerContainer(0.06)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {awards.map((a) => (
          <motion.div key={a.title} variants={fadeUp}>
            <Badge variant="accolade">
              {a.title} · {a.year}
            </Badge>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className="mt-12"
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <p className="font-body text-xs uppercase tracking-widest text-gold">As featured in</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {press.map((p) => (
            <Badge key={p.outlet} variant="press">
              {p.outlet}
            </Badge>
          ))}
        </div>
      </motion.div>
    </Section>
  )
}
