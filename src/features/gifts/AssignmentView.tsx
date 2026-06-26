import { Gift, LockKeyhole } from "lucide-react";
import type { MyAssignment } from "@/types/gift-exchange";
import styles from "./TukarHadiahPage.module.css";

type AssignmentViewProps = {
  isDrawn: boolean;
  recipient?: MyAssignment;
};

export function AssignmentView({ isDrawn, recipient }: AssignmentViewProps) {
  if (!isDrawn || !recipient) {
    return (
      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <Gift size={18} aria-hidden="true" />
          <h2>Cabutan Saya</h2>
        </div>
        <p className={styles.emptyText}>
          Cabutan belum dibuat. Wishlist boleh isi dulu. Nama penerima akan muncul lepas admin run draw.
        </p>
      </section>
    );
  }

  return (
    <section className={styles.assignmentHero}>
      <div className={styles.assignmentLabel}>
        <Gift size={18} aria-hidden="true" />
        <span>Takziah, anda terpaksa beli hadiah untuk</span>
      </div>

      <h2>{recipient.name}</h2>

      <div className={styles.recipientWishlist}>
        <h3>Wishlist {recipient.name}</h3>
        <p>
          {recipient.hasSubmittedWishlist && recipient.wishlist
            ? recipient.wishlist
            : "Wishlist belum diisi. Anda kini berada dalam mod agak mencabar."}
        </p>
      </div>

      <p className={styles.privacyNote}>
        <LockKeyhole size={15} aria-hidden="true" />
        Hanya assignment anda dipaparkan di sini.
      </p>
    </section>
  );
}
