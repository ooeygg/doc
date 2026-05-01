/**
 * Centralized motion tokens and variants.
 * Use these everywhere — never hard-code animation values in components.
 *
 * Philosophy: slow, cinematic, intentional.
 * Animate transform + opacity ONLY.
 */

import type { Transition, Variants } from "framer-motion"

// ── Duration tokens ──────────────────────────────────────────────────────────
export const dur = {
  fast: 0.25,
  base: 0.5,
  slow: 0.8,
  cinematic: 1.1,
} as const

// ── Easing tokens ────────────────────────────────────────────────────────────
export const ease = {
  /** Smooth deceleration — default for reveals */
  out: [0.25, 0.46, 0.45, 0.94] as const,
  /** Fast start, smooth end — for hero / cinematic entrances */
  expo: [0.16, 1, 0.3, 1] as const,
  /** Balanced in-out */
  inOut: [0.76, 0, 0.24, 1] as const,
} as const

// ── Shared transitions ───────────────────────────────────────────────────────
export const trans = {
  fast: { duration: dur.fast, ease: ease.out } satisfies Transition,
  base: { duration: dur.base, ease: ease.out } satisfies Transition,
  slow: { duration: dur.slow, ease: ease.expo } satisfies Transition,
  cinematic: { duration: dur.cinematic, ease: ease.expo } satisfies Transition,
  spring: { type: "spring", stiffness: 55, damping: 22 } satisfies Transition,
  springFast: { type: "spring", stiffness: 120, damping: 18 } satisfies Transition,
} as const

// ── Variants ─────────────────────────────────────────────────────────────────

/** Simple upward fade — for general scroll reveals */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: dur.slow, ease: ease.expo },
  },
}

/** Fade only — no movement */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: dur.slow, ease: ease.out } },
}

/** Subtle scale-in — for cards and images */
export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: dur.cinematic, ease: ease.expo },
  },
}

/** Stagger container — wrap around lists of children */
export const staggerContainer = (staggerDelay = 0.1, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
})

/** Hero headline — large entrance */
export const heroText: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: dur.cinematic, ease: ease.expo },
  },
}

/** Hero stagger wrapper — staggers heroText children */
export const heroStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.25 },
  },
}

/** Slide in from left — for decorative lines / eyebrows */
export const slideRight: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: dur.slow, ease: ease.expo },
  },
}

/**
 * Reduced-motion safe fallback.
 * Wrap variants with this when rendering inside a `useReducedMotion` check.
 */
export const noMotion: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
}
