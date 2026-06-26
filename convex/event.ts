import { query } from "./_generated/server";

// Singleton event summary. Returns the one row, or null before seeding.
export const get = query({
  args: {},
  handler: async (ctx) => ctx.db.query("event").first()
});
