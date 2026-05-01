import { z } from "zod"

export const contactTopics = ["consult", "programs", "media", "other"] as const

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Please enter a valid email"),
  topic: z.enum(contactTopics).optional(),
  message: z.string().trim().min(10, "A few sentences help us reply well").max(4000),
  // Honeypot — must be empty for legitimate submissions
  hp: z.string().max(0).optional().or(z.literal("")),
})

export type ContactInput = z.infer<typeof contactSchema>
