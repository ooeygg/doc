# Work of Angels booking page

The native `/book` redesign is implemented and available locally. The scheduling provider is Calendly, as confirmed by the practice. Both booking actions use the existing `NEXT_PUBLIC_CALENDLY_URL`, currently `https://calendly.com/chiggins1806`.

Both consultation buttons say “Schedule my consultation,” open Calendly in a new tab, and use `rel="noopener noreferrer"`. Calendly collects appointment details and handles scheduling. If configuration is missing in another environment, the page displays “Request a consultation” and links to `/contact`. There is no booking form, scheduler script, or embedded appointment UI on `/book`.

## Files changed by this task

| Modified file                                                          | Change                                                                                                                                           |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| [app/(marketing)/book/page.tsx](<app/(marketing)/book/page.tsx>)       | Editorial page title and description. Preserves the concurrently introduced shared SEO helper.                                                   |
| [components/marketing/BookPage.tsx](components/marketing/BookPage.tsx) | Server-rendered page composition replaces the Calendly embed.                                                                                    |
| [components/ui/Reveal/Reveal.tsx](components/ui/Reveal/Reveal.tsx)     | Reusable, progressively enhanced reveal with the installed Motion library's small native animation entry point.                                  |
| [components/layout/Navbar.tsx](components/layout/Navbar.tsx)           | Tablet menu breakpoint, 44px menu controls, dialog description, immediately visible header, correctly sized logo, and no eager page prefetching. |
| [components/layout/Footer.tsx](components/layout/Footer.tsx)           | Stops eager prefetching of linked pages; composition and content remain intact. Import and formatting cleanup.                                   |
| [app/globals.css](app/globals.css)                                     | Imports the scoped booking stylesheet through the existing root CSS entry point.                                                                 |
| [app/layout.tsx](app/layout.tsx)                                       | References the existing SVG favicon and uses explicit HTTPS for the existing HubSpot script. Import and formatting cleanup.                      |
| [next.config.ts](next.config.ts)                                       | Enables AVIF with WebP fallback and permits image quality 60 alongside 75.                                                                       |
| [env.mjs](env.mjs)                                                     | Optional HTTPS Calendly URL validation; blank configuration becomes undefined.                                                                   |
| [.env.example](.env.example)                                           | Documents the Calendly URL variable and missing-configuration behavior.                                                                          |
| [lib/booking.ts](lib/booking.ts)                                       | Central booking destination reads validated configuration.                                                                                       |
| [e2e/book.spec.ts](e2e/book.spec.ts)                                   | Replaces the obsolete embedded-scheduler test with responsive, keyboard, reduced-motion, no-JavaScript, and external-handoff coverage.           |
| [vitest.setup.ts](vitest.setup.ts)                                     | Supplies the missing IntersectionObserver stub for jsdom. Real viewport behavior is exercised in browser tests.                                  |
| [package.json](package.json)                                           | Replaces removed `next lint` commands with ESLint CLI commands and adds a real TypeScript check script. No dependency changes.                   |

| Added file                                                                                                   | Purpose                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| [components/marketing/booking/BookingHero.tsx](components/marketing/booking/BookingHero.tsx)                 | Asymmetric headline, introductory copy, consultation CTA, and existing portrait.                                         |
| [components/marketing/booking/ConsultationMeta.tsx](components/marketing/booking/ConsultationMeta.tsx)       | Semantic description list for consultation details.                                                                      |
| [components/marketing/booking/EditorialStatement.tsx](components/marketing/booking/EditorialStatement.tsx)   | Dark editorial pause using the existing sand-and-hands photograph.                                                       |
| [components/marketing/booking/BookingSteps.tsx](components/marketing/booking/BookingSteps.tsx)               | Three numbered steps with fine rules and open spacing.                                                                   |
| [components/marketing/booking/FinalBookingSection.tsx](components/marketing/booking/FinalBookingSection.tsx) | Spacious final invitation and repeated booking action.                                                                   |
| [components/marketing/booking/BookingCTA.tsx](components/marketing/booking/BookingCTA.tsx)                   | Reuses the existing Button with secure external linking, accessible new-tab disclosure, and native navigation.                   |
| [components/marketing/booking/BookingCTA.test.tsx](components/marketing/booking/BookingCTA.test.tsx)         | Three tests for secure handoff attributes at both placements and absent booking configuration. |
| [styles/booking.css](styles/booking.css)                                                                     | Scoped editorial grid, typography, section tones, responsive layouts, focus, and restrained hover treatment.             |
| [BOOKING-REDESIGN.md](BOOKING-REDESIGN.md)                                                                   | This handoff report.                                                                                                     |

