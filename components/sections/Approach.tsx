"use client"

import { motion, useInView } from "framer-motion"
import { fadeUp, staggerContainer } from "lib/motion"
import { useRef } from "react"

const PILLARS = [
  {
    num: "01",
    title: "Quantum physics",
    description: "Energy, frequency, and information as the substrate underneath every healing modality.",
  },
  {
    num: "02",
    title: "Biology",
    description: "Nervous-system regulation, biochemistry, and the body's own self-correcting intelligence.",
  },
  {
    num: "03",
    title: "Psychology",
    description: "27 years of clinical psychiatry — diagnosis, integration, and steady evidence-based work.",
  },
  {
    num: "04",
    title: "Spirituality",
    description: "A contemplative through-line that sees the work as more than symptom management.",
  },
] as const

export function Approach() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-8% 0px" })

  return (
    <section className="bg-ink py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-8 md:px-12 lg:px-16">
        {/* Section header */}
        <div className="mb-16 grid gap-4 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-body text-[0.65rem] uppercase tracking-[0.25em] text-gold">Approach</p>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display text-4xl leading-tight tracking-tight text-bone md:text-5xl lg:text-6xl">
              Where science
              <br />
              meets soul
            </h2>
          </div>
        </div>

        {/* Editorial row list */}
        <motion.div
          ref={ref}
          variants={staggerContainer(0.08)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {PILLARS.map((p) => (
            <motion.div
              key={p.num}
              variants={fadeUp}
              className="group grid grid-cols-12 items-baseline gap-4 border-t border-bone/10 py-8 last:border-b last:border-bone/10"
            >
              <span className="font-body col-span-1 text-xs tabular-nums text-gold/60">{p.num}</span>
              <h3 className="font-display col-span-11 text-2xl text-bone transition-colors duration-300 group-hover:text-gold md:col-span-5 md:text-3xl lg:text-4xl">
                {p.title}
              </h3>
              <p className="font-body col-span-11 col-start-2 text-sm leading-relaxed text-bone/50 md:col-span-6 md:col-start-7 md:text-base">
                {p.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
