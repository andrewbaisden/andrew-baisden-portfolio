# Portfolio website

The hero is a switchable scene engine, fully animated, with moving vehicles, ambient lighting, and day/night themes.

![London hero — day](./img/london-hero-day.png 'London hero — day')

![London hero — night](./img/london-hero-night.png 'London hero — night')

## Getting started

This repo uses **pnpm**. See `AGENTS.md` for stack, testing, and contribution rules.

```shell
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and set `RESEND_API_KEY` if you need the contact form to send mail locally.

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Next.js dev server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Biome check |
| `pnpm typecheck` | TypeScript `--noEmit` |
| `pnpm test` | Vitest unit / component tests |
| `pnpm test:e2e` | Playwright smokes |
