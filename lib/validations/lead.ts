import { z } from "zod"

export const leadSchema = z.object({
  email: z.string().trim().email(),
  source: z.string().trim().max(64).optional(),
  hp: z.string().max(0).optional().or(z.literal("")),
})

export type LeadInput = z.infer<typeof leadSchema>
