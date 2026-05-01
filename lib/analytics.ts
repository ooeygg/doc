export type AnalyticsEvent =
  | "cta_click_hero"
  | "cta_click_sticky"
  | "calendly_embed_loaded"
  | "contact_form_submitted"
  | "lead_form_submitted"
  | `program_link_click_${string}`

type EventProps = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: EventProps; callback?: () => void }) => void
  }
}

export function track(event: AnalyticsEvent, props?: EventProps) {
  if (typeof window === "undefined") return
  window.plausible?.(event, props ? { props } : undefined)
}
