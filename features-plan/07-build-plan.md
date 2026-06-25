# Build Plan: Arkib Reunion Negara MVP

## 1. Build Summary

This build plan turns the Arkib Reunion Negara PRDs into an implementation sequence.

MVP should build the usable app first, using mock data and a temporary admin mode where needed. Real admin login and permission hardening come last.

Core MVP features:

1. Project foundation
2. Shared UI foundation
3. Homepage / Card Deck
4. Placeholder pages
5. View Plan
6. Tukar Hadiah
7. Gerak Kerja
8. Admin Mode UI using mock admin state
9. Real Admin Login / Auth
10. Permission hardening

Priority note:

After View Plan, build Tukar Hadiah before Gerak Kerja. Tukar Hadiah carries the highest participant value and the most privacy-sensitive logic, so it should be proven earlier while the app is still mock-data first.

Album Rahsia and Previous Reunion detail pages are placeholders only for MVP.

---

## 2. Feature Planning Source

The project repo must include a dedicated planning folder before implementation begins.

Folder:

```text
/features-plan
```

This folder contains all Markdown PRDs and is the source of truth for MVP implementation.

Codex must read the relevant PRD before building or changing any feature.

The repo should also include:

```text
/DESIGN.md
```

`DESIGN.md` defines product atmosphere, visual style, typography, layout rules, component styling, responsive behaviour, and implementation preferences.

---

## 3. Required Folder Structure

```text
/DESIGN.md

/features-plan
  01-homepage-card-deck-prd.md
  02-view-plan-prd.md
  03-tukar-hadiah-prd.md
  04-gerak-kerja-prd.md
  05-admin-edit-mode-prd.md
  06-placeholder-pages-prd.md
  07-build-plan.md
  README.md
  /references
    homepage-concept.png
```

---

## 4. Features Plan README Requirement

Create:

```text
/features-plan/README.md
```

Recommended README content:

```md
# Features Plan

This folder contains the product and feature planning documents for Arkib Reunion Negara.

These Markdown files are the source of truth for implementation.

Codex and contributors must read the relevant PRD before building or changing a feature.

## Documents

- `01-homepage-card-deck-prd.md`
- `02-view-plan-prd.md`
- `03-tukar-hadiah-prd.md`
- `04-gerak-kerja-prd.md`
- `05-admin-edit-mode-prd.md`
- `06-placeholder-pages-prd.md`
- `07-build-plan.md`

## Related Design File

Read `/DESIGN.md` before implementing UI.

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

Do not start implementation without checking the relevant PRD.
```

---

## 5. Core Product Shape

Arkib Reunion Negara is a simple card-based reunion archive.

It should let users:

- See the current reunion summary
- Open View Plan
- Open Tukar Hadiah
- Open Gerak Kerja
- See Album Rahsia as Coming Soon
- Open Previous Reunion cards into intentional placeholder pages

It should let admins, eventually:

- Edit content
- Manage plans
- Manage gift exchange
- Manage tasks
- Preview guest mode

---

## 6. Tech Direction

Recommended stack:

```text
Next.js
React
TypeScript
Base UI
CSS Modules
Global CSS variables
next/font
Mock data first
Supabase later for auth and database
Vercel deployment
```

Use Base UI for accessible unstyled primitives where behaviour matters.

Use custom React components and CSS Modules for product-defining UI.

Use mock data first.

Add Supabase later.

This prevents auth and database setup from blocking UI/product progress.

---

## 7. Routes

### Required MVP Routes

```text
/
 /view-plan
 /tukar-hadiah
 /gerak-kerja
 /album-rahsia
 /arkib/[year]
 /admin/login
 /404
```

### Route Behaviour

| Route | Purpose |
|---|---|
| `/` | Homepage with 5-card deck |
| `/view-plan` | Confirmed plan page |
| `/tukar-hadiah` | Gift exchange page |
| `/gerak-kerja` | Task board |
| `/album-rahsia` | Placeholder page |
| `/arkib/[year]` | Previous reunion placeholder page |
| `/admin/login` | Real admin login, final phase |
| `/404` | Generic placeholder / not found page |

---

## 8. Target Source Structure

Recommended structure:

```text
src/components/layout
src/components/ui
src/components/admin

src/features/home
src/features/view-plan
src/features/gifts
src/features/tasks
src/features/placeholder

src/data
src/lib
src/types
src/styles
```

---

## 9. Shared UI Components

Build these app-level components early:

```text
AppShell
Header
AdminToolbar
PageContainer
Button
Badge
Card
PageHeader
SectionHeader
EmptyState
PlaceholderPage
DialogShell
Tabs
FormField
Toast
```

