import { convexAuthNextjsMiddleware } from "@convex-dev/auth/nextjs/server";

// Next.js 16 "proxy" convention (formerly middleware.ts).
// Keeps the Convex Auth session cookie fresh on navigation.
// No route protection here — admin gating happens in-component via the
// currentAdmin query, matching the "same page, plus edit controls" pattern.
export default convexAuthNextjsMiddleware();

export const config = {
  // Run on everything except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
};
