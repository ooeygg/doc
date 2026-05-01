"use client"

import { Button } from "components/ui/Button/Button"
import { Section } from "components/ui/Section/Section"
import { motion, useInView } from "framer-motion"
import { fadeUp, staggerContainer } from "lib/motion"
import Image from "next/image"
import { useRef } from "react"

export function CTA() {
  const contentRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(contentRef, { once: true, margin: "-8% 0px" })

  return (
    <Section surface="ink" className="relative overflow-hidden">
      {/* Background image */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/assets/images/sand-hands.png"
          alt=""
          fill
          className="object-cover opacity-[0.12]"
        />
      </div>
      <motion.div
        ref={contentRef}
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center"
        variants={staggerContainer(0.14)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2
          variants={fadeUp}
          className="font-display text-bone text-4xl tracking-tight md:text-5xl lg:text-6xl"
        >
          Start Your Healing Journey
        </motion.h2>
        <motion.p variants={fadeUp} className="font-body mt-6 max-w-2xl text-lg leading-relaxed text-bone/70">
          A single conversation is often enough to know whether this is the right work for where you actually are.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-10">
          <Button href="/book" intent="gold">
            Book a consult
          </Button>
        </motion.div>
      </motion.div>
    </Section>
  )
}
