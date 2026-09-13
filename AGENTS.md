# AGENTS.md

Guidance for humans and coding agents working in this repository.

## What this repo is

This is a **marketing portfolio** for [andrewbaisden.com](https://andrewbaisden.com): a Next.js App Router site with a switchable, animated hero (London, Mountain, Beach, Space) and a contact form.

It is **not** a properties / rooms / devices product. There is **no live TfL or arrivals API** today. London transport in the hero is decorative animation.

## Non-negotiable rules

- TypeScript **strict** stays on. Do not add `any` without a one-line justification on that binding.
- Never commit secrets. `.env.example` is placeholders only. Do not paste keys into screenshots, logs, or agent transcripts.
- Contact validation has one source of truth: [`src/lib/contact-schema.ts`](src/lib/contact-schema.ts). The form, App Router route, and Netlify function must share it. Do not fork schemas or error contracts.
- Hero scene identity lives in [`src/app/components/Hero/scenes/hero-scene-registry.ts`](src/app/components/Hero/scenes/hero-scene-registry.ts). Do not hardcode scene lists elsewhere.
- **Custom CSS is the established styling system.** Tailwind is installed but unused. Do not sprinkle utility classes into existing handwritten CSS without a dedicated Tailwind / shadcn migration.
- Do not add Postgres, Prisma, Better Auth / Clerk, Redis, BullMQ, Zustand, or TanStack Query unless there is a clear architectural purpose (live server data, auth, background jobs, or interaction state that Context cannot hold).
- Do not introduce a second email provider, a second rate limiter, or a second contact endpoint contract. Resend + the existing POST contract stay.
- Prefer small, reversible diffs. Do not rewrite the hero engine to land an unrelated change.
- Keep authoritative data on the server when it exists. Client stores hold interaction state only.

## Tech stack

Use the established engineering stack unless a new dependency has a clear architectural purpose.

### Established in this repo

| Layer | Choice |
| --- | --- |
| Package manager | **pnpm** |
| Frontend | **Next.js 16** App Router (`src/app`) |
| Language | **TypeScript**, strict mode |
| Styling | Hand-written CSS + CSS variables (`data-theme`, `data-hero-scene`, `data-hero-motion`) |
| Validation | **Zod** |
| Forms | **React Hook Form** |
| Email | **Resend** |
| Hosting | **Netlify** (functions + Next). Vercel is allowed where appropriate. |
| Testing | **Vitest**, **React Testing Library**, **Playwright** |
| Code quality | **Biome**, **Husky**, **lint-staged** |
| CI/CD | **GitHub Actions** |

### Add when justified

These are the target stack defaults for new product surface. **Do not install them for this brochure site without a real need.**

| Layer | Choice | When |
| --- | --- | --- |
| Styling | Tailwind CSS, shadcn/ui | Dedicated visual migration off handwritten CSS |
| Client state | **Zustand** | Interaction state that has outgrown Context |
| Server state | **TanStack Query** | Remote collections and mutations |
| Database | **PostgreSQL** + **Prisma** | Persistent product data |
| Auth | **Better Auth** (prefer) or **Clerk** | Signed-in users |
| Caching / jobs | **Redis**, **BullMQ** | Realtime presence, event processing, simulation, or automation |
| Infra | **Docker**; Fly.io / AWS (or similar) for persistent workers | A process that cannot live in a Netlify function |
| Monitoring | **Sentry**, **PostHog** | Error tracking / product analytics with project keys in env |

#### Zustand (when added)

Use for appropriate **interaction** state such as:

- selected hero scene
- ambient motion on/off
- theme / day-night preference
- calibrator or other viewer overlays
- unsaved editor interactions

Do **not** duplicate authoritative server state in Zustand.

#### TanStack Query (when added)

Use for remote data such as:

- live TfL / arrivals feeds
- CMS or project listings
- mutations and historical queries

Realtime updates must **update or invalidate** Query caches deliberately rather than becoming a second uncontrolled store.

## Project map

| Path | Role |
| --- | --- |
| `src/app/page.tsx` | Single-page home: Hero → About → Social → Tech → Contact |
| `src/app/components/Hero/` | Scene engine, tracks, vehicles, controls, prefs |
| `src/app/components/Hero/scenes/hero-scene-registry.ts` | Enabled scenes and id resolution |
| `src/app/context/ThemeContext.tsx` | Light / dark theme |
| `src/app/api/contact/route.ts` | Contact POST (local / Next). Rate limit + honeypot |
| `netlify/functions/contact.ts` | Same contract for Netlify production |
| `src/lib/contact-schema.ts` | Shared Zod schema |
| `src/lib/send-contact-email.ts` | Resend delivery |
| `src/proxy.ts` | Host / path canonicalization |
| `public/hero/` | Raster masters and vehicle assets |
| `e2e/` | Playwright smokes |
| `.github/workflows/ci.yml` | Merge gate |

Path alias: `@/*` → `./src/*`.

## Commands

```shell
pnpm install
pnpm dev
pnpm build
pnpm start
pnpm lint          # biome check
pnpm lint:fix      # biome check --write
pnpm typecheck
pnpm test
pnpm test:watch
pnpm test:e2e
pnpm test:e2e:ui
pnpm exec playwright install chromium   # CI, or local if Chrome is missing
```

## Testing expectations before a PR

Do not open or merge a PR until these are green locally (and CI agrees):

1. `pnpm lint`
2. `pnpm typecheck`
3. `pnpm test`
4. `pnpm test:e2e` when the change is **user-visible** (hero, theme, contact, routing, layout, global CSS)

Also:

- CI on GitHub Actions must be green. Do not merge with skipped or failing tests.
- New behaviour needs a test at the **cheapest layer** that would catch a regression: schema / unit first, component next, e2e last.
- Mock `sendContactEmail` / stub `/.netlify/functions/contact` in tests. Never send real email from CI or unit tests.
- Do not snapshot the whole hero canvas. Assert prefs, schema, HTTP contracts, and a few accessible controls instead.

## Dependency policy

- Default to the established stack above.
- New **runtime** dependencies need a clear architectural purpose, not convenience or familiarity.
- Do not add a library that duplicates Zod, React Hook Form, Resend, or Next App Router.
- Add packages with `pnpm add` / `pnpm add -D`. Commit `pnpm-lock.yaml`.
- Stay on the Next.js **16.x** line already in the repo.
- Keep the React runtime and `@types/react` on the **same major**. Do not mix React 18 with React 19 types (or the reverse).
- Tailwind stays unused until a dedicated migration. Do not take a drive-by shadcn dependency to style one control.
- Sentry and PostHog stay out until there are project keys and a product reason to ship them.

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/), scoped where it adds clarity:

