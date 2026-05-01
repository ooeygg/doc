"use client"

import * as RadixSelect from "@radix-ui/react-select"
import { useId } from "react"
import { twMerge } from "tailwind-merge"

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  name?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  options: ReadonlyArray<SelectOption>
  label?: string
  placeholder?: string
  error?: string
  hint?: string
  id?: string
  required?: boolean
  disabled?: boolean
  className?: string
}

export function Select({
  name,
  value,
  defaultValue,
  onValueChange,
  options,
  label,
  placeholder = "Select an option",
  error,
  hint,
  id,
  required,
  disabled,
  className,
}: SelectProps) {
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
      <RadixSelect.Root
        name={name}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        required={required}
        disabled={disabled}
      >
        <RadixSelect.Trigger
          id={fieldId}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={describedBy}
          className={twMerge(
            "font-body inline-flex h-11 w-full items-center justify-between rounded-full border border-divider bg-surface px-4 text-left text-ink placeholder:text-ink-muted",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-1",
            "transition-[border-color,box-shadow] duration-200",
            error ? "border-error" : "",
            className
          )}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon className="ml-2 opacity-60">▾</RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content
            position="popper"
            sideOffset={6}
            className="font-body z-50 overflow-hidden rounded-2xl border border-divider bg-surface text-ink shadow-lg"
          >
            <RadixSelect.Viewport className="p-1">
              {options.map((opt) => (
                <RadixSelect.Item
                  key={opt.value}
                  value={opt.value}
                  className="relative flex cursor-pointer select-none items-center rounded-xl px-3 py-2 text-sm outline-none data-highlighted:bg-surface-alt data-[state=checked]:font-medium"
                >
                  <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
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
}
