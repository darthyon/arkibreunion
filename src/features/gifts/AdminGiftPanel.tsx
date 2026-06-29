import { AlertCircle, ClipboardCheck, Gift, LockKeyhole, Mail, Plus, Settings, Users } from "lucide-react";
import { ActionMenu } from "@/components/ui/ActionMenu";
import type { AdminParticipant, GiftExchange } from "@/types/gift-exchange";
import { ParticipantList } from "./ParticipantList";
import styles from "./TukarHadiahPage.module.css";

type AdminAssignment = { id: string; giverId: string; giver: string; receiver: string };

type AdminGiftPanelProps = {
  assignments: AdminAssignment[];
  drawError?: string;
  exchange: GiftExchange;
  onAddParticipant: () => void;
  onDeleteParticipant: (participant: AdminParticipant) => void;
  onEditParticipant: (participant: AdminParticipant) => void;
  onEditSetup: () => void;
  onRunDraw: () => void;
  onSendAllPins: () => void;
  participants: AdminParticipant[];
};

export function AdminGiftPanel({
  assignments,
  drawError,
  exchange,
  onAddParticipant,
  onDeleteParticipant,
  onEditParticipant,
  onEditSetup,
  onRunDraw,
  onSendAllPins,
  participants
}: AdminGiftPanelProps) {
  const withEmail = participants.filter((participant) => participant.email).length;
  const submittedWishlistCount = participants.filter((participant) => participant.hasSubmittedWishlist).length;

  return (
    <section className={styles.adminPanel}>
      <header className={styles.adminHeader}>
        <div>
          <span className={styles.kicker}>Admin Mode</span>
          <h2>Tukar Hadiah Control</h2>
          <p>Kemaskini peserta, wishlist, dan cabutan hadiah.</p>
        </div>
        <div className={styles.adminActions}>
          <ActionMenu
            items={[
              {
                label: "Edit Info",
                icon: <Settings size={17} aria-hidden="true" />,
                onClick: onEditSetup
              },
              {
                label: "Tambah Peserta",
                icon: <Plus size={17} aria-hidden="true" />,
                onClick: onAddParticipant
              },
              {
                label: "Hantar Semua PIN",
                icon: <Mail size={17} aria-hidden="true" />,
                onClick: onSendAllPins,
                disabled: withEmail === 0
              },
              {
                label: exchange.isDrawn ? "Run Semula" : "Run Draw",
                icon: <Gift size={17} aria-hidden="true" />,
                onClick: onRunDraw,
                disabled: participants.length < 3
              }
            ]}
          />
        </div>
      </header>

      {drawError ? <p className={styles.formError}>{drawError}</p> : null}

      <section className={styles.adminStatGrid} aria-label="Statistik admin Tukar Hadiah">
        <div>
          <Users size={18} aria-hidden="true" />
          <strong>{participants.length}</strong>
          <span>Peserta</span>
        </div>
        <div>
          <Gift size={18} aria-hidden="true" />
          <strong>{submittedWishlistCount}</strong>
          <span>Ada Wishlist</span>
        </div>
        <div>
          <LockKeyhole size={18} aria-hidden="true" />
          <strong>{participants.length - submittedWishlistCount}</strong>
          <span>Belum Isi Wishlist</span>
        </div>
        <div>
          <ClipboardCheck size={18} aria-hidden="true" />
          <strong>{exchange.isDrawn ? "Done" : "Pending"}</strong>
          <span>Cabutan</span>
        </div>
      </section>

      {!exchange.isDrawn ? (
        <div className={styles.adminAlert}>
          <AlertCircle size={18} aria-hidden="true" />
          <span>Run draw bila senarai peserta dah lengkap.</span>
        </div>
      ) : null}

      <div className={styles.adminGridSingle}>
        <section className={styles.adminSection}>
          <div className={styles.subsectionHeader}>
            <div>
              <h3>Participants</h3>
              <p>PIN dijana semasa tambah/reset — catat sekali sahaja.</p>
            </div>
            <span>{participants.length} peserta</span>
          </div>
          <ParticipantList
            assignments={assignments}
            onDelete={onDeleteParticipant}
            onEdit={onEditParticipant}
            participants={participants}
          />
        </section>
      </div>
    </section>
  );
}
