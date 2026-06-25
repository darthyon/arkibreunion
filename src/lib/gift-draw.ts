import type { GiftAssignment, GiftParticipant } from "@/types/gift-exchange";

function shuffleParticipants(participants: GiftParticipant[]) {
  const shuffled = [...participants];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

export function createGiftAssignments(participants: GiftParticipant[], exchangeId: string): GiftAssignment[] {
  if (participants.length < 3) {
    throw new Error("Perlu sekurang-kurangnya 3 peserta untuk cabutan.");
  }

  const orderedParticipants = shuffleParticipants(participants);
  const createdAt = new Date().toISOString();

  return orderedParticipants.map((giver, index) => {
    const receiver = orderedParticipants[(index + 1) % orderedParticipants.length];

    return {
      id: `${exchangeId}-${giver.id}-${receiver.id}`,
      exchangeId,
      giverParticipantId: giver.id,
      receiverParticipantId: receiver.id,
      createdAt
    };
  });
}
