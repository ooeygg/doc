"use client"

import * as Dialog from "@radix-ui/react-dialog"
import workOfAngelsLogo from "assets/logos/workofangels.webp"
import { Button } from "components/ui/Button/Button"
import { siteConfig } from "config/site"
import { motion } from "framer-motion"
import { track } from "lib/analytics"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

const PRIMARY_LINKS = siteConfig.nav.filter((item) => item.href !== "/book")

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href))

  return (
    <motion.header
      className={twMerge(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,box-shadow] duration-500",
        scrolled
          ? "border-divider border-b bg-bone/90 shadow-[0_2px_24px_rgba(17,17,17,0.06)] backdrop-blur-md"
          : "bg-transparent"
      )}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          aria-label="Dr. Cynthia Higgins – Home"
        >
          <Image
            src={workOfAngelsLogo}
            alt="Work of Angels – Dr. Cynthia Higgins"
            priority
            className="h-10 w-auto"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {PRIMARY_LINKS.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={twMerge(
                  "font-body link-underline relative text-sm tracking-wide text-ink transition-colors duration-200 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
                  active && "text-gold [&::after]:w-full"
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-surface-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold md:hidden"
            >
              <span aria-hidden className="block space-y-1.5">
                <span className={twMerge("block h-0.5 w-5 bg-current transition-transform duration-300", open && "translate-y-2 rotate-45")} />
                <span className={twMerge("block h-0.5 w-5 bg-current transition-opacity duration-300", open && "opacity-0")} />
                <span className={twMerge("block h-0.5 w-5 bg-current transition-transform duration-300", open && "-translate-y-2 -rotate-45")} />
              </span>
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm" />
            <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-surface p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <Dialog.Title className="font-display text-xl text-ink">Menu</Dialog.Title>
                <Dialog.Close
                  aria-label="Close menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-surface-alt"
                >
                  ✕
                </Dialog.Close>
              </div>
              <nav aria-label="Mobile" className="mt-8 flex flex-col gap-1">
                {PRIMARY_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-display rounded-xl px-2 py-3 text-2xl text-ink hover:bg-surface-alt"
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
    </motion.header>
  )
}
