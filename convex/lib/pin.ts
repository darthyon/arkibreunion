// PIN hashing with PBKDF2 (Web Crypto, available in the Convex runtime).
// PINs are short (4 digits), so the real defense is server-side rate limiting.
// PBKDF2 + per-PIN salt is defense-in-depth against a DB leak.

const ITERATIONS = 100_000;
const KEY_LEN = 32; // bytes

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function fromHex(hex: string): Uint8Array<ArrayBuffer> {
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}

async function derive(pin: string, salt: Uint8Array<ArrayBuffer>): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(pin),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: ITERATIONS, hash: "SHA-256" },
    key,
    KEY_LEN * 8
  );
  return toHex(bits);
}

// Produces "saltHex:derivedHex" for storage.
export async function hashPin(pin: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const derived = await derive(pin, salt);
  return `${toHex(salt.buffer)}:${derived}`;
}

// Constant-time-ish compare of a candidate PIN against a stored hash.
export async function verifyPinHash(pin: string, stored: string): Promise<boolean> {
  const [saltHex, derivedHex] = stored.split(":");
  if (!saltHex || !derivedHex) return false;
  const candidate = await derive(pin, fromHex(saltHex));
  if (candidate.length !== derivedHex.length) return false;
  let diff = 0;
  for (let i = 0; i < candidate.length; i++) {
    diff |= candidate.charCodeAt(i) ^ derivedHex.charCodeAt(i);
  }
  return diff === 0;
}
