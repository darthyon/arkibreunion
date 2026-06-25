# Feature PRD: Tukar Hadiah

## 1. Feature Summary

**Tukar Hadiah** manages the reunion gift exchange.

It allows admins to add participants, set simple gift rules, run a random draw, and let each participant privately see who they need to buy a gift for.

Participants access this feature using:

- Name
- PIN/code

No full account system is required for MVP.

The feature should feel simple, private, slightly suspenseful, and easy enough for non-technical users.

## Implementation Priority

Build Tukar Hadiah immediately after View Plan.

Reason:

- It is the highest-value participant feature after the plan page.
- It includes the most important privacy rule in the MVP: participants must only see their own assignment and assigned recipient wishlist.
- Its draw logic should be validated before moving on to the simpler task-board workflow.

## 2. Feature Goal

Tukar Hadiah should help users quickly answer:

- Am I in the gift exchange?
- What is the gift budget?
- Who am I buying for?
- What does that person want?
- Can I submit or update my wishlist?
- Has the draw already happened?

For admins, it should answer:

- Who is participating?
- Who has submitted a wishlist?
- Has the draw been run?
- Who is assigned to whom?

## 3. User Types

## Guest / Participant

Can:

- Enter name + PIN
- View gift exchange rules
- Submit or update own wishlist
- View assigned recipient after draw
- View assigned recipient’s wishlist
- See simple draw status

Cannot:

- See all assignments
- See other wishlists unless assigned to that person
- Run draw
- Edit other participants
- Add/delete participants

## Admin

Can:

- Add participants
- Assign or generate PINs
- Set gift budget
- Add instructions
- View participant list
- View wishlist submission status
- Run draw
- Re-run draw, with warning
- View all assignments
- Edit participant details
- Delete participants before draw

# 4. Access Model

## Participant Access

Participant enters:

    Name
    PIN

If matched, participant enters their personal Tukar Hadiah view.

## Admin Access

Admin must be logged in.

Only admins can see:

- Admin panel
- Participant list
- Draw controls
- All assignments
- Edit/delete controls

## Privacy Rule

Participant only sees:

- Their own name
- Their own wishlist
- Their assigned recipient
- Assigned recipient’s wishlist

Participant must never see the full assignment list.

# 5. Main Page Structure

## Guest Landing View

    ← Balik ke Arkib

    Tukar Hadiah
    Cabutan nama, wishlist, dan sedikit unsur suspen.

    Budget: RM50–RM80
    Status: Draw belum dibuat / Draw sudah dibuat

    [Masukkan Nama]
    [Masukkan PIN]

    [Masuk]

## Participant View

    ← Balik ke Arkib

    Tukar Hadiah
    Akses peribadi untuk hadiah yang kononnya rahsia.

    Hello, Aina.

    Wishlist Saya
    [Wishlist text]
    [Save Wishlist]

    Cabutan Saya
    You are buying for:
    Mira

    Wishlist Mira
    Suka: stationery, tote bag, benda warna hijau
    Elak: mug, sebab dah banyak sangat

## Admin View

    ← Balik ke Arkib

    Tukar Hadiah
    Kemaskini peserta, wishlist, dan cabutan hadiah.

    [Edit Setup] [Tambah Peserta] [Run Draw]

    Gift Budget
    RM50–RM80

    Instructions
    Beli hadiah yang berguna. Jangan beli benda yang membuat orang termenung.

    Participants
    [Participant cards/table]

    Assignments
    [Visible after draw]

# 6. UX Copy

## Page Header

### Guest View

**Title**

    Tukar Hadiah

**Subtitle**

    Cabutan nama, wishlist, dan sedikit unsur suspen.

### Participant View

**Subtitle**

    Akses peribadi untuk hadiah yang kononnya rahsia.

### Admin View

**Subtitle**

    Kemaskini peserta, wishlist, dan cabutan hadiah.

# 7. Gift Exchange Setup

## Fields

    GiftExchange {
      id: string
      eventId: string
      picNames: string[]
      budgetText?: string
      description?: string
      isDrawn: boolean
      drawnAt?: string
    }

## Display Fields

- Budget
- Instructions
- PIC
- Draw status

## Example

    Budget
    RM50–RM80

    Instructions
    Beli hadiah yang berguna. Jangan beli benda yang membuat orang termenung.

    PIC
    Aina, Mira

    Status
    Draw belum dibuat

# 8. Participant Data

