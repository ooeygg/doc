"use client"

import { useCallback } from "react"
import { track, type AnalyticsEvent } from "lib/analytics"

export function useAnalytics() {
  const fire = useCallback(<E extends AnalyticsEvent>(event: E, props?: Record<string, string | number | boolean | undefined>) => {
    track(event, props)
  }, [])
  return { track: fire }
}
