import { query } from "./_generated/server";

// View Plan read queries. All sets are small and admin-curated.

export const decisions = query({
  args: {},
  handler: async (ctx) => ctx.db.query("decisions").collect()
});

export const outfits = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("outfits").collect();
    return all.sort((a, b) => a.dayNumber - b.dayNumber);
  }
});

export const menuSections = query({
  args: {},
  handler: async (ctx) => ctx.db.query("menuSections").collect()
});

export const programItems = query({
  args: {},
  handler: async (ctx) => {
    // Stable sort by day; within a day, insertion (seed) order is chronological
    // — 12h AM/PM strings don't sort correctly lexically, so don't sort on time.
    const all = await ctx.db.query("programItems").collect();
    return all.sort((a, b) => a.dayNumber - b.dayNumber);
  }
});

export const accommodation = query({
  args: {},
  handler: async (ctx) => ctx.db.query("accommodation").first()
});
