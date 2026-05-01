import { twMerge } from "tailwind-merge"

type CardProps = {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return <div className={twMerge("rounded-xl border p-6 shadow-sm", className)}>{children}</div>
}
