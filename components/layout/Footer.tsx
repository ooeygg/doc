"use client"

import { Input } from "components/ui/Input/Input"
import { siteConfig } from "config/site"
import { modalities } from "content/data/modalities"
import Link from "next/link"
import { useState, type FormEvent } from "react"

const RESOURCES = [
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/#faq" },
  { label: "Programs", href: "/programs" },
  { label: "Services", href: "/services" },
] as const

const LEGAL = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Disclaimer", href: "/legal/disclaimer" },
] as const

type LeadState = "idle" | "submitting" | "success" | "error"

export function Footer() {
  const [email, setEmail] = useState("")
  const [state, setState] = useState<LeadState>("idle")

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState("submitting")
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      })
      if (!res.ok) throw new Error()
      setState("success")
      setEmail("")
    } catch {
      setState("error")
    }
  }

  return (
    <footer className="bg-ink text-bone">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="font-display text-2xl">{siteConfig.name}</p>
          <p className="font-body mt-4 max-w-xs text-sm opacity-70">
            Energy-medicine psychiatry heal trauma, restore vitality, integrate body, mind, and spirit.
          </p>
          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-2">
            <label htmlFor="footer-email" className="font-body text-xs uppercase tracking-widest text-gold-500">
              Stay in touch
            </label>
            <div className="flex gap-2">
              <Input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 bg-bone text-ink"
                aria-invalid={state === "error" ? "true" : undefined}
              />
              <button
                type="submit"
                disabled={state === "submitting"}
                className="font-body rounded-md bg-gold-500 px-4 text-sm font-medium text-ink hover:brightness-95 disabled:opacity-50"
              >
                {state === "submitting" ? "..." : "Join"}
              </button>
            </div>
            {state === "success" ? (
              <p className="font-body text-xs text-gold-500">Thank you. We'll be in touch.</p>
            ) : state === "error" ? (
              <p className="font-body text-rose-300 text-xs">Something went wrong please try again.</p>
            ) : null}
          </form>
        </div>

        <FooterColumn title="Modalities">
          {modalities.map((m) => (
            <Link key={m.slug} href={`/modalities#${m.slug}`} className="hover:text-gold-500">
              {m.name}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Resources">
          {RESOURCES.map((r) => (
            <Link key={r.href} href={r.href} className="hover:text-gold-500">
              {r.label}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Legal">
          {LEGAL.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-gold-500">
              {l.label}
            </Link>
          ))}
        </FooterColumn>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-6 py-6 text-sm opacity-60 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-body">Information on this site is educational, not medical advice.</p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  const items = Array.isArray(children) ? (children as React.ReactNode[]) : [children]
  return (
    <div>
      <p className="font-body text-xs uppercase tracking-widest text-gold-500">{title}</p>
      <ul className="font-body mt-4 flex flex-col gap-2 text-sm">
        {items.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  )
}
