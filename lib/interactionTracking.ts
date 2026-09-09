import {
  type AnalyticsParameters,
  analyticsPath,
  FIELD_CHANGE_EVENT,
  type FieldId,
  FORM_RESULT_EVENT,
  type FormId,
  type FormOutcome,
  trackEvent,
} from "lib/analytics"

const CLICK_TARGETS =
  'a[href],button,summary,[role="button"],[role="tab"],[role="menuitem"],[role="combobox"],[data-analytics-field]'
const FIELD_TARGETS = "[data-analytics-field]"
const IGNORE_TARGETS = "[data-analytics-ignore],[hidden],[inert]"
const DEPTHS = [10, 25, 50, 75, 90, 100]
const FIELDS: Record<FormId, readonly FieldId[]> = {
  contact: ["name", "email", "topic", "message"],
  newsletter: ["email"],
}

interface FormState {
  touched: Set<FieldId>
  edited: Set<FieldId>
  completed: Set<FieldId>
  success: boolean
  abandoned: boolean
}

function token(value: string | null | undefined) {
  return value && /^[a-z][a-z0-9_-]{0,63}$/i.test(value) ? value : undefined
}

function formId(element: Element): FormId | undefined {
  const id = element.closest("form[data-analytics-form]")?.getAttribute("data-analytics-form")
  return id === "contact" || id === "newsletter" ? id : undefined
}

function fieldInfo(target: EventTarget | null) {
  if (!(target instanceof Element) || target.closest(IGNORE_TARGETS)) return
  const element = target.closest<HTMLElement>(FIELD_TARGETS)
  if (!element || element.matches(':disabled,[aria-hidden="true"],input[type="hidden"],input[type="password"]')) return
  const form = formId(element)
  const field = element.getAttribute("data-analytics-field") as FieldId
  if (!form || !FIELDS[form].includes(field)) return
  const type =
    element instanceof HTMLInputElement ? element.type : element.tagName === "TEXTAREA" ? "textarea" : "select"
  // Values are inspected only for empty/nonempty state and never leave this function.
  const hasValue =
    element instanceof HTMLInputElement
      ? element.type === "checkbox" || element.type === "radio"
        ? element.checked
        : element.value.length > 0
      : element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement
        ? element.value.length > 0
        : element.getAttribute("data-analytics-filled") === "true"
  return { form, field, type, hasValue }
}

function linkInfo(element: Element): AnalyticsParameters {
  if (!(element instanceof HTMLAnchorElement)) return {}
  try {
    const url = new URL(element.href, window.location.href)
    if (url.protocol === "mailto:") return { link_kind: "email", link_target: "email" }
    if (url.protocol === "tel:") return { link_kind: "phone", link_target: "phone" }
    if (!/^https?:$/.test(url.protocol)) return { link_kind: "other" }
    const internal = url.origin === window.location.origin
    return {
      link_kind: internal ? "internal" : "external",
      link_target: internal ? analyticsPath(url.pathname) : url.hostname,
    }
  } catch {
    return { link_kind: "other" }
  }
}

