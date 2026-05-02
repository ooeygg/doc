"use client"

import { Button } from "components/ui/Button/Button"
import { doctor } from "content/data/doctor"
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { fadeUp, staggerContainer } from "lib/motion"
import Image from "next/image"
import { useRef } from "react"

export function AboutPreview() {
  const first = doctor.paragraphs[0] ?? ""
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const textInView = useInView(textRef, { once: true, margin: "-8% 0px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], prefersReduced ? ["0%", "0%"] : ["0%", "8%"])

  return (
    <section ref={containerRef} className="overflow-hidden bg-bone">
      <div className="grid md:grid-cols-12">
        {/* portrait  fills left columns edge-to-edge */}
        <div className="relative h-[72vw] min-h-[260px] md:col-span-5 md:h-auto lg:col-span-6">
          <motion.div className="absolute inset-0 scale-[1.08]" style={{ y: imageY }}>
            <Image
              src={doctor.portrait.src}
              alt={doctor.portrait.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-top"
            />
          </motion.div>
          {/* right blend into bone */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-28"
            style={{ background: "linear-gradient(to left, #F4F3F1, transparent)" }}
          />
          {/* bottom blend for mobile */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 md:hidden"
            style={{ background: "linear-gradient(to top, #F4F3F1, transparent)" }}
          />
        </div>

        {/* text */}
        <motion.div
          ref={textRef}
          className="flex flex-col justify-center px-8 py-14 md:col-span-7 md:px-12 lg:col-span-6 lg:px-16 xl:px-24"
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate={textInView ? "visible" : "hidden"}
        >
          <motion.p variants={fadeUp} className="font-body text-[0.65rem] uppercase tracking-[0.25em] text-gold">
            About
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display mt-4 text-4xl leading-tight tracking-tight text-ink md:text-5xl lg:text-6xl"
          >
            Meet Dr.
            <br />
            Higgins
          </motion.h2>
          <motion.p variants={fadeUp} className="font-body mt-8 text-base leading-relaxed text-ink-muted lg:text-lg">
            {first}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10">
            <Button href="/about" intent="secondary">
              Read full bio
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
