import { v } from "convex/values";
import {
  action,
  internalMutation,
  internalQuery,
  mutation,
  query,
  type MutationCtx
} from "./_generated/server";
import { internal } from "./_generated/api";
import { hashPin, verifyPinHash } from "./lib/pin";
import { requireAdmin } from "./lib/auth";

const MAX_ATTEMPTS = 5;
const LOCK_MS = 5 * 60 * 1000; // 5 min cooldown after too many fails

// --- Guest PIN login --------------------------------------------------------

// Internal: look up a participant by name (case-insensitive match handled here).
export const _getByName = internalQuery({
  args: { name: v.string() },
  handler: async (ctx, { name }) => {
    const all = await ctx.db.query("participants").collect();
    const lower = name.trim().toLowerCase();
    return all.find((p) => p.name.toLowerCase() === lower) ?? null;
  }
});

export const _recordFailure = internalMutation({
  args: { participantId: v.id("participants") },
  handler: async (ctx, { participantId }) => {
    const p = await ctx.db.get(participantId);
    if (!p) return;
    const failedAttempts = p.failedAttempts + 1;
    await ctx.db.patch(participantId, {
      failedAttempts,
      lockedUntil:
        failedAttempts >= MAX_ATTEMPTS ? Date.now() + LOCK_MS : p.lockedUntil
    });
  }
});

export const _onSuccess = internalMutation({
  args: { participantId: v.id("participants") },
  handler: async (ctx, { participantId }) => {
    const token = crypto.randomUUID();
    await ctx.db.patch(participantId, {
      failedAttempts: 0,
      lockedUntil: undefined,
      sessionToken: token
    });
    return token;
  }
});

// Public action: validate name + PIN, enforce rate limiting, return a session
// token on success. The Next.js layer stores the token in an httpOnly cookie.
// Errors are intentionally generic to avoid leaking which names exist.
export const verifyPin = action({
  args: { name: v.string(), pin: v.string() },
  handler: async (
    ctx,
    { name, pin }
  ): Promise<
    | { ok: true; token: string }
    | { ok: false; error: "invalid" | "locked"; retryAfterMs?: number }
  > => {
    const p = await ctx.runQuery(internal.participants._getByName, { name });
    if (!p) return { ok: false, error: "invalid" };

    if (p.lockedUntil && p.lockedUntil > Date.now()) {
      return { ok: false, error: "locked", retryAfterMs: p.lockedUntil - Date.now() };
    }

    const match = await verifyPinHash(pin.trim(), p.pinHash);
    if (!match) {
      await ctx.runMutation(internal.participants._recordFailure, {
        participantId: p._id
      });
      return { ok: false, error: "invalid" };
    }

    const token = await ctx.runMutation(internal.participants._onSuccess, {
      participantId: p._id
    });
    return { ok: true, token };
  }
});

// Resolve a guest session token to the participant's own view.
export const getBySession = query({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    const p = await ctx.db
      .query("participants")
      .withIndex("by_session_token", (q) => q.eq("sessionToken", token))
      .first();
    if (!p) return null;
    return {
      id: p._id,
      name: p.name,
      wishlist: p.wishlist ?? "",
      hasSubmittedWishlist: p.hasSubmittedWishlist
    };
  }
});

// Guest submits/updates their own wishlist, identified by the session token.
// No admin gate — the token IS the credential.
export const submitWishlist = mutation({
  args: { token: v.string(), wishlist: v.string() },
  handler: async (ctx, { token, wishlist }) => {
    const p = await ctx.db
      .query("participants")
      .withIndex("by_session_token", (q) => q.eq("sessionToken", token))
      .first();
    if (!p) throw new Error("Sesi tamat. Sila log masuk semula.");
    const trimmed = wishlist.trim();
    await ctx.db.patch(p._id, {
      wishlist: trimmed,
      hasSubmittedWishlist: trimmed.length > 0,
      updatedAt: new Date().toISOString()
    });
  }
});

// The guest's OWN assignment only: recipient name + wishlist. Never returns the
// full assignment list — privacy is enforced here at the query layer.
export const myAssignment = query({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    const me = await ctx.db
      .query("participants")
      .withIndex("by_session_token", (q) => q.eq("sessionToken", token))
      .first();
    if (!me) return null;

    const assignment = await ctx.db
      .query("assignments")
      .withIndex("by_giver", (q) => q.eq("giverParticipantId", me._id))
      .first();
    if (!assignment) return null;

    const recipient = await ctx.db.get(assignment.receiverParticipantId);
    if (!recipient) return null;

    return {
      name: recipient.name,
      wishlist: recipient.wishlist ?? "",
      hasSubmittedWishlist: recipient.hasSubmittedWishlist
    };
  }
});

// --- Admin: participant + PIN management ------------------------------------

// Clears the draw — called when the roster changes so stale pairings don't
// linger. Admins re-run the draw afterwards.
async function clearDraw(ctx: MutationCtx) {
  const assignments = await ctx.db.query("assignments").collect();
  for (const a of assignments) await ctx.db.delete(a._id);
  const exchange = await ctx.db.query("giftExchange").first();
  if (exchange?.isDrawn) {
    await ctx.db.patch(exchange._id, { isDrawn: false, drawnAt: undefined });
  }
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const all = await ctx.db.query("participants").collect();
    // Never return pinHash/sessionToken to the client.
    return all.map((p) => ({
      id: p._id,
      name: p.name,
      hasSubmittedWishlist: p.hasSubmittedWishlist,
      wishlist: p.wishlist ?? "",
      isLocked: !!p.lockedUntil && p.lockedUntil > Date.now()
    }));
  }
});

// Admin creates a participant with a chosen or generated PIN. Returns the
// plaintext PIN once so the admin can hand it out — it is never stored or
// returned again.
export const create = mutation({
  args: { name: v.string(), pin: v.optional(v.string()) },
  handler: async (ctx, { name, pin }) => {
    await requireAdmin(ctx);
    const plainPin = pin ?? String(Math.floor(1000 + Math.random() * 9000));
    const pinHash = await hashPin(plainPin);
    const id = await ctx.db.insert("participants", {
      name: name.trim(),
      pinHash,
      hasSubmittedWishlist: false,
      failedAttempts: 0,
      updatedAt: new Date().toISOString()
    });
    await clearDraw(ctx); // roster changed → any existing draw is stale
    return { id, pin: plainPin };
  }
});

// Admin renames a participant. PIN changes go through resetPin.
export const update = mutation({
  args: { participantId: v.id("participants"), name: v.string() },
  handler: async (ctx, { participantId, name }) => {
    await requireAdmin(ctx);
    await ctx.db.patch(participantId, {
      name: name.trim(),
      updatedAt: new Date().toISOString()
    });
  }
});

// Admin removes a participant; the draw is reset since the ring is now broken.
export const remove = mutation({
  args: { participantId: v.id("participants") },
  handler: async (ctx, { participantId }) => {
    await requireAdmin(ctx);
    await ctx.db.delete(participantId);
    await clearDraw(ctx);
  }
});

// Admin resets a participant's PIN (e.g. forgotten). Returns the new PIN once.
export const resetPin = mutation({
  args: { participantId: v.id("participants"), pin: v.optional(v.string()) },
  handler: async (ctx, { participantId, pin }) => {
    await requireAdmin(ctx);
    const plainPin = pin ?? String(Math.floor(1000 + Math.random() * 9000));
    await ctx.db.patch(participantId, {
      pinHash: await hashPin(plainPin),
      failedAttempts: 0,
      lockedUntil: undefined,
      updatedAt: new Date().toISOString()
    });
    return { pin: plainPin };
  }
});