Base UI can be used internally for interactive primitives such as Dialog, Select, Tabs, Menu, Popover, and confirmation dialogs.

Product-facing surfaces should be custom components styled from `DESIGN.md`.

---

## 10. Design Tokens

Create global tokens for:

```text
colour
typography
spacing
radius
shadow
layout width
z-index
motion duration
```

Expected style files:

```text
src/styles/tokens.css
src/styles/globals.css
```

Use:

```text
Fraunces for display typography
Geist Sans for body/UI
Geist Mono for labels/badges/card numbers
```

---

## 11. Data Strategy

### Phase 1 Data

Use mock data files.

Suggested structure:

```text
src/data/event.ts
src/data/homepage.ts
src/data/view-plan.ts
src/data/gift-exchange.ts
src/data/tasks.ts
src/data/archive.ts
```

### Later Data

Move mock data into Supabase tables.

Do not block the UI build on database setup.

---

# Build Phases

## 12. Build Phase 0: Repo Orientation

### Goal

Inspect the repo, confirm planning files, confirm stack, and identify mismatches before coding.

### Codex Instruction

Before writing code, Codex must inspect:

```text
/DESIGN.md
/features-plan/README.md
/features-plan/07-build-plan.md
/features-plan/references/homepage-concept.png
```

Codex should report:

1. Current framework and stack detected
2. Current folder structure
3. Whether `/DESIGN.md` is present
4. Whether all `/features-plan` files are present
5. Whether the concept image is present
6. Whether Base UI is already installed
7. Recommended target structure
8. Mismatches between current repo and target structure
9. Safest first implementation step

### Acceptance Criteria

- No code changes are made.
- Missing files are clearly listed.
- The first implementation step is confirmed.

---

## 13. Build Phase 1: Project Foundation

### Goal

Create the project shell, planning folder alignment, routes, styles, and base app structure.

### Build

- Confirm `/DESIGN.md`
- Confirm `/features-plan`
- Confirm `/features-plan/README.md`
- Create or align Next.js app structure
- Set up TypeScript
- Set up global styles
- Set up CSS Modules convention
- Set up `next/font` with Fraunces, Geist Sans, and Geist Mono
- Install/add Base UI if needed
- Create required route stubs
- Create mock data folder

### Required Route Stubs

```text
/
 /view-plan
 /tukar-hadiah
 /gerak-kerja
 /album-rahsia
 /arkib/[year]
 /admin/login
 generic not-found/404 route
```

### Acceptance Criteria

- App runs locally
- All required routes exist as stubs
- Fonts are configured
- Global style tokens exist
- Base source folders exist
- Mock data folder exists
- No feature logic is required yet

---

## 14. Build Phase 2: Shared UI Foundation

### Goal

Create reusable UI and layout components before building features.

### Build

- `AppShell`
- `Header`
- `PageContainer`
- `Button`
- `Badge`
- `Card`
- `PageHeader`
- `SectionHeader`
- `EmptyState`
- `PlaceholderPage`
- `DialogShell`
- `Tabs`
- `FormField`
- `Toast`
- `AdminToolbar`, mock only

### Rules

- Base UI may be used inside `DialogShell`, `Tabs`, `Select`, `Menu`, and related primitives.
- Visual styling should come from CSS Modules and global tokens.
- Components should be usable across Homepage, View Plan, Tukar Hadiah, and Gerak Kerja.
- Keep components simple and composable.

### Acceptance Criteria

- Shared components compile
- Components have basic states
- Components are styled from tokens
- No feature-specific data logic is included
- AdminToolbar can render with mock admin state

---

## 15. Build Phase 3: Homepage / Card Deck

### Goal

Build the main homepage experience.

### Route

```text
/
```

### Build

- Hero copy
- 5-card horizontal deck
- default active card: Fail Semasa
- bold surrounding cards
- white/off-white centre summary card
- carousel dots
- desktop side-card visibility
- mobile horizontal swipe
- Previous Reunion strip
- Album Rahsia card

### Required References

Read:

```text
/DESIGN.md
/features-plan/01-homepage-card-deck-prd.md
/features-plan/06-placeholder-pages-prd.md
/features-plan/references/homepage-concept.png
```

### Links

| Card | Destination |
|---|---|
| View Plan | `/view-plan` |
| Tukar Hadiah | `/tukar-hadiah` |
| Summary | `/view-plan` |
| Gerak Kerja | `/gerak-kerja` |
| Album Rahsia | `/album-rahsia` |
| Previous Reunion | `/arkib/[year]` |

### Acceptance Criteria

