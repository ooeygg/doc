# Dr. Higgins Phase 1 Build Tickets

Project key: **DRH** · Source plan: `/Users/michaelyenny/.claude/plans/ancient-juggling-mochi.md`

Priority: **P0** = launch-blocking, **P1** = launch-recommended, **P2** = post-launch nice-to-have.

---

## Epics

| Key | Title | Status |
| --- | --- | --- |
| DRH-1 | Marketing Site Phase 1 Launch (master epic) | In Progress |
| DRH-2 | Foundations: design tokens, fonts, config | Done |
| DRH-3 | UI primitive library expansion | Done |
| DRH-4 | Content data layer (typed, non-CMS) | Done |
| DRH-5 | Global layout chrome | Done |
| DRH-6 | Homepage composition | Done |
| DRH-7 | Marketing pages | Done |
| DRH-8 | Sanity CMS (blog + testimonials) | Done (assets-only Studio config lives outside this repo) |
| DRH-9 | API routes & transactional email | Done |
| DRH-10 | SEO & PWA surface | Done (icons/OG image still need asset files in `public/`) |
| DRH-11 | Analytics | Done |
| DRH-12 | QA & launch readiness | Partially Done (unit + e2e + stories shipped; Lighthouse audit deferred to staging) |

---

## DRH-2 Epic: Foundations

### DRH-13 Add brand color tokens to `styles/variables.css` ✅
**Type:** Task · **Parent:** DRH-2 · **Estimate:** S · **Priority:** P0 · **Labels:** design-system, css · **Status:** Done

**Description**
Replace the empty `:root {}` with the jade/bone/gold luxury-medical palette defined in the plan (§3). Avoids "wellness teal" cliché.

**Acceptance criteria**
- [x] `--color-bone`, `--color-ink`, `--color-jade-900`, `--color-jade-600`, `--color-gold-500`, `--color-mist-100`, `--color-rose-300` defined.
- [x] `--font-display` and `--font-body` variables declared (values bound by DRH-15).
- [x] Tailwind defaults for grays retained (no overrides in `:root`).

**Files**
- `styles/variables.css`

---

### DRH-14 Bind tokens via `@theme` in `styles/tailwind.css` ✅
**Type:** Task · **Parent:** DRH-2 · **Estimate:** S · **Priority:** P0 · **Labels:** design-system, tailwind · **Status:** Done

**Description**
Tailwind v4 reads tokens from `@theme`. Bind the CSS variables from DRH-13 so utilities like `bg-jade-900`, `text-bone`, `font-display`, `font-body` resolve.

**Acceptance criteria**
- [x] `@theme { ... }` block adds color + font keys mapped to the new vars.
- [x] `bg-jade-900`, `text-ink`, `bg-bone`, `border-gold-500`, `font-display`, `font-body` all compile in a smoke test page.
- [x] Existing border-color compatibility layer left untouched.

**Files**
- `styles/tailwind.css`

**Depends on:** DRH-13

---

### DRH-15 Load Cormorant Garamond + Inter via `next/font` ✅
**Type:** Task · **Parent:** DRH-2 · **Estimate:** S · **Priority:** P0 · **Labels:** typography · **Status:** Done

**Description**
Load fonts in `app/layout.tsx` using `next/font/google` with `display: 'swap'`. Expose CSS variables consumed by `@theme` (DRH-14).

**Acceptance criteria**
- [x] Cormorant Garamond loaded as display, Inter as body.
- [x] Font CSS vars (`--font-display`, `--font-body`) attached to `<html>`.
- [x] No flash of unstyled text in dev. Body weight preloaded.

**Files**
- `app/layout.tsx`

**Depends on:** DRH-14

---

### DRH-16 Real `siteConfig` (nav, brand, urls) ✅
**Type:** Task · **Parent:** DRH-2 · **Estimate:** XS · **Priority:** P0 · **Labels:** config · **Status:** Done

**Description**
Update `config/site.ts` with the final marketing nav. Drop `/pricing` from nav, add `/book`. Set production URL and a real description.

**Acceptance criteria**
- [x] `name`, `url`, `description` reflect Dr. Higgins's brand.
- [x] Nav array: Home, About, Services, Modalities, Programs, Blog, Book.
- [x] Type stays `as const`.

**Files**
- `config/site.ts`

---

### DRH-17 Real SEO defaults in `config/seo.ts` ✅
**Type:** Task · **Parent:** DRH-2 · **Estimate:** XS · **Priority:** P0 · **Labels:** seo · **Status:** Done

**Description**
Replace placeholder description, add proper OG image fallback (referencing the OG route from DRH-50), set Twitter handle if known.

**Acceptance criteria**
- [x] `description` is real marketing copy (≤160 chars).
- [x] `openGraph.images` defaults to `/api/og/default` (or static fallback until DRH-50 lands).
- [x] No regression on existing `metadataBase` URL pattern.

**Files**
- `config/seo.ts`

**Depends on:** DRH-16

---

### DRH-18 Extend `env.mjs` with Resend / Sanity / Calendly / Xperiencify ✅
**Type:** Task · **Parent:** DRH-2 · **Estimate:** S · **Priority:** P0 · **Labels:** config, env · **Status:** Done

