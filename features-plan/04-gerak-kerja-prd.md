# Feature PRD: Gerak Kerja

## 1. Feature Summary

**Gerak Kerja** is the organiser task board for Arkib Reunion Negara.

It shows what needs to be done, who owns it, what is currently in progress, what is blocked, and what has been completed.

The feature should stay lightweight. It is not meant to become Trello, Jira, Notion, or a committee punishment portal.

Core purpose:

    Siapa buat apa, apa dah siap, dan apa yang sangkut.

## Implementation Priority

Build Gerak Kerja after Tukar Hadiah.

Reason:

- Gerak Kerja is still part of MVP, but its task-board rules are simpler than Tukar Hadiah's privacy and draw logic.
- Building it after Tukar Hadiah lets shared admin/edit patterns reuse the participant-safe data boundaries established by the gift exchange flow.

## 2. Feature Goal

Gerak Kerja should help users quickly answer:

- What tasks exist?
- Who owns each task?
- What is currently being worked on?
- What is blocked?
- What is already done?

For admins, it should help them:

- Add tasks
- Edit task details
- Update task status
- Delete tasks
- Keep the committee work visible and manageable

## 3. User Types

## Guest / Participant

For MVP, guests can view Gerak Kerja in read-only mode.

Guests can:

- View task board
- View task title
- View owner
- View description
- View status
- View PIC names, if available

Guests cannot:

- Add tasks
- Edit tasks
- Delete tasks
- Move tasks
- See admin controls
- See admin-only empty prompts

## Admin / Committee

Admins can:

- Add task
- Edit task
- Delete task
- Change task status
- Update task owner
- Update task description
- View all task statuses

For MVP, committee users can be treated as admins if the app does not yet support separate committee roles.

# 4. Access Model

## MVP Access

    Public read-only, admin editable.

Anyone with the reunion link can view Gerak Kerja.

Only admins can edit.

## Future Option

Later, Gerak Kerja can become committee-only if the group wants task visibility to be private.

Do not build complex permissions for MVP.

# 5. Page Structure

## Desktop Structure

    ← Balik ke Arkib

    Gerak Kerja
    Siapa buat apa, apa dah siap.              [Tambah Tugas]

    [To Do] [Doing] [Blocked] [Done]

    ---------------------------------------------------------
    To Do              Doing             Blocked        Done
    Belum jalan.       Sedang dibuat.    Ada sangkut.   Selesai.

    [Task Card]        [Task Card]       [Task Card]    [Task Card]
    [Task Card]        [Task Card]                      [Task Card]
    ---------------------------------------------------------

## Mobile Structure

Do not force a four-column Kanban board on mobile.

Use horizontal status tabs with stacked sections.

    ← Arkib

    Gerak Kerja
    Siapa buat apa, apa dah siap.

    [To Do] [Doing] [Blocked] [Done]

    To Do
    Belum jalan.

    [Task Card]
    [Task Card]

## Mobile Behaviour

Recommended MVP behaviour:

    Status tabs anchor-scroll to stacked sections.

This is simpler and more reliable than drag-and-drop or tiny mobile columns.

# 6. Page Header Copy

## Guest View

### Title

    Gerak Kerja

### Subtitle

    Siapa buat apa, apa dah siap.

### Back Link

    Balik ke Arkib

## Admin View

### Title

    Gerak Kerja

### Subtitle

    Kemaskini tugasan yang orang akan pura-pura tak nampak.

### Primary CTA

    Tambah Tugas

# 7. Status Columns

Use four fixed statuses.

    To Do
    Doing
    Blocked
    Done

## Why English Status Labels

Keep these labels in English because:

- They are short
- They are familiar Kanban labels
- They fit mobile better
- They avoid heavier Malay wording

## Status Helper Copy

### To Do

    Belum jalan.

### Doing

    Sedang diusahakan.

### Blocked

    Ada benda sangkut.

### Done

    Selesai. Tahniah kecil-kecilan.

# 8. Task Data Model

    type TaskStatus = "To Do" | "Doing" | "Blocked" | "Done"

    type Task = {
      id: string
      eventId: string
      title: string
      owner: string
      description?: string
      status: TaskStatus
      picNames?: string[]
      createdAt: string
      updatedAt: string
    }

## Field Notes

| Field         | Requirement |
|---------------|-------------|
| `title`       | Required    |
| `owner`       | Required    |
| `description` | Optional    |
| `status`      | Required    |
| `picNames`    | Optional    |
| `eventId`     | Required    |
| `createdAt`   | Required    |
| `updatedAt`   | Required    |

# 9. Task Card

## Card Fields

Show:

- Task title
- Owner
- Description, if available
- Status chip
- PIC, if available

## Display Labels

    Owner
    PIC
    Status

## Example Task Card

    Confirm homestay payment

    Owner
    Aina

    Description
    Check final amount and confirm payment deadline.

    Status
    Doing

## In-tone Example

    Collect gift exchange names

    Owner
    Mira

    Description
    Pastikan semua orang masuk senarai sebelum cabutan jadi penuh tuduhan.

    Status
    To Do

## Empty Field Rules

- If description is missing, hide description area
- If PIC is missing, hide PIC row
- Do not show `No PIC`
- Do not show empty labels

# 10. Admin Controls

Admin controls are visible only to admin users.

## Main Admin CTA

    Tambah Tugas

## Task Card Actions

    Edit
    Delete
    Change Status

## Status Change

MVP should use a status dropdown.

    Change status
    To Do
    Doing
    Blocked
    Done

Do not build drag-and-drop for MVP.

Reason:

- Better for mobile
- Easier to implement
- More accessible
- Less likely to break

Drag-and-drop can be added later as progressive enhancement.

# 11. Add Task Flow

## Trigger

Admin clicks:

    Tambah Tugas

