import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./lib/auth";

// Singleton event summary. Returns the one row, or null before seeding.
export const get = query({
  args: {},
  handler: async (ctx) => ctx.db.query("event").first()
});

export const update = mutation({
  args: {
    name: v.string(),
    dateText: v.string(),
    durationText: v.string(),
    location: v.string(),
    participantCount: v.number(),
    note: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const event = await ctx.db.query("event").first();
    if (!event) throw new Error("Tiada rekod event.");
    await ctx.db.patch(event._id, args);
  }
});
