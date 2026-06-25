export type GiftExchange = {
  id: string;
  eventId: string;
  picNames: string[];
  budgetText?: string;
  description?: string;
  isDrawn: boolean;
  drawnAt?: string;
};

export type GiftParticipant = {
  id: string;
  exchangeId: string;
  name: string;
  pin: string;
  wishlist?: string;
  hasSubmittedWishlist: boolean;
  createdAt: string;
  updatedAt: string;
};

export type GiftAssignment = {
  id: string;
  exchangeId: string;
  giverParticipantId: string;
  receiverParticipantId: string;
  createdAt: string;
};
