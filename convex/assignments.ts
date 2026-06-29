import { query } from "./_generated/server";
import { requireAdmin } from "./lib/auth";

// Admin overview of the full draw: giver → receiver names. Admin-only — guests
// never receive this; they see only their own pairing via participants.myAssignment.
export const adminList = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const assignments = await ctx.db.query("assignments").collect();
    const rows: { id: string; giverId: string; giver: string; receiver: string }[] = [];
    for (const a of assignments) {
      const giver = await ctx.db.get(a.giverParticipantId);
      const receiver = await ctx.db.get(a.receiverParticipantId);
      if (giver && receiver) {
        rows.push({ id: a._id, giverId: a.giverParticipantId, giver: giver.name, receiver: receiver.name });
      }
    }
    return rows.sort((x, y) => x.giver.localeCompare(y.giver));
  }
});