**Description**
Add validated env vars per plan §6. Server: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL`, `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_VERSION`, `SANITY_REVALIDATE_SECRET`. Client: `NEXT_PUBLIC_CALENDLY_URL`, `NEXT_PUBLIC_XPERIENCIFY_URL`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.

**Acceptance criteria**
- [x] All vars present with correct zod schemas + defaults.
- [x] `runtimeEnv` map updated.
- [x] `pnpm build` fails loudly if any required var is missing.
- [x] `.env.example` (new) checked in with placeholders.

**Files**
- `env.mjs`
- `.env.example` (new)

---

## DRH-3 Epic: UI primitive library

### DRH-19 Repalettize `Button` (jade primary, gold accent) ✅
**Type:** Task · **Parent:** DRH-3 · **Estimate:** S · **Priority:** P0 · **Labels:** design-system · **Status:** Done

**Description**
The boilerplate `Button` is hard-coded blue. Extend `cva` variants to `intent: "primary" | "secondary" | "ghost" | "gold"` using the new tokens. Highest-leverage visual upgrade.

**Acceptance criteria**
- [x] `intent="primary"` = filled jade with bone text.
- [x] `intent="secondary"` = transparent jade outline.
- [x] `intent="ghost"` = no border, jade text, hover bone bg.
- [x] `intent="gold"` = gold fill, ink text used sparingly for hero CTA.
- [x] Existing `size`, `underline`, `href` props still work.
- [x] `Button.test.tsx` updated to cover new intents.
- [x] Storybook story updated.

**Files**
- `components/ui/Button/Button.tsx`
- `components/ui/Button/Button.test.tsx`
- `components/ui/Button/Button.stories.tsx`

**Depends on:** DRH-14

---

### DRH-20 Extend `Card` with `surface` variants ✅
**Type:** Task · **Parent:** DRH-3 · **Estimate:** XS · **Priority:** P1 · **Labels:** design-system · **Status:** Done

**Acceptance criteria**
- [x] `surface: "bone" | "mist" | "ink"` variant added via cva.
- [x] Optional `accent: "gold"` adds a 1px gold hairline border.
- [x] Existing default render unchanged.

**Files**
- `components/ui/Card/Card.tsx`

**Depends on:** DRH-14

---

### DRH-21 New primitive: `Section` ✅
**Type:** Task · **Parent:** DRH-3 · **Estimate:** S · **Priority:** P0 · **Labels:** design-system · **Status:** Done

**Description**
Wraps `<section>` with consistent vertical rhythm (`py-24 md:py-32 lg:py-40`) and an optional eyebrow + heading slot. Replaces every ad-hoc `<section className="py-16">` in the existing stubs.

**Acceptance criteria**
- [x] Props: `eyebrow?`, `heading?`, `surface?: "bone" | "mist" | "ink"`, `className?`.
- [x] Renders semantic `<section>` with `aria-labelledby` if heading provided.
- [x] Storybook + render test.

**Files**
- `components/ui/Section/Section.tsx` (new)
- `components/ui/Section/Section.test.tsx` (new)
- `components/ui/Section/Section.stories.tsx` (new)

---

### DRH-22 New primitive: `Eyebrow` ✅
**Type:** Task · **Parent:** DRH-3 · **Estimate:** XS · **Priority:** P0 · **Labels:** design-system · **Status:** Done

**Acceptance criteria**
- [x] Small uppercase label, tracking-widest, gold by default, ink/mist variants.
- [x] Used by `Section` (DRH-21) when `eyebrow` prop set.

**Files**
- `components/ui/Eyebrow/Eyebrow.tsx` (new)

---

### DRH-23 New primitive: `Badge` ✅
**Type:** Task · **Parent:** DRH-3 · **Estimate:** XS · **Priority:** P1 · **Labels:** design-system · **Status:** Done

**Acceptance criteria**
- [x] Variants: `accolade` (gold border, ink text), `press` (mist bg), `category` (jade bg, bone text).
- [x] Used in Proof and Blog surfaces.

**Files**
- `components/ui/Badge/Badge.tsx` (new)

---

### DRH-24 New primitive: `Quote` ✅
**Type:** Task · **Parent:** DRH-3 · **Estimate:** S · **Priority:** P0 · **Labels:** design-system · **Status:** Done

**Acceptance criteria**
- [x] Props: `quote`, `attribution`, `context?`, `avatarSrc?`.
- [x] Renders blockquote with display-font open quote glyph.
- [x] Used by Testimonials section (DRH-37).

**Files**
- `components/ui/Quote/Quote.tsx` (new)

---

### DRH-25 New primitives: `Textarea` + `Select` ✅
**Type:** Task · **Parent:** DRH-3 · **Estimate:** S · **Priority:** P1 · **Labels:** design-system, forms · **Status:** Done

**Description**
Form primitives needed by Contact form (DRH-52). `Select` uses `@radix-ui/react-select` (already installed).

**Acceptance criteria**
- [x] Both expose the same `className` + label/error API as `Input`.
- [x] Keyboard accessible; focus ring uses jade-600.

**Files**
- `components/ui/Textarea/Textarea.tsx` (new)
- `components/ui/Select/Select.tsx` (new)

---

## DRH-4 Epic: Content data layer

### DRH-26 Define content types in `types/content.ts` ✅
**Type:** Task · **Parent:** DRH-4 · **Estimate:** S · **Priority:** P0 · **Labels:** types · **Status:** Done

**Acceptance criteria**
- [x] Types: `Modality`, `Credential`, `PressFeature`, `Award`, `FAQEntry`, `Program`, `DoctorBio`.
- [x] Each is `readonly`-friendly so `as const` data files satisfy them.

**Files**
- `types/content.ts` (new)

---

### DRH-27 Author `content/data/modalities.ts` ✅
**Type:** Task · **Parent:** DRH-4 · **Estimate:** S · **Priority:** P0 · **Labels:** content · **Status:** Done

**Description**
IET®, EFT, Source Tapping™, Whole Life Integration™, Instant Miracle Mastery™. Each gets summary + long description + slug for `/modalities#anchor`.

