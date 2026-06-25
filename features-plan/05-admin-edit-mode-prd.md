# Feature PRD: Admin / Edit Mode

## 1. Feature Summary

**Admin / Edit Mode** controls how organisers manage content across Arkib Reunion Negara.

The product should not have a heavy admin dashboard for MVP. Instead, admins edit content directly from the same pages guests see.

Core pattern:

    Guest:
    View content only

    Admin:
    Same page, plus edit controls

Admin Mode applies to:

- Homepage / Card Deck
- View Plan
- Tukar Hadiah
- Gerak Kerja
- Previous Reunion cards
- Album Rahsia Coming Soon state, if needed

Implementation order after View Plan:

1. Tukar Hadiah admin controls
2. Gerak Kerja admin controls
3. Shared admin login/auth hardening

Tukar Hadiah comes first because it has participant privacy rules, draw controls, PIN visibility, and full-assignment admin views that need to be shaped before simpler task editing.

The experience should feel lightweight, obvious, and safe.

## 2. Feature Goal

Admin / Edit Mode should help admins:

- Log in securely
- See edit controls only when authenticated
- Add, edit, and delete content
- Preview what guests see
- Avoid accidental destructive actions
- Keep the public experience clean for guests

The goal is not to build a full CMS. The goal is to let organisers maintain the reunion archive without touching code.

## 3. Core Principle

Admin editing should be layered onto the product.

Do not build a separate “backend-looking” admin panel unless the content truly needs one.

Preferred pattern:

    Open normal page
    Log in as admin
    See admin toolbar / edit buttons
    Edit content in context
    Preview guest view

This keeps the admin experience connected to the actual user experience.

# 4. User Types

## Guest / Participant

Can:

- View public content
- Open View Plan
- Open Tukar Hadiah participant access
- View Gerak Kerja in read-only mode
- View Previous Reunion cards
- See Album Rahsia Coming Soon card

Cannot:

- See edit buttons
- Add content
- Edit content
- Delete content
- See admin-only empty states
- Access admin routes

## Admin

Can:

- Log in
- See admin controls
- Edit event content
- Manage homepage card content
- Manage View Plan
- Manage Tukar Hadiah
- Manage Gerak Kerja
- Manage Previous Reunion records
- Log out

## Committee

For MVP, committee users can be treated as admins.

Do not build complex committee roles yet.

# 5. Access Model

## Guest Access

Guests do not need accounts.

Anyone with the event link can view public pages.

## Admin Access

Admins must log in.

Recommended MVP auth:

    Email + password

Suggested implementation:

    Supabase Auth

Reason:

- Simple
- Secure enough for MVP
- Supports future role expansion
- Avoids building custom auth badly

## Admin Role

Use a simple admin role check.

Example:

    type UserRole = "admin"

For MVP, no need for:

- editor role
- viewer role
- committee role
- granular permission matrix

# 6. Admin Entry Points

## Header Login

Guests see:

    Log masuk

Click opens admin login page or login modal.

## Admin Login Route

Recommended route:

    /admin/login

## After Login

After successful login, admin returns to the page they came from.

Example:

    /admin/login?returnTo=/view-plan

If no return path exists, send admin to homepage.

# 7. Admin Session Behaviour

When logged in, admin sees a small admin toolbar.

## Admin Toolbar

Suggested placement:

- Top of page
- Sticky or semi-sticky
- Not too tall
- Clear but not visually loud

## Toolbar Copy

    Admin Mode
    Editing enabled for organisers.

## Toolbar Actions

    Preview
    Log out

Feature pages may add their own actions:

    Edit Plan
    Tambah Tugas
    Tambah Peserta
    Edit Setup

## Preview Behaviour

Preview temporarily hides admin controls and shows the guest version of the page.

Copy:

    Preview

Exit preview:

    Exit Preview

# 8. Global Admin Visibility Rules

## Guests Must Never See

- Edit buttons
- Add buttons
- Delete buttons
- Admin toolbar
- Admin empty-state prompts
- Internal IDs
- Participant PINs
- Full Tukar Hadiah assignments
- Admin setup controls

## Admins Can See

- Admin toolbar
- Add/edit/delete controls
- Admin empty states
- Setup forms
- Participant PINs
- Full Tukar Hadiah assignments
- Content management actions

## Rule

Client-side hiding is not enough.

All write actions must be protected by backend permission checks.

# 9. Global Editing Pattern

## Preferred MVP Pattern

Use contextual editing.

Admins edit content where it appears.

Examples:

- Homepage card has `Edit`
- View Plan section has `Tambah Outfit`
- Tukar Hadiah has `Tambah Peserta`
- Gerak Kerja has `Tambah Tugas`

## Editing UI

Use dialogs or sheets.

Desktop:

    Modal dialog

Mobile:

    Bottom sheet or full-screen dialog

## Do Not Use

