import { query } from "./_generated/server";

// Singleton gift-exchange config. Returns the one row, or null before seeding.
export const get = query({
  args: {},
  handler: async (ctx) => ctx.db.query("giftExchange").first()
});
