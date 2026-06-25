import type { GiftAssignment, GiftExchange, GiftParticipant } from "@/types/gift-exchange";

export const giftExchange: GiftExchange = {
  id: "gift-asmarian-2026",
  eventId: "asmarian-2026",
  picNames: ["Aina", "Mira"],
  budgetText: "RM50-RM80",
  description: "Beli hadiah yang berguna. Jangan beli benda yang membuat orang termenung.",
  isDrawn: false
};

export const giftParticipants: GiftParticipant[] = [
  {
    id: "gift-participant-aina",
    exchangeId: giftExchange.id,
    name: "Aina",
    pin: "4821",
    wishlist: "Stationery, tote bag, benda warna hijau. Elak mug sebab dah banyak.",
    hasSubmittedWishlist: true,
    createdAt: "2026-06-01T08:00:00.000Z",
    updatedAt: "2026-06-08T08:00:00.000Z"
  },
  {
    id: "gift-participant-mira",
    exchangeId: giftExchange.id,
    name: "Mira",
    pin: "7319",
    wishlist: "Coffee beans, book tabs, small pouch. Jangan scented candle.",
    hasSubmittedWishlist: true,
    createdAt: "2026-06-01T08:05:00.000Z",
    updatedAt: "2026-06-07T08:05:00.000Z"
  },
  {
    id: "gift-participant-hafiz",
    exchangeId: giftExchange.id,
    name: "Hafiz",
    pin: "2048",
    wishlist: "",
    hasSubmittedWishlist: false,
    createdAt: "2026-06-01T08:10:00.000Z",
    updatedAt: "2026-06-01T08:10:00.000Z"
  },
  {
    id: "gift-participant-sarah",
    exchangeId: giftExchange.id,
    name: "Sarah",
    pin: "6190",
    wishlist: "Anything practical for travel. Elak barang fragile.",
    hasSubmittedWishlist: true,
    createdAt: "2026-06-01T08:15:00.000Z",
    updatedAt: "2026-06-04T08:15:00.000Z"
  }
];

export const giftAssignments: GiftAssignment[] = [];
