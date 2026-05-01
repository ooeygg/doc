"use client"

import { useCallback, useRef } from "react"

/**
 * Magnetic button effect.
 * Attach ref + handlers to an interactive element.
 * On cursor proximity the element gently "attracts" toward the cursor.
 *
 * Respects prefers-reduced-motion: disables on motion-reduced.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null)

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const onMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      if (!ref.current || prefersReduced) return
      const { left, top, width, height } = ref.current.getBoundingClientRect()
      const x = (e.clientX - left - width / 2) * strength
      const y = (e.clientY - top - height / 2) * strength
      ref.current.style.transform = `translate(${x}px, ${y}px)`
      ref.current.style.transition = "transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
    },
    [strength, prefersReduced]
  )

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.transform = "translate(0px, 0px)"
    ref.current.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
