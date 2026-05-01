import { useId, forwardRef } from "react"
import { twMerge } from "tailwind-merge"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, label, error, hint, id, ...props },
  ref
) {
  const reactId = useId()
  const fieldId = id ?? reactId
  const describedBy = error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined

  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={fieldId} className="font-body text-sm font-medium text-ink">
          {label}
        </label>
      ) : null}
      <textarea
        id={fieldId}
        ref={ref}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy}
        className={twMerge(
          "font-body min-h-32 rounded-md border border-mist-100 bg-bone px-3 py-2 text-ink",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade-600",
          error ? "border-rose-300" : "",
          className
        )}
        {...props}
      />
      {error ? (
        <p id={`${fieldId}-error`} className="font-body text-xs text-rose-300">
          {error}
        </p>
      ) : hint ? (
        <p id={`${fieldId}-hint`} className="font-body text-xs opacity-70">
          {hint}
        </p>
      ) : null}
    </div>
  )
})
