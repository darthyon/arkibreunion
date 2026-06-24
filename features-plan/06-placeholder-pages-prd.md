# Feature PRD: Placeholder Pages / Belum Diproses States

## 1. Feature Summary

The **Placeholder Pages / Belum Diproses States** feature defines how Arkib Reunion Negara handles sections that exist conceptually but are not built for MVP.

This applies to:

- Previous Reunion detail pages
- Album Rahsia page
- Gallery-related routes
- Generic unbuilt routes
- Intentional 404 pages

These pages should not feel like broken links. They should feel like official-but-unserious placeholders that match the product tone.

Core copy:

    Belum diproses.

    Fail ini belum diproses oleh pihak berwajib.

    [Balik ke Arkib]

## 2. Feature Goal

The goal is to support future sections without building them yet.

Users should understand:

- The page exists conceptually
- The content is not ready yet
- They can return to the main archive
- The app is not broken

The tone should remain dry, simple, and official-but-unserious.

## 3. MVP Scope

## Included

- Generic placeholder page
- Previous Reunion placeholder route
- Album Rahsia placeholder route
- Gallery placeholder route, if route exists
- Reusable empty state copy
- Back to homepage CTA
- Simple visual treatment matching the app

## Not Included

- Previous Reunion detail content
- Gallery upload
- Album password
- Photo storage
- Flipbook interaction
- Previous reunion archive management
- Media library
- Full 404 search/recovery system

# 4. Placeholder Types

## 4.1 Generic Placeholder

Used for any route or section that is intentionally not ready.

### Copy

    Belum diproses.

    Fail ini belum diproses oleh pihak berwajib.

    [Balik ke Arkib]

## 4.2 Previous Reunion Placeholder

Used when users click a Previous Reunion card.

Example route:

    /arkib/2025

### Copy

    Belum diproses.

    Arkib ini belum diproses oleh pihak berwajib.

    [Balik ke Arkib]

## 4.3 Album Rahsia Placeholder

Used if users access Album Rahsia route directly or through the homepage card.

Example route:

    /album-rahsia

### Copy

    Belum diproses.

    Album ini belum diproses oleh pihak berwajib.

    [Balik ke Arkib]

## 4.4 Generic 404

Used for unknown routes.

### Copy

    Belum diproses.

    Fail ini belum diproses oleh pihak berwajib.

    [Balik ke Arkib]

For MVP, the generic 404 and generic placeholder page can use the same layout and copy.

# 5. Homepage Integration

## Album Rahsia Card

The homepage card remains visible.

### Card Copy

    Album Rahsia
    Coming Soon
    Untuk kenangan yang tak sesuai dibiarkan berkeliaran.
    Tak Payah Tunggu

## Recommended Behaviour

For MVP, clicking the card can either:

1.  Show a toast
2.  Open `/album-rahsia` placeholder page

Recommended:

    Open /album-rahsia placeholder page

Reason:

It keeps behaviour consistent with Previous Reunion cards and gives users a clear page to land on.

## Previous Reunion Section

The homepage may show a **Reunion Terdahulu** strip.

### Section Copy

    Reunion Terdahulu
    Arkib untuk tahun-tahun yang lepas. Bukti reunion memang pernah berlaku.

### Card CTA

    Lihat Arkib

### Click Behaviour

Each card opens a placeholder detail route.

Example:

    /arkib/2025

The page then shows:

    Belum diproses.

    Arkib ini belum diproses oleh pihak berwajib.

    [Balik ke Arkib]

# 6. Page Structure

## Desktop

    Header

    Centered placeholder card

    Belum diproses.
    Fail ini belum diproses oleh pihak berwajib.

    [Balik ke Arkib]

## Mobile

    Header

    Belum diproses.
    Fail ini belum diproses oleh pihak berwajib.

    [Balik ke Arkib]

The layout should be simple and not over-designed.

# 7. Visual Design Direction

Placeholder pages should feel connected to the product, but quieter than the homepage.

Use:

- white or warm white background
- centered content
- bold heading
- short body copy
- one CTA button
- optional small black-and-white flat illustration
- subtle border or card treatment

Avoid:

- scary error styling
- generic browser-like 404
- red danger treatment
- large broken-page icon
- too much humour
- long explanation text

# 8. Illustration Direction

Illustration is optional.

If used, keep it:

- flat
- black-and-white
- simple
- not mascot-heavy
- not 3D

Suggested visuals:

| Context             | Illustration                 |
|---------------------|------------------------------|
| Generic placeholder | document tray / pending file |
| Previous Reunion    | closed archive box           |
| Album Rahsia        | locked photo stack           |
| 404                 | missing file card            |

Illustrations should not replace the text. Text must still explain the state clearly.

# 9. CTA Behaviour

## Primary CTA

    Balik ke Arkib

## Destination

    /

The CTA returns users to the homepage.

## Secondary CTA

No secondary CTA required for MVP.

Do not add:

- Contact admin
- Try again
- Search
- Report issue

Keep the state intentional and simple.

# 10. Route Mapping

## Required Placeholder Routes

    /album-rahsia
    /arkib/[year]
    /404

## Optional Placeholder Routes

    /gallery
    /arkib

If `/arkib` exists, it may show a simple list of previous reunion cards or reuse the placeholder page.

For MVP, `/arkib/[year]` is enough if the homepage has previous reunion cards.

# 11. Data Requirements

No complex data model is required.

## Previous Reunion Card Data

If the homepage shows Previous Reunion cards:

    type PreviousReunionCard = {
      id: string
      year: number
      title: string
      location?: string
      description?: string
      href: string
    }

Example:

    {
      id: "2025",
      year: 2025,
      title: "Asmarian Gathering 2025",
      location: "Melaka",
      description: "Setiap tahun, alasan yang sama.",
      href: "/arkib/2025"
    }

## Placeholder Page Config

Optional reusable config:

    type PlaceholderPageConfig = {
      title: string
      body: string
      ctaLabel: string
      ctaHref: string
      illustrationKey?: string
    }

# 12. Admin Requirements

For MVP, admin does not need to manage placeholder page content.

Admin may manage Previous Reunion cards only if this is already part of Homepage/Card Deck editing.

## Admin Can Edit, Optional

- Previous reunion card title
- Year
- Location
- Short description
- Link

## Admin Cannot Yet

- Add full archive content
- Upload photos
- Manage gallery
- Publish Album Rahsia
- Add password to Album Rahsia

These belong to later phases.

# 13. Empty State Copy Library

Use these as reusable placeholder bodies.

## Generic

    Fail ini belum diproses oleh pihak berwajib.

## Previous Reunion

    Arkib ini belum diproses oleh pihak berwajib.

## Album Rahsia

    Album ini belum diproses oleh pihak berwajib.

## Feature Section

    Bahagian ini belum diproses oleh pihak berwajib.

## Page Title

    Belum diproses.

## CTA

    Balik ke Arkib

# 14. Accessibility Requirements

- Placeholder title should be a proper page heading
- CTA should be keyboard accessible
- Text contrast must be readable
- Page should not rely only on illustration
- If illustration exists, use decorative alt text or empty alt if not informative
- Mobile tap target must be at least 44px high

# 15. Responsive Requirements

## Desktop

- Placeholder content centered
- Max content width around 480–640px
- CTA below body copy

## Mobile

- Content has comfortable padding
- CTA full-width or clearly tappable
- No tiny illustration
- No excessive vertical whitespace

# 16. Out of Scope

Do not build for MVP:

- photo upload
- gallery browsing
- album password
- signed image URLs
- previous reunion detail editor
- archive timeline
- comments
- likes
- downloads
- share controls
- search
- filtering
- media management
- full custom 404 recovery

# 17. Acceptance Criteria

This feature is complete when:

- `/album-rahsia` shows an intentional placeholder page
- `/arkib/[year]` shows an intentional placeholder page
- Unknown routes show the generic placeholder or 404 page
- Placeholder copy uses approved wording
- CTA returns user to homepage
- The page does not feel like a broken error
- The visual style matches Arkib Reunion Negara
- Album Rahsia remains Coming Soon for MVP
- Previous Reunion cards can link to placeholder pages
- No gallery, upload, password, or archive detail functionality is built
