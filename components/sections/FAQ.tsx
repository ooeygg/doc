"use client"

import * as Accordion from "@radix-ui/react-accordion"
import { Section } from "components/ui/Section/Section"
import { faq } from "content/data/faq"

export function FAQ() {
  return (
    <Section id="faq" eyebrow="Frequently asked" heading="Questions, answered." surface="bone">
      <Accordion.Root type="single" collapsible className="border-mist-100 divide-mist-100 divide-y border-y">
        {faq.map((entry, i) => (
          <Accordion.Item key={i} value={`item-${i}`} className="py-2">
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade-600 focus-visible:ring-offset-2">
                <span className="font-display text-2xl">{entry.question}</span>
                <span aria-hidden className="text-gold-500 transition-transform group-data-[state=open]:rotate-45">
                  +
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="font-body text-base leading-relaxed opacity-80">
              <p className="pb-6 pr-10">{entry.answer}</p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </Section>
  )
}
