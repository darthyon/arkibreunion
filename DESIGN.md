# DESIGN.md

## 1. Purpose

This file defines the visual design direction, product personality, typography, component styling, layout principles, responsive behaviour, and implementation preferences for **Arkib Reunion Negara**.

Use this file before implementing any UI.

Feature scope, routes, data rules, UX copy, and acceptance criteria live in `/features-plan`.

---

## 2. Product Atmosphere

Arkib Reunion Negara is a clean, bold, slightly official archive for yearly reunion or gathering planning.

It should feel:

- useful first
- dry and quietly funny
- slightly official
- modern but not corporate
- personal but not scrapbook-heavy
- structured without feeling like admin work

Core product line:

```text
Rekod rasmi untuk gathering yang katanya reunion tapi tahunan.
```

The app should help users quickly answer:

1. What is the plan?
2. Who am I buying a gift for?
3. What still needs to be done?
4. Where do we keep the memories?

---

## 3. Voice and UX Copy

The writing should be clear first, funny second.

Use humour in:

- hero copy
- card descriptions
- placeholder states
- empty states
- success toasts
- small helper text

Keep these clean:

- navigation labels
- CTA buttons
- field labels
- validation errors
- access messages
- metadata labels

Copy should stay short enough for mobile.

### Approved Homepage Hero Copy

```text
REKOD RASMI

Rancang reunion. Simpan rekod. Elak tanya dalam WhatsApp 14 kali.

Tempat rasmi untuk simpan keputusan, tugasan, dan kenangan. Bukan sekadar bergantung pada chat yang tenggelam.
```

### Approved Homepage Card Copy

```text
View Plan
Apa pakai, apa makan, apa jadi, semua dekat sini.
Lihat Plan
```

```text
Tukar Hadiah
Cabutan nama, wishlist, dan sedikit unsur suspen.
Lihat Hadiah
```

```text
FAIL SEMASA
Asmarian Gathering 2026
Rekod rasmi untuk gathering yang katanya reunion tapi tahunan.
Lihat Ringkasan
```

```text
Gerak Kerja
Untuk kerja yang perlu jalan, bukan sekadar dibincangkan.
Lihat Tugas
```

```text
Album Rahsia
Coming Soon
Untuk kenangan yang tak sesuai dibiarkan berkeliaran.
Tak Payah Tunggu
```

### Approved Placeholder Copy

```text
Belum diproses.

Fail ini belum diproses oleh pihak berwajib.

Balik ke Arkib
```

Context variants:

```text
Album ini belum diproses oleh pihak berwajib.
Arkib ini belum diproses oleh pihak berwajib.
Bahagian ini belum diproses oleh pihak berwajib.
```

---

## 4. Visual Theme

The visual direction is a **bold card-deck archive**.

Use:

- white or warm white main canvas
- bold colour cards
- white or off-white centre summary card
- flat black-and-white illustrations
- editorial typography
- clean rounded cards
- generous spacing
- subtle shadows
- simple layouts

The homepage should be the strongest visual moment.

Feature pages should feel calmer and more readable.

---

## 5. Colour Palette and Roles

### Base Colours

Use these as CSS variables. Values can be tuned during implementation, but the role should remain the same.

```css
:root {
  --color-bg: #fbfaf7;
  --color-surface: #ffffff;
  --color-surface-warm: #fffdf7;

  --color-text: #171717;
  --color-muted: #62646b;
  --color-subtle: #8c8f96;
  --color-border: #e7e3dc;

  --color-blue-card: #1463e8;
  --color-red-card: #f0332f;
  --color-green-card: #0f6b3d;
  --color-yellow-card: #f4c51f;
  --color-summary-card: #fffefa;

  --color-danger: #d92d20;
  --color-success: #157347;
  --color-warning: #b7791f;
}
```

### Colour Usage

| Area | Colour role |
|---|---|
| Page background | warm white |
| Main text | near-black |
| Secondary text | muted grey |
| Borders | light warm grey |
| View Plan card/accent | bold blue |
| Tukar Hadiah card/accent | bold red |
| Gerak Kerja card/accent | bold green |
| Album Rahsia card/accent | bold yellow |
| Summary card | white / off-white |

Feature pages should use accent colours sparingly.

---

## 6. Typography

Use this font system:

```text
Display: Fraunces
Body/UI: Geist Sans
Accent/Labels: Geist Mono
```

### Fraunces

Use Fraunces for:

- homepage hero headline
- major page titles where appropriate
- homepage card titles
- section titles that need personality

Fraunces gives the product a ceremonial, editorial, slightly playful tone.

Do not use Fraunces for long body copy.

### Geist Sans

Use Geist Sans for:

- body copy
- navigation
- buttons
- forms
- metadata
- admin UI
- descriptions
- task cards
- menu items

Geist keeps the app readable, modern, and practical.

Geist Sans UI text should not exceed `font-weight: 600`.
Use `600` as the highest weight for buttons, badges, labels, metadata, navigation, form controls, and body/UI emphasis.
Avoid `650`, `700`, `bold`, and heavier weights in product UI.

