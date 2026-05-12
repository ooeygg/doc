"use client"

import { Badge } from "components/ui/Badge/Badge"
import { Button } from "components/ui/Button/Button"
import { awards, credentials, press } from "content/data/credentials"
import { doctor } from "content/data/doctor"
import { motion, useInView } from "framer-motion"
import { fadeUp, scaleReveal, staggerContainer } from "lib/motion"
import Image from "next/image"
import { useRef } from "react"

// ── Shared reveal wrapper ────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-6% 0px" })
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

export function AboutPage() {
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: "-8% 0px" })
  const credRef = useRef<HTMLUListElement>(null)
  const credInView = useInView(credRef, { once: true, margin: "-8% 0px" })

  return (
    <main className="overflow-hidden bg-bone">

      {/* ── 1. CINEMATIC INTRO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen pt-24 md:pt-0">
        <div className="mx-auto grid min-h-screen w-full max-w-none items-stretch md:grid-cols-12">

          {/* Text column */}
          <div className="flex flex-col justify-center px-8 py-20 md:col-span-5 md:px-16 lg:col-span-5 lg:px-20 xl:px-28">
            <Reveal>
              <p className="font-body inline-flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.25em] text-gold">
                <span aria-hidden className="block h-px w-10 bg-gold" />
                About
              </p>
            </Reveal>

            <Reveal delay={0.05} className="mt-8">
              <h1 className="font-display text-5xl leading-[1.05] tracking-tight text-ink md:text-6xl lg:text-7xl">
                Dr. Cynthia
                <br />
                <em className="not-italic text-gold">Higgins,</em>
                <br />
                MD
              </h1>
            </Reveal>

            <Reveal delay={0.1} className="mt-4">
              <div className="flex items-center gap-4">
                <span aria-hidden className="h-px flex-1 bg-divider" />
                <p className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-ink-muted">
                  {doctor.tagline}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="mt-8">
              <div className="border-l-2 border-gold/60 pl-5">
                <p className="font-body text-[0.72rem] uppercase tracking-[0.2em] text-gold/80">Guiding statement</p>
                <p className="font-display mt-3 text-2xl leading-[1.35] tracking-tight text-ink md:text-3xl">
                  {doctor.missionStatement}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.18} className="mt-8">
              <p className="font-body text-base leading-relaxed text-ink-muted lg:text-lg">
                {doctor.paragraphs[0]}
              </p>
            </Reveal>

            <Reveal delay={0.22} className="mt-10">
              <Button href="/book" intent="primary">
                Book a consult
              </Button>
            </Reveal>
          </div>

          {/* Portrait  fills the right 7 cols end-to-end */}
          <motion.div
            className="relative h-[60vw] md:col-span-7 md:h-auto"
            variants={scaleReveal}
            initial="hidden"
            animate="visible"
          >
            <Image
              src={doctor.portrait.src}
              alt={doctor.portrait.alt}
              fill
              priority
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover object-top"
            />
            {/* Subtle gradient fade into bone on the left edge */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-24 md:block"
              style={{ background: "linear-gradient(to right, var(--color-bone), transparent)" }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── 2. STATS STRIP ─────────────────────────────────────────────────── */}
      <section className="bg-ink py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-8 md:px-16">
          <motion.div
            ref={statsRef}
            className="grid grid-cols-2 gap-y-12 md:grid-cols-4"
            variants={staggerContainer(0.09)}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
          >
            {[
              { num: "27", label: "Years clinical practice" },
              { num: "24", label: "Years energy training" },
              { num: "2", label: "Major industry awards" },
              { num: "3", label: "Press & media features" },
            ].map(({ num, label }) => (
              <motion.div key={label} variants={fadeUp} className="border-t border-bone/10 pt-6">
                <p className="font-display text-7xl leading-none tracking-tight text-bone md:text-8xl">
                  {num}
                </p>
                <p className="font-body mt-3 text-xs uppercase tracking-[0.18em] text-bone/50">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-bone py-24 md:py-36">
        <div className="mx-auto max-w-6xl px-8 md:px-16">

          {/* Pull quote full width */}
          <Reveal className="mb-20 max-w-4xl">
            <blockquote className="font-display text-3xl leading-[1.35] tracking-tight text-ink md:text-4xl lg:text-5xl">
              <em>
                &ldquo;Her work bridges what most clinicians treat as separate worlds  quantum physics,
                biology, psychology, and spirituality  into a single practice that meets people where they
                actually live.&rdquo;
              </em>
            </blockquote>
          </Reveal>

          <div className="grid items-start gap-12 md:grid-cols-12">
            <motion.div
              className="md:col-span-6"
              variants={scaleReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-6% 0px" }}
            >
              <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl">
                <Image
                  src="/assets/images/higgins-3.png"
                  alt="Dr. Cynthia Higgins during a strategy session"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
            </motion.div>

            <div className="flex flex-col justify-center md:col-span-6 md:pt-10">
              {doctor.paragraphs.slice(1).map((p, i) => (
                <Reveal key={i} delay={i * 0.06} className={i > 0 ? "mt-6" : undefined}>
                  <p className="font-body text-base leading-relaxed text-ink-muted lg:text-lg">{p}</p>
                </Reveal>
              ))}

              {/* Floating sunflower image */}
              <Reveal delay={0.12} className="mt-10">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                  <Image
                    src="/assets/images/higgins-2.png"
                    alt="Dr. Cynthia Higgins"
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. CREDENTIALS ─────────────────────────────────────────────────── */}
      <section className="bg-surface-alt py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-8 md:px-16">
          <Reveal className="mb-14">
            <p className="font-body text-[0.65rem] uppercase tracking-[0.25em] text-gold">Training & lineage</p>
            <h2 className="font-display mt-3 text-4xl tracking-tight text-ink md:text-5xl">
              Education
            </h2>
          </Reveal>

          <motion.ul
            ref={credRef}
            variants={staggerContainer(0.08)}
            initial="hidden"
            animate={credInView ? "visible" : "hidden"}
          >
            {credentials.map((c, i) => (
              <motion.li
                key={c.title}
                variants={fadeUp}
                className="group grid grid-cols-12 items-baseline gap-4 border-t border-divider py-6 last:border-b"
              >
                <span className="font-body col-span-1 text-xs tabular-nums text-gold opacity-60 md:text-sm">
                  0{i + 1}
                </span>
                <p className="font-display col-span-7 text-xl text-ink md:text-2xl lg:text-3xl">
                  {c.title}
                </p>
                {c.detail ? (
                  <p className="font-body col-span-4 text-right text-sm text-ink-muted">{c.detail}</p>
                ) : null}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ── 5. RECOGNITION ─────────────────────────────────────────────────── */}
      <section className="bg-bone py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-8 md:px-16">
          <div className="grid items-start gap-16 md:grid-cols-12">

            {/* B&W portrait */}
            <Reveal className="md:col-span-4">
              <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl grayscale">
                <Image
                  src="/assets/images/higgins3.png"
                  alt="Dr. Cynthia Higgins"
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            {/* Awards + press */}
            <div className="md:col-span-8 md:pt-4">
              <Reveal>
                <p className="font-body text-[0.65rem] uppercase tracking-[0.25em] text-gold">Recognition</p>
                <h2 className="font-display mt-3 text-4xl tracking-tight text-ink md:text-5xl">
                  Awards &amp; press
                </h2>
              </Reveal>

              <Reveal delay={0.06} className="mt-12">
                <p className="font-body mb-5 text-[0.65rem] uppercase tracking-[0.25em] text-ink-muted">
                  Industry awards
                </p>
                <div className="space-y-4">
                  {awards.map((a) => (
                    <div key={a.title} className="flex items-center justify-between border-t border-divider pt-4">
                      <p className="font-display text-xl text-ink md:text-2xl">{a.title}</p>
                      <span className="font-body text-sm tabular-nums text-gold">{a.year}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.1} className="mt-12">
                <p className="font-body mb-5 text-[0.65rem] uppercase tracking-[0.25em] text-ink-muted">
                  As featured in
                </p>
                <div className="flex flex-wrap gap-3">
                  {press.map((p) => (
                    <Badge key={p.outlet} variant="press">
                      {p.outlet}
                    </Badge>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
