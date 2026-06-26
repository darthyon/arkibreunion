import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./lib/auth";

// Singleton gift-exchange config. Returns the one row, or null before seeding.
export const get = query({
  args: {},
  handler: async (ctx) => ctx.db.query("giftExchange").first()
});

export const update = mutation({
  args: {
    budgetText: v.optional(v.string()),
    description: v.optional(v.string()),
    picNames: v.array(v.string())
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const exchange = await ctx.db.query("giftExchange").first();
    if (!exchange) throw new Error("Tiada konfigurasi Tukar Hadiah.");
    await ctx.db.patch(exchange._id, args);
  }
});

// Server-side draw: pairs each participant with the next in a shuffled ring
// (everyone gives once, receives once, never themselves). Admin-only. Replaces
// any prior assignments so re-running is safe.
export const runDraw = mutation({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);

    const exchange = await ctx.db.query("giftExchange").first();
    if (!exchange) throw new Error("Tiada konfigurasi Tukar Hadiah.");

    const participants = await ctx.db.query("participants").collect();
    if (participants.length < 3) {
      throw new Error("Perlu sekurang-kurangnya 3 peserta untuk cabutan.");
    }

    const previous = await ctx.db.query("assignments").collect();
    for (const assignment of previous) {
      await ctx.db.delete(assignment._id);
    }

    const ids = participants.map((p) => p._id);
    for (let i = ids.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }

    for (let i = 0; i < ids.length; i += 1) {
      await ctx.db.insert("assignments", {
        giverParticipantId: ids[i],
        receiverParticipantId: ids[(i + 1) % ids.length]
      });
    }

    await ctx.db.patch(exchange._id, {
      isDrawn: true,
      drawnAt: new Date().toISOString()
    });

    return { count: ids.length };
  }
});
