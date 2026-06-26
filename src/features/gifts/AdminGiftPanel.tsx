import { AlertCircle, ClipboardCheck, Gift, LockKeyhole, Plus, Settings, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { AdminParticipant, GiftExchange } from "@/types/gift-exchange";
import { ParticipantList } from "./ParticipantList";
import styles from "./TukarHadiahPage.module.css";

type AdminGiftPanelProps = {
  drawError?: string;
  exchange: GiftExchange;
  onAddParticipant: () => void;
  onDeleteParticipant: (participant: AdminParticipant) => void;
  onEditParticipant: (participant: AdminParticipant) => void;
  onEditSetup: () => void;
  onResetPin: (participant: AdminParticipant) => void;
  onRunDraw: () => void;
  participants: AdminParticipant[];
};

export function AdminGiftPanel({
  drawError,
  exchange,
  onAddParticipant,
  onDeleteParticipant,
  onEditParticipant,
  onEditSetup,
  onResetPin,
  onRunDraw,
  participants
}: AdminGiftPanelProps) {
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
          <Button onClick={onEditSetup} variant="secondary">
            <Settings size={17} aria-hidden="true" />
            Edit Setup
          </Button>
          <Button onClick={onAddParticipant} variant="secondary">
            <Plus size={17} aria-hidden="true" />
            Tambah Peserta
          </Button>
          <Button disabled={participants.length < 3} onClick={onRunDraw}>
            <Gift size={17} aria-hidden="true" />
            {exchange.isDrawn ? "Run Semula" : "Run Draw"}
          </Button>
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
            onDelete={onDeleteParticipant}
            onEdit={onEditParticipant}
            onResetPin={onResetPin}
            participants={participants}
          />
        </section>
      </div>
    </section>
  );
}
