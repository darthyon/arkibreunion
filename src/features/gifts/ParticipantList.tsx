import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { GiftAssignment, GiftParticipant } from "@/types/gift-exchange";
import styles from "./TukarHadiahPage.module.css";

type ParticipantListProps = {
  assignments: GiftAssignment[];
  onDelete: (participant: GiftParticipant) => void;
  onEdit: (participant: GiftParticipant) => void;
  participants: GiftParticipant[];
};

export function ParticipantList({ assignments, onDelete, onEdit, participants }: ParticipantListProps) {
  if (participants.length === 0) {
    return <p className={styles.emptyText}>Tambah peserta untuk mula cabutan.</p>;
  }

  return (
    <div className={styles.participantList}>
      {participants.map((participant) => {
        const assignment = assignments.find((item) => item.giverParticipantId === participant.id);
        const receiver = assignment
          ? participants.find((item) => item.id === assignment.receiverParticipantId)
          : undefined;

        return (
          <article className={styles.participantCard} key={participant.id}>
            <div>
              <h3>{participant.name}</h3>
              <dl>
                <div>
                  <dt>PIN</dt>
                  <dd>{participant.pin}</dd>
                </div>
                <div>
                  <dt>Wishlist</dt>
                  <dd>{participant.hasSubmittedWishlist ? "Submitted" : "Belum isi"}</dd>
                </div>
                <div>
                  <dt>Assignment</dt>
                  <dd>{receiver ? receiver.name : "Belum draw"}</dd>
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
