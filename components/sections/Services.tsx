"use client"

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
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-8% 0px" })

  return (
    <section className="bg-surface-alt py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-8 md:px-12 lg:px-16">
        {/* Section header */}
        <div className="mb-16 grid gap-4 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-body text-[0.65rem] uppercase tracking-[0.25em] text-gold">Modalities</p>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display text-4xl leading-tight tracking-tight text-ink md:text-5xl lg:text-6xl">
              Tools matched
              <br />
              to the work
            </h2>
          </div>
        </div>

        {/* Editorial row list */}
        <motion.div
          ref={ref}
          variants={staggerContainer(0.07)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {modalities.map((m, i) => (
            <motion.div key={m.slug} variants={fadeUp}>
              <Link href={`/modalities#${m.slug}`} className="group focus-visible:outline-none">
                <div className="grid grid-cols-12 items-baseline gap-4 border-t border-divider py-7 transition-colors duration-300 last:border-b last:border-divider group-hover:border-gold/30 group-focus-visible:ring-2 group-focus-visible:ring-gold group-focus-visible:ring-offset-2">
                  <span className="font-body col-span-1 text-xs tabular-nums text-gold/60">
                    0{i + 1}
                  </span>
                  <h3 className="font-display col-span-11 text-xl text-ink transition-colors duration-300 group-hover:text-gold md:col-span-4 md:text-2xl lg:text-3xl">
                    {m.name}
                    {trademarkSuffix(m.trademark)}
                  </h3>
                  <p className="font-body col-span-11 col-start-2 text-sm leading-relaxed text-ink-muted md:col-span-6 md:col-start-6 md:text-base">
                    {m.summary}
                  </p>
                  <span
                    className="font-body col-span-1 text-right text-sm text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  >
                    →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
