import { Reveal } from "components/ui/Reveal/Reveal"
import { Section } from "components/ui/Section/Section"
import { faq } from "content/data/faq"

export function FAQ() {
  return (
    <Section id="faq" eyebrow="Frequently asked" heading="Questions, answered." surface="bone">
      <Reveal>
        <div className="border-divider divide-divider divide-y border-y">
          {faq.map((entry, index) => (
            <details key={entry.question} name="homepage-faq" className="group py-2">
              <summary
                data-analytics-id={`faq-${index + 1}`}
                className="focus-visible:ring-gold flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none [&::-webkit-details-marker]:hidden"
              >
                <h3 className="font-display text-2xl">{entry.question}</h3>
                <span
                  aria-hidden
                  className="border-divider text-gold flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="font-body pr-10 pb-6 text-base leading-relaxed opacity-80">{entry.answer}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
