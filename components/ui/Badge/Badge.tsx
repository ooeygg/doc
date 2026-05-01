import { cva, type VariantProps } from "class-variance-authority"
import { twMerge } from "tailwind-merge"

const badge = cva(
  ["inline-flex", "items-center", "gap-1.5", "rounded-full", "px-3", "py-1", "text-xs", "font-body", "font-medium", "tracking-wide"],
  {
    variants: {
      variant: {
        accolade: ["border", "border-gold-500", "text-ink", "bg-bone"],
        press: ["bg-mist-100", "text-ink"],
        category: ["bg-jade-900", "text-bone"],
      },
    },
    defaultVariants: {
      variant: "category",
    },
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badge> {
  children: React.ReactNode
}

export function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <span className={twMerge(badge({ variant, className }))} {...props}>
      {children}
    </span>
  )
}
