"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { Eyebrow } from "components/ui/Eyebrow/Eyebrow"
import { motion, useInView } from "framer-motion"
import { fadeUp, slideRight } from "lib/motion"
import { useId, useRef } from "react"
import { twMerge } from "tailwind-merge"

const section = cva(["py-24", "md:py-32", "lg:py-40"], {
  variants: {
    surface: {
      bone: ["bg-bone", "text-ink"],
      mist: ["bg-surface-alt", "text-ink"],
      ink: ["bg-ink", "text-bone"],
    },
  },
  defaultVariants: {
    surface: "bone",
  },
})

export interface SectionProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof section> {
  eyebrow?: string
  heading?: React.ReactNode
  children: React.ReactNode
  containerClassName?: string
}

export function Section({
  eyebrow,
  heading,
  surface,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  const headingId = useId()
  const headerRef = useRef<HTMLElement>(null)
  const isInView = useInView(headerRef, { once: true, margin: "-8% 0px" })

  return (
    <section
      className={twMerge(section({ surface, className }))}
      aria-labelledby={heading ? headingId : undefined}
      {...props}
    >
      <div className={twMerge("mx-auto w-full max-w-6xl px-6", containerClassName)}>
        {(eyebrow || heading) && (
          <header ref={headerRef} className="mb-12 max-w-3xl">
            {eyebrow ? (
              <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={slideRight}
              >
                <Eyebrow tone={surface === "ink" ? "bone" : "gold"}>{eyebrow}</Eyebrow>
              </motion.div>
            ) : null}
            {heading ? (
              <motion.h2
                id={headingId}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeUp}
                className="font-display mt-4 text-4xl leading-tight tracking-tight md:text-5xl lg:text-6xl"
              >
                {heading}
              </motion.h2>
            ) : null}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
