"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { twMerge } from "tailwind-merge"
import workOfAngelsLogo from "assets/logos/workofangels.webp"
import { Button } from "components/ui/Button/Button"
import { siteConfig } from "config/site"

const PRIMARY_LINKS = siteConfig.nav.filter((item) => item.href !== "/book")

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const previousPathname = useRef(pathname)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (previousPathname.current === pathname) return
    previousPathname.current = pathname
    dialogRef.current?.close()
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  const openMenu = () => {
    dialogRef.current?.showModal()
    setOpen(true)
  }

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href))

  return (
    <header
      className={twMerge(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,box-shadow] duration-500",
        scrolled
          ? "border-divider bg-bone/90 border-b shadow-[0_2px_24px_rgba(17,17,17,0.06)] backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          prefetch={false}
          className="focus-visible:ring-gold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          aria-label="Dr. Cynthia Higgins – Home"
        >
          <Image
            src={workOfAngelsLogo}
            alt="Work of Angels – Dr. Cynthia Higgins"
            priority
            sizes="125px"
            className="h-10 w-auto"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {PRIMARY_LINKS.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className={twMerge(
                  "font-body link-underline text-ink hover:text-gold focus-visible:ring-gold relative text-sm tracking-wide transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                  active && "text-gold [&::after]:w-full"
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            )
          })}
          <Button href="/book" intent="primary" size="sm" data-analytics-id="nav-book-desktop">
            Book a consult
          </Button>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          aria-label="Open menu"
          data-analytics-id="menu-open"
          aria-haspopup="dialog"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={openMenu}
          className="text-ink hover:bg-surface-alt focus-visible:ring-gold inline-flex h-11 w-11 items-center justify-center rounded-full focus-visible:ring-2 focus-visible:outline-none lg:hidden"
        >
          <span aria-hidden className="block space-y-1.5">
            <span
              className={twMerge(
                "block h-0.5 w-5 bg-current transition-transform duration-300",
                open && "translate-y-2 rotate-45"
              )}
            />
            <span
              className={twMerge("block h-0.5 w-5 bg-current transition-opacity duration-300", open && "opacity-0")}
            />
            <span
              className={twMerge(
                "block h-0.5 w-5 bg-current transition-transform duration-300",
                open && "-translate-y-2 -rotate-45"
              )}
            />
          </span>
        </button>
        <dialog
          ref={dialogRef}
          id="mobile-menu"
          aria-labelledby="mobile-menu-title"
          aria-describedby="mobile-menu-description"
          onClose={() => {
            setOpen(false)
            menuButtonRef.current?.focus({ preventScroll: true })
          }}
          onClick={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect()
            if (
              event.clientX < bounds.left ||
              event.clientX > bounds.right ||
              event.clientY < bounds.top ||
              event.clientY > bounds.bottom
            ) {
              event.currentTarget.close()
            }
          }}
          className="bg-surface text-ink backdrop:bg-ink/60 fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-full max-w-sm border-0 p-6 shadow-xl backdrop:backdrop-blur-sm"
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between">
              <h2 id="mobile-menu-title" className="font-display text-ink text-xl">
                Menu
              </h2>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="Close menu"
                data-analytics-id="menu-close"
                className="text-ink hover:bg-surface-alt focus-visible:ring-gold inline-flex h-11 w-11 items-center justify-center rounded-full focus-visible:ring-2 focus-visible:outline-none"
              >
                ✕
              </button>
            </div>
            <p id="mobile-menu-description" className="sr-only">
              Explore Work of Angels and book a consultation.
            </p>
            <nav aria-label="Mobile" className="mt-8 flex flex-col gap-1">
              {PRIMARY_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  className="font-display text-ink hover:bg-surface-alt rounded-xl px-2 py-3 text-2xl"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto pt-8">
              <Button href="/book" intent="primary" className="w-full" data-analytics-id="nav-book-mobile">
                Book a consult
              </Button>
            </div>
          </div>
        </dialog>
      </div>
    </header>
  )
}