**Acceptance criteria**
- [x] 5 modalities defined, all matching `Modality` type.
- [x] Trademarks rendered correctly (™/®).
- [x] Used by Services section (DRH-32) and ModalitiesPage (DRH-43).

**Files**
- `content/data/modalities.ts` (new)

**Depends on:** DRH-26

---

### DRH-28 Author `content/data/credentials.ts` ✅
**Type:** Task · **Parent:** DRH-4 · **Estimate:** S · **Priority:** P0 · **Labels:** content · **Status:** Done

**Acceptance criteria**
- [x] Bachelor's in Molecular Biology, MD (USF Morsani), 27 yrs psychiatry, 24 yrs spiritual training.
- [x] Awards: Energy Psychiatrist of the Year 2019, Empowered Woman 2022.
- [x] Press: CUTV, Inner View, MysticMag.

**Files**
- `content/data/credentials.ts` (new)

**Depends on:** DRH-26

---

### DRH-29 Author `content/data/faq.ts` ✅
**Type:** Task · **Parent:** DRH-4 · **Estimate:** S · **Priority:** P0 · **Labels:** content, copy · **Status:** Done

**Description**
Six entries minimum: insurance, virtual vs in-person, "is this medical or spiritual," length of work, what a first session looks like, how to start.

**Acceptance criteria**
- [x] Copy reviewed for tone (calm/intelligent, not woo).
- [x] Each entry has `question`, `answer` (string or rich blocks).

**Files**
- `content/data/faq.ts` (new)

**Depends on:** DRH-26

---

### DRH-30 Author `content/data/programs.ts` ✅
**Type:** Task · **Parent:** DRH-4 · **Estimate:** XS · **Priority:** P1 · **Labels:** content · **Status:** Done

**Acceptance criteria**
- [x] Each program has `xperiencifyUrl` deep-linking to `cynthiahiggins.xperiencify.io`.
- [x] Cards include `title`, `description`, optional `durationWeeks`, `priceTier`.

**Files**
- `content/data/programs.ts` (new)

**Depends on:** DRH-26

---

### DRH-31 Author `content/data/doctor.ts` ✅
**Type:** Task · **Parent:** DRH-4 · **Estimate:** XS · **Priority:** P0 · **Labels:** content, copy · **Status:** Done

**Acceptance criteria**
- [x] Bio paragraphs from the brief, supplied as placeholder summary copy.
- [x] Portrait import path defined (asset to be supplied).

**Files**
- `content/data/doctor.ts` (new)

**Depends on:** DRH-26

---

## DRH-5 Epic: Global layout chrome

### DRH-32 Build `Navbar` (sticky, transparent → solid, mobile drawer) ✅
**Type:** Story · **Parent:** DRH-5 · **Estimate:** M · **Priority:** P0 · **Labels:** frontend, layout · **Status:** Done

**Acceptance criteria**
- [x] Reads nav from `siteConfig`.
- [x] Sticky; transparent over hero, solid bone after scroll > 80px.
- [x] Mobile drawer via `@radix-ui/react-dialog`.
- [x] Primary CTA "Book a consult" pinned right.
- [x] Active route gets jade underline.
- [x] Keyboard accessible; focus ring visible.

**Files**
- `components/layout/Navbar.tsx`

**Depends on:** DRH-16, DRH-19

---

### DRH-33 Build `Footer` (4-col + lead capture) ✅
**Type:** Story · **Parent:** DRH-5 · **Estimate:** M · **Priority:** P0 · **Labels:** frontend, layout · **Status:** Done

**Acceptance criteria**
- [x] Columns: Brand, Modalities, Resources, Legal.
- [x] Inline lead-capture form posting to `/api/lead` (DRH-62).
- [ ] Social links (when supplied placeholder).

**Files**
- `components/layout/Footer.tsx`

**Depends on:** DRH-16, DRH-49

---

## DRH-6 Epic: Homepage

