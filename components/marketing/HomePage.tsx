import { Approach } from "components/sections/Approach"
import { CTA } from "components/sections/CTA"
import { FAQ } from "components/sections/FAQ"
import { Hero } from "components/sections/Hero"
import { Outcomes } from "components/sections/Outcomes"
import { Services } from "components/sections/Services"
import { Testimonials } from "components/sections/Testimonials"

export function HomePage() {
  return (
    <>
      <Hero />
      <Approach />
      <Services />
      <Outcomes />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  )
}
