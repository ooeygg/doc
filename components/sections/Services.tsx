import Image from "next/image"
import Link from "next/link"
import { Reveal } from "components/ui/Reveal/Reveal"
import { awards, press } from "content/data/credentials"
import { modalities } from "content/data/modalities"
function trademarkSuffix(t?: "tm" | "registered") {
  if (t === "registered") return "®"
  if (t === "tm") return "™"
  return ""
}

export function Services() {
  const marqueeItems = [...awards.map((a) => `${a.title} ${a.year}`), ...press.map((p) => p.outlet)]

  return (
    <section className="relative overflow-hidden">
      {/* Decorative background stays independent of JavaScript. */}
      <div className="absolute inset-0 scale-115" aria-hidden>
        <Image
          src="/assets/images/sand-feet.png"
          alt=""
          fill
          sizes="100vw"
          quality={60}
          className="object-cover object-center"
        />
      </div>

      {/* primary dark overlay */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(17,17,17,0.87) 0%, rgba(17,17,17,0.94) 28%, rgba(17,17,17,0.94) 72%, rgba(17,17,17,0.87) 100%)",
        }}
      />
      {/* warm edge vignette */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(17,17,17,0.4) 100%)",
        }}
      />

      {/* ── CONTENT ──────────────────────────────────────── */}
      <div className="relative z-10 py-28 md:py-40 lg:py-52">
        <div className="mx-auto max-w-6xl px-8 md:px-12 lg:px-16">
          {/* ── ACT II: MODALITIES LIST ───────────────────── */}
          <div>
            {modalities.map((m, i) => (
              <Reveal key={m.slug} className="relative">
                <div className="bg-gold pointer-events-none absolute top-0 left-0 h-px origin-left" aria-hidden />
                <Link href={`/modalities#${m.slug}`} prefetch={false} className="group focus-visible:outline-none">
                  <div className="group-hover:border-gold/25 group-focus-visible:ring-gold grid grid-cols-12 items-baseline gap-4 border-t border-white/10 py-7 transition-colors duration-300 group-focus-visible:ring-2 group-focus-visible:ring-offset-2 last:border-b last:border-white/10">
                    <span className="font-body text-gold/80 col-span-1 text-xs tabular-nums">0{i + 1}</span>
                    <h3 className="font-display text-bone group-hover:text-gold col-span-11 text-xl transition-colors duration-300 md:col-span-4 md:text-2xl lg:text-3xl">
                      {m.name}
                      {trademarkSuffix(m.trademark)}
                    </h3>
                    <p className="font-body text-bone/55 col-span-11 col-start-2 text-sm leading-relaxed md:col-span-6 md:col-start-6 md:text-base">
                      {m.summary}
                    </p>
                    <span
                      className="font-body text-gold col-span-1 text-right text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden
                    >
                      →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── CODA: MARQUEE STRIP ────────────────────────── */}
        <div className="mt-20 overflow-hidden border-y border-white/10 py-5 md:mt-28" aria-hidden>
          <div className="credential-marquee flex w-max gap-16 whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="font-display text-bone/70 inline-flex items-center gap-16 text-xl md:text-2xl">
                {item}
                <span className="text-gold text-sm">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
