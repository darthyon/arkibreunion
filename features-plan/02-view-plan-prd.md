# Feature PRD: View Plan

## 1. Feature Summary

**View Plan** is the main read-only plan page for Arkib Reunion Negara.

It shows the confirmed reunion plan in a calm, document-like interface:

1. Program
2. Outfit
3. Menu Makan
4. Accommodation

Important decisions are not their own tab. They are supporting records opened from the relevant section through a `View Keputusan` action.

The page should feel like an official-but-unserious plan document, not a dashboard.

## 2. Feature Goal

The View Plan page should help users quickly answer:

- What is the schedule?
- What should we wear?
- What are we eating?
- Where are we staying?
- Who is responsible for each section?
- What decision record explains a section, if needed?

For future admin mode, the page should remain easy to extend with edit controls without becoming a separate complex admin dashboard.

## 3. User Types

## Guest / Participant

Can:

- View all plan tabs
- Switch between tabs without scroll jumps
- Open reference links
- Open section-level decision records
- View PIC metadata
- View menu assignments
- View programme schedule

Cannot:

- Add content
- Edit content
- Delete content
- See admin-only empty prompts
- See edit controls

## Admin (Future Scope)

Can eventually:

- See `Edit Plan` button
- Enter edit mode
- Add/edit/delete records
- Save changes
- Cancel changes
- Preview guest view

Admin edit mode is not part of the current read-only implementation.

# 4. Page Structure

## Desktop Structure

    Header
    ← Balik ke Arkib

    View Plan
    Semua plan yang dah rasmi.

    [Program] [Outfit] [Menu Makan] [Accommodation]

    01  Program                         PIC: Committee

    [Programme timeline]

Tabs switch content in place. They do not scroll to anchors.

## Mobile Structure

    ← Balik ke Arkib

    View Plan
    Semua plan yang dah rasmi.

    01  Program
        PIC: Committee

    [Programme timeline]

    Bottom tab bar:
    [Program] [Outfit] [Menu] [Accommodation]

Mobile uses a fixed bottom tab bar so users can switch sections without returning to the top of the page.

## Layout Rules

- Use a centered readable content column
- Recommended max width: 880-960px
- Use clean cards and readable rows
- Avoid dashboard density
- Avoid anchor-jump navigation for tabs
- Avoid decorative labels or eyebrows in page/modal headers
- On mobile, keep content stacked and keep bottom tab bar clear of content

# 5. Page Header Copy

## Guest View

### Title

    View Plan

### Subtitle

    Semua plan yang dah rasmi.

### Back Link

    Balik ke Arkib

## Admin View (Future Scope)

### Title

    View Plan

### Subtitle

    Kemaskini plan yang orang akan rujuk.

### Primary Action

    Edit Plan

# 6. Section Navigation

## Tabs

    Program
    Outfit
    Menu Makan
    Accommodation

## Behaviour

- Use proper Base UI Tabs behavior
- Tabs are controlled state, not anchor links
- Default tab is `Program`
- Desktop tabs sit below the page header
- Mobile tabs become a fixed bottom navigation bar
- Tabs may use small icons
- Active tab uses black filled treatment
- Do not make each section a separate page for MVP

# 7. Section Header Pattern

Each tab section uses a compact header:

    [Number]  Section Title
              PIC: Name, Name

              [View Keputusan]

Rules:

- Section title has no descriptive sublabel
- PIC is plain metadata under the title, not a badge
- Hide PIC metadata if there are no PIC names
- `View Keputusan` appears only when the section has decision records
- `View Keputusan` is a black primary button
- Do not style PIC like a button or badge
- Do not show per-card decision text when a section-level decision modal exists

# 8. Decision Records

## Purpose

Decision records explain why a section exists, especially when decisions came from WhatsApp polls or group discussions.

Decision records are opened through `View Keputusan` from a relevant section header.

There is no standalone `Keputusan` tab in the current UX.

## Modal Behaviour

- Use Base UI Dialog
- Modal title is a single title: `Keputusan`
- Modal title is visually small, rendered at h3 scale
- No modal eyebrow
- No modal description under the title
- Modal body lists one or more decision records
- Do not show PIC inside the decision modal
- Do not use warm/yellow tinted blocks inside modal content
- Do not use cards inside cards
- Future admin modals may add a footer for Save/Cancel actions

## Decision Types

A decision can be:

1. Text decision
2. Poll result decision

## Fields

    PlanDecision {
      id: string
      linkedTo: "plan" | "outfit" | "menu" | "accommodation" | "date" | "transport" | "other"
      title: string
      finalDecision: string
      type: "text" | "poll"
      source?: string
      note?: string
      pollOptions?: PollOption[]
      picNames: string[]
    }

    PollOption {
      id: string
      label: string
      voteCount: number
      isWinner?: boolean
    }

## Modal Text Decision Example

    Keputusan

    Penginapan
    Group discussion. Dipilih sebab senang untuk 3 hari 2 malam.

    Keputusan rasmi
    A'Famosa Resort, Melaka

## Modal Poll Decision Example

    Keputusan

    Tema Outfit Hari 1
    WhatsApp poll. Menang cukup selesa, tiada rayuan rasmi diterima.

    Keputusan rasmi
    White + Denim

    White + Denim      18 undi
    Earth Tone         11 undi
    Ikut suka hati      5 undi

# 9. Section: Program

## Purpose

Show the reunion schedule by day and time.

## Section Header