- Large detached admin dashboard
- Complex CMS layout
- Inline editing everywhere
- Tiny hover-only controls
- Drag-and-drop as a required editing method

# 10. Save Pattern

## Default

Most add/edit actions save from their own dialog.

Example:

    Tambah Tugas
    Save Task

## Page-Level Edit Mode

Some pages may also support page-level edit mode.

Example:

    View Plan
    Edit Plan
    Preview
    Cancel
    Save Changes

This is useful when a page has many related records.

## MVP Recommendation

Use this split:

| Area             | Save pattern        |
|------------------|---------------------|
| Homepage content | Dialog save         |
| View Plan        | Edit mode + dialogs |
| Tukar Hadiah     | Dialog save         |
| Gerak Kerja      | Dialog save         |
| Previous Reunion | Dialog save         |

## Unsaved Changes

If a page has unsaved changes, warn before leaving.

Copy:

    Ada perubahan belum disimpan. Nak keluar juga?

# 11. Global Admin Copy

## Login Page

### Title

    Log masuk admin

### Subtitle

    Untuk committee yang diberi kuasa mengubah rekod negara.

### Fields

    Email
    Password

### CTA

    Log masuk

### Error

    Email atau password tak betul. Cuba semak balik.

## Admin Toolbar

### Label

    Admin Mode

### Helper

    Editing enabled for organisers.

### Actions

    Preview
    Log out

## Common Buttons

    Add
    Edit
    Delete
    Save
    Save Changes
    Cancel
    Preview
    Log out

Malay feature-specific CTAs remain allowed:

    Tambah Tugas
    Tambah Keputusan
    Tambah Outfit
    Tambah Peserta

# 12. Global Toast Copy

## Save Success

    Perubahan disimpan. Rekod negara terselamat.

## Save Error

    Tak dapat simpan perubahan. Cuba lagi.

## Delete Success

    Rekod dipadam.

## Delete Error

    Tak dapat padam rekod. Cuba lagi.

## Login Success

    Berjaya log masuk. Kuasa admin diaktifkan.

## Logout Success

    Admin Mode ditutup.

# 13. Delete Confirmation Pattern

All destructive actions require confirmation.

## Generic Delete Confirmation

### Title

    Padam rekod ini?

### Description

    Rekod ini akan dibuang. Pastikan memang tak perlu, bukan sekadar emosi semata-mata.

### Confirm CTA

    Padam

### Cancel CTA

    Cancel

## Higher-Risk Delete

Use stronger copy for actions that affect many people.

Examples:

- Delete participant after draw
- Re-run Tukar Hadiah draw
- Delete a whole menu section
- Delete previous reunion archive

### Stronger Description

    Tindakan ini boleh mengubah maklumat yang orang lain sedang rujuk.

# 14. Feature-Specific Admin Controls

## 14.1 Homepage / Card Deck

Admins can edit:

- Event name
- Year
- Date text
- Duration text
- Location text
- Participant text
- Note
- Hero copy, optional
- Previous reunion cards
- Album Rahsia Coming Soon state, optional

Admin controls:

    Edit Summary
    Edit Card
    Tambah Arkib Lepas
    Edit Arkib
    Delete Arkib

Out of scope:

- Full visual theme editor
- Drag-and-drop card order
- Upload illustrations
- Change core card deck structure

## 14.2 View Plan

Admins can:

- Add/edit/delete Decision Records
- Add/edit/delete Outfit plans
- Add/edit/delete Menu sections/items
- Add/edit/delete Program items
- Add/edit PIC names

Admin controls:

    Edit Plan
    Tambah Keputusan
    Tambah Outfit
    Tambah Section
    Tambah Menu
    Tambah Program

Guest must not see these.

## 14.3 Tukar Hadiah

Admins can:

- Edit setup
- Add/edit/delete participants
- View PINs
- View wishlist status
- Run draw
- Re-run draw
- View all assignments

Admin controls:

    Edit Setup
    Tambah Peserta
    Run Draw
    Run Semula
    Edit
    Delete

Privacy rule:

Participants must never receive the full assignment list in the client payload.

## 14.4 Gerak Kerja

Admins can:

- Add task
- Edit task
- Delete task
- Change task status

Admin controls:

    Tambah Tugas
    Edit
    Delete
    Change Status

MVP status change pattern:

    Status dropdown

No drag-and-drop required.

## 14.5 Album Rahsia

For MVP, Album Rahsia is not a full feature.

Admin may only manage:

- Coming Soon state
- Display copy, optional

Homepage card remains:

    Album Rahsia
    Coming Soon
    Untuk kenangan yang tak sesuai dibiarkan berkeliaran.
    Tak Payah Tunggu

Click state:

    Album belum dibuka. Sabar.

Out of scope:

- Upload photos
- Album password
- Gallery page
- Flipbook
- Storage setup

# 15. Admin Empty States

Use different empty states for guests and admins.

## Guest Empty State

