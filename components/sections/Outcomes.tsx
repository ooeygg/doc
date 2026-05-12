"use client"

import { Button } from "components/ui/Button/Button"
import { Section } from "components/ui/Section/Section"
import { motion, useInView } from "framer-motion"
import { fadeUp, staggerContainer } from "lib/motion"
import Image from "next/image"
import { useRef } from "react"

const OUTCOMES = [
  {
    title: "Scale",
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
    <Section eyebrow="Outcomes" heading="Scale · Grow · Attract" surface="ink">
      <div className="grid gap-12 md:grid-cols-12 md:items-center">
        {/* Outcomes grid + CTA */}
        <div className="md:col-span-8">
          <motion.div
            ref={gridRef}
            className="grid gap-10 sm:grid-cols-3"
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
        </div>

        {/* Portrait image */}
        <div className="order-first md:order-last md:col-span-4">
          <div className="relative aspect-3/4 w-full overflow-hidden rounded-3xl shadow-[0_32px_64px_rgba(0,0,0,0.3)]">
            <Image
              src="/assets/images/higgins-5.png"
              alt="Dr. Cynthia Higgins holding a luminous orb on the beach"
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </Section>
  )
}