export function startInteractionTracking(pathname: string) {
  if (/^\/(dashboard|login|signup|forgot-password)(\/|$)/.test(pathname)) return () => {}
  const path = analyticsPath(pathname)
  const forms = new Map<FormId, FormState>()
  const depths = new Set<number>()
  let scrollFrame = 0
  let pendingTime = 0
  let totalTime = 0
  let activeSince: number | undefined
  let leaving = false

  const active = () => !leaving && document.visibilityState === "visible" && document.hasFocus()
  const resumeTime = () => {
    if (active() && activeSince === undefined) activeSince = performance.now()
  }
  const flushTime = (reason: NonNullable<AnalyticsParameters["reason"]>) => {
    if (activeSince !== undefined) {
      const elapsed = Math.max(0, performance.now() - activeSince)
      pendingTime += elapsed
      totalTime += elapsed
      activeSince = undefined
    }
    if (pendingTime >= 1000) {
      trackEvent(
        "page_time",
        { active_time_ms: Math.round(pendingTime), total_active_time_ms: Math.round(totalTime), reason },
        path
      )
      pendingTime = 0
    }
    resumeTime()
  }

  const beginForm = (form: FormId) => {
    let state = forms.get(form)
    if (!state || state.success) {
      state = { touched: new Set(), edited: new Set(), completed: new Set(), success: false, abandoned: false }
      forms.set(form, state)
      trackEvent("form_begin", { form_id: form }, path)
    }
    state.abandoned = false
    return state
  }

  const onClick = (event: MouseEvent) => {
    if (!(event.target instanceof Element) || event.target.closest(IGNORE_TARGETS)) return
    const element = event.target.closest(CLICK_TARGETS)
    if (!element || element.matches(':disabled,[aria-disabled="true"],input[type="password"],input[type="hidden"]'))
      return
    const region = element.closest("[data-analytics-section],section,header,footer,main") ?? document.body
    const section =
      token(region.getAttribute("data-analytics-section")) ??
      token(region.id) ??
      `${region.tagName.toLowerCase()}-${Array.from(document.querySelectorAll(region.tagName)).indexOf(region) + 1}`
    const ordinal = Array.from(region.querySelectorAll(CLICK_TARGETS)).indexOf(element) + 1
    trackEvent(
      "ui_click",
      {
        element_id: token(element.getAttribute("data-analytics-id")) ?? `${element.tagName.toLowerCase()}-${ordinal}`,
        element_type: element.getAttribute("role") ?? element.tagName.toLowerCase(),
        section_id: section,
        ...linkInfo(element),
      },
      path
    )
  }

  const onFocus = (event: Event) => {
    const info = fieldInfo(event.target)
    if (!info) return
    const state = beginForm(info.form)
    if (state.touched.has(info.field)) return
    state.touched.add(info.field)
    trackEvent("field_focus", { form_id: info.form, field_id: info.field, field_type: info.type }, path)
  }
  const onInput = (event: Event) => {
    const info = fieldInfo(event.target)
    if (!info) return
    const state = beginForm(info.form)
    state.touched.add(info.field)
    if (info.hasValue) state.completed.add(info.field)
    else state.completed.delete(info.field)
    if (state.edited.has(info.field)) return
    state.edited.add(info.field)
    trackEvent("field_edit", { form_id: info.form, field_id: info.field, field_type: info.type }, path)
  }
  const onBlur = (event: FocusEvent) => {
    const info = fieldInfo(event.target)
    if (!info || !forms.get(info.form)?.touched.has(info.field)) return
    trackEvent(
      "field_complete",
      { form_id: info.form, field_id: info.field, field_type: info.type, has_value: info.hasValue },
      path
    )
  }
  const onFieldChange = (event: Event) => {
    const { form, field, hasValue } = (event as CustomEvent<{ form: FormId; field: FieldId; hasValue: boolean }>).detail
    if (!FIELDS[form]?.includes(field) || typeof hasValue !== "boolean") return
    const state = beginForm(form)
    state.touched.add(field)
    state.edited.add(field)
    if (hasValue) state.completed.add(field)
    else state.completed.delete(field)
    trackEvent("field_change", { form_id: form, field_id: field, field_type: "select", has_value: hasValue }, path)
  }
  const onSubmit = (event: Event) => {
    if (!(event.target instanceof HTMLFormElement)) return
    const form = formId(event.target)
    if (!form) return
    const state = beginForm(form)
    trackEvent(
      "form_attempt",
      { form_id: form, touched_fields: state.touched.size, completed_fields: state.completed.size },
      path
    )
  }
  const onInvalid = (event: Event) => {
    const info = fieldInfo(event.target)
    if (!info) return
    beginForm(info.form)
    trackEvent("form_result", { form_id: info.form, field_id: info.field, outcome: "validation_error" }, path)
  }
  const onResult = (event: Event) => {
    const { form, outcome } = (event as CustomEvent<{ form: FormId; outcome: FormOutcome }>).detail
    const state = forms.get(form)
    if (state) state.success = outcome === "success"
  }

  const measureScroll = () => {
    scrollFrame = 0
    const height = document.documentElement.scrollHeight
    if (height <= window.innerHeight || window.scrollY <= 0) return
    const percent = Math.min(100, Math.floor(((window.scrollY + window.innerHeight + 2) / height) * 100))
    for (const depth of DEPTHS) {
      if (percent >= depth && !depths.has(depth)) {
        depths.add(depth)
        trackEvent("scroll_depth", { percent_scrolled: depth }, path)
      }
    }
  }
  const onScroll = () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(measureScroll)
  }
  const onVisibility = () => flushTime(document.visibilityState === "hidden" ? "hidden" : "heartbeat")
  const onWindowBlur = () => {
    flushTime("blur")
    activeSince = undefined
  }
  const onLeave = () => {
    leaving = true
    flushTime("leave")
    for (const [form, state] of forms) {
      if (state.success || state.abandoned) continue
      state.abandoned = true
      trackEvent(
        "form_abandon",
        { form_id: form, touched_fields: state.touched.size, completed_fields: state.completed.size },
        path
      )
    }
  }
  const onReturn = () => {
    leaving = false
    resumeTime()
  }

  document.addEventListener("click", onClick, true)
  document.addEventListener("focusin", onFocus)
  // Custom selects can prevent native focus while opening their popup.
  document.addEventListener("pointerdown", onFocus, true)
  document.addEventListener("focusout", onBlur)
  document.addEventListener("input", onInput)
  document.addEventListener("change", onInput)
  document.addEventListener("submit", onSubmit, true)
  document.addEventListener("invalid", onInvalid, true)
  document.addEventListener("visibilitychange", onVisibility)
  window.addEventListener(FIELD_CHANGE_EVENT, onFieldChange)
  window.addEventListener(FORM_RESULT_EVENT, onResult)
  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("focus", resumeTime)
  window.addEventListener("blur", onWindowBlur)
  window.addEventListener("pagehide", onLeave)
  window.addEventListener("pageshow", onReturn)
  const timer = window.setInterval(() => flushTime("heartbeat"), 30_000)
  resumeTime()

  return () => {
    onLeave()
    window.clearInterval(timer)
    cancelAnimationFrame(scrollFrame)
    document.removeEventListener("click", onClick, true)
    document.removeEventListener("focusin", onFocus)
    document.removeEventListener("pointerdown", onFocus, true)
    document.removeEventListener("focusout", onBlur)
    document.removeEventListener("input", onInput)
    document.removeEventListener("change", onInput)
    document.removeEventListener("submit", onSubmit, true)
    document.removeEventListener("invalid", onInvalid, true)
    document.removeEventListener("visibilitychange", onVisibility)
    window.removeEventListener(FIELD_CHANGE_EVENT, onFieldChange)
    window.removeEventListener(FORM_RESULT_EVENT, onResult)
    window.removeEventListener("scroll", onScroll)
    window.removeEventListener("focus", resumeTime)
    window.removeEventListener("blur", onWindowBlur)
    window.removeEventListener("pagehide", onLeave)
    window.removeEventListener("pageshow", onReturn)
  }
}
