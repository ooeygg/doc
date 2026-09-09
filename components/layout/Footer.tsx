"use client"

import Link from "next/link"
import { type FormEvent, useState } from "react"
import { Input } from "components/ui/Input/Input"
import { IconExternal, IconFacebook, IconLinkedin, IconYoutube } from "components/ui/SocialIcons"
import { siteConfig } from "config/site"
import { modalities } from "content/data/modalities"
import { reportFormResult } from "lib/analytics"

const RESOURCES = [
  { label: "Speaking Events", href: "/speaking-events" },
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
    const analyticsPage = window.location.pathname
    setState("submitting")
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      })
      const result = (await res.json().catch(() => null)) as { ok?: boolean } | null
      if (!res.ok || result?.ok !== true) {
        reportFormResult(
          "newsletter",
          res.status === 429 ? "rate_limited" : res.status === 400 ? "validation_error" : "server_error",
          0,
          analyticsPage
        )
        setState("error")
        return
      }
      setState("success")
      reportFormResult("newsletter", "success", 0, analyticsPage)
      setEmail("")
    } catch {
      reportFormResult("newsletter", "network_error", 0, analyticsPage)
      setState("error")
    }
  }

  return (
    <footer className="bg-ink text-bone">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="font-display text-2xl">{siteConfig.name}</p>
          <p className="font-body mt-4 max-w-xs text-sm opacity-70">
            Energy-medicine psychiatry transforms trauma, restores vitality, and integrates body, mind, and spirit.
          </p>
          <address className="font-body mt-4 text-sm leading-relaxed not-italic opacity-70">
            {siteConfig.office.name}
            <br />
            {siteConfig.office.address.streetAddress}
            <br />
            {siteConfig.office.address.addressLocality}, {siteConfig.office.address.addressRegion}{" "}
            {siteConfig.office.address.postalCode}
          </address>
          <form data-analytics-form="newsletter" onSubmit={onSubmit} className="mt-6 flex flex-col gap-2">
            <label htmlFor="footer-email" className="font-body text-gold text-xs tracking-widest uppercase">
              Stay in touch
            </label>
            <div className="flex gap-2">
              <Input
                id="footer-email"
                data-analytics-field="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-surface text-ink flex-1"
                aria-invalid={state === "error" ? "true" : undefined}
              />
              <button
                type="submit"
                data-analytics-id="newsletter-submit"
                disabled={state === "submitting"}
                className="font-body bg-gold text-ink hover:bg-gold-hover rounded-full px-4 text-sm font-medium disabled:opacity-50"
              >
                {state === "submitting" ? "..." : "Join"}
              </button>
            </div>
            {state === "success" ? (
              <p className="font-body text-gold text-xs">Thank you. We'll be in touch.</p>
            ) : state === "error" ? (
              <p className="font-body text-error text-xs">Something went wrong please try again.</p>
            ) : null}
          </form>
        </div>

        <FooterColumn title="Modalities">
          {modalities.map((m) => (
            <Link key={m.slug} href={`/modalities#${m.slug}`} prefetch={false} className="hover:text-gold">
              {m.name}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Resources">
          {RESOURCES.map((r) => (
            <Link key={r.href} href={r.href} prefetch={false} className="hover:text-gold">
              {r.label}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Legal">
          {LEGAL.map((l) => (
            <Link key={l.href} href={l.href} prefetch={false} className="hover:text-gold">
              {l.label}
            </Link>
          ))}
        </FooterColumn>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-6 py-6 text-sm opacity-60 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-6">
            <p>
              © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              {siteConfig.socials?.linkedin && (
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn"
                  className="hover:text-gold"
                >
                  <IconLinkedin />
                </a>
              )}
              {siteConfig.socials?.alignable && (
                <a
                  href={siteConfig.socials.alignable}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Alignable"
                  className="hover:text-gold flex items-center gap-1 text-sm"
                >
                  <span>Alignable</span>
                  <IconExternal />
                </a>
              )}
              {siteConfig.socials?.youtube && (
                <a
                  href={siteConfig.socials.youtube}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="YouTube"
                  className="hover:text-gold"
                >
                  <IconYoutube />
                </a>
              )}
              {siteConfig.socials?.facebook && (
                <a
                  href={siteConfig.socials.facebook}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Facebook"
                  className="hover:text-gold"
                >
                  <IconFacebook />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  const items = Array.isArray(children) ? (children as React.ReactNode[]) : [children]
  return (
    <div>
      <p className="font-body text-gold/70 text-xs tracking-widest uppercase">{title}</p>
      <ul className="font-body mt-4 flex flex-col gap-2 text-sm">
        {items.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  )
}