### Geist Mono

Use Geist Mono for:

- badges
- card numbers
- small official labels
- status-like labels
- tiny metadata accents

Examples:

```text
REKOD RASMI
FAIL SEMASA
01
02
03
```

### CSS Font Tokens

```css
:root {
  --font-display: "Fraunces", Georgia, serif;
  --font-body: "Geist", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-accent: "Geist Mono", "SFMono-Regular", Consolas, monospace;
}
```

---

## 7. Layout Principles

### Global

- Keep pages spacious.
- Use clear hierarchy.
- Keep content readable on mobile.
- Use large tap targets.
- Avoid dense dashboards.
- Avoid tiny controls.
- Prefer cards and sections over tables.

### Desktop

- Use centred layouts.
- Use comfortable max widths.
- Let the homepage card deck breathe.
- Keep feature pages around readable content widths.

### Mobile

- Use stacked content.
- Use sticky horizontal tabs where helpful.
- Avoid cramped multi-column layouts.
- Keep subtitles short.
- Keep CTAs obvious.
- Avoid horizontal overflow except intentional carousels or tab rows.

### Suggested Layout Tokens

```css
:root {
  --container-page: 1180px;
  --container-readable: 920px;
  --container-narrow: 640px;

  --space-page-x: clamp(16px, 4vw, 48px);
  --space-section: clamp(32px, 6vw, 72px);
  --space-card: 24px;

  --radius-card: 28px;
  --radius-panel: 20px;
  --radius-pill: 999px;

  --shadow-soft: 0 18px 45px rgba(18, 18, 18, 0.08);
  --shadow-card: 0 20px 55px rgba(18, 18, 18, 0.12);
}
```

---

## 8. Technical UI Direction

Use a layered UI approach:

```text
Accessible primitive layer:
Base UI

Product component layer:
Custom React components

Styling layer:
CSS Modules + global CSS variables
```

### Base UI Role

Use Base UI for accessible unstyled primitives where behaviour matters:

- Dialog
- Alert Dialog / confirmation dialog
- Select
- Tabs
- Menu
- Popover
- Tooltip, if needed
- Field / form primitives, if useful

Base UI should provide interaction behaviour and accessibility.

It should not define Arkib Reunion Negara's final visual identity.

Do not hand-roll interactive primitives when Base UI has a suitable part.
In particular:

- use Base UI Dialog for modals
- use Base UI Tabs for tabs
- avoid anchor-link tabs for switching page content
- avoid decorative modal eyebrows
- keep modal headers to one clear title
- use modal body rows or sections instead of cards inside cards
- reserve modal footers for actions such as Save, Cancel, Delete, or Close

### Custom Component Role

Use custom React components for product-defining surfaces:

- homepage card deck
- bold feature cards
- current summary card
- previous reunion strip
- View Plan sections
- Tukar Hadiah participant/admin panels
- Gerak Kerja task cards
- placeholder pages
- admin toolbar

### Styling Role

Use CSS Modules for component styling.

Use global CSS variables for shared design tokens.

Recommended structure:

```text
src/styles/globals.css
src/styles/tokens.css

src/components/ui/Button.module.css
src/components/ui/Card.module.css
src/features/home/HomeCardDeck.module.css
```

---

## 9. Homepage Design Rules

The homepage uses a 5-card horizontal deck:

1. View Plan
2. Tukar Hadiah
3. Fail Semasa / Summary
4. Gerak Kerja
5. Album Rahsia

The default active card should be the centre summary card.

The centre card should use a white or off-white surface.

The surrounding cards should use bold flat colours.

### Homepage Card Behaviour

Desktop:

- show the card deck centred
- side cards remain visible
- centre summary card feels anchored
- carousel dots appear below the deck
- arrows may appear on the sides

Mobile:

- the card deck becomes a horizontal swipe carousel
- show one main card at a time
- allow partial next/previous cards if possible
- summary card remains the default active card
- previous reunion cards become horizontal scroll cards or stacked cards

---

## 10. Feature Page Design Rules

Feature pages should be calmer than the homepage.

Use:

- white or warm white background
- centred readable content width
- clean cards
- sticky tabs where useful
- small feature accent colours
- readable spacing
- short subtitles
- clear CTAs

Feature pages should feel like readable documents, not dashboards.

### View Plan

- one readable page
- sticky section tabs
- stacked sections on mobile
- desktop may use wider cards
- avoid wide tables on mobile

### Tukar Hadiah

- red accent
- participant access should be simple
- participant view should prioritise assignment and wishlist
- admin sections can be stacked
- avoid exposing full assignment details to participants

### Gerak Kerja

- green accent
- desktop may use 4 columns
- mobile must use status tabs and stacked task cards
- use dropdown status change for MVP

### Placeholder Pages

- centred content
- simple message
- one CTA
- no scary 404 styling

---

## 11. Component Styling

