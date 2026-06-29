import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { action } from "./_generated/server";
import { api, internal } from "./_generated/api";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
// TODO: swap to a verified domain sender once set up in Resend. The sandbox
// sender only delivers to the Resend account owner's own address.
const FROM = "Arkib Reunion Negara <onboarding@resend.dev>";

function requireResendKey(): string {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY belum diset di Convex env.");
  return key;
}

// PINs are hashed at rest and unrecoverable, so "send PIN" resets the PIN to a
// fresh value and emails that. The email is the durable delivery.
async function deliver(to: string, name: string, pin: string) {
  const key = requireResendKey();

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: FROM,
      to,
      subject: "PIN Tukar Hadiah anda",
      html: `<p>Hai ${name},</p>
<p>PIN Tukar Hadiah anda: <strong style="font-size:18px">${pin}</strong></p>
<p>Log masuk di laman Tukar Hadiah guna nama dan PIN ini untuk isi wishlist dan
tengok siapa yang anda kena belikan hadiah. Jangan kongsi PIN dengan orang lain.</p>
<p>— Arkib Reunion Negara</p>`
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend gagal (${response.status}): ${detail}`);
  }
}

export const sendPin = action({
  args: { participantId: v.id("participants") },
  handler: async (ctx, { participantId }): Promise<{ ok: true; email: string }> => {
    if ((await getAuthUserId(ctx)) === null) throw new Error("Not authorised");
    requireResendKey(); // fail before resetting the PIN if email can't be sent

    const contact = await ctx.runQuery(internal.participants._getContact, { participantId });
    if (!contact) throw new Error("Peserta tak jumpa.");
    if (!contact.email) throw new Error("Peserta tiada email.");

    const { pin } = await ctx.runMutation(api.participants.resetPin, { participantId });
    await deliver(contact.email, contact.name, pin);
    return { ok: true, email: contact.email };
  }
});

export const sendAllPins = action({
  args: {},
  handler: async (ctx): Promise<{ sent: number; skipped: string[] }> => {
    if ((await getAuthUserId(ctx)) === null) throw new Error("Not authorised");
    requireResendKey(); // fail before resetting any PINs if email can't be sent

    const participants = await ctx.runQuery(api.participants.list, {});
    let sent = 0;
    const skipped: string[] = [];

    for (const p of participants) {
      if (!p.email) {
        skipped.push(p.name);
        continue;
      }
      const { pin } = await ctx.runMutation(api.participants.resetPin, { participantId: p.id });
      await deliver(p.email, p.name, pin);
      sent += 1;
    }

    return { sent, skipped };
  }
});