Concurrent edits to other marketing routes, SEO/site configuration, and logo assets appeared during this task. They were preserved and are not attributed to the booking redesign.

## Visual and interaction decisions

The page retains Playfair Display and Inter, bone `#F4F3F1`, alternate surface `#EFEDE9`, ink `#111111`, and gold `#D2A74A`. Italic display text uses the homepage's existing accessible amber `#8A6A20`. The existing grain, logo, navigation styling, gold pill buttons, portrait, and sand-and-hands photography establish continuity.

The hero uses a twelve-column desktop grid, oversized two-line typography, an indented copy block, and an offset portrait. Consultation information is an editorial description list. A single dark photographic statement changes the pace before the three open numbered rows. The final invitation returns to bone with a wide rule and a second CTA. There are no cards or scheduling controls.

Scroll reveals run once, moving content 24px over 0.8 seconds with the site's existing cinematic easing. They use `framer-motion/dom/mini`, without a new dependency or a full Motion component tree. The hero renders immediately. Content remains visible without JavaScript; reduced motion skips reveals, and changing that preference restores pending content. Observer, media-query, and animation cleanup are included. The booking button stays in place while its arrow moves 4px on hover; reduced motion disables this movement.

On mobile, the CTA precedes an offset landscape portrait crop. The metadata becomes a two-by-two grid, the steps use compact number-and-copy rows, and the final action spans the available width. Tablet gets a full-width headline above a copy/portrait split. The existing navigation switches to its menu below 1024px to avoid crowding. Typography and gutters scale fluidly through 1920px.

Accessibility includes one H1, ordered H2/H3 structure, named sections, a semantic ordered sequence, descriptive portrait text, decorative image exclusion, visible amber focus outlines, and 60px consultation buttons. The “What to expect” anchor has a focusable destination with space below the fixed navigation. New-tab behavior is announced in the link name. The mobile dialog supports Escape and focus return.

## Scheduling

The page no longer imports `react-calendly`, renders an iframe, or loads a scheduler script. Calendly owns availability, intake, and appointment completion at the configured external URL. No API was inspected or reconstructed.

CTA links open the configured booking destination directly, or fall back to the contact page when it is absent. Browser event tracking has been removed at the site owner’s request.

## Validation

| Check                 | Result                                                                                                                                                                                                                                                   |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TypeScript            | `pnpm typecheck` passed.                                                                                                                                                                                                                                 |
| Unit tests            | `pnpm exec vitest run`: 39 passed across ten files.                                                                                                                                                                                                      |
| Production build      | `pnpm build` passed; `/book` is statically prerendered.                                                                                                                                                                                                  |
| Changed-file lint     | ESLint 10 passed for every changed and added source/test file.                                                                                                                                                                                           |
| Repository lint       | `pnpm lint` is blocked by the existing ESLint 10 / eslint-plugin-import incompatibility (`getTokenOrCommentBefore`). A diagnostic run with the already installed ESLint 9 also found unrelated existing rule/configuration errors.                       |
| Formatting            | Prettier passed for all changed source, test, and booking CSS files.                                                                                                                                                                                     |
| Booking browser suite | 30 booking checks passed across Chromium, Firefox, and WebKit, including the configured Calendly handoff in each engine.                                                                                                                                 |
| Responsive checks     | All six widths passed in all three engines: 375, 430, 768, 1024, 1440, 1920px. Production screenshots were inspected. No horizontal overflow.                                                                                                            |
| Keyboard              | CTA focus and the in-page link passed. macOS WebKit uses Option+Tab to reach links.                                                                                                                                                                      |
| Motion                | Reduced-motion and no-JavaScript tests passed. Normal reveal completion and a runtime preference change were also checked on the production page.                                                                                                        |
| Scheduling            | No iframes or scheduler network requests. External URL/security attributes pass unit tests. The configured destination opens securely in browser tests; the real Calendly page loads with the title “Calendly - Cynthia Higgins, MD.” |
| Console               | No application runtime errors. The existing external HubSpot script is refused by the environment, so a completely clean network console cannot be claimed.                                                                                              |