### DRH-34 Section: `Hero` ✅
**Type:** Task · **Parent:** DRH-6 · **Estimate:** M · **Priority:** P0 · **Labels:** sections · **Status:** Done

**Acceptance criteria**
- [x] H1: "Let's Make This Happen" (display font).
- [x] Subhead from brief, verbatim.
- [x] Doctor portrait via `next/image`, `priority`, explicit `sizes`.
- [x] Primary CTA → `/book`, secondary CTA → `/about`.

**Files**
- `components/sections/Hero.tsx`

**Depends on:** DRH-19, DRH-21, DRH-31

---

### DRH-35 Section: `TrustStrip` (new) ✅
**Type:** Task · **Parent:** DRH-6 · **Estimate:** S · **Priority:** P0 · **Labels:** sections · **Status:** Done

**Acceptance criteria**
- [x] One-line strip immediately under hero: "MD · Psychiatrist · 27 years · Energy Psychiatrist of the Year 2019".
- [x] Renders from `credentials.ts` data.

**Files**
- `components/sections/TrustStrip.tsx` (new)

**Depends on:** DRH-28

---

### DRH-36 Section: `Approach` (new 4 pillars) ✅
**Type:** Task · **Parent:** DRH-6 · **Estimate:** S · **Priority:** P0 · **Labels:** sections · **Status:** Done

**Acceptance criteria**
- [x] 4-card grid: Quantum Physics, Biology, Psychology, Spirituality.
- [x] Eyebrow "Approach"; heading from copy.

**Files**
- `components/sections/Approach.tsx` (new)

**Depends on:** DRH-21, DRH-22

---

### DRH-37 Section: `Services` (modality cards) ✅
**Type:** Task · **Parent:** DRH-6 · **Estimate:** S · **Priority:** P0 · **Labels:** sections · **Status:** Done

**Acceptance criteria**
- [x] Renders modality cards from `content/data/modalities.ts`.
- [x] Each card links to `/modalities#<slug>`.

**Files**
- `components/sections/Services.tsx`

**Depends on:** DRH-20, DRH-27

---

### DRH-38 Section: `AboutPreview` (new) ✅
**Type:** Task · **Parent:** DRH-6 · **Estimate:** S · **Priority:** P0 · **Labels:** sections · **Status:** Done

**Acceptance criteria**
- [x] Portrait + bio excerpt + CTA → `/about`.
- [x] 12-col grid layout on md+.

**Files**
- `components/sections/AboutPreview.tsx` (new)

**Depends on:** DRH-31

---

### DRH-39 Section: `Outcomes` (new Heal · Grow · Attract) ✅
**Type:** Task · **Parent:** DRH-6 · **Estimate:** S · **Priority:** P0 · **Labels:** sections · **Status:** Done

**Acceptance criteria**
- [x] 3-column layout, one promise sentence each.
- [x] Final CTA at bottom of section.

**Files**
- `components/sections/Outcomes.tsx` (new)

---

### DRH-40 Section: `Proof` (accolades + press) ✅
**Type:** Task · **Parent:** DRH-6 · **Estimate:** S · **Priority:** P0 · **Labels:** sections · **Status:** Done

**Acceptance criteria**
- [x] Award badges (gold) + press logo strip.
- [x] Renders from `credentials.ts`.

**Files**
- `components/sections/Proof.tsx`

**Depends on:** DRH-23, DRH-28

---

### DRH-41 Section: `Testimonials` (Sanity-driven) ✅
**Type:** Task · **Parent:** DRH-6 · **Estimate:** M · **Priority:** P0 · **Labels:** sections, cms · **Status:** Done

**Acceptance criteria**
- [x] Fetches `getFeaturedTestimonials()` from Sanity.
- [x] Renders 3 `Quote` components.
- [x] Graceful empty state if no featured testimonials (returns `null`).

**Files**
- `components/sections/Testimonials.tsx`

**Depends on:** DRH-24, DRH-44, DRH-46

---

### DRH-42 Section: `FAQ` (Radix Accordion) ✅
**Type:** Task · **Parent:** DRH-6 · **Estimate:** S · **Priority:** P0 · **Labels:** sections, a11y · **Status:** Done

**Acceptance criteria**
- [x] Uses `@radix-ui/react-accordion`.
- [x] Renders from `content/data/faq.ts`.
- [x] Keyboard accessible (Radix gives this for free).

**Files**
- `components/sections/FAQ.tsx`

**Depends on:** DRH-29

---

### DRH-43 Section: `CTA` (final call-to-book) ✅
**Type:** Task · **Parent:** DRH-6 · **Estimate:** XS · **Priority:** P0 · **Labels:** sections · **Status:** Done

**Acceptance criteria**
- [x] Headline: "Start Your Healing Journey".
- [x] Single high-contrast gold CTA → `/book`.
- [x] Surface = ink (dark) for emphasis.

**Files**
- `components/sections/CTA.tsx`

---

### DRH-44 Compose `HomePage` ✅
**Type:** Story · **Parent:** DRH-6 · **Estimate:** S · **Priority:** P0 · **Labels:** marketing · **Status:** Done

