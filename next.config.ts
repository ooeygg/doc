import withBundleAnalyzer from "@next/bundle-analyzer"
import { type NextConfig } from "next"

import { env } from "./env.mjs"

const config: NextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  rewrites: async () => [
    { source: "/healthz", destination: "/api/health" },
    { source: "/api/healthz", destination: "/api/health" },
    { source: "/health", destination: "/api/health" },
    { source: "/ping", destination: "/api/health" },
  ],
  redirects: async () => [
    {
      source: "/blog",
      destination: "/speaking-events",
      permanent: true,
    },
    {
      source: "/blog/:path*",
      destination: "/speaking-events",
      permanent: true,
    },
    {
      source: "/programs",
      destination: "https://cynthiahiggins.xperiencify.io/",
      permanent: false,
    },
  ],
}

export default env.ANALYZE ? withBundleAnalyzer({ enabled: env.ANALYZE })(config) : config
