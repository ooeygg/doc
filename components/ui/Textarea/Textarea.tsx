import { forwardRef, useId } from "react"
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
          "font-body min-h-32 rounded-2xl border border-divider bg-surface px-4 py-3 text-ink placeholder:text-ink-muted",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-1",
          "transition-[border-color,box-shadow] duration-200",
          error ? "border-error" : "",
          className
        )}
        {...props}
      />
      {error ? (
        <p id={`${fieldId}-error`} className="font-body text-xs text-error">
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
