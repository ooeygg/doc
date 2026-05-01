"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Input } from "components/ui/Input/Input"
import { Section } from "components/ui/Section/Section"
import { Select } from "components/ui/Select/Select"
import { Textarea } from "components/ui/Textarea/Textarea"
import { track } from "lib/analytics"
import { contactSchema, contactTopics, type ContactInput } from "lib/validations/contact"

const TOPIC_OPTIONS = [
  { value: "consult", label: "Booking a consult" },
  { value: "programs", label: "Programs & group work" },
  { value: "media", label: "Media or speaking" },
  { value: "other", label: "Something else" },
] as const

type Status = "idle" | "submitting" | "success" | "error"

export function ContactPage() {
  const [status, setStatus] = useState<Status>("idle")
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", topic: undefined, message: "", hp: "" },
  })

  const topicValue = watch("topic")

  async function onSubmit(values: ContactInput) {
    setStatus("submitting")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error()
      setStatus("success")
      track("contact_form_submitted")
      reset()
    } catch {
      setStatus("error")
    }
  }

  return (
    <Section eyebrow="Contact" heading="Reach out" surface="bone">
      <div className="grid items-start gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-body text-lg leading-relaxed">
            For new-client inquiries, the fastest path is the booking page. For everything else — programs, media,
            partnerships — use this form and we'll be in touch within two business days.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="md:col-span-7 grid gap-6" noValidate>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-name" className="font-body text-sm font-medium">
                Name
              </label>
              <Input
                id="contact-name"
                {...register("name")}
                aria-invalid={errors.name ? "true" : undefined}
                className="bg-bone"
              />
              {errors.name ? (
                <p className="font-body text-rose-300 text-xs">{errors.name.message}</p>
              ) : null}
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-email" className="font-body text-sm font-medium">
                Email
              </label>
              <Input
                id="contact-email"
                type="email"
                {...register("email")}
                aria-invalid={errors.email ? "true" : undefined}
                className="bg-bone"
              />
              {errors.email ? (
                <p className="font-body text-rose-300 text-xs">{errors.email.message}</p>
              ) : null}
            </div>
          </div>

          <Select
            label="What's this about?"
            options={TOPIC_OPTIONS}
            value={topicValue}
            onValueChange={(v) => setValue("topic", v as (typeof contactTopics)[number])}
          />

          <Textarea label="Message" {...register("message")} error={errors.message?.message} />

          <input type="text" {...register("hp")} className="hidden" tabIndex={-1} aria-hidden autoComplete="off" />

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="font-body inline-flex h-12 items-center rounded-xl bg-jade-900 px-6 text-base font-medium text-bone hover:enabled:bg-jade-600 disabled:opacity-50"
            >
              {status === "submitting" ? "Sending…" : "Send message"}
            </button>
            {status === "success" ? (
              <p className="font-body text-sm text-jade-600">Thank you — we'll be in touch shortly.</p>
            ) : status === "error" ? (
              <p className="font-body text-rose-300 text-sm">Something went wrong. Please try again.</p>
            ) : null}
          </div>
        </form>
      </div>
    </Section>
  )
}
