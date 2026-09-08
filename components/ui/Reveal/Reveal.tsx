"use client"

import { animate } from "framer-motion/dom/mini"
import { useEffect, useRef } from "react"
import { dur, ease } from "lib/motion"

interface RevealProps {
  children: React.ReactNode
  className?: string
  /** Delay before animation starts, in seconds. */
  delay?: number
}

/**
 * A once-only reveal using the existing Motion library's small native-animation
 * entry point. Server HTML and above-the-fold content are always visible.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (
      !element ||
      reducedMotion.matches ||
      !window.IntersectionObserver ||
      element.getBoundingClientRect().top < window.innerHeight
    )
      return

    let animation: ReturnType<typeof animate> | undefined
    const show = () => {
      animation?.stop()
      element.style.opacity = "1"
      element.style.transform = "none"
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        animation = animate(
          element,
          {
            opacity: [0, 1],
            transform: ["translateY(24px)", "translateY(0px)"],
          },
          { duration: dur.slow, ease: ease.expo, delay }
        )
      },
      { rootMargin: "0px 0px -6% 0px" }
    )

    // Enhance only after hydration, keeping the no-JavaScript page usable.
    element.style.opacity = "0"
    element.style.transform = "translateY(24px)"
    observer.observe(element)
    const revealImmediately = () => {
      observer.disconnect()
      show()
    }
    const onMotionChange = () => {
      if (reducedMotion.matches) revealImmediately()
    }
    element.addEventListener("focusin", revealImmediately)
    reducedMotion.addEventListener("change", onMotionChange)

    return () => {
      observer.disconnect()
      element.removeEventListener("focusin", revealImmediately)
      reducedMotion.removeEventListener("change", onMotionChange)
      show()
    }
  }, [delay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
