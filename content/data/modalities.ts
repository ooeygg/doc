import type { Modality } from "types/content"

export const modalities: ReadonlyArray<Modality> = [
  {
    slug: "iet",
    name: "Integrated Energy Therapy",
    trademark: "registered",
    summary: "Release suppressed emotional and energetic patterns held in the body's cellular memory.",
    description:
      "Integrated Energy Therapy® uses the energy of the angelic kingdom to support gentle release of long-held cellular memory. Sessions identify where past pain, fear, or grief is stored in the energy field and clear those patterns so the body can return to a state of integrity and resourcefulness.",
  },
  {
    slug: "eft",
    name: "Emotional Freedom Techniques",
    summary: "Tap meridian points to discharge the emotional charge driving stuck patterns.",
    description:
      "EFT also known as tapping combines focused attention on a specific concern with light percussion of meridian acupressure points. The result is a measurable drop in stress, anxiety, and physiological reactivity, and a reliable way to interrupt the loops that keep you stuck.",
  },
  {
    slug: "source-tapping",
    name: "Source Tapping",
    trademark: "tm",
    summary: "An advanced tapping protocol that addresses the energetic root, not just the surface symptom.",
    description:
      "Source Tapping™ is a refinement of classical EFT that traces a presenting concern back to its energetic origin and clears it at the source. The work is precise, calm, and frequently produces shifts that traditional therapy alone has been unable to reach.",
  },
  {
    slug: "whole-life-integration",
    name: "Whole Life Integration",
    trademark: "tm",
    summary: "A signature framework that aligns body, mind, biography, and soul into a single trajectory.",
    description:
      "Whole Life Integration™ is Dr. Higgins's signature method for clients who are ready to stop compartmentalizing career, relationships, health, spirituality and live from a single, integrated center. The work weaves clinical psychiatry, energy medicine, and spiritual practice into one coherent path.",
  },
  {
    slug: "instant-miracle-mastery",
    name: "Instant Miracle Mastery",
    trademark: "tm",
    summary: "A short, focused intervention designed to produce a tangible shift in a single session.",
    description:
      "Instant Miracle Mastery™ is for moments when a single, decisive shift is what's needed. The protocol combines targeted energy work with a precise question framework so that one well-aimed session can move what years of effort have not.",
  },
] as const
