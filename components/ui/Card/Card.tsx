import { cva, type VariantProps } from "class-variance-authority"
import { twMerge } from "tailwind-merge"

const card = cva(["rounded-2xl", "border", "p-6", "shadow-sm", "transition-colors"], {
  variants: {
    surface: {
      bone: ["bg-bone", "text-ink", "border-mist-100"],
      mist: ["bg-mist-100", "text-ink", "border-mist-100"],
      ink: ["bg-ink", "text-bone", "border-ink"],
    },
    accent: {
      none: [],
      gold: ["border-gold-500"],
    },
  },
  defaultVariants: {
    surface: "bone",
    accent: "none",
  },
})

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">, VariantProps<typeof card> {
  children: React.ReactNode
}

export function Card({ children, className, surface, accent, ...props }: CardProps) {
  return (
    <div className={twMerge(card({ surface, accent, className }))} {...props}>
      {children}
    </div>
  )
}