## Fields

    GiftParticipant {
      id: string
      exchangeId: string
      name: string
      pin: string
      wishlist?: string
      hasSubmittedWishlist: boolean
      createdAt: string
      updatedAt: string
    }

## Participant Card: Admin View

    Aina
    PIN: 4821
    Wishlist: Submitted

    [Edit] [Delete]

## Wishlist Status Labels

    Submitted
    Belum isi

Do not over-joke here. Admin needs clarity.

# 9. Assignment Data

## Fields

    GiftAssignment {
      id: string
      exchangeId: string
      giverParticipantId: string
      receiverParticipantId: string
      createdAt: string
    }

## Assignment Card: Admin View

    Aina → Mira
    Wishlist Mira: stationery, tote bag, benda warna hijau

## Assignment Card: Participant View

    Anda beli hadiah untuk

    Mira

    Wishlist
    Stationery, tote bag, benda warna hijau.

# 10. Draw Logic

## Rule

Each participant must be assigned exactly one recipient.

A participant cannot be assigned to themselves.

## Basic MVP Logic

- Admin can run draw once participants are added
- Draw creates one giver-to-recipient assignment per participant
- Each participant receives exactly one giver
- No exclusions for MVP
- No groups/families for MVP

## Minimum Participants

Require at least:

    3 participants

Reason:

Two-person gift exchange is technically possible but feels silly and removes suspense.

## Draw Not Allowed State

If fewer than 3 participants:

    Perlu sekurang-kurangnya 3 peserta untuk cabutan.

## Draw Confirmation

**Title**

    Run cabutan hadiah?

**Description**

    Sistem akan susun siapa beli hadiah untuk siapa. Lepas ini, peserta boleh tengok assignment masing-masing.

**Confirm CTA**

    Run Draw

**Cancel CTA**

    Cancel

# 11. Re-run Draw

Admin can re-run draw, but it must show a strong warning.

## Warning

**Title**

    Run semula cabutan?

**Description**

    Assignment lama akan diganti. Kalau peserta dah tengok nama masing-masing, keadaan mungkin menjadi sedikit diplomatik.

**Confirm CTA**

    Run Semula

**Cancel CTA**

    Cancel

## Requirement

If draw is re-run:

- Delete old assignments
- Generate new assignments
- Update `drawnAt`
- Show success toast

# 12. Participant Access Flow

## Step 1: Enter Name + PIN

Fields:

    Nama
    PIN

CTA:

    Masuk

## Error States

### Name/PIN not found

    Nama atau PIN tak jumpa. Cuba semak balik.

### Draw not run yet

    Cabutan belum dibuat. Wishlist boleh isi dulu, suspense simpan kemudian.

### Participant found

User enters participant view.

# 13. Wishlist Flow

## Wishlist Section Title

    Wishlist Saya

## Helper Copy

    Tulis apa yang anda suka, tak suka, atau benda yang jangan dibeli langsung.

## Placeholder

    Contoh: suka stationery, tote bag, benda warna hijau. Elak mug sebab dah banyak.

## CTA

    Save Wishlist

## Success Toast

    Wishlist disimpan. Semoga orang faham hint.

## Empty Wishlist Display for Assigned Recipient

If assigned recipient has not submitted wishlist:

    Wishlist belum diisi. Anda kini berada dalam mod agak mencabar.

# 14. Participant Assignment View

## Before Draw

    Cabutan belum dibuat.
    Wishlist boleh isi dulu. Nama penerima akan muncul lepas admin run draw.

## After Draw

    Anda beli hadiah untuk

    [Recipient Name]

## Recipient Wishlist Label

    Wishlist [Recipient Name]

## Privacy Note

    Hanya assignment anda dipaparkan di sini.

# 15. Admin Setup/Edit Mode

Admin can edit:

- Budget text
- Instructions
- PIC names

## Setup Form Fields

    Budget
    Instructions
    PIC names

## CTA

    Save Setup

## Success Toast

    Setup Tukar Hadiah dikemaskini.

# 16. Add/Edit Participant

## Add Participant Dialog

**Title**

    Tambah Peserta

**Description**

    Masukkan nama peserta dan PIN ringkas untuk akses peribadi.

**Fields**

    Name
    PIN
    Wishlist, optional

**CTA**

    Save Participant

## Edit Participant Dialog

**Title**

    Edit Peserta

**CTA**

    Save Changes

## Delete Participant Confirmation

**Title**

    Padam peserta ini?

**Description**

    Peserta akan dibuang dari Tukar Hadiah. Kalau cabutan dah dibuat, assignment mungkin perlu run semula.

**Confirm CTA**

    Padam