### Title

    Program

### Metadata

    PIC: Mira, Committee, Haziq, Aina, Sarah

PIC names are aggregated from programme items.

## Fields

    ProgramItem {
      id: string
      dayNumber: number
      time: string
      title: string
      location?: string
      notes?: string
      picNames: string[]
    }

## Program Item Example

    Hari 1
    10:00 AM

    Check-in
    Lobby
    Jangan terus hilang lepas ambil kunci.

## Notes

- Program is schedule-only
- No RSVP
- No attendance tracking
- No calendar sync
- No poll snippets by default
- PIC is not shown per row in guest view once section-level PIC exists

# 10. Section: Outfit

## Purpose

Show outfit themes by day.

## Section Header

### Title

    Outfit

### Metadata

    PIC: Aina, Mira, Sarah

### Action

    View Keputusan

PIC names are aggregated from outfit items.

## Fields

    OutfitPlan {
      id: string
      dayNumber: number
      themeName: string
      description?: string
      imageReferenceUrl?: string
      decisionId?: string
      picNames: string[]
    }

## Outfit Card Example

    Hari 1

    White + Denim

    Clean, casual, dan tidak terlalu cosplay pengawas.

    Buka Rujukan

## Notes

- Outfit image is a reference link only
- No image upload required for MVP
- No moodboard
- No “who is wearing what”
- No outfit attendance tracking
- Do not show individual decision notes on outfit cards
- Section decision modal owns the poll/history

# 11. Section: Menu Makan

## Purpose

Show the food plan as a clean menu, including who is assigned to bring or prepare each item.

## Section Header

### Title

    Menu Makan

### Metadata

    PIC: Aina, Haziq, Sarah, Mira, Committee

### Action

    View Keputusan

For current MVP, PIC names are aggregated from assigned menu item people.

## Fields

    MenuSection {
      id: string
      title: string
      decisionId?: string
      items: MenuItem[]
    }

    MenuItem {
      id: string
      name: string
      description?: string
      assignedPerson?: string
    }

## Menu Section Example

    Mains

    Nasi Arab
    Fragrant rice, ayam bakar, acar.
    Assigned: Aina

    Mee Goreng
    Pilihan selamat untuk yang datang lapar betul.
    Assigned: Haziq

## Notes

- Menu assignment stays inside Menu Makan
- Do not connect Menu Makan to Gerak Kerja for MVP
- No budget
- No payment tracker
- No menu item status
- Menu item rows should remain neutral, no warm/yellow tint

# 12. Section: Accommodation

## Purpose

Show the confirmed accommodation.

## Section Header

### Title

    Accommodation

### Metadata

    PIC: Aina, Mira

### Action

    View Keputusan

## Fields

    AccommodationPlan {
      id: string
      name: string
      stayPeriod: string
      location: string
      roomNote: string
      decisionId?: string
      picNames: string[]
    }

## Accommodation Card Example

    20-22 Jun 2026

    A'Famosa Resort, Melaka

    Melaka

    Bilik ikut keluarga kecil dan geng yang masih percaya boleh tidur lewat.

# 13. PIC Pattern

PIC appears as plain section metadata.

## Field

    picNames: string[]

## Display Examples

    PIC: Aina
    PIC: Aina, Mira
    PIC: Committee

## Rules

- Show PIC under the section title
- Do not style PIC as a badge
- Do not style PIC as a button
- Hide PIC if there are no names
- Do not show `No PIC`
- Avoid repeated per-card/per-row PIC when the section header already has aggregated PIC

# 14. Add/Edit Dialogs (Future Scope)

Admin add/edit actions should use Base UI Dialog patterns.

## Dialog Rules

- One modal title only
- No decorative eyebrow
- No description unless it materially helps the form
- Use body rows/sections, not nested card surfaces
- Use footer for form actions
- Primary action uses black filled button
- Secondary action uses neutral surface or outline
- No warm/yellow component fill
- UI font weight must not exceed 600

## Add Decision

### Title

    Tambah Keputusan

### Fields

- Tajuk keputusan
- Final decision
- Type: Text / Poll
- Source
- Note
- Poll options, if poll

### CTA

    Save Decision

## Add Outfit

### Title

    Tambah Outfit

### Fields

- Hari
- Tema
- Description
- Image reference link
- Related decision, optional
- PIC names

### CTA

    Save Outfit

## Add Menu Item

### Title

    Tambah Menu

### Fields

- Category
- Item name
- Description
- Assigned person

### CTA

    Save Menu

## Add Program

### Title

    Tambah Program

### Fields

- Hari
- Masa
- Activity title
- Location
- Notes
- PIC names

### CTA

    Save Program

# 15. Admin Edit Mode (Future Scope)

## Entry

Only admins see:

    Edit Plan

When clicked, the page enters edit mode.

## Edit Mode Banner

    Anda sedang edit View Plan. Jangan panik, perubahan belum disimpan.

## Edit Mode Actions

    Preview
    Cancel
    Save Changes

## Unsaved Changes Warning

    Ada perubahan belum disimpan. Nak keluar juga?

## Success Toast

    Plan dikemaskini. Rekod negara terselamat.

## Error Toast

    Tak dapat simpan perubahan. Cuba lagi, atau salahkan line dulu.

## Admin Controls

In edit mode, admins see:

- Add buttons per section
- Edit buttons on cards/items
- Delete buttons on cards/items
- Save/Cancel footer or sticky action bar

Guests never see these controls.
