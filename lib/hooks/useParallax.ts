"use client"

import { useScroll, useTransform, type MotionValue } from "framer-motion"
import { useRef } from "react"

/**
 * Creates a scroll-driven parallax y-offset for an element.
 *
 * @param speed  - Parallax intensity. 0 = no movement. 0.15 = subtle. 0.3 = strong.
 * @param invert - If true, element moves upward as you scroll down.
 *
 * Usage:
 *   const { ref, y } = useParallax(0.15)
 *   <motion.div ref={ref} style={{ y }}>...</motion.div>
 */
export function useParallax(speed = 0.15, invert = false) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const range: [string, string] = invert
    ? [`${speed * 100}%`, "0%"]
    : ["0%", `${speed * 100}%`]

  const y: MotionValue<string> = useTransform(scrollYProgress, [0, 1], range)

  return { ref, y }
}

/**
 * Returns a MotionValue<number> for scale based on scroll position.
 * Use for subtle zoom-in-on-scroll effects on images.
 *
 * @param from - Starting scale (default: 1.0)
 * @param to   - Ending scale (default: 1.08)
 */
export function useParallaxScale(from = 1.0, to = 1.08) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const scale: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [from, to])
  return { ref, scale }
}
