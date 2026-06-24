# Features Plan

This folder contains the product and feature planning documents for Arkib Reunion Negara.

These Markdown files are the source of truth for implementation.

Codex and contributors must read the relevant PRD before building or changing a feature.

## Design Direction

Read the root-level design file before implementing UI:

```text
/DESIGN.md
```

`DESIGN.md` defines:

- product atmosphere
- visual direction
- typography
- colour roles
- component styling principles
- responsive behaviour
- accessibility expectations
- technical UI direction

## Documents

- `01-homepage-card-deck-prd.md`
- `02-view-plan-prd.md`
- `03-tukar-hadiah-prd.md`
- `04-gerak-kerja-prd.md`
- `05-admin-edit-mode-prd.md`
- `06-placeholder-pages-prd.md`
- `07-build-plan.md`

## Build Rule

Before implementation, read:

- Design direction: `/DESIGN.md`
- Homepage work: `01-homepage-card-deck-prd.md`
- View Plan work: `02-view-plan-prd.md`
- Tukar Hadiah work: `03-tukar-hadiah-prd.md`
- Gerak Kerja work: `04-gerak-kerja-prd.md`
- Admin/Edit work: `05-admin-edit-mode-prd.md`
- Placeholder work: `06-placeholder-pages-prd.md`
- Build sequencing: `07-build-plan.md`

Do not start implementation without checking the relevant PRD and `/DESIGN.md`.

## Technical Direction

Use:

- Next.js
- React
- TypeScript
- Base UI for accessible unstyled primitives
- custom React components for product-defining surfaces
- CSS Modules for component styling
- global CSS variables for design tokens
- mock data first
- Supabase later for auth and persistence

## Reference Image

Place the approved homepage concept image here:

```text
/features-plan/references/homepage-concept.png
```
