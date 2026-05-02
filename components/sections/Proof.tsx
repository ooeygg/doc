"use client"

import { awards, press } from "content/data/credentials"
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { fadeUp } from "lib/motion"
import Image from "next/image"
import { useRef } from "react"

const STATS = [
  { num: "27+", label: "Years of practice" },
  { num: "2", label: "Industry awards" },
  { num: "3", label: "Media features" },
] as const

export function Proof() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const inView = useInView(statsRef, { once: true, margin: "-8% 0px" })
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
    <section ref={sectionRef} className="relative min-h-[90vh] overflow-hidden">
      {/* sand-feet parallax background */}
      <motion.div className="absolute inset-0" style={{ y: imageY, scale: 1.15 }}>
        <Image
          src="/assets/images/sand-feet.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* layered overlays for depth and readability */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(17,17,17,0.80) 0%, rgba(17,17,17,0.88) 35%, rgba(17,17,17,0.88) 65%, rgba(17,17,17,0.80) 100%)",
        }}
      />
      {/* subtle warm vignette */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(17,17,17,0.35) 100%)",
        }}
      />

      {/* content */}
      <div className="relative z-10 flex flex-col py-24 md:py-32 lg:py-40">
        {/* eyebrow + statement */}
        <div className="mx-auto w-full max-w-6xl px-8 md:px-12 lg:px-16">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-[0.65rem] uppercase tracking-[0.25em] text-gold"
          >
            Recognition
          </motion.p>

          <h2 className="font-display mt-6 text-[clamp(2.8rem,7vw,5.5rem)] leading-[1.04] tracking-tight text-bone">
            {[
              { text: "A practice", gold: false },
              { text: "earned", gold: true },
              { text: "over decades.", gold: false },
            ].map(({ text, gold }, i) => (
              <span key={i} className="block overflow-hidden leading-[1.1]">
                <motion.span
                  className={gold ? "block not-italic text-gold" : "block"}
                  initial={{ y: "105%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                >
                  {text}
                </motion.span>
              </span>
            ))}
          </h2>
        </div>

        {/* stats */}
        <motion.div
          ref={statsRef}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
          }}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mx-auto mt-16 grid w-full max-w-6xl grid-cols-3 gap-4 px-8 md:mt-20 md:gap-8 md:px-12 lg:px-16"
        >
          {STATS.map(({ num, label }) => (
            <motion.div key={label} variants={fadeUp} className="border-t border-white/20 pt-5 md:pt-7">
              <p className="font-display text-[clamp(2.2rem,5vw,4.5rem)] text-bone">{num}</p>
              <p className="font-body mt-2 text-[0.6rem] uppercase tracking-[0.2em] text-bone/50 md:mt-3 md:text-[0.65rem]">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* marquee strip */}
        <div className="mt-16 overflow-hidden border-y border-white/10 py-5 md:mt-24" aria-hidden>
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
