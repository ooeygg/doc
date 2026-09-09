import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    ANALYZE: z
      .enum(["true", "false"])
      .optional()
      .transform((value) => value === "true"),

    SANITY_PROJECT_ID: z.string().min(1).optional(),
    SANITY_DATASET: z.string().min(1).default("production"),
    SANITY_API_VERSION: z.string().min(1).default("2024-10-01"),
    SANITY_REVALIDATE_SECRET: z.string().min(1).optional(),

    HUBSPOT_PRIVATE_APP_TOKEN: z.string().min(1).optional(),
  },
  client: {
    NEXT_PUBLIC_CALENDLY_URL: z.preprocess(
      (value) => (typeof value === "string" ? value.trim() || undefined : value),
      z
        .string()
        .url()
        .refine((value) => new URL(value).protocol === "https:", "Booking URL must use HTTPS")
        .optional()
    ),
    NEXT_PUBLIC_XPERIENCIFY_URL: z.string().url().optional(),
    NEXT_PUBLIC_HUBSPOT_PORTAL_ID: z.string().min(1).optional(),
    NEXT_PUBLIC_HUBSPOT_TRACKING_ENABLED: z
      .enum(["true", "false"])
      .default("false")
      .transform((value) => value === "true"),
  },
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,

    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.SANITY_DATASET,
    SANITY_API_VERSION: process.env.SANITY_API_VERSION,
    SANITY_REVALIDATE_SECRET: process.env.SANITY_REVALIDATE_SECRET,

    HUBSPOT_PRIVATE_APP_TOKEN: process.env.HUBSPOT_PRIVATE_APP_TOKEN,

    NEXT_PUBLIC_CALENDLY_URL: process.env.NEXT_PUBLIC_CALENDLY_URL,
    NEXT_PUBLIC_XPERIENCIFY_URL: process.env.NEXT_PUBLIC_XPERIENCIFY_URL,
    NEXT_PUBLIC_HUBSPOT_PORTAL_ID: process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID,
    NEXT_PUBLIC_HUBSPOT_TRACKING_ENABLED: process.env.NEXT_PUBLIC_HUBSPOT_TRACKING_ENABLED,
  },
  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
})
