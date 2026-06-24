# Feature PRD: Homepage / Card Deck

## 1. Feature Summary

The homepage is the main entry point for **Arkib Reunion Negara**.

It uses a **5-card horizontal deck** as the primary navigation and product surface. The center/default card is the current reunion summary. Surrounding cards link to the main features:

1.  View Plan
2.  Tukar Hadiah
3.  Fail Semasa / Reunion Summary
4.  Gerak Kerja
5.  Album Rahsia

The design should feel bold, clean, card-based, and easy to use. It should not use the previous folder/file/stamp metaphor.

## 2. Feature Goal

The homepage should help users quickly answer:

- What reunion is this?
- What is the key event info?
- Where do I check the plan?
- Where do I check Tukar Hadiah?
- Where do I check Gerak Kerja?
- Where will the private album live?
- Where can I see previous reunions?

The page should work well on both web and mobile.

## 3. User Types

### Guest / Participant

Can:

- View homepage
- Swipe/scroll card deck
- Open View Plan
- Open Tukar Hadiah
- Open Gerak Kerja
- See Album Rahsia Coming Soon state
- View previous reunion cards

### Admin

Can:

- Log in from header/menu
- Eventually edit homepage event data from admin area

Admin editing is not part of this homepage MVP unless already available globally.

## 4. UX Structure

### Desktop Layout

    Header

    Hero copy

    5-card deck carousel:
    01 View Plan
    02 Tukar Hadiah
    03 Fail Semasa / Summary
    04 Gerak Kerja
    05 Album Rahsia

    Carousel dots / arrows

    Previous Reunion section

### Mobile Layout

    Header

    Hero copy

    Horizontal swipe card deck:
    01 View Plan
    02 Tukar Hadiah
    03 Fail Semasa / Summary
    04 Gerak Kerja
    05 Album Rahsia

    Dots

    Previous Reunion horizontal strip

The center/default card should be the **Fail Semasa / Summary** card.

## 5. Header Requirements

### Desktop Header

Show:

- Brand: `Arkib Reunion Negara`
- Navigation:
  - `Utama`
  - `Reunion`
  - `Arkib`
  - `Bantuan`
- Button:
  - `Log masuk`
- Optional menu icon if needed

### Mobile Header

Show:

- Brand: `Arkib Reunion Negara`
- Menu icon

Do not show dense nav on mobile.

## 6. Hero Copy

### Eyebrow

    REKOD RASMI

### Headline

    Rancang reunion. Simpan rekod. Elak tanya dalam WhatsApp 14 kali.

### Supporting Copy

    Tempat rasmi untuk simpan keputusan, tugasan, dan kenangan. Bukan sekadar bergantung pada chat yang tenggelam.

### UX Notes

- Hero should not dominate the page too much.
- The card deck is the main visual focus.
- Hero copy should sit above the card deck and set tone quickly.

## 7. Card Deck Requirements

### Card Count

There are 5 cards.

    01 View Plan
    02 Tukar Hadiah
    03 Fail Semasa
    04 Gerak Kerja
    05 Album Rahsia

### Default Active Card

The default active card is:

    03 Fail Semasa

### Desktop Behaviour

- Cards are horizontally arranged.
- Center card is slightly larger or visually more prominent.
- Left and right cards are visible.
- Users can navigate using arrows or horizontal scroll.
- Carousel dots show current active card.
- Cards should be clickable.

### Mobile Behaviour

- Cards are horizontally swipeable.
- Cards should snap to center.
- Current summary card should be the default active card.
- Dots show current position.
- Tap targets must be at least 44px high.

# 8. Card Content

## 8.1 Card 01: View Plan

### Card Number

    01

### Title

    View Plan

### Description

    Apa pakai, apa makan, apa jadi, semua dekat sini.

### CTA

    Lihat Plan

### Destination

    /view-plan

### Visual

- Bold blue background
- Black-and-white flat illustration
- Suggested illustration: clipboard + hanger + calendar

## 8.2 Card 02: Tukar Hadiah

### Card Number

    02

### Title

    Tukar Hadiah

### Description

    Cabutan nama, wishlist, dan sedikit unsur suspen.

### CTA

    Lihat Hadiah

### Destination

    /tukar-hadiah

### Visual

- Bold red background
- Black-and-white flat illustration
- Suggested illustration: gift box + question tag

## 8.3 Card 03: Fail Semasa / Summary

### Card Number

    03

### Badge

    FAIL SEMASA

### Title

    Asmarian Gathering 2026

### Body

    Rekod rasmi untuk gathering yang katanya reunion tapi tahunan.

### Details

    Tarikh    20–22 Jun 2026
    Tempoh    3 Hari 2 Malam
    Lokasi    A’Famosa Resort, Melaka
    Peserta   58 orang berdaftar
    Nota      Jangan lupa bawa buah tangan.

### CTA

    Lihat Ringkasan

### Destination

    /view-plan

### Visual

- White or warm off-white background
- Should be the visual anchor of the deck
- Minimal illustration or small icon only
- Do not make this card too colorful

## 8.4 Card 04: Gerak Kerja

### Card Number

    04

### Title

    Gerak Kerja

### Description

    Untuk kerja yang perlu jalan, bukan sekadar dibincangkan.

### CTA

    Lihat Tugas

### Destination

    /gerak-kerja

### Visual

- Bold green background
- Black-and-white flat illustration
- Suggested illustration: checklist + pen

## 8.5 Card 05: Album Rahsia

### Card Number

    05

### Badge

    Coming Soon

