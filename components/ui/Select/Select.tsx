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
  analyticsField?: string
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
  analyticsField,
}: SelectProps) {
  const reactId = useId()
  const fieldId = id ?? reactId
  const describedBy = error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined

  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={fieldId} className="font-body text-ink text-sm font-medium">
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
          data-analytics-field={analyticsField}
          data-analytics-filled={Boolean(value ?? defaultValue)}
          id={fieldId}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={describedBy}
          className={twMerge(
            "font-body border-divider bg-surface text-ink placeholder:text-ink-muted inline-flex h-11 w-full items-center justify-between rounded-full border px-4 text-left",
            "focus-visible:ring-gold focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none",
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
            className="font-body border-divider bg-surface text-ink z-50 overflow-hidden rounded-2xl border shadow-lg"
          >
            <RadixSelect.Viewport className="p-1">
              {options.map((opt) => (
                <RadixSelect.Item
                  key={opt.value}
                  value={opt.value}
                  className="data-highlighted:bg-surface-alt relative flex cursor-pointer items-center rounded-xl px-3 py-2 text-sm outline-none select-none data-[state=checked]:font-medium"
                >
                  <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
      {error ? (
        <p id={`${fieldId}-error`} className="font-body text-error text-xs">
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
