import { env } from "config/env"

export const siteConfig = {
  name: "Dr. Cynthia Higgins",
  url: new URL(env.NEXT_PUBLIC_SITE_URL ?? "https://www.workofangelsllc.com").origin,
  description:
    "Energy-medicine psychiatry with Dr. Cynthia Higgins, MD at Work of Angels, LLC. Explore care that integrates body, mind, and spirit.",
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Modalities", href: "/modalities" },
    { label: "Programs", href: "/programs" },
    { label: "Speaking Events", href: "/speaking-events" },
    { label: "Book", href: "/book" },
  ],
  socials: {
    linkedin: "https://www.linkedin.com/in/cynthia-higgins-3b473a110/",
    alignable: "https://www.alignable.com/bee-ridge-fl/cynthia-higgins-md",
    youtube: "https://www.youtube.com/@cynthiahiggins1599",
    facebook: "https://www.facebook.com/CynthiaHigginsmd/",
  },
} as const
