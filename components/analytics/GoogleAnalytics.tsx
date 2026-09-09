import Script from "next/script"
import { siteConfig } from "config/site"

export function GoogleAnalytics() {
  const measurementId = siteConfig.googleAnalyticsId

  return (
    <>
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', ${JSON.stringify(measurementId)});
        `}
      </Script>
      <Script
        id="google-analytics-tag"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
        async
      />
    </>
  )
}
