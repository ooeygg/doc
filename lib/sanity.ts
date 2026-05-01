import { createClient } from "next-sanity"
import { env } from "config/env"

export const sanityClient = env.SANITY_PROJECT_ID
  ? createClient({
      projectId: env.SANITY_PROJECT_ID,
      dataset: env.SANITY_DATASET ?? "production",
      apiVersion: env.SANITY_API_VERSION ?? "2024-10-01",
      useCdn: true,
    })
  : null
