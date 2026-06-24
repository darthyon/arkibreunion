export type GiftParticipant = {
  id: string;
  name: string;
  pin: string;
  wishlist?: string;
};

export type GiftAssignment = {
  giverId: string;
  recipientId: string;
};
