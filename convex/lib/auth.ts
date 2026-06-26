import { getAuthUserId } from "@convex-dev/auth/server";
import type { QueryCtx, MutationCtx } from "../_generated/server";

// Shared admin gate. "Logged-in = admin" — any authenticated user passes.
// Every write mutation calls this; guest-scoped functions (verifyPin,
// getBySession, wishlist-by-token) intentionally do not.
export async function requireAdmin(ctx: QueryCtx | MutationCtx) {
  const userId = await getAuthUserId(ctx);
  if (userId === null) throw new Error("Not authorised");
  return userId;
}
