import { twMerge } from "tailwind-merge"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export function Input({ className, ...props }: InputProps) {
  return <input className={twMerge("rounded-md border px-3 py-2", className)} {...props} />
}
