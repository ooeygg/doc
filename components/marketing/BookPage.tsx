"use client"

import { useEffect, useState } from "react"
import { InlineWidget } from "react-calendly"
import { Section } from "components/ui/Section/Section"
import { env } from "config/env"
import { track } from "lib/analytics"

export function BookPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    track("calendly_embed_loaded")
  }, [])

  return (
    <Section eyebrow="Book" heading="Schedule your consult" surface="bone">
      <p className="font-body max-w-2xl text-lg leading-relaxed opacity-80">
        A 30-minute conversation to share what brought you here, hear how Dr. Higgins works, and decide together whether
        continuing makes sense.
      </p>
      <div className="bg-mist-100 mt-12 overflow-hidden rounded-3xl">
        {mounted && env.NEXT_PUBLIC_CALENDLY_URL ? (
          <InlineWidget
            url={env.NEXT_PUBLIC_CALENDLY_URL}
            styles={{ height: "780px" }}
            pageSettings={{
              backgroundColor: "f7f3ec",
              primaryColor: "0f3a2e",
              textColor: "14201c",
              hideEventTypeDetails: false,
              hideLandingPageDetails: false,
            }}
          />
        ) : (
          <div className="h-[780px]" aria-hidden />
        )}
      </div>
    </Section>
  )
}
