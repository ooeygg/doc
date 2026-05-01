import { cva, type VariantProps } from "class-variance-authority"
import { twMerge } from "tailwind-merge"

const eyebrow = cva(["inline-block", "text-xs", "font-body", "font-medium", "uppercase", "tracking-widest"], {
  variants: {
    tone: {
      gold: ["text-gold"],
      ink: ["text-ink"],
      muted: ["text-ink-muted"],
      bone: ["text-bone"],
    },
  },
  defaultVariants: {
    tone: "gold",
  },
})

export interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof eyebrow> {
  children: React.ReactNode
}

export function Eyebrow({ className, tone, children, ...props }: EyebrowProps) {
  return (
    <span className={twMerge(eyebrow({ tone, className }))} {...props}>
      {children}
    </span>
  )
}
