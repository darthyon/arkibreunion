# Arkib Reunion Negara

Reunion planning portal for a friend group's annual gathering ("Asmarian
Gathering 2026"). Presented as a deadpan, faux-official government archive —
bureaucratic Malay (Bahasa Melayu) copy with dry humour. Guests view content;
organisers ("admin") edit it inline on the same pages.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React** + **TypeScript** (strict)
- **CSS Modules** for component styling; **global CSS variables** for design tokens
- **Base UI** (`@base-ui-components/react`) for accessible primitives
- **motion** for animation, **lucide-react** for icons
- **Convex** backend + **Convex Auth** (see backend section)
- Fonts: Fraunces (display), Geist (sans), Geist Mono

Copy is in **Malay**. Match the existing deadpan, mock-official tone — do not
rewrite it into neutral English.

## Source of truth — read before building

- `/DESIGN.md` — visual direction, typography, colour roles, component principles
- `/features-plan/*.md` — per-feature PRDs and the build plan. Read the relevant
  PRD before changing a feature. (Note: the PRDs predate the backend decision and
  still mention Supabase — the project uses **Convex**, see below.)

## Structure

```
src/
  app/          App Router routes (arkib, view-plan, tukar-hadiah, gerak-kerja,
                album-rahsia, admin/login)
  features/     Feature UIs (home, view-plan, gifts, tasks, placeholder) — page
                component + dialogs/ + co-located .module.css
  components/   ui/ (shared primitives), layout/ (AppShell, Header, PageContainer),
                ConvexClientProvider, PreviewProvider
  hooks/        useAdmin (admin gate), etc.
  lib/          pure helpers (cn, gift-draw, routes, constants)
  data/         mock data (being migrated to Convex — Phase 2)
  types/        TypeScript types per domain
  styles/       globals.css (design tokens)
  proxy.ts      Convex Auth middleware (Next 16 "proxy" convention)
convex/         backend: schema, auth, queries/mutations/actions
```

## The 5 modules

| Route | Feature | State |
|---|---|---|
| `/` | Homepage card deck | built |
| `/view-plan` | Plan: decisions, outfits, menu, program, accommodation | built |
| `/tukar-hadiah` | Gift exchange (name + PIN, wishlist, draw) | built |
| `/gerak-kerja` | Task board (kanban) | built |
| `/album-rahsia` | Private photo album | placeholder ("Coming Soon") |

## Backend (Convex)

- **Admin auth** — Convex Auth, email + password, single organiser account.
  "Logged-in = admin" — no role flag. Gated **in-component** via the
  `useAdmin()` hook / `currentAdmin` query, not route middleware. This matches
  the "same page, plus edit controls" pattern from the admin PRD.
- **Guest auth** — name + unique 4-digit PIN, **scoped to Tukar Hadiah only**.
  PINs are PBKDF2-hashed, login is rate-limited, session is an opaque token.
  (Backend ready; UI wiring lands with content migration.)
- **Preview-as-guest** — admins toggle `PreviewProvider` from the header to see
  the guest view; pages compute `isAdmin = isAuthedAdmin && !isPreviewing`.
- **Data** currently lives as mock arrays in `src/data/*.ts`. Phase 2 migrates
  these to Convex tables (one table per array; nest small/owned objects, table
  independently-edited entities) via a seed mutation, then adds admin CRUD.
- **First admin account**: visit `/admin/login?setup=1` once.

### Running locally

Two processes: `npx convex dev` (deploys functions, watches) **and**
`npm run dev`. The app needs `NEXT_PUBLIC_CONVEX_URL` in `.env.local` (written by
the Convex CLI, gitignored). Never commit `.env*`.

## Conventions

- Define the TypeScript type/interface before a component touches data. Never
  use `any`.
- Surgical edits — change the minimum; don't rewrite a working component.
- CSS Modules co-located with the component; use the existing design tokens
  (`--color-*`, `--font-*`, `--radius-*`, `--container-*`, `--space-*`), not
  hardcoded values.
- `npm run typecheck` (root) and `npx tsc -p convex/tsconfig.json` must pass.
- Scripts: `dev`, `build`, `lint`, `typecheck`.
- `AGENTS.md` is canonical; `CLAUDE.md` imports it via `@AGENTS.md`. A pre-commit
  hook (`.githooks/pre-commit`) enforces the link. After cloning, enable hooks
  once: `git config core.hooksPath .githooks`.

<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

<!-- convex-ai-end -->
