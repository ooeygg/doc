import Image from "next/image"
import { twMerge } from "tailwind-merge"

export interface QuoteProps {
  quote: string
  attribution: string
  context?: string
  avatarSrc?: string
  className?: string
}

export function Quote({ quote, attribution, context, avatarSrc, className }: QuoteProps) {
  return (
    <figure className={twMerge("relative flex flex-col gap-6", className)}>
      <span aria-hidden className="font-display text-gold -mb-6 text-7xl leading-none">
        &ldquo;
      </span>
      <blockquote className="font-display text-2xl leading-snug md:text-3xl">{quote}</blockquote>
      <figcaption className="flex items-center gap-3">
        {avatarSrc ? (
          <Image
            src={avatarSrc}
            alt=""
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        ) : null}
        <div className="flex flex-col">
          <span className="font-body text-sm font-medium">{attribution}</span>
          {context ? <span className="font-body text-xs opacity-70">{context}</span> : null}
        </div>
      </figcaption>
    </figure>
  )
}
