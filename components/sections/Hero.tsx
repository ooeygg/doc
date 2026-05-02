"use client"

import { useGSAP } from "@gsap/react"
import { Button } from "components/ui/Button/Button"
import { doctor } from "content/data/doctor"
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { track } from "lib/analytics"
import Image from "next/image"
import { useEffect, useRef } from "react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const TICKER_ITEMS = [
  "27 Years Clinical Practice",
  "Energy Psychiatrist of the Year",
  "Board Certified",
  "Whole Life Integration™",
  "Energy Medicine",
  "Empowered Woman of the Year",
]

// Line-level clip reveal — one motion element per line, not per character
function LineReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <span className={`block overflow-hidden leading-[1.06] pb-[0.15em] -mb-[0.15em] ${className}`}>
      <motion.span
        className="block"
        initial={{ y: "108%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

function CountUp({
  to,
  delay = 0,
  reducedMotion = false,
}: {
  to: number
  delay?: number
  reducedMotion?: boolean
}) {
  const count = useMotionValue(reducedMotion ? to : 0)
  const rounded = useTransform(count, (v) => Math.round(v))

  useEffect(() => {
    if (reducedMotion) return
    const controls = animate(count, to, {
      duration: 1.9,
      delay,
      ease: [0.16, 1, 0.3, 1],
    })
    return controls.stop
  }, [to, delay, reducedMotion, count])

  return <motion.span>{rounded}</motion.span>
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  useGSAP(
    () => {
      if (prefersReduced || !parallaxRef.current) return
      gsap.to(parallaxRef.current, {
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
      {/* Sand-hands texture: left panel background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-0 w-full overflow-hidden md:right-[55%] md:w-auto"
      >
        <Image
          src="/assets/images/sand-hands.png"
          alt=""
          fill
          sizes="(min-width: 768px) 45vw, 100vw"
          className="object-cover object-center"
          priority
        />
        {/* Lighter bone wash — texture breathes without muddying the text zone */}
        <div className="absolute inset-0" style={{ background: "rgba(244,243,241,0.68)" }} />
        <div
          className="absolute inset-y-0 right-0 hidden w-64 md:block"
          style={{ background: "linear-gradient(to right, transparent, var(--color-bone))" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32 md:hidden"
          style={{ background: "linear-gradient(to top, var(--color-bone), transparent)" }}
        />
      </div>

      {/* 12-col split grid */}
      <div className="relative z-10 grid min-h-[100svh] w-full md:grid-cols-12">

        {/* TEXT COLUMN */}
        <div className="relative flex flex-col justify-center px-8 pb-20 pt-32 md:col-span-5 md:px-12 md:py-0 lg:px-14 xl:px-20">

          <div>
            {/* Eyebrow — gold line, ink-muted text (contrast 5.5:1 on bone) */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <span className="h-px w-8 flex-shrink-0 bg-gold" aria-hidden />
              <p className="font-body text-[0.7rem] uppercase tracking-[0.22em] text-ink-muted">
                {doctor.tagline}
              </p>
            </motion.div>

            {/* Thin rule */}
            <motion.div
              className="mt-5 h-px origin-left bg-divider"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              aria-hidden
            />

            {/*
              Headline — line-level clip reveal, 4 motion elements instead of 60+.
              Accent words use #8A6A20 (deep amber-gold, 4.54:1 on bone) instead of
              --color-gold (#D2A74A, ~2:1) so all text meets WCAG AA.
            */}
            <h1 className="font-display mt-5 text-[clamp(2rem,8vw,4rem)] tracking-tight text-ink">
              <LineReveal delay={0.3}>Healing</LineReveal>
              <LineReveal className="italic text-[#8A6A20]" delay={0.56}>Begins</LineReveal>
              <LineReveal className="italic text-[#8A6A20]" delay={0.68}>Here</LineReveal>
            </h1>

            {/* Body copy */}
            <motion.p
              className="font-body mt-8 max-w-[26rem] text-base leading-[1.8] text-ink-muted"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
            >
              Where psychiatry meets energy medicine: a practice for people ready to stop
              compartmentalizing their healing.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.15 }}
            >
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


          </div>
        </div>

        {/* PORTRAIT COLUMN */}
        <div className="relative h-[82vw] overflow-hidden md:col-span-7 md:h-auto">
          <motion.div
            className="absolute inset-0"
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.35, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          >
            <div ref={parallaxRef} className="absolute inset-0">
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1.0 }}
                transition={{ duration: 1.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              >
                <Image
                  src={doctor.portrait.src}
                  alt={doctor.portrait.alt}
                  fill
                  priority
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className="object-cover object-top"
                />
              </motion.div>

              {/* Film grain — editorial texture */}
              <div className="grain-texture absolute inset-0 opacity-[0.18]" aria-hidden />

              {/* Lighter tint — lets the photo breathe */}
              <div className="absolute inset-0" style={{ background: "rgba(17,17,17,0.18)" }} />

              {/* Left blend: dissolves portrait into text panel */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 w-28 md:w-64"
                style={{
                  background:
                    "linear-gradient(to right, var(--color-bone) 0%, rgba(244,243,241,0.36) 50%, transparent 100%)",
                }}
              />

              {/* Bottom gradient into ticker */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-48 md:h-64"
                style={{ background: "linear-gradient(to top, var(--color-bone), transparent)" }}
              />
            </div>
          </motion.div>

          {/* Credential badge */}
          <motion.div
            className="absolute bottom-20 right-8 z-10 md:bottom-24 md:right-10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.55, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="relative w-[8.5rem] overflow-hidden backdrop-blur-md"
              style={{
                background: "rgba(11,11,11,0.78)",
                clipPath: "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%)",
              }}
            >
              {/* Animated gold hairline */}
              <motion.div
                className="absolute inset-x-0 top-0 h-px origin-left"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(210,167,74,0.9) 0%, rgba(210,167,74,0.5) 65%, rgba(210,167,74,0) 100%)",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.72, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              />

              <div className="px-6 pb-6 pt-5">
                {/* Number */}
                <p className="font-display text-[4.6rem] leading-[0.86] tracking-tight text-bone tabular-nums">
                  <CountUp to={27} delay={1.78} reducedMotion={prefersReduced ?? false} />
                </p>

                {/* Separator */}
                <div className="mt-[1.1rem] flex items-center gap-2">
                  <motion.div
                    className="h-px flex-1 origin-left"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(210,167,74,0.22), rgba(255,255,255,0.08))",
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 2.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <motion.span
                    className="block h-[3px] w-[3px] rounded-full bg-gold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2.2, duration: 0.5, type: "spring", stiffness: 300 }}
                  />
                </div>

                {/* Label — Awwwards-level cascade */}
                <div className="mt-[0.9rem]">
                  <motion.p
                    className="font-body text-[0.47rem] uppercase tracking-[0.36em] text-bone/35 leading-none"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Years of
                  </motion.p>
                  <motion.p
                    className="font-body mt-[0.45rem] text-[0.66rem] uppercase tracking-[0.2em] text-gold leading-none"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Clinical
                  </motion.p>
                  <motion.p
                    className="font-body mt-[0.35rem] text-[0.44rem] uppercase tracking-[0.28em] text-bone/28 leading-none"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.55, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Practice
                  </motion.p>
                  <motion.div
                    className="mt-[0.75rem] h-px origin-left"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(210,167,74,0.5) 0%, rgba(210,167,74,0.15) 60%, transparent 100%)",
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 2.7, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Vertical text — decorative editorial label */}
          <motion.div
            className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.85, duration: 0.8 }}
            aria-hidden
          >
            <span
              className="font-body text-[0.6rem] uppercase tracking-[0.32em] text-bone/40"
              style={{ writingMode: "vertical-rl" }}
            >
              Portrait · 2025
            </span>
          </motion.div>
        </div>
      </div>

      {/* Credential ticker strip */}
      <div className="overflow-hidden border-y border-divider bg-bone py-[1.1rem]">
        <motion.div
          className="flex gap-16 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          aria-hidden
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="font-body inline-flex items-center gap-16 text-[0.72rem] uppercase tracking-[0.2em] text-ink-muted"
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
