import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./lib/auth";

// Previous reunions, newest year first. Small admin-curated set.
export const list = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("archive").collect();
    return all.sort((a, b) => b.year.localeCompare(a.year));
  }
});

export const create = mutation({
  args: { year: v.string(), title: v.string(), description: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    return ctx.db.insert("archive", args);
  }
});

export const update = mutation({
  args: { id: v.id("archive"), year: v.string(), title: v.string(), description: v.string() },
  handler: async (ctx, { id, ...fields }) => {
    await requireAdmin(ctx);
    await ctx.db.patch(id, fields);
  }
});

export const remove = mutation({
  args: { id: v.id("archive") },
  handler: async (ctx, { id }) => {
    await requireAdmin(ctx);
    await ctx.db.delete(id);
  }
});
