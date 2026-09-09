export const siteConfig = {
  name: "Dr. Cynthia Higgins",
  // Keep canonical and sharing URLs on the public domain, including in preview deployments.
  url: "https://www.workofangelsllc.com",
  googleAnalyticsId: "G-9G0FZQF6PT",
  description:
    "Energy-medicine psychiatry with Dr. Cynthia Higgins, MD at Work of Angels, LLC. Explore care that integrates body, mind, and spirit.",
  office: {
    name: "Sarasota Chiropractic Clinic",
    address: {
      streetAddress: "2801 Fruitville Rd, #180",
      addressLocality: "Sarasota",
      addressRegion: "FL",
      postalCode: "34237",
      addressCountry: "US",
    },
  },
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
