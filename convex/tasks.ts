import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./lib/auth";

const status = v.union(
  v.literal("todo"),
  v.literal("doing"),
  v.literal("blocked"),
  v.literal("done")
);

// All tasks, oldest first. Kanban groups by status client-side. Small set.
export const list = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("tasks").collect();
    return all.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    ownerName: v.string(),
    picNames: v.optional(v.array(v.string())),
    status
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const now = new Date().toISOString();
    return ctx.db.insert("tasks", { ...args, createdAt: now, updatedAt: now });
  }
});

export const update = mutation({
  args: {
    id: v.id("tasks"),
    title: v.string(),
    description: v.optional(v.string()),
    ownerName: v.string(),
    picNames: v.optional(v.array(v.string())),
    status
  },
  handler: async (ctx, { id, ...fields }) => {
    await requireAdmin(ctx);
    await ctx.db.patch(id, { ...fields, updatedAt: new Date().toISOString() });
  }
});

export const setStatus = mutation({
  args: { id: v.id("tasks"), status },
  handler: async (ctx, { id, status }) => {
    await requireAdmin(ctx);
    await ctx.db.patch(id, { status, updatedAt: new Date().toISOString() });
  }
});

export const remove = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, { id }) => {
    await requireAdmin(ctx);
    await ctx.db.delete(id);
  }
});
