import { env } from "config/env"
import { defaultMetadata } from "config/seo"
import { Inter, Playfair_Display } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const playfair = Playfair_Display({
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
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-body bg-bone text-ink antialiased">
        {/* Grain texture — very subtle film-like noise over the entire page */}
        <div
          aria-hidden
          className="grain-texture pointer-events-none fixed inset-0 z-9998 opacity-[0.028]"
        />
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
