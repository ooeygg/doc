export type AnalyticsEvent =
  | "cta_click_hero"
  | "cta_click_sticky"
  | "calendly_embed_loaded"
  | "booking_started"
  | "contact_form_submitted"
  | "lead_form_submitted"
  | `program_link_click_${string}`

type EventProps = Record<string, string | number | boolean | undefined>
type PlausibleOptions = { props?: EventProps; callback?: () => void }
type QueuedEvent = [event: string, options?: PlausibleOptions]

declare global {
  interface Window {
    plausible?: ((event: string, options?: PlausibleOptions) => void) & { q?: QueuedEvent[] }
  }
}

export function track(event: AnalyticsEvent, props?: EventProps) {
  if (typeof window === "undefined") return
  // Plausible drains this standard queue when its deferred script loads.
  // Preserve early CTA clicks without putting analytics on the rendering path.
  if (!window.plausible) {
    const queue: QueuedEvent[] = []
    window.plausible = Object.assign(
      (...args: QueuedEvent) => {
        queue.push(args)
      },
      { q: queue }
    )
  }
  window.plausible(event, props ? { props } : undefined)
}