**Cancel CTA**

    Cancel

# 17. Admin Participant List

## Recommended Display

Use a simple card list on mobile and table/card hybrid on desktop.

## Fields to Show

- Participant name
- PIN
- Wishlist status
- Assignment status
- Actions

## Example

    Aina
    PIN: 4821
    Wishlist: Submitted
    Assignment: Mira

    [Edit] [Delete]

## Assignment Hidden State

Before draw:

    Assignment: Belum draw

After draw:

    Assignment: Mira

# 18. Admin Assignment List

Only visible after draw.

## Header

    Assignment

## Subtitle

    Senarai penuh cabutan. Jangan screenshot kalau tak perlu.

## Assignment Row

    Aina → Mira
    Hafiz → Sarah
    Sarah → Aina
    Mira → Hafiz

## Admin-only Warning

    Senarai ini hanya untuk admin. Jangan rosakkan elemen suspen.

# 19. Empty States

## No Setup Yet

Guest:

    Tukar Hadiah belum disediakan.

Admin:

    Setup Tukar Hadiah dulu sebelum negara mula bertukar hadiah.

CTA:

    Setup Tukar Hadiah

## No Participants

Guest:

    Senarai peserta belum dimasukkan.

Admin:

    Tambah peserta untuk mula cabutan.

CTA:

    Tambah Peserta

## No Draw Yet

Guest:

    Cabutan belum dibuat.

Participant:

    Wishlist boleh isi dulu. Suspense simpan kemudian.

Admin:

    Run draw bila senarai peserta dah lengkap.

CTA:

    Run Draw

# 20. Visual Design Direction

Tukar Hadiah can carry the homepage’s **bold red** as its main feature accent, but the page itself should stay readable.

Use:

- white/warm white page background
- red accent for headers, badges, and primary actions
- clean cards
- gift-themed flat black-and-white illustration
- privacy-focused layout
- clear distinction between participant and admin views

Avoid:

- overly festive Christmas styling
- confetti everywhere
- childish gift graphics
- dense admin tables on mobile
- exposing assignment information too openly

# 21. Interaction Requirements

## Guest

- Can access the Tukar Hadiah landing page
- Can enter name + PIN
- Can see error if credentials do not match

## Participant

- Can save/update own wishlist
- Can see own assignment after draw
- Can see recipient wishlist
- Cannot see all assignments

## Admin

- Can edit setup
- Can add/edit/delete participants
- Can run draw
- Can re-run draw with confirmation
- Can view all assignments

# 22. Responsive Requirements

## Desktop

- Page uses centered layout
- Admin participant list can use card/table hybrid
- Assignment list can use two-column cards if space allows

## Mobile

- All content stacks vertically
- Participant login form is simple and large
- Admin actions stay clear
- Avoid dense table layouts
- Draw button should be visible but not dangerously easy to tap accidentally

# 23. Accessibility Requirements

- Name and PIN fields have labels
- PIN input should support numeric or text PINs
- Buttons have clear labels
- Error messages appear near the form
- Toasts are readable and not the only feedback
- Admin destructive actions require confirmation
- Text contrast must be readable on red accents

# 24. Security / Privacy Requirements

## MVP

- Participants access using name + PIN
- Admin access requires login
- Participant can only query own assignment
- Participant can only view assigned recipient wishlist
- Full assignment list is admin-only

## Important Notes

- PIN should not be displayed to guests
- Admin can view PINs for coordination
- Avoid exposing all assignment data in client-side payloads
- Assignment lookup should be scoped by authenticated participant session or validated server-side

# 25. Out of Scope

Do not build in MVP:

- exclusions
- family/group rules
- gift status tracking
- reveal mode
- delivery tracking
- public assignment list
- email notifications
- WhatsApp integration
- payment collection
- gift recommendation engine
- anonymous comments
- image uploads for wishlist

# 26. Acceptance Criteria

This feature is complete when:

- Tukar Hadiah page loads with setup info and participant login
- Participant can enter name + PIN
- Participant can submit/update wishlist
- Participant sees no assignment before draw
- Participant sees assigned recipient after draw
- Participant sees assigned recipient wishlist only
- Participant cannot see full assignment list
- Admin can edit setup
- Admin can add/edit/delete participants
- Admin can run draw with at least 3 participants
- Draw prevents self-assignment
- Draw creates one assignment per participant
- Admin can view all assignments
- Re-run draw shows warning before replacing assignments
- Guest, participant, and admin empty states display correctly
- Mobile layout remains readable and simple
