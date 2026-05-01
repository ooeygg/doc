"use client"

import * as Dialog from "@radix-ui/react-dialog"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import { Button } from "components/ui/Button/Button"
import { siteConfig } from "config/site"
import { track } from "lib/analytics"

const PRIMARY_LINKS = siteConfig.nav.filter((item) => item.href !== "/book")

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href))

  return (
    <header
      className={twMerge(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled ? "bg-bone/95 border-mist-100 border-b backdrop-blur" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-display text-xl tracking-tight text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade-600 focus-visible:ring-offset-2"
        >
          Dr. Cynthia Higgins
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {PRIMARY_LINKS.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={twMerge(
                  "font-body relative text-sm tracking-wide text-ink transition-colors hover:text-jade-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade-600 focus-visible:ring-offset-2",
                  active && "after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:bg-jade-600"
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            )
          })}
          <Button
            href="/book"
            intent="primary"
            size="sm"
            onClick={() => track("cta_click_sticky", { source: "navbar-desktop", scrolled })}
          >
            Book a consult
          </Button>
        </nav>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              type="button"
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink hover:bg-mist-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade-600 md:hidden"
            >
              <span aria-hidden className="block space-y-1.5">
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
              </span>
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm" />
            <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-bone p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <Dialog.Title className="font-display text-xl text-ink">Menu</Dialog.Title>
                <Dialog.Close
                  aria-label="Close menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink hover:bg-mist-100"
                >
                  ✕
                </Dialog.Close>
              </div>
              <nav aria-label="Mobile" className="mt-8 flex flex-col gap-1">
                {PRIMARY_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-display rounded-md px-2 py-3 text-2xl text-ink hover:bg-mist-100"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto pt-8">
                <Button
                  href="/book"
                  intent="primary"
                  className="w-full"
                  onClick={() => track("cta_click_sticky", { source: "navbar-mobile" })}
                >
                  Book a consult
                </Button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  )
}