- Homepage matches final card deck direction
- Summary card is centred by default
- Cards are swipeable on mobile
- Album Rahsia opens placeholder route
- Previous Reunion cards open placeholder routes
- Visual direction follows `/DESIGN.md`
- Feature logic is not implemented yet

---

## 16. Build Phase 4: Placeholder Pages

### Goal

Create intentional placeholder pages for unbuilt features.

### Routes

```text
/album-rahsia
/arkib/[year]
/404
```

### Generic Placeholder Copy

```text
Belum diproses.

Fail ini belum diproses oleh pihak berwajib.

Balik ke Arkib
```

### Album Rahsia Copy

```text
Belum diproses.

Album ini belum diproses oleh pihak berwajib.

Balik ke Arkib
```

### Previous Reunion Copy

```text
Belum diproses.

Arkib ini belum diproses oleh pihak berwajib.

Balik ke Arkib
```

### Acceptance Criteria

- Placeholder pages do not feel broken
- CTA returns to homepage
- Unknown routes show generic placeholder / 404
- No gallery, upload, album password, or archive detail is built

---

## 17. Build Phase 5: View Plan

### Goal

Build the read-only View Plan page first, then add mock admin controls.

### Route

```text
/view-plan
```

### Sections

```text
Program
Outfit
Menu Makan
Accommodation
```

Important decisions are not their own tab. Section-level decision records open from the relevant section through `View Keputusan`.

### Build Read-Only First

- page header
- back link
- controlled tabs that switch content in place
- mobile fixed bottom tab bar
- Program timeline/list
- Outfit day cards
- Menu Makan sections
- Accommodation details
- section-level `View Keputusan` actions
- decision modal content
- PIC display
- guest empty states

### Then Add Mock Admin Controls

Using mock state:

```ts
const isAdmin = true
```

Admin controls:

```text
Edit Plan
Tambah Keputusan
Tambah Outfit
Tambah Section
Tambah Menu
Tambah Program
Edit
Delete
Save Changes
Cancel
Preview
```

### Editing Pattern

- Add/edit via dialogs
- Delete with confirmation
- Page-level edit mode allowed
- Save to local state first
- No database required yet

### Acceptance Criteria

- Guest view is clean and read-only
- Admin controls only appear when mock `isAdmin` is true
- Tabs switch content without anchor jumps
- Mobile uses a fixed bottom tab bar
- Add/edit/delete works against local/mock state
- Empty states differ between guest and admin

---

## 18. Build Phase 6: Tukar Hadiah

### Goal

Build gift exchange logic and participant flow.

### Route

```text
/tukar-hadiah
```

### Build Order

#### 6.1 Setup Display

- budget
- instructions
- PIC
- draw status

#### 6.2 Participant Access

- name input
- PIN input
- login to participant view using mock participant data

#### 6.3 Wishlist

- participant can save own wishlist
- wishlist stored in local/mock state first

#### 6.4 Assignment View

Before draw:

```text
Cabutan belum dibuat.
Wishlist boleh isi dulu. Suspense simpan kemudian.
```

After draw:

```text
Anda beli hadiah untuk
[Recipient Name]
```

#### 6.5 Admin Management

Using mock admin state:

- edit setup
- add participant
- edit participant
- delete participant
- run draw
- re-run draw with warning
- view all assignments

### Draw Rules

- minimum 3 participants
- no self-assignment
- one recipient per participant
- one giver per participant
- no exclusions for MVP

### Privacy Rule

Even before real auth, structure the code so participant view only receives the participant’s own assignment.

Do not casually pass full assignment list into participant components.

### Acceptance Criteria

- Participant can enter name + PIN
- Participant can save wishlist
- Participant sees no assignment before draw
- Admin can run draw
- Draw prevents self-assignment
- Participant sees assigned recipient after draw
- Participant sees assigned recipient wishlist
- Participant cannot see all assignments
- Admin can view all assignments

---

## 19. Build Phase 7: Gerak Kerja

### Goal

Build the organiser task board.

### Route

```text
/gerak-kerja
```

### Statuses

```text
To Do
Doing
Blocked
Done
```

### Build Read-Only First

- grouped tasks by status
- task cards
- owner display
- description display
- status chip
- PIC display
- empty states

### Then Add Mock Admin Controls

Admin can:

- add task
- edit task
- delete task
- change status using dropdown

### Acceptance Criteria

- Desktop supports 4-column board
- Mobile uses stacked sections with status tabs
- Admin can manage tasks using dialogs
- Status dropdown moves tasks between groups
- Guest cannot see edit controls

---

