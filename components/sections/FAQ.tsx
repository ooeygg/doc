"use client"

import * as Accordion from "@radix-ui/react-accordion"
import { Section } from "components/ui/Section/Section"
import { faq } from "content/data/faq"
import { motion, useInView } from "framer-motion"
import { fadeUp, staggerContainer } from "lib/motion"
import { useRef } from "react"

export function FAQ() {
  const listRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(listRef, { once: true, margin: "-8% 0px" })

  return (
    <Section id="faq" eyebrow="Frequently asked" heading="Questions, answered." surface="bone">
      <motion.div
        ref={listRef}
        variants={staggerContainer(0.07)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <Accordion.Root type="single" collapsible className="border-divider divide-divider divide-y border-y">
          {faq.map((entry, i) => (
            <motion.div key={i} variants={fadeUp}>
              <Accordion.Item value={`item-${i}`} className="py-2">
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2">
                    <span className="font-display text-2xl">{entry.question}</span>
                    <span
                      aria-hidden
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-divider text-gold transition-transform duration-300 group-data-[state=open]:rotate-45"
                    >
                      +
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <p className="font-body pb-6 pr-10 text-base leading-relaxed opacity-80">{entry.answer}</p>
                </Accordion.Content>
              </Accordion.Item>
            </motion.div>
          ))}
        </Accordion.Root>
      </motion.div>
    </Section>
  )
}