import { internalMutation } from "./_generated/server";
import type { Id } from "./_generated/dataModel";
import { hashPin } from "./lib/pin";
import {
  seedAccommodation,
  seedArchive,
  seedDecisions,
  seedEvent,
  seedGiftExchange,
  seedMenuSections,
  seedOutfits,
  seedParticipants,
  seedProgramItems,
  seedTasks
} from "./seedData";

// One-time content seed. Run once with `npx convex run seed:run`.
// Idempotent: bails if the singleton `event` row already exists, so re-running
// never duplicates. To re-seed from scratch, clear the tables first.
export const run = internalMutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("event").first();
    if (existing) {
      return { seeded: false, reason: "event already present" };
    }

    await ctx.db.insert("event", seedEvent);

    for (const row of seedArchive) {
      await ctx.db.insert("archive", row);
    }

    for (const row of seedTasks) {
      await ctx.db.insert("tasks", row);
    }

    // Decisions first; remember slug -> _id to resolve children.
    const decisionIdBySlug = new Map<string, Id<"decisions">>();
    for (const { slug, ...decision } of seedDecisions) {
      const id = await ctx.db.insert("decisions", { slug, ...decision });
      decisionIdBySlug.set(slug, id);
    }

    for (const { decisionSlug, ...outfit } of seedOutfits) {
      await ctx.db.insert("outfits", {
        ...outfit,
        decisionId: decisionSlug ? decisionIdBySlug.get(decisionSlug) : undefined
      });
    }

    for (const { decisionSlug, ...section } of seedMenuSections) {
      await ctx.db.insert("menuSections", {
        ...section,
        decisionId: decisionSlug ? decisionIdBySlug.get(decisionSlug) : undefined
      });
    }

    const { decisionSlug: accSlug, ...accommodation } = seedAccommodation;
    await ctx.db.insert("accommodation", {
      ...accommodation,
      decisionId: accSlug ? decisionIdBySlug.get(accSlug) : undefined
    });

    for (const row of seedProgramItems) {
      await ctx.db.insert("programItems", row);
    }

    await ctx.db.insert("giftExchange", seedGiftExchange);

    for (const { name, pin } of seedParticipants) {
      await ctx.db.insert("participants", {
        name,
        pinHash: await hashPin(pin),
        hasSubmittedWishlist: false,
        failedAttempts: 0,
        updatedAt: new Date().toISOString()
      });
    }

    return { seeded: true };
  }
});
