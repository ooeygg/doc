"use client"

import { useGSAP } from "@gsap/react"
import { Button } from "components/ui/Button/Button"
import { doctor } from "content/data/doctor"
import { motion, useReducedMotion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { track } from "lib/analytics"
import { heroStagger, heroText } from "lib/motion"
import Image from "next/image"
import { useRef } from "react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const TICKER_ITEMS = [
  "27 Years Clinical Practice",
  "Energy Psychiatrist of the Year",
  "Board Certified",
  "Whole Life Integration™",
  "Energy Medicine",
  "Empowered Woman of the Year",
]

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageWrapRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  useGSAP(
    () => {
      if (prefersReduced || !imageWrapRef.current) return
      gsap.to(imageWrapRef.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.4,
        },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-bone">
      {/* ── Full-bleed split grid ── */}
      <div className="grid min-h-screen w-full md:grid-cols-12">
        {/* Text column */}
        <div className="flex flex-col justify-center px-8 pb-20 pt-36 md:col-span-5 md:px-12 md:py-0 lg:px-16 xl:px-24">
          <motion.div variants={heroStagger} initial="hidden" animate="visible" className="max-w-xs">
            <motion.p
              variants={heroText}
              className="font-body inline-flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.25em] text-gold"
            >
              <span aria-hidden className="block h-px w-10 bg-gold" />
              {doctor.tagline}
            </motion.p>

            <motion.h1
              variants={heroText}
              className="font-display mt-8 text-[clamp(3.5rem,6vw,5rem)] leading-[1.02] tracking-tight text-ink"
            >
              Let&rsquo;s
              <br />
              Make
              <br />
              <em className="not-italic text-gold">This</em>
              <br />
              <em className="not-italic text-gold">Happen</em>
            </motion.h1>

            <motion.p
              variants={heroText}
              className="font-body mt-8 text-base leading-relaxed text-ink-muted"
            >
              Where psychiatry meets energy medicine — a practice for people ready to stop
              compartmentalizing their healing.
            </motion.p>

            <motion.div variants={heroText} className="mt-10 flex flex-wrap gap-4">
              <Button
                href="/book"
                intent="primary"
                onClick={() => track("cta_click_hero", { target: "/book" })}
              >
                Book a consult
              </Button>
              <Button href="/about" intent="secondary">
                Meet Dr. Higgins
              </Button>
            </motion.div>

            {/* Scroll cue */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="mt-14 hidden items-center gap-3 text-ink-muted md:flex"
              aria-hidden
            >
              <span className="relative flex h-8 w-4 items-start justify-center rounded-full border border-divider pt-1.5">
                <motion.span
                  className="h-1.5 w-0.5 rounded-full bg-gold"
                  animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />
              </span>
              <span className="font-body text-xs uppercase tracking-widest">Scroll</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Portrait — fills right 7 columns edge-to-edge */}
        <motion.div
          ref={imageWrapRef}
          className="relative h-[70vw] overflow-hidden md:col-span-7 md:h-auto"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={doctor.portrait.src}
            alt={doctor.portrait.alt}
            fill
            priority
            sizes="(min-width: 768px) 58vw, 100vw"
            className="scale-[1.12] object-cover object-top"
          />
          {/* Left gradient — pure fade like the About page */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-24"
            style={{ background: "linear-gradient(to right, var(--color-bone), transparent)" }}
          />
          {/* Bottom gradient */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
            style={{ background: "linear-gradient(to top, var(--color-bone), transparent)" }}
          />
        </motion.div>
      </div>

      {/* ── Credential ticker strip ── */}
      <div className="overflow-hidden border-y border-divider bg-bone py-4">
        <motion.div
          className="flex gap-16 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          aria-hidden
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="font-body inline-flex items-center gap-16 text-xs uppercase tracking-[0.2em] text-ink-muted"
            >
              {item}
              <span className="text-gold">·</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
