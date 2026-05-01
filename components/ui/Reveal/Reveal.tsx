"use client"

import { motion, useInView } from "framer-motion"
import { fadeUp, staggerContainer } from "lib/motion"
import { useRef } from "react"
import { twMerge } from "tailwind-merge"

interface RevealProps {
  children: React.ReactNode
  className?: string
  /** Delay before animation starts (seconds) */
  delay?: number
  /** Custom variants — defaults to fadeUp */
  variants?: Parameters<typeof motion.div>[0]["variants"]
  /** If true, wraps children in a stagger container */
  stagger?: boolean
  /** Stagger delay between children (seconds) */
  staggerDelay?: number
}

/**
 * Scroll-triggered reveal wrapper.
 * Animates children in with fadeUp once 10% of the element enters the viewport.
 * Fires once — does not repeat on scroll out.
 * Respects prefers-reduced-motion.
 *
 * Usage in server components:
 *   <Reveal><YourContent /></Reveal>
 *
 * Usage in stagger grids:
 *   <Reveal stagger staggerDelay={0.08}>
 *     {items.map(i => <motion.div key={i} variants={fadeUp}>...</motion.div>)}
 *   </Reveal>
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variants,
  stagger: isStagger = false,
  staggerDelay = 0.1,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" })

  const resolvedVariants = variants ?? (isStagger ? staggerContainer(staggerDelay) : fadeUp)

  const transition = delay > 0 ? { transitionDelay: `${delay}s` } : {}

  return (
    <motion.div
      ref={ref}
      variants={resolvedVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={transition}
      className={twMerge(className)}
    >
      {children}
    </motion.div>
  )
}
