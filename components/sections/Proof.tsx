"use client"

import { awards, press } from "content/data/credentials"
import { motion, useInView } from "framer-motion"
import { fadeUp } from "lib/motion"
import { useRef } from "react"

const STATS = [
  { num: "27+", label: "Years of practice" },
  { num: "2", label: "Industry awards" },
  { num: "3", label: "Media features" },
] as const

export function Proof() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-8% 0px" })

  const marqueeItems = [
    ...awards.map((a) => `${a.title} ${a.year}`),
    ...press.map((p) => p.outlet),
  ]

  return (
    <section ref={ref} className="bg-bone py-16 md:py-20">
      <div className="mx-auto mb-10 max-w-6xl px-8 md:px-12 lg:px-16">
        <p className="font-body text-[0.65rem] uppercase tracking-[0.25em] text-gold">Recognition</p>
      </div>

      {/* Marquee strip */}
      <div className="overflow-hidden border-y border-divider py-5" aria-hidden>
        <motion.div
          className="flex gap-16 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="font-display inline-flex items-center gap-16 text-xl text-ink md:text-2xl"
            >
              {item}
              <span className="text-sm text-gold">◆</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Stats row */}
      <motion.div
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
        }}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="mx-auto mt-12 grid max-w-6xl grid-cols-3 gap-8 px-8 md:px-12 lg:px-16"
      >
        {STATS.map(({ num, label }) => (
          <motion.div key={label} variants={fadeUp} className="border-t border-divider pt-6">
            <p className="font-display text-4xl text-ink md:text-5xl">{num}</p>
            <p className="font-body mt-2 text-xs uppercase tracking-[0.15em] text-ink-muted">{label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
