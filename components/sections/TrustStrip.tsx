import { trustStripPoints } from "content/data/credentials"

export function TrustStrip() {
  return (
    <section className="bg-ink text-bone">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 py-6 text-center">
        {trustStripPoints.map((point, i) => (
          <span key={point} className="font-body inline-flex items-center gap-6 text-sm tracking-wide">
            {point}
            {i < trustStripPoints.length - 1 ? <span aria-hidden className="text-gold-500">·</span> : null}
          </span>
        ))}
      </div>
    </section>
  )
}
