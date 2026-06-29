import { KeyRound, Mail, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { AdminParticipant } from "@/types/gift-exchange";
import styles from "./TukarHadiahPage.module.css";

type ParticipantListProps = {
  onDelete: (participant: AdminParticipant) => void;
  onEdit: (participant: AdminParticipant) => void;
  onResetPin: (participant: AdminParticipant) => void;
  onSendPin: (participant: AdminParticipant) => void;
  participants: AdminParticipant[];
};

export function ParticipantList({ onDelete, onEdit, onResetPin, onSendPin, participants }: ParticipantListProps) {
  if (participants.length === 0) {
    return <p className={styles.emptyText}>Tambah peserta untuk mula cabutan.</p>;
  }

  return (
    <div className={styles.participantList}>
      {participants.map((participant) => (
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
            </dl>
          </div>

          <div className={styles.cardActions}>
            <Button
              disabled={!participant.email}
              onClick={() => onSendPin(participant)}
              variant="secondary"
            >
              <Mail size={16} aria-hidden="true" />
              Hantar PIN
            </Button>
            <Button onClick={() => onEdit(participant)} variant="secondary">
              <Pencil size={16} aria-hidden="true" />
              Edit
            </Button>
            <Button onClick={() => onResetPin(participant)} variant="secondary">
              <KeyRound size={16} aria-hidden="true" />
              Reset PIN
            </Button>
            <Button onClick={() => onDelete(participant)} variant="secondary">
              <Trash2 size={16} aria-hidden="true" />
              Delete
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
