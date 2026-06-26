import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";

// Admin authentication. Single organiser account, email + password.
// "Logged in = admin" — there is no role flag; any authenticated user is admin.
//
// NOTE: the Password provider technically exposes a signUp flow. The login UI
// only calls signIn, and the admin account is created once via `npx convex run`
// (see README handoff). Harden by disabling open signup before going public.
export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password]
});
