"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { startInteractionTracking } from "lib/interactionTracking"

export function BehaviorAnalytics() {
  const pathname = usePathname()
  useEffect(() => startInteractionTracking(pathname), [pathname])
  return null
}
