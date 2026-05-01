import { cva, type VariantProps } from "class-variance-authority"
import { twMerge } from "tailwind-merge"

const card = cva(
  [
    "rounded-2xl",
    "border",
    "p-6",
    "shadow-[0_2px_12px_rgba(17,17,17,0.06)]",
    "transition-[transform,box-shadow,opacity]",
    "duration-500",
    "ease-[cubic-bezier(0.16,1,0.3,1)]",
    "hover:-translate-y-1",
    "hover:shadow-[0_12px_40px_rgba(17,17,17,0.1)]",
    "hover:scale-[1.01]",
    "will-change-transform",
  ],
  {
    variants: {
      surface: {
        bone: ["bg-surface", "text-ink", "border-divider"],
        mist: ["bg-surface-alt", "text-ink", "border-divider"],
        ink: ["bg-ink", "text-bone", "border-ink"],
      },
      accent: {
        none: [],
        gold: ["border-gold/40", "hover:border-gold"],
      },
    },
    defaultVariants: {
      surface: "bone",
      accent: "none",
    },
  }
)

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
