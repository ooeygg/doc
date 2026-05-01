"use client"

import { useGSAP } from "@gsap/react"
import { Button } from "components/ui/Button/Button"
import { doctor } from "content/data/doctor"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { track } from "lib/analytics"
import { fadeIn, heroStagger, heroText } from "lib/motion"
import Image from "next/image"
import { useRef } from "react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageWrapRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  // framer-motion: overlay opacity on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.3, 0.75])

  // GSAP ScrollTrigger: slow vertical parallax on portrait image
  useGSAP(
    () => {
      if (prefersReduced || !imageWrapRef.current) return
      gsap.to(imageWrapRef.current, {
        yPercent: 12,
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
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-bone"
    >
      {/* Gold radial glow — top-left */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(210,167,74,0.16) 0%, rgba(210,167,74,0.04) 55%, transparent 75%)",
          opacity: overlayOpacity,
        }}
      />

      {/* Content grid */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-32 md:grid-cols-12 md:min-h-screen md:py-0">

        {/* ── Text column ── */}
        <motion.div
          className="md:col-span-7 lg:col-span-6"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={heroText}
            className="font-body inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-gold"
          >
            <span aria-hidden className="block h-px w-8 bg-gold" />
            {doctor.tagline}
          </motion.p>

          <motion.h1
            variants={heroText}
            className="font-display mt-6 text-5xl leading-[1.1] tracking-tight md:text-6xl lg:text-7xl xl:text-[5.5rem]"
          >
            Let&rsquo;s Make
            <br />
            <em className="not-italic text-gold">This Happen</em>
          </motion.h1>

          <motion.p
            variants={heroText}
            className="font-body mt-8 max-w-lg text-lg leading-relaxed text-ink-muted"
          >
            Where psychiatry meets energy medicine. A practice for people who are ready to stop
            compartmentalizing their healing and integrate body, mind, biography, and spirit into
            a single trajectory.
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
            variants={heroText}
            className="mt-16 hidden items-center gap-3 text-ink-muted md:flex"
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

        {/* ── Portrait column ── */}
        <motion.div
          className="relative md:col-span-5 lg:col-span-6"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          {/* Decorative offset frame */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-4 -right-4 h-full w-full rounded-3xl border border-gold/20"
          />

          {/* Overflow container — GSAP moves imageWrapRef */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-[0_32px_80px_-12px_rgba(17,17,17,0.18)]">
            <div ref={imageWrapRef} className="absolute inset-0 scale-[1.14]">
              <Image
                src={doctor.portrait.src}
                alt={doctor.portrait.alt}
                fill
                priority
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            {/* Bottom vignette */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{
                background: "linear-gradient(to top, rgba(17,17,17,0.2) 0%, transparent 40%)",
              }}
            />
          </div>

          {/* Floating credential badge */}
          <motion.div
            className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl bg-surface px-5 py-4 shadow-[0_8px_32px_rgba(17,17,17,0.1)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              aria-hidden
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 text-sm font-bold text-gold"
            >
              MD
            </span>
            <div>
              <p className="font-display text-sm font-medium leading-none">Board Certified</p>
              <p className="font-body mt-0.5 text-xs text-ink-muted">Psychiatry &amp; Energy Medicine</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
