"use client"

import { awards, press } from "content/data/credentials"
import { modalities } from "content/data/modalities"
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"
import { fadeUp, staggerContainer } from "lib/motion"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"

const STATS = [
  { num: "27+", label: "Years of practice" },
  { num: "2", label: "Industry awards" },
  { num: "3", label: "Media features" },
] as const

function trademarkSuffix(t?: "tm" | "registered") {
  if (t === "registered") return "®"
  if (t === "tm") return "™"
  return ""
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const listInView = useInView(listRef, { once: true, margin: "-8% 0px" })
  const statsInView = useInView(statsRef, { once: true, margin: "-8% 0px" })
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? ["0%", "0%"] : ["-10%", "10%"]
  )

  const marqueeItems = [
    ...awards.map((a) => `${a.title} ${a.year}`),
    ...press.map((p) => p.outlet),
  ]

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* parallax background */}
      <motion.div className="absolute inset-0" style={{ y: imageY, scale: 1.15 }}>
        <Image
          src="/assets/images/sand-feet.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* primary dark overlay */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(17,17,17,0.87) 0%, rgba(17,17,17,0.94) 28%, rgba(17,17,17,0.94) 72%, rgba(17,17,17,0.87) 100%)",
        }}
      />
      {/* warm edge vignette */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(17,17,17,0.4) 100%)",
        }}
      />

      {/* ── CONTENT ──────────────────────────────────────── */}
      <div className="relative z-10 py-28 md:py-40 lg:py-52">
        <div className="mx-auto max-w-6xl px-8 md:px-12 lg:px-16">

          {/* ── ACT II: MODALITIES LIST ───────────────────── */}
          <motion.div
            ref={listRef}
            variants={staggerContainer(0.07)}
            initial="hidden"
            animate={listInView ? "visible" : "hidden"}
          >
            {modalities.map((m, i) => (
              <motion.div key={m.slug} variants={fadeUp} className="relative">
                <motion.div
                  className="pointer-events-none absolute left-0 top-0 h-px origin-left bg-gold"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />
                <Link href={`/modalities#${m.slug}`} className="group focus-visible:outline-none">
                  <div className="grid grid-cols-12 items-baseline gap-4 border-t border-white/10 py-7 transition-colors duration-300 last:border-b last:border-white/10 group-hover:border-gold/25 group-focus-visible:ring-2 group-focus-visible:ring-gold group-focus-visible:ring-offset-2">
                    <span className="font-body col-span-1 text-xs tabular-nums text-gold/50">
                      0{i + 1}
                    </span>
                    <h3 className="font-display col-span-11 text-xl text-bone transition-colors duration-300 group-hover:text-gold md:col-span-4 md:text-2xl lg:text-3xl">
                      {m.name}
                      {trademarkSuffix(m.trademark)}
                    </h3>
                    <p className="font-body col-span-11 col-start-2 text-sm leading-relaxed text-bone/55 md:col-span-6 md:col-start-6 md:text-base">
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

        {/* ── CODA: MARQUEE STRIP ────────────────────────── */}
        <div className="mt-20 overflow-hidden border-y border-white/10 py-5 md:mt-28" aria-hidden>
          <motion.div
            className="flex gap-16 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                className="font-display inline-flex items-center gap-16 text-xl text-bone/70 md:text-2xl"
              >
                {item}
                <span className="text-sm text-gold">◆</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