### Title

    Album Rahsia

### Description

    Untuk kenangan yang tak sesuai dibiarkan berkeliaran.

### CTA

    Tak Payah Tunggu

### Destination

For MVP, no real destination required.

### CTA Behaviour

When clicked, show lightweight toast/message:

    Album belum dibuka. Sabar, negara sedang memproses.

### Future Destination

    /album-rahsia

### Visual

- Bold yellow background
- Black-and-white flat illustration
- Suggested illustration: locked photo stack / camera

# 9. Previous Reunion Section

## Section Title

    Reunion Terdahulu

## Supporting Text

    Arkib untuk tahun-tahun yang lepas. Bukti reunion memang pernah berlaku.

## Section CTA

    Lihat semua arkib

## Previous Reunion Card Fields

Each previous reunion card should show:

- Reunion name
- Year
- Location
- Optional participant count
- Optional date
- Small black-and-white illustration or thumbnail
- CTA: `Lihat Arkib`

### Example Cards

    Asmarian Gathering 2025
    Setiap tahun, alasan yang sama.
    Lihat Arkib
    Asmarian Gathering 2024
    Hujan lebat, tetap jadi.
    Lihat Arkib
    Asmarian Gathering 2023
    Permulaan yang tak dirancang.
    Lihat Arkib

# 10. Visual Design Requirements

## Overall Direction

- White or warm white main background
- Bold flat color cards
- Center summary card stays white/off-white
- Surrounding cards use bold colors
- Illustrations are black-and-white and flat
- Typography is editorial but readable
- No folder UI
- No file tabs
- No stamp UI
- No pastel-heavy direction
- No glossy 3D icons

## Card Colors

| Card         | Color             |
|--------------|-------------------|
| View Plan    | Bold blue         |
| Tukar Hadiah | Bold red          |
| Summary      | White / off-white |
| Gerak Kerja  | Bold green        |
| Album Rahsia | Bold yellow       |

## Illustration Style

- Flat
- Black-and-white
- Simple
- Slightly witty if possible
- Not mascot-heavy
- Not 3D
- Not childish

# 11. Typography

Recommended:

    Display: Instrument Serif
    Body: Inter or Geist
    Accent / card numbers: Geist Mono or IBM Plex Mono

Use display font for:

- Hero headline
- Card titles
- Previous reunion section title

Use body font for:

- Descriptions
- Metadata
- CTAs
- Navigation

Use mono font for:

- `REKOD RASMI`
- Card numbers
- `FAIL SEMASA`
- Small labels

# 12. Interaction Requirements

## Carousel

Must support:

- horizontal scroll
- snap to card
- active card state
- dots indicator
- optional left/right arrows on desktop
- swipe on mobile

## Card Click

Each card should be clickable except Album Rahsia if still Coming Soon.

If Album Rahsia is clicked during Coming Soon state, show toast/message.

## Accessibility

- Cards must be keyboard focusable
- Arrows must have accessible labels
- Dots should not be the only navigation method
- Text contrast must be readable on bold card backgrounds
- CTA buttons must be obvious

# 13. Responsive Requirements

## Desktop

- Center 5-card carousel on page
- Center summary card by default
- Side cards visible
- Previous reunion strip below

## Tablet

- Reduce card width
- Keep horizontal scroll
- Keep card deck centered around active card

## Mobile

- Show one main card at a time with partial next/previous card if possible
- Swipe horizontally
- Header collapses to brand + menu
- Previous reunion strip scrolls horizontally

# 14. Data Model

## Homepage Event Summary

    type HomepageEventSummary = {
      id: string
      name: string
      year: number
      dateText: string
      durationText: string
      locationText: string
      participantText?: string
      note?: string
      description: string
    }

## Homepage Card

    type HomepageCard = {
      id: string
      order: number
      type: "view_plan" | "gift_exchange" | "summary" | "tasks" | "album"
      title: string
      badge?: string
      description: string
      ctaLabel: string
      href?: string
      isComingSoon?: boolean
      colorToken: string
      illustrationKey?: string
    }

## Previous Reunion

    type PreviousReunion = {
      id: string
      name: string
      year: number
      location?: string
      dateText?: string
      participantCount?: number
      description?: string
      href: string
      illustrationKey?: string
    }

# 15. Empty / Edge States

## No Previous Reunions

Show:

    Belum ada arkib lama.
    Tahun ini kita mula jadi orang tersusun.

## Album Coming Soon Click

Show toast:

    Album belum dibuka. Sabar, negara sedang memproses.

## Missing Event Data

If date/location is missing, hide that row from the summary card. Do not show empty labels.

# 16. Out of Scope

Do not build in this homepage feature:

- full View Plan page
- Tukar Hadiah logic
- Gerak Kerja Kanban
- Album upload/viewing
- Admin editor
- real account management
- image upload
- real notification system

This feature only builds the homepage/card deck shell and navigation entry points.

# 17. Acceptance Criteria

The feature is complete when:

- Homepage loads with header, hero copy, 5-card deck, and previous reunion strip
- Summary card is centered/default active
- All card copy matches approved UX copy
- Cards are horizontally scrollable on desktop and mobile
- Cards snap properly during scroll/swipe
- View Plan, Tukar Hadiah, and Gerak Kerja cards link to their routes
- Album Rahsia shows Coming Soon state and toast on click
- Previous reunion cards display correctly
- Design uses bold card colors and white center summary card
- No folder/file/stamp visual motif remains
- Layout works on desktop, tablet, and mobile
- Buttons and cards are accessible via keyboard
