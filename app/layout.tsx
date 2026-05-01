import { Cormorant_Garamond, Inter } from "next/font/google"
import Script from "next/script"
import { defaultMetadata } from "config/seo"
import { env } from "config/env"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-display",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  preload: true,
})

export const metadata = defaultMetadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-body bg-bone text-ink antialiased">
        {children}
        {env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ? (
          <Script
            defer
            data-domain={env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  )
}
