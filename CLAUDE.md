# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single Next.js 15 App Router app (no monorepo) based on Blazity's `next-enterprise` boilerplate, restructured for marketing site + future SaaS dashboard. React 19, TypeScript strict (`noUncheckedIndexedAccess`), Tailwind CSS v4. Package manager is pnpm 10 (via Corepack); Node ≥ 20. Never use — , -- in the text on the website

## Commands

```bash
pnpm dev                # next dev --turbo
pnpm build              # production build
pnpm start              # serve built app
pnpm lint               # next lint (ESLint 9 flat config)
pnpm lint:fix
pnpm prettier           # check formatting
pnpm prettier:fix
pnpm format             # write formatting to ts/tsx/md
pnpm analyze            # ANALYZE=true build via @next/bundle-analyzer
pnpm coupling-graph     # regenerate graph.svg via madge

pnpm test               # vitest (jsdom)
pnpm test:watch
pnpm test:ui
pnpm test:coverage
pnpm test -- --run                       # one-shot run
pnpm test -- path/to/file.test.tsx       # single file
pnpm test -- -t "name"                   # filter by test name

pnpm e2e:headless       # playwright (auto-starts `pnpm dev` on :3000)
pnpm e2e:ui

pnpm storybook          # dev on :6006
pnpm build-storybook
pnpm test-storybook
```

Vitest globals are enabled and `@testing-library/jest-dom` matchers auto-load no per-file `import { describe, expect }` needed. Tests live next to source as `*.test.{ts,tsx}`; anything under `e2e/` is excluded from Vitest and handled by Playwright.

There's no dedicated typecheck script; the `tsc` devDep is unrelated. To run a real typecheck use `node node_modules/typescript/bin/tsc --noEmit`.

## Architecture

### Routing App Router with route groups

- `app/(marketing)/` public marketing pages (`/`, `/about`, `/services`, `/programs`, `/contact`, `/pricing`). Route group, so the URLs do NOT include `(marketing)`.
- `app/(auth)/` auth flows (`/login`, `/signup`, `/forgot-password`).
- `app/blog/` and `app/blog/[slug]/` blog index + dynamic post route. `[slug]` page receives `params: Promise<{ slug: string }>` (Next 15 async params must `await params`).
- `app/dashboard/` authenticated SaaS area; has its own `layout.tsx`.
- `app/api/{health,contact,booking}/route.ts` API routes. `next.config.ts` rewrites `/healthz`, `/api/healthz`, `/health`, `/ping` all to `/api/health`; don't duplicate the route, add a rewrite.
- `app/not-found.tsx` global 404.
- `app/layout.tsx` is the only layout that imports CSS it imports `./globals.css`, which in turn imports `styles/tailwind.css` (Tailwind directives + `@theme`) and `styles/variables.css` (custom-property tokens). Add globals to one of those two; don't import CSS from anywhere else.

### Components three layers

- `components/ui/` primitive, reusable, design-system pieces (`Button`, `Tooltip`, `Input`, `Card`, `Modal`). Each one is its own folder with `Component.tsx` (+ `.test.tsx` and `.stories.tsx` for Button). New primitives go here following the same folder pattern.
- `components/sections/` high-conversion marketing sections (`Hero`, `Services`, `Programs`, `Proof`, `Testimonials`, `FAQ`, `CTA`). Single-file per section.
- `components/marketing/` composed page-level components (`HomePage`, `ServicesPage`, `ProgramsPage`, `AboutPage`). The page file in `app/(marketing)/foo/page.tsx` should be a thin wrapper that just renders `<FooPage />` and exports `metadata` keep JSX out of `app/`. `lp-items.tsx` (the LP grid data) lives here as a private data module imported by `HomePage`.
- `components/layout/` global chrome (`Navbar`, `Footer`, `Container`).
- `components/dashboard/` SaaS UI (`Sidebar`, `Header`, `widgets/`). Don't put dashboard pieces in `components/ui/`.

### Other top-level dirs

- `lib/` shared logic. `api.ts`, `sanity.ts`, `booking.ts`, `analytics.ts`, `auth.ts`, `utils.ts`, plus `lib/hooks/{useAuth,useBooking,useAnalytics}.ts`. `lib/utils.ts` exports `cn(...)` (a `twMerge` helper) use it for conditional Tailwind classes.
- `config/` branding/static config: `site.ts` (name, URL, nav), `seo.ts` (default `Metadata`), `env.ts` (re-exports validated env from `env.mjs`).
- `types/` shared types (`index.ts`, `api.ts`, `cms.ts`).
- `content/blog/`, `content/pages/` reserved for MDX content if/when CMS isn't used.
- `assets/` static assets organised into `images/`, `icons/`, `logos/`.
- `tests/` placeholder for cross-cutting unit tests; per-file `*.test.tsx` next to source is the default.

### Env

- `env.mjs` is the single source of truth (`@t3-oss/env-nextjs` + zod). Add new vars to `server`/`client` blocks and `runtimeEnv` there.
- Code should import via `import { env } from "config/env"` (which re-exports from `env.mjs`). Don't read `process.env.X` directly in app code.
- `next.config.ts` imports from `env.mjs` and conditionally wraps with the bundle analyzer when `ANALYZE=true`.

### Imports & path resolution

- `tsconfig.json` sets `baseUrl: "."` with no `paths` map, so imports use root-relative paths: `from "components/ui/Button/Button"`, `from "lib/utils"`, `from "config/site"`, `from "types/api"`. There is no `@/` alias.
- ESLint's `import/order` rule auto-groups every top-level directory as "internal" and alphabetizes within groups. Just import naturally and let `pnpm lint:fix` reorder if needed.

### Styling

- Tailwind CSS v4 config lives in CSS via `@import "tailwindcss"` + `@theme` blocks in `styles/tailwind.css`. There is no `tailwind.config.js`.
- Components use `class-variance-authority` (`cva`) for variants and `tailwind-merge`'s `twMerge` for caller-supplied `className` composition. ESLint and Prettier are configured to recognize `cva`, `cn`, `clsx`, `classnames`, `ctl` as Tailwind class call sites. Follow `components/ui/Button/Button.tsx` for new primitives.
- Use `lib/utils.ts`'s `cn()` for ad-hoc class composition outside cva.

### Observability

`instrumentation.ts` registers Vercel OpenTelemetry as `next-app`. Next.js loads it automatically on boot.

## Conventions

- **Conventional commits** are enforced (`git-conventional-commits.yaml`). Allowed types: `feat`, `fix`, `perf`, `refactor`, `style`, `test`, `build`, `ops`, `docs`, `chore`, `merge`, `revert`. `semantic-release` reads these for releases.
- Pre-commit hooks (`.pre-commit-config.yaml`) run formatting/linting; don't bypass with `--no-verify`.
- Tailwind plugin in Prettier auto-sorts class names let it run rather than hand-ordering.
- TS interfaces with no members are flagged by `@typescript-eslint/no-empty-object-type`. Use `type Foo = SuperType` instead of `interface Foo extends SuperType {}` when extending without adding members.
