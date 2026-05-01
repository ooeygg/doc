import { Quote } from "components/ui/Quote/Quote"
import { Section } from "components/ui/Section/Section"
import { getFeaturedTestimonials } from "lib/sanity/queries"

export async function Testimonials() {
  const testimonials = await getFeaturedTestimonials().catch(() => [])

  if (!testimonials.length) {
    return null
  }

  return (
    <Section eyebrow="Voices" heading="What clients say" surface="mist">
      <div className="grid gap-12 md:grid-cols-3">
        {testimonials.slice(0, 3).map((t) => (
          <Quote key={t._id} quote={t.quote} attribution={t.attribution} context={t.context} />
        ))}
      </div>
    </Section>
  )
}
