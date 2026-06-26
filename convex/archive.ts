import { query } from "./_generated/server";

// Previous reunions, newest year first. Small admin-curated set.
export const list = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("archive").collect();
    return all.sort((a, b) => b.year.localeCompare(a.year));
  }
});