### Cards

Cards should feel smooth, readable, and tappable.

Homepage cards:

- larger
- bolder
- more expressive
- stronger colour
- subtle depth

Feature cards:

- calmer
- white surface
- light border
- subtle shadow
- readable density

### Buttons

Buttons should be direct and clear.

Primary buttons:

- filled black for now
- high contrast
- rounded pill or soft rectangle
- minimum 44px height

Secondary buttons:

- outline or soft surface
- clear border
- readable label

Button and component surfaces should use neutral white surfaces by default.
Do not use the warm/yellow off-white surface as a generic fill for modals, buttons, badges, tabs, polls, or reusable UI components.
Keep warm/off-white reserved for the homepage summary card and broad page atmosphere.

Examples:

```text
Lihat Plan
Lihat Hadiah
Lihat Tugas
Balik ke Arkib
Tambah Tugas
Save Changes
Cancel
```

### Badges

Badges should be small and official-feeling.

Use Geist Mono where appropriate.

Examples:

```text
REKOD RASMI
FAIL SEMASA
Coming Soon
```

### Dialogs

Use dialogs for add/edit actions.

Desktop:

- centred modal dialog

Mobile:

- bottom sheet or full-screen dialog

### Tabs

Use tabs as section shortcuts.

Avoid confusing nested tabs.

Mobile tabs may scroll horizontally.

---

## 12. Illustration and Asset Rules

Illustrations should be separate assets.

Use:

- flat illustration
- black-and-white base
- minimal accent colour only if needed
- simple shapes
- clear object meaning
- not mascot-heavy
- not childish
- not glossy 3D

Suggested illustrations:

| Feature | Illustration |
|---|---|
| View Plan | clipboard + hanger + calendar |
| Tukar Hadiah | gift box + question tag |
| Summary | small group / event mark |
| Gerak Kerja | checklist + pen |
| Album Rahsia | locked photo stack |

Illustrations should support the UI. They should not become the product.

---

## 13. Responsive Behaviour

The app must be mobile-friendly, not just desktop scaled down.

### Global Mobile Rules

- Minimum supported width: 360px.
- Use 16px minimum body text where possible.
- Touch targets must be at least 44px high.
- Use 16px page side padding on small screens.
- Avoid horizontal overflow except intentional carousels or tabs.
- Header collapses to brand + menu button.
- Dialogs become bottom sheets or full-screen panels.

### Homepage Mobile

- 5-card deck becomes swipe carousel.
- Summary card starts active.
- Previous Reunion section becomes horizontal cards or stacked cards.

### View Plan Mobile

- one-column layout
- sticky horizontal tabs
- stacked sections:
  1. Keputusan
  2. Outfit
  3. Menu Makan
  4. Program
- no wide tables
- Program becomes a vertical timeline/list

### Tukar Hadiah Mobile

- participant login comes before admin content
- forms are full-width
- admin panels stack vertically
- participant table becomes card list

### Gerak Kerja Mobile

- no 4-column Kanban
- use status tabs:
  - To Do
  - Doing
  - Blocked
  - Done
- each status displays stacked task cards
- task status changes use dropdown

---

## 14. Accessibility and Usability

- Text must remain readable on bold card backgrounds.
- Buttons and tappable controls should be at least 44px high.
- Cards should be keyboard focusable when clickable.
- Do not rely on illustration alone to communicate meaning.
- Forms need clear labels.
- Validation errors should be direct and useful.
- Destructive actions require confirmation.
- Toasts should not be the only source of critical feedback.
- Colour should not be the only indicator of status.

---

## 15. Admin UI Direction

Admin mode should be layered onto the same pages guests see.

Pattern:

```text
Guest:
View content only

Admin:
Same page, plus edit controls
```

Real admin login can be implemented last.

During development, mock admin mode is acceptable.

Before deployment, mock admin mode must be removed or replaced with real auth.

Admin UI should be:

- compact
- clear
- contextual
- not visually dominant
- not dashboard-heavy

---

## 16. MVP Boundaries

Do not build for MVP:

- gallery upload
- album password
- flipbook
- full previous reunion detail
- RSVP
- payments
- comments
- notifications
- analytics
- complex role permissions
- full CMS dashboard
- drag-and-drop task management

---

## 17. Agent Prompt Guide

Before implementing UI, read:

```text
/DESIGN.md
/features-plan/[relevant-feature-prd].md
/features-plan/07-build-plan.md
```

Implementation rules:

- follow DESIGN.md for visual style
- follow feature PRDs for scope and copy
- use mock data first
- use Base UI for accessible unstyled primitives where useful
- use custom React components for product-defining surfaces
- use CSS Modules and global CSS variables for styling
- do not implement real auth until the auth phase
- do not build features outside the requested phase
- stop after the requested phase and report changed files

---

## 18. Final Feeling

Arkib Reunion Negara should feel like:

```text
A bold, card-based reunion archive with enough structure to be useful and enough personality to feel like it came from the group.
```