**Description**
Replace the boilerplate "Next.js Enterprise" content with the section composition from plan §2.

**Acceptance criteria**
- [x] Order: Hero → TrustStrip → Approach → Services → AboutPreview → Outcomes → Proof → Testimonials → FAQ → CTA.
- [x] No JSX in `app/(marketing)/page.tsx` beyond `<HomePage />` + `metadata`.

**Files**
- `components/marketing/HomePage.tsx`
- `app/(marketing)/page.tsx`

**Depends on:** DRH-34 → DRH-43

---

## DRH-7 Epic: Marketing pages

### DRH-45 `AboutPage` (full bio + accolades + portrait) ✅
**Type:** Story · **Parent:** DRH-7 · **Estimate:** M · **Priority:** P0 · **Labels:** marketing · **Status:** Done

**Files**
- `components/marketing/AboutPage.tsx`
- `app/(marketing)/about/page.tsx`

**Depends on:** DRH-28, DRH-31

---

### DRH-46 `ServicesPage` ✅
**Type:** Story · **Parent:** DRH-7 · **Estimate:** M · **Priority:** P0 · **Labels:** marketing · **Status:** Done

**Acceptance criteria**
- [x] Lists traditional + alternative offerings.
- [x] "What a session looks like" walkthrough.
- [x] CTA → `/book` and `/modalities`.

**Files**
- `components/marketing/ServicesPage.tsx`
- `app/(marketing)/services/page.tsx`

---

### DRH-47 `ModalitiesPage` (new route `/modalities`) ✅
**Type:** Story · **Parent:** DRH-7 · **Estimate:** M · **Priority:** P0 · **Labels:** marketing, seo · **Status:** Done

**Acceptance criteria**
- [x] New route `app/(marketing)/modalities/page.tsx`.
- [x] One anchor per modality from `content/data/modalities.ts`.
- [x] Per-modality JSON-LD `MedicalProcedure` for SEO.

**Files**
- `components/marketing/ModalitiesPage.tsx` (new)
- `app/(marketing)/modalities/page.tsx` (new)

**Depends on:** DRH-27

---

### DRH-48 `ProgramsPage` (Xperiencify deep-links) ✅
**Type:** Story · **Parent:** DRH-7 · **Estimate:** S · **Priority:** P1 · **Labels:** marketing · **Status:** Done

**Files**
- `components/marketing/ProgramsPage.tsx`
- `app/(marketing)/programs/page.tsx`

**Depends on:** DRH-30

---

### DRH-49 `BookPage` (Calendly inline embed) ✅
**Type:** Story · **Parent:** DRH-7 · **Estimate:** S · **Priority:** P0 · **Labels:** marketing, conversion · **Status:** Done

**Description**
Single, focused conversion page. Lazily inject Calendly script. Reads URL from `NEXT_PUBLIC_CALENDLY_URL`.

**Acceptance criteria**
- [x] Inline embed via `react-calendly`'s `InlineWidget`.
- [x] Calendly script not loaded on any other route (component is `"use client"` and only rendered on `/book`).
- [x] Page loads with reserved height to prevent CLS.
- [x] Tracks `calendly_embed_loaded` analytics event.

**Files**
- `components/marketing/BookPage.tsx` (new)
- `app/(marketing)/book/page.tsx` (new)

**Depends on:** DRH-18

---

### DRH-50 `ContactPage` (Resend-backed form) ✅
**Type:** Story · **Parent:** DRH-7 · **Estimate:** M · **Priority:** P0 · **Labels:** marketing, forms · **Status:** Done

**Acceptance criteria**
- [x] `react-hook-form` + zod resolver, schema imported from `lib/validations/contact.ts`.
- [x] Submits to `/api/contact` (DRH-61).
- [x] Success / error inline states.
- [x] Honeypot field hidden via `className="hidden"`.

**Files**
- `components/marketing/ContactPage.tsx` (new)
- `app/(marketing)/contact/page.tsx`

**Depends on:** DRH-25, DRH-58

---

### DRH-51 Drop `/pricing` from nav, add safe redirect ✅
**Type:** Task · **Parent:** DRH-7 · **Estimate:** XS · **Priority:** P1 · **Labels:** routing · **Status:** Done

**Acceptance criteria**
- [x] `pricing` removed from `siteConfig.nav`.
- [x] `app/(marketing)/pricing/page.tsx` redirects to `/services` via `redirect()`.
- [x] Existing inbound links don't 404.

**Files**
- `config/site.ts`
- `app/(marketing)/pricing/page.tsx`

**Depends on:** DRH-16

---

### DRH-52 Legal pages: `/legal/{privacy,terms,disclaimer}` ✅
**Type:** Story · **Parent:** DRH-7 · **Estimate:** S · **Priority:** P0 · **Labels:** marketing, legal · **Status:** Done (placeholder copy needs counsel review)

**Acceptance criteria**
- [x] Three new routes with prose-width `Container` variant.
- [ ] Medical disclaimer reviewed by stakeholder before launch.
- [x] Linked from `Footer`.

