import type { FAQEntry } from "types/content"

export const faq: ReadonlyArray<FAQEntry> = [
  {
    question: "Do you accept insurance?",
    answer:
      "This is a private-pay practice. A superbill is available on request that you can submit to your insurer for potential out-of-network reimbursement. Working privately keeps the focus on your care rather than on what a coding system will or will not authorize.",
  },
  {
    question: "Are sessions virtual or in person?",
    answer:
      "Most clients work with Dr. Higgins virtually over a secure video platform. In-person sessions are available on a limited basis. Virtual sessions are clinically equivalent for the modalities used here, and they make it possible to hold continuity through travel and life transitions.",
  },
  {
    question: "Is this medical care or spiritual work?",
    answer:
      "It is both, fully integrated. Dr. Higgins is a board-certified psychiatrist with 27 years of clinical practice; she is also trained in energy medicine and contemplative spiritual practice. Sessions move between the two as the work calls for it — never one or the other in isolation.",
  },
  {
    question: "How long does the work take?",
    answer:
      "Most clients begin to feel real shifts within the first three to six sessions. Deeper integration unfolds over months. Dr. Higgins will be honest with you about scope at the outset, and the cadence is designed around your life, not a fixed program.",
  },
  {
    question: "What does a first session look like?",
    answer:
      "The first session is a structured conversation. You share what brought you here, what you've already tried, and what 'better' would actually look like. By the end, you'll leave with an initial map of the work and a clear sense of whether continuing makes sense for both of us.",
  },
  {
    question: "How do I get started?",
    answer:
      "Book a consult through the Book page. You'll receive a confirmation and a short intake form. From there, the first session is scheduled and you'll receive the secure video link. There's no long onboarding — most clients are in their first real session within a week.",
  },
] as const
