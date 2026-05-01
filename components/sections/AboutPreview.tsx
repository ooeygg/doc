"use client"

import { Button } from "components/ui/Button/Button"
import { Section } from "components/ui/Section/Section"
import { doctor } from "content/data/doctor"
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { fadeUp, staggerContainer } from "lib/motion"
import Image from "next/image"
import { useRef } from "react"

export function AboutPreview() {
  const [first, second] = doctor.paragraphs
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const textInView = useInView(textRef, { once: true, margin: "-8% 0px" })

  // Parallax on the portrait image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], prefersReduced ? ["0%", "0%"] : ["0%", "10%"])

  return (
    <Section surface="bone" eyebrow="About" heading="Meet Dr. Higgins">
      <div ref={containerRef} className="grid items-center gap-12 md:grid-cols-12">
        {/* Image with parallax */}
        <div className="md:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-surface-alt">
            <motion.div className="absolute inset-0 scale-[1.1]" style={{ y: imageY }}>
              <Image
                src={doctor.portrait.src}
                alt={doctor.portrait.alt}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>

        {/* Text with stagger reveal */}
        <motion.div
          ref={textRef}
          className="md:col-span-7"
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate={textInView ? "visible" : "hidden"}
        >
          <motion.p variants={fadeUp} className="font-body text-lg leading-relaxed">
            {first}
          </motion.p>
          {second ? (
            <motion.p variants={fadeUp} className="font-body mt-4 text-base leading-relaxed opacity-80">
              {second}
            </motion.p>
          ) : null}
          <motion.div variants={fadeUp} className="mt-8">
            <Button href="/about" intent="secondary">
              Read full bio
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  )
}
