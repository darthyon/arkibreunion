export type GiftExchange = {
  id: string;
  eventId: string;
  picNames: string[];
  budgetText?: string;
  description?: string;
  isDrawn: boolean;
  drawnAt?: string;
};

// Admin-facing participant row from Convex (never includes PIN/hash/token).
export type AdminParticipant = {
  id: string;
  name: string;
  email: string;
  hasSubmittedWishlist: boolean;
  wishlist: string;
  isLocked: boolean;
};

// The guest's own scoped assignment view: just the recipient.
export type MyAssignment = {
  name: string;
  wishlist: string;
  hasSubmittedWishlist: boolean;
};
