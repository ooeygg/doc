import { twMerge } from "tailwind-merge"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={twMerge(
        "font-body rounded-full border border-divider bg-surface px-4 py-2.5 text-ink placeholder:text-ink-muted",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-1",
        "transition-[border-color,box-shadow] duration-200",
        className
      )}
      {...props}
    />
  )
}