**Files**
- `app/(marketing)/legal/privacy/page.tsx` (new)
- `app/(marketing)/legal/terms/page.tsx` (new)
- `app/(marketing)/legal/disclaimer/page.tsx` (new)

---

## DRH-8 Epic: Sanity CMS

### DRH-53 Wire `sanityClient` ✅
**Type:** Task · **Parent:** DRH-8 · **Estimate:** S · **Priority:** P0 · **Labels:** cms · **Status:** Done

**Acceptance criteria**
- [x] `lib/sanity.ts` exports a typed client using env vars from DRH-18.
- [x] Uses `next-sanity` v12 `createClient` so fetches participate in tag-based revalidation via `next.tags`.

**Files**
- `lib/sanity.ts`

**Depends on:** DRH-18

---

### DRH-54 Sanity schemas: `post`, `author`, `category` ✅
**Type:** Task · **Parent:** DRH-8 · **Estimate:** M · **Priority:** P0 · **Labels:** cms, schemas · **Status:** Done (assets-only Studio deploy is a separate manual step)

**Acceptance criteria**
- [x] Schemas under `lib/sanity/schemas/` as plain objects (no `sanity` runtime dep).
- [x] Portable Text body supports `block`, `image`, `callout`, `quote`, `ctaBlock`.
- [ ] Deployed to hosted Sanity Studio at `sanity.io/manage` (out of scope for this repo).

**Files**
- `lib/sanity/schemas/post.ts` (new)
- `lib/sanity/schemas/author.ts` (new)
- `lib/sanity/schemas/category.ts` (new)
- `lib/sanity/schemas/index.ts` (new)

---

### DRH-55 Sanity schema: `testimonial` ✅
**Type:** Task · **Parent:** DRH-8 · **Estimate:** XS · **Priority:** P0 · **Labels:** cms, schemas · **Status:** Done

**Acceptance criteria**
- [x] Fields: quote, attribution, context?, rating?, featured (bool), publishedAt.

**Files**
- `lib/sanity/schemas/testimonial.ts` (new)

**Depends on:** DRH-54

---

### DRH-56 GROQ query helpers + image URL builder ✅
**Type:** Task · **Parent:** DRH-8 · **Estimate:** S · **Priority:** P0 · **Labels:** cms · **Status:** Done

**Acceptance criteria**
- [x] `getAllPosts()`, `getPostBySlug()`, `getFeaturedTestimonials()`, `getAllTestimonials()`.
- [x] All queries use `next.tags` so the revalidate webhook can target them.
- [x] `urlFor(image)` exposed via `@sanity/image-url`.

**Files**
- `lib/sanity/queries.ts` (new)
- `lib/sanity/image.ts` (new)
- `types/cms.ts`

**Depends on:** DRH-53, DRH-54, DRH-55

---

### DRH-57 Wire blog routes ✅
**Type:** Story · **Parent:** DRH-8 · **Estimate:** M · **Priority:** P0 · **Labels:** cms, marketing · **Status:** Done

**Acceptance criteria**
- [x] `/blog` index lists posts (cover, excerpt, category).
- [x] `/blog/[slug]` renders Portable Text with the design system.
- [x] Each post page exports `generateMetadata` with OG image from `/api/og/blog/<slug>`.
- [x] Reusable "Work with Dr. Higgins" card under every post.