Contact regression coverage now passes all 15 checks across the three browser engines in both development and the final production build. The earlier unrelated boilerplate homepage-title assertion remains outside this task. The Playwright base URL now uses `localhost`, matching the development server origin so Next.js accepts its development resources.

Production Lighthouse results, measured locally with the default mobile simulation and desktop preset:

| Metric                   | Mobile | Desktop |
| ------------------------ | ------ | ------- |
| Performance              | 87     | 100     |
| Accessibility            | 100    | 100     |
| Best practices           | 96     | 96      |
| SEO                      | 100    | 100     |
| First contentful paint   | 1.4s   | 0.4s    |
| Largest contentful paint | 4.0s   | 0.7s    |
| Total blocking time      | 10ms   | 0ms     |
| Cumulative layout shift  | 0      | 0       |

These are lab measurements, not field Core Web Vitals. Mobile LCP remains an improvement opportunity. The blocked HubSpot request affects best-practice results and means this run does not include that provider's successful runtime cost.

The page uses optimized responsive Next.js images, fixed aspect ratios, a high-priority hero image, and lazy loading for the editorial photograph. AVIF reduced the measured mobile portrait transfer from approximately 94KB to 50KB and the atmospheric image from 42KB to 19KB. Correct logo sizing and disabling automatic navigation/footer prefetch avoid unnecessary downloads. No font or dependency was added.

## Deliberate omissions

No extra sticky booking bar: the existing fixed navigation and two prominent page actions provide a clear path without obstructing mobile content. No parallax, scroll hijacking, custom cursor, video, or elaborate hero entrance: typography, photography, and pacing carry the composition while the opening remains immediately usable. No stock photography, extra font, calendar recreation, or new analytics platform was introduced.

The existing Calendly environment variable is reused. Program-specific links remain intact. The installed `react-calendly` dependency is retained to avoid unrelated lockfile changes, but it is no longer imported by the booking page and contributes no scheduler UI or JavaScript to it.

The existing Calendly URL is configured locally and returns HTTP 200. Booking handoff tests intercept the external page to verify new-tab navigation without creating an appointment. Nothing was deployed or published.

Review artifacts are in `/tmp/work-of-angels-book-review/`: `final-{width}.png`, `final-full-{width}.png`, and the final mobile/desktop Lighthouse HTML and JSON reports. The initial screenshots predate confirmation of Calendly and show the contact fallback. Updated `calendly-375.png` and `calendly-1440.png` screenshots show the active Calendly scheduling CTA.

## Contact submission repair

The contact form sends inquiries to HubSpot, independently of Calendly. Its previous contact lookup required `crm.objects.contacts.read`, which the configured token lacks. The token already has `crm.objects.contacts.write`. The corrected flow updates contacts by email using that permission, creates missing contacts, and creates the message note with its contact association in one request. A failed note save now returns a delivery error instead of success.

Modified files: `lib/hubspot.ts`, `app/api/contact/route.ts`, `components/marketing/ContactPage.tsx`, `e2e/contact.spec.ts`, and `playwright.config.ts`. Added files: `lib/hubspot.test.ts` and `app/api/contact/route.test.ts`.

The form preserves input on failed delivery, distinguishes rate limiting from connection failures, announces feedback accessibly, and resets only after confirmed delivery. Topic selection can be omitted or reset. Fields wait for the form to initialize, preventing hydration from erasing a visitor's first input or allowing an unhandled browser submission. Analytics failures cannot change a successful delivery into an error. Provider diagnostics in server logs exclude message contents and credentials.

Unit and browser tests simulate delivery; no test inquiry or appointment was created in the live services. A harmless update to a nonexistent contact confirmed HubSpot accepts the corrected endpoint with the existing token.
