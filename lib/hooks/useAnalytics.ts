"use client"

export function useAnalytics() {
  return { track: (_event: string, _props?: Record<string, unknown>) => {} }
}