**Files**
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`

**Depends on:** DRH-56

---

### DRH-58 Revalidate webhook route ✅
**Type:** Task · **Parent:** DRH-8 · **Estimate:** S · **Priority:** P0 · **Labels:** cms, api · **Status:** Done (route shipped; Sanity-side webhook config is a manual one-time step)

**Acceptance criteria**
- [x] `POST /api/revalidate` validates `Authorization: Bearer ${SANITY_REVALIDATE_SECRET}`.
- [x] Calls `revalidateTag('posts')` or `'testimonials'` based on payload `_type`.
- [ ] Webhook configured in Sanity to fire on publish/unpublish (manual setup at sanity.io/manage).

**Files**
- `app/api/revalidate/route.ts` (new)

**Depends on:** DRH-18

---

## DRH-9 Epic: API & email

### DRH-59 Install runtime deps ✅
**Type:** Task · **Parent:** DRH-9 · **Estimate:** XS · **Priority:** P0 · **Labels:** deps · **Status:** Done

**Description**
`pnpm add resend react-email @react-email/components react-hook-form @hookform/resolvers framer-motion react-calendly`.

**Acceptance criteria**
- [x] Lockfile updated.
- [x] Pre-existing peer-dep warnings (Storybook 8.6 vs 10.3, vite/plugin-react) noted and unrelated to this scope. Downgraded `@vitejs/plugin-react` to `^5` to unblock the test runner.

**Files**
- `package.json`, `pnpm-lock.yaml`

---

### DRH-60 Validation schema for contact form ✅
**Type:** Task · **Parent:** DRH-9 · **Estimate:** XS · **Priority:** P0 · **Labels:** validation · **Status:** Done

**Acceptance criteria**
- [x] `lib/validations/contact.ts` exports a zod schema + inferred TS type.
- [x] Imported by both the API route and the form.

**Files**
- `lib/validations/contact.ts` (new)

**Depends on:** DRH-59

---

### DRH-61 `POST /api/contact` (Resend + zod + rate limit) ✅
**Type:** Story · **Parent:** DRH-9 · **Estimate:** M · **Priority:** P0 · **Labels:** api, email · **Status:** Done

**Acceptance criteria**
- [x] Validates body with shared schema (DRH-60).
- [x] Sends via Resend using a React Email template (DRH-63).
- [x] Honeypot field rejects with 200 silently.
- [x] Per-IP in-memory rate limit: 10/hr → 429.
- [x] Returns `{ ok: true }` on success, `{ ok: false, error }` on validation fail.

**Files**
- `app/api/contact/route.ts`

**Depends on:** DRH-18, DRH-60, DRH-63

---

### DRH-62 `POST /api/lead` (footer email capture) ✅
**Type:** Task · **Parent:** DRH-9 · **Estimate:** S · **Priority:** P1 · **Labels:** api, email · **Status:** Done

**Acceptance criteria**
- [x] Validates `{ email, source? }` with zod.
- [x] Pushes to Resend Audiences (using `RESEND_AUDIENCE_ID` env var).
- [x] Same honeypot + rate-limit pattern as DRH-61.

**Files**
- `app/api/lead/route.ts` (new)

**Depends on:** DRH-18, DRH-59

---

### DRH-63 React Email templates ✅
**Type:** Task · **Parent:** DRH-9 · **Estimate:** S · **Priority:** P0 · **Labels:** email, design-system · **Status:** Done

**Acceptance criteria**
- [x] `emails/ContactInquiry.tsx` sent to Dr. Higgins's team on contact form submit.
- [x] Uses brand palette (jade/bone/gold) via React Email Tailwind preset.
- [ ] Manual Gmail + Apple Mail check pending stakeholder dry-run.

**Files**
- `emails/ContactInquiry.tsx` (new)

**Depends on:** DRH-59

---

### DRH-64 `GET /api/og/[...slug]` dynamic OG images ✅
**Type:** Task · **Parent:** DRH-9 · **Estimate:** M · **Priority:** P1 · **Labels:** seo · **Status:** Done

**Acceptance criteria**
- [x] Uses `next/og` `ImageResponse`.
- [x] Default card: jade bg, gold hairline, serif title, sans subtitle.
- [x] Pulls title from slug lookup against Sanity for blog posts; supports `?title=` query.
- [x] Wired into `generateMetadata` of blog posts and the default site card.

**Files**
- `app/api/og/[...slug]/route.tsx` (new)

**Depends on:** DRH-56

---

## DRH-10 Epic: SEO & PWA

### DRH-65 `app/sitemap.ts` ✅
**Type:** Task · **Parent:** DRH-10 · **Estimate:** S · **Priority:** P0 · **Labels:** seo · **Status:** Done

**Acceptance criteria**
- [x] Includes all marketing routes + Sanity post slugs.
- [x] Updates `lastModified` from Sanity `_updatedAt` for posts.

**Files**
- `app/sitemap.ts` (new)

**Depends on:** DRH-56

---

### DRH-66 `app/robots.ts` ✅
**Type:** Task · **Parent:** DRH-10 · **Estimate:** XS · **Priority:** P0 · **Labels:** seo · **Status:** Done

**Acceptance criteria**
- [x] Allow all, disallow `/api/*`, `/dashboard/*`, auth routes.
- [x] Sitemap reference set.

**Files**
- `app/robots.ts` (new)

---

### DRH-67 `app/manifest.ts` + favicons ✅
**Type:** Task · **Parent:** DRH-10 · **Estimate:** S · **Priority:** P0 · **Labels:** pwa, branding · **Status:** Done (manifest + placeholder SVG shipped; raster icon assets still need to be supplied)

**Acceptance criteria**
- [x] Manifest with brand name, theme color (`--color-jade-900`), icons declared.
- [x] Placeholder SVG favicon (`public/favicon.svg`) using brand colors (jade bg, gold "CH" monogram).
- [ ] Full raster favicon set (192, 512, apple-touch-icon PNGs) needs final designed assets in `public/`.
- [ ] OG fallback image dynamic OG covers default; static fallback to be added.

**Files**
- `app/manifest.ts` (new)
- `public/favicon.svg` (new placeholder)
- `public/icon-*.png`, `public/apple-touch-icon.png`, `public/og-default.png` (assets pending)

---

### DRH-68 Per-page metadata audit ✅
**Type:** Task · **Parent:** DRH-10 · **Estimate:** S · **Priority:** P0 · **Labels:** seo · **Status:** Done

**Acceptance criteria**
- [x] Every `app/(marketing)/*/page.tsx` exports `metadata` with title, description, and OG image (via root `defaultMetadata`).
- [x] No "Next.js Enterprise" boilerplate strings remain.

**Files**
- All `app/(marketing)/*/page.tsx`, `app/blog/*`

**Depends on:** DRH-17

---

## DRH-11 Epic: Analytics

### DRH-69 Plausible client + script ✅
**Type:** Task · **Parent:** DRH-11 · **Estimate:** S · **Priority:** P1 · **Labels:** analytics · **Status:** Done

**Acceptance criteria**
- [x] Script injected from `app/layout.tsx` only when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` set.
- [x] No cookies (privacy-first).
- [x] `lib/analytics.ts` exposes typed `track(event, props?)`.

**Files**
- `lib/analytics.ts`
- `app/layout.tsx`

**Depends on:** DRH-18

---

### DRH-70 `useAnalytics` hook + CTA instrumentation ✅
**Type:** Task · **Parent:** DRH-11 · **Estimate:** S · **Priority:** P1 · **Labels:** analytics · **Status:** Done

**Acceptance criteria**
- [x] Hook wraps `track` for client components.
- [x] Event types declared; `calendly_embed_loaded` and `contact_form_submitted` instrumented.
- [x] `cta_click_hero` fires from Hero primary CTA → `/book`.
- [x] `cta_click_sticky` fires from Navbar Book CTA (desktop + mobile drawer); includes `scrolled` flag for the desktop sticky variant.
- [x] `program_link_click_<slug>` fires from both the home `Programs` section and the `/programs` page (distinguished via `source` prop).

**Files**
- `lib/hooks/useAnalytics.ts`
- `components/sections/Hero.tsx`
- `components/layout/Navbar.tsx`
- `components/sections/Programs.tsx`
- `components/marketing/ProgramsPage.tsx`

**Depends on:** DRH-69

---

## DRH-12 Epic: QA & launch readiness

### DRH-71 Vitest coverage for new primitives ✅
**Type:** Task · **Parent:** DRH-12 · **Estimate:** S · **Priority:** P1 · **Labels:** testing · **Status:** Done

**Acceptance criteria**
- [x] Render + variant tests for Section, Eyebrow, Badge, Quote, Textarea, Select.
- [x] `pnpm test -- --run` → 7 files / 19 tests passing.

---

### DRH-72 Playwright e2e: contact form ✅
**Type:** Task · **Parent:** DRH-12 · **Estimate:** S · **Priority:** P1 · **Labels:** testing, e2e · **Status:** Done

**Acceptance criteria**
- [x] Happy path: fill form, submit, see success state. Mocks `/api/contact` to 200.
- [x] Validation path: missing email shows zod error.

**Files**
- `e2e/contact.spec.ts` (new)

---

### DRH-73 Playwright e2e: book page Calendly load ✅
**Type:** Task · **Parent:** DRH-12 · **Estimate:** S · **Priority:** P1 · **Labels:** testing, e2e · **Status:** Done

**Acceptance criteria**
- [x] `/book` page loads, Calendly iframe attached, `calendly_embed_loaded` event fires.

**Files**
- `e2e/book.spec.ts` (new)

---

### DRH-74 Lighthouse audit pass
**Type:** Task · **Parent:** DRH-12 · **Estimate:** S · **Priority:** P0 · **Labels:** performance · **Status:** Deferred to staging deploy

**Acceptance criteria**
- [ ] Mobile Performance ≥ 90 on `/`, `/about`, `/services`, `/blog/<slug>`.
- [ ] LCP < 2.0s, CLS < 0.05.

> Run after first staging deploy with real Sanity / Resend / Calendly env values populated.

---

### DRH-75 Storybook stories for new primitives ✅
**Type:** Task · **Parent:** DRH-12 · **Estimate:** S · **Priority:** P2 · **Labels:** design-system, docs · **Status:** Stories shipped Storybook build blocked by upstream peer-dep mismatch (out of scope)

**Acceptance criteria**
- [x] Stories for Section, Eyebrow, Badge, Quote, Textarea, Select.
- [ ] `pnpm build-storybook` runs (verified failing 2026-05-01 with `SB_CORE-SERVER_0004 NoMatchingExportError` `@storybook/addon-toolbars@8.6.14` vs `storybook@10.3.6`. Fix is a coordinated Storybook 10 upgrade across all `@storybook/*` packages and is out of this scope).

---

## Dependency overview (high-leverage paths)

```
DRH-13 → DRH-14 → DRH-15 → DRH-19 (Button) ─┐
                                            ├─→ DRH-32 Navbar ─┐
DRH-16 ─────────────────────────────────────┘                  │
DRH-18 → DRH-53 → DRH-54/55 → DRH-56 → DRH-57 (blog) ──────────┤
DRH-18 → DRH-59 → DRH-60 → DRH-61 → DRH-50 (contact) ──────────┤
DRH-26 → DRH-27..31 (content data) ────────────────────────────┤
                                                               ├─→ DRH-44 HomePage → DRH-74 Lighthouse → LAUNCH
DRH-21..25 (primitives) ───────────────────────────────────────┤
DRH-34..43 (sections) ─────────────────────────────────────────┘
```

**Suggested first sprint (P0 only, parallelizable):** DRH-13 → DRH-18 (foundations), DRH-26 → DRH-31 (content data), DRH-19 → DRH-25 (primitives), DRH-59 (deps install). Everything else builds on these.
