"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Input } from "components/ui/Input/Input"
import { Section } from "components/ui/Section/Section"
import { Select } from "components/ui/Select/Select"
import { Textarea } from "components/ui/Textarea/Textarea"
import { siteConfig } from "config/site"
import { type ContactInput, contactSchema, contactTopics } from "lib/validations/contact"

const TOPIC_OPTIONS = [
  { value: "consult", label: "Booking a consult" },
  { value: "programs", label: "Programs & group work" },
  { value: "media", label: "Media or speaking" },
  { value: "other", label: "Something else" },
] as const

type Status = "idle" | "submitting" | "success" | "error"

export function ContactPage() {
  const [status, setStatus] = useState<Status>("idle")
  const [submitError, setSubmitError] = useState("")
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isReady },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", topic: undefined, message: "", hp: "" },
  })

  const topicValue = watch("topic")

  async function onSubmit(values: ContactInput) {
    setStatus("submitting")
    setSubmitError("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      const result = (await res.json().catch(() => null)) as { ok?: boolean } | null
      if (!res.ok || result?.ok !== true) {
        setSubmitError(
          res.status === 429
            ? "You've sent several messages recently. Please wait an hour before trying again."
            : res.status === 400
              ? "Please check your details and try again. Your message is still here."
              : "We couldn't deliver your message. Your details are still here; please try again shortly."
        )
        setStatus("error")
        return
      }
    } catch {
      setSubmitError(
        "We couldn't confirm delivery. Please check your connection before trying again. Your message is still here."
      )
      setStatus("error")
      return
    }

    setStatus("success")
    reset()
  }

  return (
    <Section eyebrow="Contact" heading="Reach out" surface="bone">
      <div className="grid items-start gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-body text-lg leading-relaxed">
            For new-client inquiries, the fastest path is the booking page. For everything else programs, media,
            partnerships use this form and we'll be in touch within two business days.
          </p>
          <div className="mt-8">
            <h2 className="font-display text-2xl">Office location</h2>
            <address className="font-body mt-3 text-base leading-relaxed not-italic">
              Located in {siteConfig.office.name}
              <br />
              {siteConfig.office.address.streetAddress}
              <br />
              {siteConfig.office.address.addressLocality}, {siteConfig.office.address.addressRegion}{" "}
              {siteConfig.office.address.postalCode}
            </address>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-6 md:col-span-7"
          aria-busy={!isReady || status === "submitting"}
          noValidate
        >
          {/* Wait for form registration so hydration cannot erase the visitor's first input. */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-name" className="font-body text-sm font-medium">
                Name
              </label>
              <Input
                id="contact-name"
                {...register("name")}
                disabled={!isReady}
                aria-invalid={errors.name ? "true" : undefined}
                className="bg-surface"
              />
              {errors.name ? <p className="font-body text-error text-xs">{errors.name.message}</p> : null}
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-email" className="font-body text-sm font-medium">
                Email
              </label>
              <Input
                id="contact-email"
                type="email"
                {...register("email")}
                disabled={!isReady}
                aria-invalid={errors.email ? "true" : undefined}
                className="bg-surface"
              />
              {errors.email ? <p className="font-body text-error text-xs">{errors.email.message}</p> : null}
            </div>
          </div>

          <Select
            label="What's this about?"
            options={TOPIC_OPTIONS}
            disabled={!isReady}
            value={topicValue ?? ""}
            onValueChange={(v) =>
              setValue("topic", v ? (v as (typeof contactTopics)[number]) : undefined, { shouldValidate: true })
            }
            error={errors.topic?.message}
          />

          <Textarea label="Message" {...register("message")} disabled={!isReady} error={errors.message?.message} />

          <input type="text" {...register("hp")} className="hidden" tabIndex={-1} aria-hidden autoComplete="off" />

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={!isReady || status === "submitting"}
              className="font-body bg-gold btn-gradient text-ink hover:enabled:bg-gold-hover inline-flex h-12 items-center rounded-full px-7 text-base font-medium shadow-[0_2px_12px_rgba(210,167,74,0.25)] transition-[transform,box-shadow,background-color] duration-200 hover:enabled:-translate-y-px disabled:opacity-50"
            >
              {status === "submitting" ? "Sending…" : "Send message"}
            </button>
            {status === "success" ? (
              <p role="status" className="font-body text-ink text-sm">
                Thank you. Your message has been sent.
              </p>
            ) : status === "error" ? (
              <p role="alert" className="font-body text-ink-muted text-sm">
                {submitError}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </Section>
  )
}
