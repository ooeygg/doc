import type { Modality } from "types/content"

export const modalities: ReadonlyArray<Modality> = [
  {
    slug: "iet",
    name: "Integrated Energy Therapy",
    trademark: "registered",
    summary: "Release suppressed emotional and energetic patterns held in the body's cellular memory.",
    description:
      "Integrated Energy Therapy® uses the energy of the angelic kingdom to support gentle release of long-held cellular memory. Sessions identify where past pain, fear, or grief is stored in the energy field and clear those patterns so the body can return to a state of integrity and resourcefulness. Participants experience a deeper connection with their Angelic helpers and a greater awareness of their work in their lives.",
  },
  {
    slug: "eft",
    name: "Emotional Freedom Techniques",
    summary: "Tap meridian points to discharge the emotional charge driving stuck patterns.",
    description:
      "EFT also known as \"tapping\" combines focused attention on a specific concern with light percussion of meridian acupressure points. The result is a measurable drop in stress, anxiety, and physiological reactivity, and a reliable way to interrupt the thought and behavioral loops that keep you stuck. It is ideal for persons who have experienced trauma, loss, or performance issues.",
  },
  {
    slug: "source-tapping",
    name: "Source Tapping",
    trademark: "tm",
    summary: "An advanced tapping protocol that addresses the energetic root, not just the surface symptom.",
    description:
      "Trained by its developer, Meryl Hershey Beck, Dr. Higgins presents Source Tapping™ as a refinement of classical EFT. It traces a presenting concern back to its energetic origin and clears it with the use of Divinity Frequencies. The work is precise, calm, and frequently produces shifts that traditional therapy alone has been unable to achieve.",
  },
  {
    slug: "whole-life-integration",
    name: "Whole Life Integration",
    trademark: "tm",
    summary: "A signature framework that aligns body, mind, biography, and soul into a single trajectory.",
    description:
      "As a student of WLI creator Jason Oliver, Dr. Higgins offers this powerful technique to address generational and personal patterns of limitation in career, relationship, and health areas. It is a synthesis of Intuitive Channeling, NLP, and revered Hawaiian healing techniques such as Huna and Ho'oponopono.",
  },
  {
    slug: "spiritual-resonance-therapy",
    name: "Spiritual Resonance Therapy",
    summary: "A holistic, energy-based modality that clears unconscious blocks and supports spiritual awareness.",
    description:
      "SRT is a holistic, energy-based modality that clears unconscious blocks preventing desired life experiences. It affects emotional release, mental clarity and physical relaxation, allowing participants the benefit of Higher Self Guidance and a deepening Spiritual Awareness.",
  },
  {
    slug: "resource-coding",
    name: "Resource Coding",
    summary: "A spiritual channeling and reconnection experience for deeper internal alignment and manifestation.",
    description:
      "A spiritual channeling and reconnection experience that operates on several levels to better align our conscious and unconscious selves, realign the heart with the intentions of the soul, reconnect our Divine masculine and feminine energies with the objects of our intended manifestation, and assist us in acceptance of our human experience as a learning and soul growth opportunity.",
  },
] as const
