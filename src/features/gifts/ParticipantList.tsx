import { ArrowRight, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { AdminParticipant } from "@/types/gift-exchange";
import styles from "./TukarHadiahPage.module.css";

type AdminAssignment = { id: string; giverId: string; giver: string; receiver: string };

type ParticipantListProps = {
  assignments: AdminAssignment[];
  onDelete: (participant: AdminParticipant) => void;
  onEdit: (participant: AdminParticipant) => void;
  participants: AdminParticipant[];
};

export function ParticipantList({ assignments, onDelete, onEdit, participants }: ParticipantListProps) {
  if (participants.length === 0) {
    return <p className={styles.emptyText}>Tambah peserta untuk mula cabutan.</p>;
  }

  const receiverByGiverId = new Map(assignments.map((a) => [a.giverId, a.receiver]));

  return (
    <div className={styles.participantList}>
      {participants.map((participant) => {
        const receiver = receiverByGiverId.get(participant.id);
        return (
          <article className={styles.participantCard} key={participant.id}>
            <div>
              <h3>{participant.name}</h3>
              <dl>
                <div>
                  <dt>Email</dt>
                  <dd>{participant.email || "Belum diisi"}</dd>
                </div>
                <div>
                  <dt>Wishlist</dt>
                  <dd>{participant.hasSubmittedWishlist ? "Submitted" : "Belum isi"}</dd>
                </div>
                <div>
                  <dt>Cabutan</dt>
                  <dd>
                    {receiver ? (
                      <span className={styles.cabutanCell}>
                        <ArrowRight size={14} aria-hidden="true" />
                        {receiver}
                      </span>
                    ) : (
                      "Belum draw"
                    )}
                  </dd>
                </div>
              </dl>
            </div>

            <div className={styles.cardActions}>
              <Button onClick={() => onEdit(participant)} variant="secondary">
                <Pencil size={16} aria-hidden="true" />
                Edit
              </Button>
              <Button onClick={() => onDelete(participant)} variant="secondary">
                <Trash2 size={16} aria-hidden="true" />
                Delete
              </Button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