Should explain what is missing without showing admin action.

Example:

    Belum ada gerak kerja direkodkan.

## Admin Empty State

Should include action.

Example:

    Tambah tugas pertama sebelum semua yakin orang lain tengah buat.

CTA:

    Tambah Tugas

## Rule

Do not show admin CTAs to guests.

# 16. Validation Pattern

## Required Field Copy

Use direct validation messages.

Examples:

    Masukkan tajuk.
    Masukkan owner.
    Pilih status.
    Masukkan nama peserta.
    Masukkan PIN.

## Guardrail

Do not joke too much in validation errors.

When users are stuck, clarity wins.

# 17. Visual Design Direction

Admin Mode should not ruin the public design.

Use:

- small admin toolbar
- light admin badges
- clean edit buttons
- subtle outlines
- clear destructive buttons
- contextual controls near content

Avoid:

- huge admin panels
- dense tables everywhere
- dark enterprise dashboard styling
- admin UI that changes the whole product mood
- hover-only controls
- cluttering guest layouts

## Admin Control Treatment

Suggested patterns:

- Small outline buttons for Edit
- Red/destructive style for Delete
- Primary filled button for Add
- Toast for feedback
- Dialog for forms

# 18. Routes

Recommended routes:

    /
     /view-plan
     /tukar-hadiah
     /gerak-kerja
     /admin/login

Optional:

    /admin

If `/admin` exists, it should be a simple admin landing page only.

It can show shortcuts:

    Edit Homepage
    Edit View Plan
    Manage Tukar Hadiah
    Manage Gerak Kerja

Do not make `/admin` the primary editing experience.

# 19. Data Model

## Admin User

    type AdminUser = {
      id: string
      email: string
      role: "admin"
      createdAt: string
      updatedAt: string
    }

## Event Admin

If multiple events are supported later:

    type EventAdmin = {
      id: string
      eventId: string
      userId: string
      role: "admin"
      createdAt: string
    }

For MVP with one event, this can be simplified.

# 20. Permission Checks

## Required

All write operations must check admin permission.

Protected actions:

- Create record
- Update record
- Delete record
- Run Tukar Hadiah draw
- Re-run Tukar Hadiah draw
- View all gift assignments
- View participant PINs
- Manage previous reunion cards

## Rule

Do not rely only on UI hiding.

Backend permission checks are required.

Suggested implementation with Supabase:

- Supabase Auth for admin login
- Row Level Security where applicable
- Server actions/API routes check authenticated admin session

# 21. Audit / History

Not required for MVP.

Nice to have later:

- show last updated timestamp
- show updated by admin name/email
- simple content revision history

For MVP, each editable record should at least have:

    createdAt: string
    updatedAt: string

Optional:

    updatedBy?: string

# 22. Responsive Requirements

## Desktop

- Admin toolbar visible but compact
- Dialogs centered
- Edit buttons placed near sections/cards
- Admin controls should not crowd content

## Mobile

- Admin toolbar collapses cleanly
- Forms use full-screen dialog or bottom sheet
- Buttons must be at least 44px high
- Avoid hover-only admin controls
- Keep destructive buttons separated from regular actions

# 23. Accessibility Requirements

- Login form has proper labels
- Error messages are visible and announced
- Admin buttons have clear accessible names
- Dialogs trap focus
- Escape key closes non-destructive dialogs
- Delete confirmations require explicit confirm
- Preview mode can be exited by keyboard
- Touch targets minimum 44px
- Toasts should not be the only source of critical feedback

# 24. Security Requirements

## MVP Must-Haves

- Admin authentication
- Protected admin routes
- Protected write actions
- Secure handling of session
- No participant PINs exposed to guests
- No full Tukar Hadiah assignments exposed to participants
- No mutation endpoints available to unauthenticated users

## Nice to Have Later

- password reset
- multi-admin invite flow
- role management
- audit log
- rate limiting on login
- admin activity history

# 25. Out of Scope

Do not build for MVP:

- complex role permissions
- committee-only partial access
- full CMS dashboard
- visual theme builder
- media library
- audit log
- version history
- scheduled publishing
- approvals workflow
- notifications
- email invite system
- analytics dashboard

# 26. Acceptance Criteria

This feature is complete when:

- Admin can log in from `Log masuk`
- Admin session persists while browsing
- Admin sees Admin Mode toolbar
- Guest does not see Admin Mode toolbar
- Admin can access edit controls on supported pages
- Guest cannot see edit controls
- Admin can preview guest view
- Admin can log out
- Write actions are protected by backend permission checks
- Admin-only empty states appear only for admins
- Guest empty states appear for guests
- Delete actions require confirmation
- Save success and error toasts display correctly
- Mobile admin controls remain usable
- View Plan, Tukar Hadiah, and Gerak Kerja follow the same admin visibility rules
- Album Rahsia remains Coming Soon only for MVP
