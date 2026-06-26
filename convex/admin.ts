import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";

// Returns the current admin, or null if not signed in.
// Logged-in = admin, so any authenticated user resolves here.
export const currentAdmin = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return null;

    const user = await ctx.db.get(userId);
    if (!user) return null;

    return {
      id: user._id,
      name: user.name ?? user.email ?? "Admin"
    };
  }
});
