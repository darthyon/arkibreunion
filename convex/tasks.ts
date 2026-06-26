import { query } from "./_generated/server";

// All tasks, oldest first. Kanban groups by status client-side. Small set.
export const list = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("tasks").collect();
    return all.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }
});
