"use client"

import * as RadixDialog from "@radix-ui/react-dialog"

type ModalProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  children: React.ReactNode
}

export function Modal({ open, onOpenChange, title, children }: ModalProps) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 bg-black/50" />
        <RadixDialog.Content className="fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg dark:bg-gray-900">
          {title ? <RadixDialog.Title className="mb-4 text-xl font-bold">{title}</RadixDialog.Title> : null}
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
