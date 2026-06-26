import type { GiftAssignment, GiftExchange, GiftParticipant } from "@/types/gift-exchange";

export const giftExchange: GiftExchange = {
  id: "gift-ayam-2026",
  eventId: "gathering-ayam-2026",
  picNames: ["Yan", "Tien"],
  budgetText: "RM50-RM80",
  description: "Beli hadiah yang berguna. Jangan beli benda yang membuat orang termenung.",
  isDrawn: false
};

const TS = "2026-06-01T08:00:00.000Z";

// Real PINs are NOT stored here. They were seeded into Convex (PBKDF2-hashed)
// and shared out-of-band. This placeholder keeps the mock shape valid for the
// soon-to-be-removed local scaffolding; it is not a real credential.
const PLACEHOLDER_PIN = "0000";

const roster: string[] = [
  "Aiman",
  "Azie",
  "Beat",
  "Chae",
  "Dben",
  "Jeny",
  "Mun",
  "Nadiah",
  "Naimah",
  "Paten",
  "Sumaiyyah",
  "Teen",
  "Tien",
  "Yan",
  "Yon"
];

export const giftParticipants: GiftParticipant[] = roster.map((name) => ({
  id: `gift-participant-${name.toLowerCase()}`,
  exchangeId: giftExchange.id,
  name,
  pin: PLACEHOLDER_PIN,
  wishlist: "",
  hasSubmittedWishlist: false,
  createdAt: TS,
  updatedAt: TS
}));

export const giftAssignments: GiftAssignment[] = [];
