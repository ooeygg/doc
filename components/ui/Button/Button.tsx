import { cva, type VariantProps } from "class-variance-authority"

import { twMerge } from "tailwind-merge"

const button = cva(
  [
    "justify-center",
    "inline-flex",
    "items-center",
    "rounded-xl",
    "text-center",
    "font-body",
    "font-medium",
    "tracking-wide",
    "border",
    "transition-colors",
    "delay-50",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-jade-600",
    "focus-visible:ring-offset-2",
    "disabled:opacity-50",
    "disabled:pointer-events-none",
  ],
  {
    variants: {
      intent: {
        primary: ["bg-jade-900", "text-bone", "border-jade-900", "hover:enabled:bg-jade-600", "hover:enabled:border-jade-600"],
        secondary: [
          "bg-transparent",
          "text-jade-900",
          "border-jade-900",
          "hover:enabled:bg-jade-900",
          "hover:enabled:text-bone",
        ],
        ghost: ["bg-transparent", "border-transparent", "text-jade-900", "hover:enabled:bg-bone"],
        gold: ["bg-gold-500", "text-ink", "border-gold-500", "hover:enabled:brightness-95"],
      },
      size: {
        sm: ["min-w-20", "h-full", "min-h-10", "text-sm", "py-1.5", "px-4"],
        lg: ["min-w-32", "h-full", "min-h-12", "text-lg", "py-2.5", "px-6"],
      },
      underline: { true: ["underline"], false: [] },
    },
    defaultVariants: {
      intent: "primary",
      size: "lg",
    },
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof button> {
  underline?: boolean
  href: string
}

export function Button({ className, intent, size, underline, ...props }: ButtonProps) {
  return (
    <a className={twMerge(button({ intent, size, className, underline }))} {...props}>
      {props.children}
    </a>
  )
}
