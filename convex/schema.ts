import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

// Reusable validators ---------------------------------------------------------

const picNames = v.array(v.string());

// Schema ----------------------------------------------------------------------
// Rule applied throughout: nest small (owned, never queried alone),
// table big (independently CRUD'd by admin). Relations use v.id("table").

export default defineSchema({
  // Convex Auth tables (users, sessions, accounts, ...). Admin accounts live here.
  ...authTables,

  // --- Gerak Kerja (kanban) ---------------------------------------------------
  tasks: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    ownerName: v.string(),
    picNames: v.optional(picNames),
    status: v.union(
      v.literal("todo"),
      v.literal("doing"),
      v.literal("blocked"),
      v.literal("done")
    ),
    createdAt: v.string(),
    updatedAt: v.string()
  }),

  // --- View Plan --------------------------------------------------------------
  decisions: defineTable({
    slug: v.string(),
    linkedTo: v.union(
      v.literal("plan"),
      v.literal("outfit"),
      v.literal("menu"),
      v.literal("accommodation"),
      v.literal("date"),
      v.literal("transport"),
      v.literal("other")
    ),
    title: v.string(),
    finalDecision: v.string(),
    type: v.union(v.literal("text"), v.literal("poll")),
    source: v.optional(v.string()),
    note: v.optional(v.string()),
    // NESTED: poll options only exist inside a decision
    pollOptions: v.optional(
      v.array(
        v.object({
          slug: v.string(),
          label: v.string(),
          voteCount: v.number(),
          isWinner: v.optional(v.boolean())
        })
      )
    ),
    picNames
  }).index("by_slug", ["slug"]),

  outfits: defineTable({
    dayNumber: v.number(),
    themeName: v.string(),
    description: v.optional(v.string()),
    imageReferenceUrl: v.optional(v.string()),
    decisionId: v.optional(v.id("decisions")),
    picNames
  }),

  menuSections: defineTable({
    title: v.string(),
    decisionId: v.optional(v.id("decisions")),
    // NESTED: menu items only exist inside a section
    items: v.array(
      v.object({
        slug: v.string(),
        name: v.string(),
        description: v.optional(v.string()),
        assignedPerson: v.optional(v.string())
      })
    )
  }),

  programItems: defineTable({
    dayNumber: v.number(),
    time: v.string(),
    title: v.string(),
    location: v.optional(v.string()),
    notes: v.optional(v.string()),
    picNames
  }),

  // Singleton: one row, queried with .first()
  accommodation: defineTable({
    name: v.string(),
    stayPeriod: v.string(),
    location: v.string(),
    roomNote: v.string(),
    decisionId: v.optional(v.id("decisions")),
    picNames
  }),

  // --- Event summary (singleton) ----------------------------------------------
  event: defineTable({
    name: v.string(),
    dateText: v.string(),
    durationText: v.string(),
    location: v.string(),
    participantCount: v.number(),
    note: v.optional(v.string())
  }),

  // --- Homepage card deck -----------------------------------------------------
  homeCards: defineTable({
    slug: v.string(),
    number: v.string(),
    title: v.string(),
    badge: v.optional(v.string()),
    description: v.string(),
    cta: v.string(),
    href: v.string(),
    tone: v.string(),
    illustration: v.string(),
    countdownTargetDate: v.optional(v.string()),
    isComingSoon: v.optional(v.boolean()),
    // NESTED: summary rows only exist inside a card
    summaryRows: v.optional(
      v.array(
        v.object({
          label: v.string(),
          value: v.string(),
          icon: v.string()
        })
      )
    )
  }).index("by_slug", ["slug"]),

  // --- Previous reunions archive ----------------------------------------------
  archive: defineTable({
    year: v.string(),
    title: v.string(),
    description: v.string()
  }),

  // --- Tukar Hadiah -----------------------------------------------------------
  // Singleton: the exchange config
  giftExchange: defineTable({
    picNames,
    budgetText: v.optional(v.string()),
    description: v.optional(v.string()),
    isDrawn: v.boolean(),
    drawnAt: v.optional(v.string())
  }),

  // Participants double as the guest-PIN identity table.
  // PINs are hashed at rest. failedAttempts/lockedUntil drive rate limiting.
  participants: defineTable({
    name: v.string(),
    pinHash: v.string(), // "saltHex:derivedHex" — PBKDF2, never plaintext
    wishlist: v.optional(v.string()),
    hasSubmittedWishlist: v.boolean(),
    failedAttempts: v.number(),
    lockedUntil: v.optional(v.number()), // epoch ms; set after too many fails
    // Opaque random token set on successful PIN login. Cookie holds this, not
    // the participant id — unguessable, so no impersonation by id-swapping.
    sessionToken: v.optional(v.string()),
    updatedAt: v.string()
  })
    .index("by_name", ["name"])
    .index("by_session_token", ["sessionToken"]),

  assignments: defineTable({
    giverParticipantId: v.id("participants"),
    receiverParticipantId: v.id("participants")
  })
});
