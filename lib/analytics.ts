import { siteConfig } from "config/site"

export type FormId = "contact" | "newsletter"
export type FieldId = "name" | "email" | "topic" | "message"
export type FormOutcome = "success" | "validation_error" | "server_error" | "network_error" | "rate_limited"
export type AnalyticsEvent =
  | "ui_click"
  | "scroll_depth"
  | "page_time"
  | "field_focus"
  | "field_edit"
  | "field_complete"
  | "field_change"
  | "form_begin"
  | "form_attempt"
  | "form_result"
  | "form_abandon"

export interface AnalyticsParameters {
  element_id?: string
  element_type?: string
  section_id?: string
  link_target?: string
  link_kind?: "internal" | "external" | "email" | "phone" | "other"
  form_id?: FormId
  field_id?: FieldId
  field_type?: string
  has_value?: boolean
  outcome?: FormOutcome
  invalid_field_count?: number
  percent_scrolled?: number
  active_time_ms?: number
  total_active_time_ms?: number
  reason?: "heartbeat" | "hidden" | "blur" | "leave"
  touched_fields?: number
  completed_fields?: number
}

const PARAMETER_KEYS = [
  "element_id",
  "element_type",
  "section_id",
  "link_target",
  "link_kind",
  "form_id",
  "field_id",
  "field_type",
  "has_value",
  "outcome",
  "invalid_field_count",
  "percent_scrolled",
  "active_time_ms",
  "total_active_time_ms",
  "reason",
  "touched_fields",
  "completed_fields",
] as const

const PUBLIC_PATHS = new Set([
  "/",
  "/about",
  "/services",
  "/modalities",
  "/programs",
  "/book",
  "/contact",
  "/speaking-events",
  "/pricing",
  "/legal/privacy",
  "/legal/terms",
  "/legal/disclaimer",
])

export function analyticsPath(path: string) {
  const pathname = path.split(/[?#]/, 1)[0]?.replace(/\/$/, "") || "/"
  return PUBLIC_PATHS.has(pathname) ? pathname : "/other"
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export const FORM_RESULT_EVENT = "site:form-result"
export const FIELD_CHANGE_EVENT = "site:field-change"

// Only structured interaction metadata belongs here. Never pass field values, DOM text, or full URLs.
export function trackEvent(event: AnalyticsEvent, parameters: AnalyticsParameters = {}, path?: string) {
  if (typeof window === "undefined") return
  try {
    const safeParameters: Record<string, string | number | boolean> = {}
    for (const key of PARAMETER_KEYS) {
      const value = parameters[key]
      if (typeof value === "boolean" || (typeof value === "number" && Number.isFinite(value))) {
        safeParameters[key] = value
      } else if (typeof value === "string") {
        safeParameters[key] = value.slice(0, 100)
      }
    }
    const pagePath = analyticsPath(path ?? window.location.pathname)
    const command = [
      "event",
      event,
      {
        ...safeParameters,
        page_path: pagePath,
        page_location: new URL(pagePath, siteConfig.url).toString(),
        send_to: siteConfig.googleAnalyticsId,
      },
    ]
    if (window.gtag) window.gtag(...command)
    else {
      function queueCommand() {
        window.dataLayer ??= []
        // Google expects an Arguments object here; an Array is interpreted as a data-layer method call.
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments)
      }
      Reflect.apply(queueCommand, undefined, command)
    }
  } catch {
    // Analytics must never interrupt navigation or a successfully delivered form.
  }
}

export function reportFormResult(form: FormId, outcome: FormOutcome, invalidFields = 0, path?: string) {
  trackEvent("form_result", { form_id: form, outcome, invalid_field_count: invalidFields }, path)
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(FORM_RESULT_EVENT, { detail: { form, outcome } }))
  }
}

export function reportFieldChange(form: FormId, field: FieldId, hasValue: boolean) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(FIELD_CHANGE_EVENT, { detail: { form, field, hasValue } }))
  }
}