## 20. Build Phase 8: Admin Login / Auth

### Goal

Replace mock admin state with real admin login.

### Route

```text
/admin/login
```

### Recommended Implementation

Use Supabase Auth.

### Replace Mock Admin

Remove:

```ts
const isAdmin = true
```

Replace with real session/admin check.

### Admin Behaviour

- admin can log in
- admin session persists
- admin toolbar appears
- admin can preview guest view
- admin can log out
- after login, return user to previous route

### Acceptance Criteria

- Guest does not see admin toolbar
- Logged-in admin sees admin toolbar
- Admin controls are hidden in preview mode
- Admin can log out
- Mock admin toggle is removed before deployment

---

## 21. Build Phase 9: Database + Permission Hardening

### Goal

Move from mock data to persistent data and protect write actions.

### Suggested Supabase Tables

```text
events
homepage_cards
previous_reunions
decision_records
poll_options
outfit_plans
menu_sections
menu_items
program_items
gift_exchanges
gift_participants
gift_assignments
tasks
admin_users
```

### Required Protection

All write actions must check admin permission.

Protected actions:

- create record
- update record
- delete record
- run gift draw
- re-run gift draw
- view full assignments
- view participant PINs

### Participant Privacy

Participant access must be scoped.

Participants should only access:

- own participant record
- own wishlist
- own assignment
- assigned recipient wishlist

Do not expose:

- all participants with PINs
- all assignments
- admin setup controls

### Acceptance Criteria

- Data persists after refresh
- Admin write actions require auth
- Guest cannot mutate data
- Participant cannot access full assignment list
- Mock data is removed or used only as seed data
- Supabase RLS or server-side permission checks are in place

---

## 22. Recommended Component Structure

```text
src/components/layout/AppShell.tsx
src/components/layout/Header.tsx
src/components/admin/AdminToolbar.tsx

src/components/ui/Button.tsx
src/components/ui/Badge.tsx
src/components/ui/Card.tsx
src/components/ui/PageHeader.tsx
src/components/ui/SectionHeader.tsx
src/components/ui/EmptyState.tsx
src/components/ui/PlaceholderPage.tsx
src/components/ui/DialogShell.tsx
src/components/ui/Tabs.tsx
src/components/ui/FormField.tsx
src/components/ui/Toast.tsx

src/features/home/HomeCardDeck.tsx
src/features/home/HomeCard.tsx
src/features/home/PreviousReunionStrip.tsx

src/features/view-plan/ViewPlanPage.tsx
src/features/view-plan/DecisionSection.tsx
src/features/view-plan/OutfitSection.tsx
src/features/view-plan/MenuSection.tsx
src/features/view-plan/ProgramSection.tsx

src/features/tasks/GerakKerjaPage.tsx
src/features/tasks/TaskBoard.tsx
src/features/tasks/TaskCard.tsx
src/features/tasks/TaskDialog.tsx

src/features/gifts/TukarHadiahPage.tsx
src/features/gifts/ParticipantLogin.tsx
src/features/gifts/WishlistForm.tsx
src/features/gifts/AssignmentView.tsx
src/features/gifts/AdminGiftPanel.tsx
```

---

## 23. What Not To Build

Do not build for MVP:

- Album gallery
- photo upload
- album password
- flipbook
- full previous reunion detail
- drag-and-drop tasks
- RSVP
- payment tracking
- comments
- notifications
- WhatsApp integration
- complex roles
- visual theme editor
- full CMS dashboard
- analytics

---

## 24. Build Guardrails

### Product Guardrails

- The app should feel simple
- The homepage is the visual hero
- Feature pages should be calmer
- Keep mobile readable
- Keep copy short
- Do not over-joke in forms and errors
- Use `/DESIGN.md` as the design source

### Technical Guardrails

- Build UI with mock data first
- Keep data types close to PRD models
- Avoid overbuilding auth too early
- Keep components reusable
- Separate guest and admin rendering clearly
- Protect write actions before deployment
- Do not expose sensitive gift assignment data to participants

---

## 25. Final MVP Completion Criteria

The MVP is complete when:

- Homepage loads with final card deck
- View Plan works in guest and admin modes
- Tukar Hadiah participant flow works
- Tukar Hadiah draw logic works
- Gerak Kerja works in guest and admin modes
- Album Rahsia opens placeholder
- Previous Reunion cards open placeholders
- Generic 404 uses approved placeholder copy
- Admin login works
- Admin toolbar works
- Mock admin toggle is removed
- Data persists
- Write actions are protected
- Mobile layouts are usable
- The app keeps the Arkib Reunion Negara tone and design direction