## Dialog Title

    Tambah Tugas

## Dialog Description

    Tambah kerja yang perlu dibuat supaya ia tak hidup dalam kepala seorang saja.

## Fields

    Task title
    Owner
    Description
    Status
    PIC names

## Default Status

    To Do

## CTA

    Save Task

## Validation

Required fields:

- Task title
- Owner
- Status

Validation messages:

    Masukkan nama tugas.
    Masukkan owner.
    Pilih status.

# 12. Edit Task Flow

## Trigger

Admin clicks:

    Edit

## Dialog Title

    Edit Tugas

## Dialog Description

    Kemaskini tugasan ini sebelum ia menjadi legenda group chat.

## Fields

Same as Add Task:

    Task title
    Owner
    Description
    Status
    PIC names

## CTA

    Save Changes

## Success Toast

    Tugas dikemaskini.

# 13. Delete Task Flow

## Trigger

Admin clicks:

    Delete

## Confirmation Title

    Padam tugas ini?

## Confirmation Description

    Tugas ini akan dibuang dari Gerak Kerja. Pastikan memang tak perlu, bukan sekadar malas tengok.

## Confirm CTA

    Padam

## Cancel CTA

    Cancel

## Success Toast

    Tugas dipadam.

# 14. Status Update Flow

## Trigger

Admin changes task status using dropdown.

## Behaviour

- Status updates immediately after save
- Task moves to the correct status group
- Show success toast

## Success Toast

    Status tugas dikemaskini.

## Error Toast

    Tak dapat simpan tugas. Cuba lagi.

# 15. Empty States

## Whole Board Empty

### Guest

    Belum ada gerak kerja direkodkan.

### Admin

    Tambah tugas pertama sebelum semua yakin orang lain tengah buat.

### Admin CTA

    Tambah Tugas

## Status Empty States

### To Do Empty

    Tiada tugas baru.

### Doing Empty

    Belum ada yang sedang jalan.

### Blocked Empty

    Tiada yang sangkut. Mencurigakan, tapi bagus.

### Done Empty

    Belum ada yang selesai.

# 16. Toast / Feedback Copy

## Task Created

    Tugas ditambah. Negara bergerak sedikit.

## Task Updated

    Tugas dikemaskini.

## Task Deleted

    Tugas dipadam.

## Status Updated

    Status tugas dikemaskini.

## Save Error

    Tak dapat simpan tugas. Cuba lagi.

# 17. Visual Design Direction

Gerak Kerja should be calmer than the homepage card deck.

Use:

- white or warm white background
- green feature accent
- clean task cards
- light borders
- status chips
- simple column headers
- generous spacing
- minimal illustration, optional

Avoid:

- heavy dashboard styling
- dense tables
- drag-and-drop-only interactions
- excessive colors
- full-card rainbow treatment
- huge hero illustrations
- file, folder, or stamp visuals

# 18. Status Chip Treatment

| Status  | Suggested Treatment |
|---------|---------------------|
| To Do   | Neutral outline     |
| Doing   | Green accent        |
| Blocked | Red or amber accent |
| Done    | Muted green or grey |

Status chip must remain readable on mobile.

# 19. Layout Requirements

## Desktop

- Use 4-column Kanban-style layout
- Keep board horizontally comfortable
- Avoid cramped cards
- Use clear status headers
- Add task button in page header
- Cards may be dragged later, but not MVP

## Tablet

- Use 2-column or horizontal scroll board if needed
- Preserve readable card width
- Do not shrink columns too much

## Mobile

- Use stacked sections
- Status tabs stay near top
- Tabs can be sticky and horizontally scrollable
- Cards stack vertically
- No desktop-style tiny columns
- Add Task button should remain easy to access for admins

# 20. Interaction Requirements

## Guest

- Can open Gerak Kerja
- Can view tasks grouped by status
- Can use status tabs to jump between sections
- Cannot see admin controls

## Admin

- Can add task
- Can edit task
- Can delete task
- Can update status
- Can view same board as guests with admin controls added

## Status Tabs

- Tabs should anchor-scroll to sections
- Active state updates on click
- Scroll spy is nice to have, not required for MVP

# 21. Accessibility Requirements

- Status tabs must be keyboard accessible
- Task cards must use semantic headings
- Buttons must have clear labels
- Edit/Delete actions must have accessible names
- Delete requires confirmation
- Status dropdown must be keyboard accessible
- Touch targets minimum 44px
- Text contrast must remain readable
- Toasts should not be the only way to understand critical failures

# 22. Security / Permission Requirements

## Guest

Read-only access.

## Admin

Write access.

## Requirement

Do not expose task mutation endpoints to non-admin users.

Client UI hiding is not enough. Server-side or backend permission checks are required.

# 23. Out of Scope

Do not build for MVP:

- drag-and-drop task movement
- task comments
- file attachments
- due dates
- task priority
- labels/tags
- subtasks
- reminders
- notifications
- activity logs
- assignment mentions
- recurring tasks
- link to Menu Makan
- link to Tukar Hadiah
- complex committee roles

# 24. Acceptance Criteria

This feature is complete when:

- Gerak Kerja page loads from homepage card
- Guest users can view tasks grouped by status
- Guest users cannot see edit controls
- Admin users can see `Tambah Tugas`
- Admin users can add a task
- Admin users can edit a task
- Admin users can delete a task with confirmation
- Admin users can change task status using dropdown
- Tasks appear under the correct status group
- Whole-board empty state displays correctly
- Status-specific empty states display correctly
- Mobile layout uses stacked sections, not cramped four-column board
- Desktop layout supports four status columns
- Status tabs work on mobile and desktop
- Feature uses green accent and clean task cards
- No drag-and-drop is required for MVP
- No file/folder/stamp visual motif appears
