"use client"

import Image, { getImageProps } from "next/image"
import { Button } from "components/ui/Button/Button"
import { doctor } from "content/data/doctor"

const TICKER_ITEMS = [
  "27 Years Clinical Practice",
  "Energy Psychiatrist of the Year",
  "Whole Life Integration™",
  "Energy Medicine",
  "Empowered Woman of the Year",
]

export function Hero() {
  const { props: mobilePortrait } = getImageProps({
    src: "/assets/images/higgins-hero-mobile.webp",
    alt: doctor.portrait.alt,
    width: 1123,
    height: 921,
    sizes: "100vw",
    quality: 45,
  })
  const { props: desktopPortrait } = getImageProps({
    src: doctor.portrait.src,
    alt: doctor.portrait.alt,
    fill: true,
    sizes: "58vw",
    quality: 45,
  })

  return (
    <>
      <link
        rel="preload"
        as="image"
        imageSrcSet={mobilePortrait.srcSet}
        imageSizes={mobilePortrait.sizes}
        media="(max-width: 767px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        imageSrcSet={desktopPortrait.srcSet}
        imageSizes={desktopPortrait.sizes}
        media="(min-width: 768px)"
        fetchPriority="high"
      />
      <section className="bg-bone relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-0 w-full overflow-hidden md:right-[55%] md:w-auto"
        >
          <Image
            src="/assets/images/sand-hands.png"
            alt=""
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover object-center"
            quality={60}
          />
          <div className="absolute inset-0" style={{ background: "rgba(244,243,241,0.68)" }} />
          <div
            className="absolute inset-y-0 right-0 hidden w-64 md:block"
            style={{ background: "linear-gradient(to right, transparent, var(--color-bone))" }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-32 md:hidden"
            style={{ background: "linear-gradient(to top, var(--color-bone), transparent)" }}
          />
        </div>

        {/* The hero is visible in the server HTML, without waiting for animation or hydration. */}
        <div className="relative z-10 grid min-h-[100svh] w-full md:grid-cols-12">
          <div className="relative flex flex-col justify-center px-8 pt-32 pb-20 md:col-span-5 md:px-12 md:py-0 lg:px-14 xl:px-20">
            <div>
              <div className="flex items-center gap-3">
                <span className="bg-gold h-px w-8 shrink-0" aria-hidden />
                <p className="font-body text-ink-muted text-[0.7rem] tracking-[0.22em] uppercase">{doctor.tagline}</p>
              </div>
              <div className="bg-divider mt-5 h-px" aria-hidden />
              <h1 className="font-display text-ink mt-5 text-[clamp(2rem,8vw,4rem)] tracking-tight">
                <span className="block leading-[1.06]">Growth </span>
                <span className="block leading-[1.06] text-[#8A6A20] italic">Begins </span>
                <span className="block leading-[1.06] text-[#8A6A20] italic">Here</span>
              </h1>
              <p className="font-body text-ink-muted mt-8 max-w-[26rem] text-base leading-[1.8]">
                Where psychiatry meets energy medicine: a practice for people ready to stop compartmentalizing their
                growth.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button href="/book" intent="primary" data-analytics-id="hero-book">
                  Book a consult
                </Button>
                <Button href="/about" intent="secondary" data-analytics-id="hero-about">
                  Meet Dr. Higgins
                </Button>
              </div>
            </div>
          </div>

          <div className="relative h-[82vw] overflow-hidden md:col-span-7 md:h-auto">
            <picture>
              <source media="(max-width: 767px)" srcSet={mobilePortrait.srcSet} sizes={mobilePortrait.sizes} />
              <Image
                src={doctor.portrait.src}
                alt={doctor.portrait.alt}
                fill
                loading="eager"
                fetchPriority="high"
                quality={45}
                sizes={desktopPortrait.sizes}
                className="object-cover object-top"
              />
            </picture>
            <div className="grain-texture absolute inset-0 opacity-[0.18]" aria-hidden />
            <div className="absolute inset-0" style={{ background: "rgba(17,17,17,0.18)" }} aria-hidden />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-28 md:w-64"
              style={{
                background:
                  "linear-gradient(to right, var(--color-bone) 0%, rgba(244,243,241,0.36) 50%, transparent 100%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-48 md:h-64"
              style={{ background: "linear-gradient(to top, var(--color-bone), transparent)" }}
            />

            <div className="absolute right-8 bottom-20 z-10 md:right-10 md:bottom-24">
              <div
                className="relative w-[8.5rem] overflow-hidden backdrop-blur-md"
                style={{
                  background: "rgba(11,11,11,0.78)",
                  clipPath: "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%)",
                }}
              >
                <div
                  className="absolute inset-x-0 top-0 h-px"
                  style={{ background: "linear-gradient(90deg, rgba(210,167,74,0.9), transparent)" }}
                  aria-hidden
                />
                <div className="px-6 pt-5 pb-6">
                  <p className="font-display text-bone text-[4.6rem] leading-[0.86] tracking-tight tabular-nums">27</p>
                  <div className="mt-[1.1rem] flex items-center gap-2" aria-hidden>
                    <div className="bg-gold/25 h-px flex-1" />
                    <span className="bg-gold block h-[3px] w-[3px] rounded-full" />
                  </div>
                  <div className="mt-[0.9rem]">
                    <p className="font-body text-bone/70 text-[0.47rem] leading-none tracking-[0.36em] uppercase">
                      Years of
                    </p>
                    <p className="font-body text-gold mt-[0.45rem] text-[0.66rem] leading-none tracking-[0.2em] uppercase">
                      Clinical
                    </p>
                    <p className="font-body text-bone/70 mt-[0.35rem] text-[0.44rem] leading-none tracking-[0.28em] uppercase">
                      Practice
                    </p>
                    <div className="bg-gold/30 mt-[0.75rem] h-px" aria-hidden />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 right-4 z-10 hidden -translate-y-1/2 md:block" aria-hidden>
              <span
                className="font-body text-bone/40 text-[0.6rem] tracking-[0.32em] uppercase"
                style={{ writingMode: "vertical-rl" }}
              >
                Portrait · 2025
              </span>
            </div>
          </div>
        </div>

        <div className="border-divider bg-bone overflow-hidden border-y py-[1.1rem]" aria-hidden>
          <div className="credential-marquee flex w-max gap-16 whitespace-nowrap">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span
                key={i}
                className="font-body text-ink-muted inline-flex items-center gap-16 text-[0.72rem] tracking-[0.2em] uppercase"
              >
                {item}
                <span className="text-gold">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