`feat:`, `fix:`, `refactor:`, `test:`, `chore:`, `docs:`, `perf:`

Examples in **this** repo:

- `feat(hero): add space spacecraft idle path`
- `fix(contact): reject empty reason on the API`
- `feat(london): articulate bus wheels from production cuts`
- `test(contact): cover honeypot short-circuit`
- `chore(ci): cache Playwright browsers`
- `docs: explain scene registry ownership`

If live TfL / arrivals are added later: `feat(tfl): ...`, `fix(arrivals): ...`.

Keep commits **logically scoped**. Do not bundle a hero animation change with a contact-schema change and a CI tweak.

## Environment

| Variable | Where | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | Netlify env / local `.env.local` | Required to deliver contact mail. Placeholder in `.env.example` only. |

Copy `.env.example` to `.env.local` for local API sends. Never put a real key in `.env.example`.

## Hosting and CI

- GitHub Actions is the merge gate (lint, types, unit tests, production build, Playwright).
- `pnpm typecheck` runs `next typegen` first so App Router route types exist without a full build.
- **Netlify** deploys the site and the contact function. Do not break `netlify.toml` or the rewrite from `/.netlify/functions/contact` → `/api/contact` in [`next.config.ts`](next.config.ts).
- Docker, Fly.io, and AWS are out of scope until a persistent worker exists.

## Do not

- Check in `.env`, `.env.local`, or real API keys.
- Add Prisma, auth, Redis, or a second global state library “for consistency with other repos.”
- Call TfL or any third-party traffic API from the hero without a dedicated design for server state and rate limits.
- Leave `next lint` in `package.json` — ESLint is not installed; Biome is the linter.
