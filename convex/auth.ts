import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";

// Admin authentication. Single organiser account, email + password.
// "Logged in = admin" — there is no role flag; any authenticated user is admin.
//
// Signups are closed: the Password provider exposes a signUp flow, but the
// createOrUpdateUser callback rejects any new user once one already exists.
// The first account bootstraps; everything after is blocked — including direct
// API calls, not just the UI. To add another admin, insert via the Convex
// dashboard or temporarily lift this guard.
export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password],
  callbacks: {
    async createOrUpdateUser(ctx, { existingUserId, profile }) {
      if (existingUserId) return existingUserId;
      const anyUser = await ctx.db.query("users").first();
      if (anyUser) {
        throw new Error("Signups are disabled.");
      }
      return await ctx.db.insert("users", { email: profile.email });
    }
  }
});
