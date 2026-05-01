import Image from "next/image"
import { Button } from "components/ui/Button/Button"
import { Section } from "components/ui/Section/Section"
import { doctor } from "content/data/doctor"

export function AboutPreview() {
  const [first, second] = doctor.paragraphs
  return (
    <Section surface="bone" eyebrow="About" heading="Meet Dr. Higgins">
      <div className="grid items-center gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="bg-mist-100 relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
            <Image
              src={doctor.portrait.src}
              alt={doctor.portrait.alt}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="md:col-span-7">
          <p className="font-body text-lg leading-relaxed">{first}</p>
          {second ? <p className="font-body mt-4 text-base leading-relaxed opacity-80">{second}</p> : null}
          <div className="mt-8">
            <Button href="/about" intent="secondary">
              Read full bio
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}
