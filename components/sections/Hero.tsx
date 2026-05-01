"use client"

import { Button } from "components/ui/Button/Button"
import { doctor } from "content/data/doctor"
import { track } from "lib/analytics"
import Image from "next/image"

export function Hero() {
  return (
    <section className="bg-bone text-ink relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-body text-xs uppercase tracking-widest text-gold-500">{doctor.tagline}</p>
          <h1 className="font-display mt-6 text-5xl leading-tight tracking-tight md:text-6xl lg:text-7xl">
            Let's Make This Happen
          </h1>
          <p className="font-body mt-8 max-w-xl text-lg leading-relaxed opacity-80">
            Where psychiatry meets energy medicine. A practice for people who are ready to stop compartmentalizing their
            healing and integrate body, mind, biography, and spirit into a single trajectory.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/book" intent="primary" onClick={() => track("cta_click_hero", { target: "/book" })}>
              Book a consult
            </Button>
            <Button href="/about" intent="secondary">
              Meet Dr. Higgins
            </Button>
          </div>
        </div>
        <div className="relative md:col-span-5">
          <div className="bg-mist-100 ring-gold-500/30 relative aspect-[4/5] w-full overflow-hidden rounded-3xl ring-1">
            <Image
              src={doctor.portrait.src}
              alt={doctor.portrait.alt}
              fill
              priority
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
