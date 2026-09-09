import { test as base } from "@playwright/test"

export { expect } from "@playwright/test"

export const test = base.extend({
  context: async ({ context }, use) => {
    // Preserve the site's queue, but keep every automated test out of the live analytics property.
    await context.route("**://www.googletagmanager.com/gtag/js?*", (route) =>
      route.fulfill({ contentType: "application/javascript", body: "" })
    )
    await context.route(/^https:\/\/([^/]+\.)?google-analytics\.com\//, (route) => route.fulfill({ status: 204 }))
    await use(context)
  },
})
