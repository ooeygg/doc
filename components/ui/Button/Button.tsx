"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { useCallback, useRef } from "react"
import { twMerge } from "tailwind-merge"

const button = cva(
  [
    "justify-center",
    "inline-flex",
    "items-center",
    "rounded-full",
    "text-center",
    "font-body",
    "font-medium",
    "tracking-wide",
    "border",
    "transition-[box-shadow,background-color,border-color,color,opacity]",
    "duration-300",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-gold",
    "focus-visible:ring-offset-2",
    "disabled:opacity-50",
    "disabled:pointer-events-none",
    "will-change-transform",
  ],
  {
    variants: {
      intent: {
        primary: [
          "bg-gold",
          "btn-gradient",
          "text-ink",
          "border-gold",
          "shadow-[0_2px_16px_rgba(210,167,74,0.28)]",
          "hover:enabled:bg-gold-hover",
          "hover:enabled:border-gold-hover",
          "hover:enabled:shadow-[0_6px_28px_rgba(210,167,74,0.38)]",
          "active:enabled:bg-gold-active",
          "active:enabled:border-gold-active",
        ],
        secondary: [
          "bg-transparent",
          "text-ink",
          "border-divider",
          "hover:enabled:border-gold",
          "hover:enabled:text-gold-hover",
          "hover:enabled:shadow-[0_4px_20px_rgba(210,167,74,0.12)]",
        ],
        ghost: [
          "bg-transparent",
          "border-transparent",
          "text-ink",
          "hover:enabled:bg-surface-alt",
        ],
        gold: [
          "bg-gold",
          "btn-gradient",
          "text-ink",
          "border-gold",
          "shadow-[0_2px_16px_rgba(210,167,74,0.28)]",
          "hover:enabled:bg-gold-hover",
          "hover:enabled:border-gold-hover",
          "hover:enabled:shadow-[0_6px_28px_rgba(210,167,74,0.38)]",
          "active:enabled:bg-gold-active",
          "active:enabled:border-gold-active",
        ],
      },
      size: {
        sm: ["min-w-20", "h-full", "min-h-10", "text-sm", "py-1.5", "px-5"],
        lg: ["min-w-32", "h-full", "min-h-12", "text-base", "py-3", "px-7"],
      },
      underline: { true: ["underline"], false: [] },
    },
    defaultVariants: {
      intent: "primary",
      size: "lg",
    },
  }
)

export interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof button> {
  underline?: boolean
  href: string
}

export function Button({ className, intent, size, underline, ...props }: ButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)

  // Magnetic effect — disabled when prefers-reduced-motion
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.32
    const y = (e.clientY - rect.top - rect.height / 2) * 0.32
    ref.current.style.transform = `translate(${x}px, ${y}px)`
    ref.current.style.transition = "transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
  }, [])

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.transform = "translate(0px, 0px)"
    ref.current.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
  }, [])

  return (
    <a
      ref={ref}
      className={twMerge(button({ intent, size, className, underline }))}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {props.children}
    </a>
  )
}
