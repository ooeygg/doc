import { cva, type VariantProps } from "class-variance-authority"
import { useId } from "react"
import { twMerge } from "tailwind-merge"
import { Eyebrow } from "components/ui/Eyebrow/Eyebrow"

const section = cva(["py-24", "md:py-32", "lg:py-40"], {
  variants: {
    surface: {
      bone: ["bg-bone", "text-ink"],
      mist: ["bg-mist-100", "text-ink"],
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
  return (
    <section
      className={twMerge(section({ surface, className }))}
      aria-labelledby={heading ? headingId : undefined}
      {...props}
    >
      <div className={twMerge("mx-auto w-full max-w-6xl px-6", containerClassName)}>
        {(eyebrow || heading) && (
          <header className="mb-12 max-w-3xl">
            {eyebrow ? <Eyebrow tone={surface === "ink" ? "gold" : "gold"}>{eyebrow}</Eyebrow> : null}
            {heading ? (
              <h2
                id={headingId}
                className="font-display mt-4 text-4xl leading-tight tracking-tight md:text-5xl lg:text-6xl"
              >
                {heading}
              </h2>
            ) : null}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
