"use client"

import { Button } from "components/ui/Button/Button"
import { motion, useInView } from "framer-motion"
import { fadeUp, staggerContainer } from "lib/motion"
import Image from "next/image"
import { useRef } from "react"

export function CTA() {
  const contentRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(contentRef, { once: true, margin: "-8% 0px" })

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-ink">
      {/* Full-bleed background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/assets/images/sand-hands.png"
          alt=""
          fill
          className="object-cover opacity-25"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(17,17,17,0.88) 0%, rgba(17,17,17,0.65) 100%)",
          }}
        />
      </div>

      <motion.div
        ref={contentRef}
        className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-8 py-24 text-center md:px-12"
        variants={staggerContainer(0.14)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.p variants={fadeUp} className="font-body text-[0.65rem] uppercase tracking-[0.25em] text-gold">
          Begin here
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-display mt-6 text-5xl leading-[1.06] tracking-tight text-bone md:text-6xl lg:text-7xl"
        >
          Start Your
          <br />
          <em className="not-italic text-gold">Healing</em>
          <br />
          Journey
        </motion.h2>
        <motion.p variants={fadeUp} className="font-body mt-8 max-w-md text-lg leading-relaxed text-bone/60">
          A single conversation is often enough to know whether this is the right work for where
          you actually are.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-12">
          <Button href="/book" intent="gold">
            Book a consult
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
