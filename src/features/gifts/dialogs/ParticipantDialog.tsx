import { Button } from "@/components/ui/Button";
import { DialogShell } from "@/components/ui/DialogShell";
import { FormField } from "@/components/ui/FormField";
import type { GiftParticipant } from "@/types/gift-exchange";
import styles from "../TukarHadiahPage.module.css";

type ParticipantDialogProps = {
  exchangeId: string;
  onClose: () => void;
  onSave: (participant: GiftParticipant) => void;
  open: boolean;
  participant?: GiftParticipant;
};

export function ParticipantDialog({ exchangeId, onClose, onSave, open, participant }: ParticipantDialogProps) {
  const isEditing = Boolean(participant);

  return (
    <DialogShell
      footer={
        <>
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button form="participant-form" type="submit">
            {isEditing ? "Save Changes" : "Save Participant"}
          </Button>
        </>
      }
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          onClose();
        }
      }}
      open={open}
      title={isEditing ? "Edit Peserta" : "Tambah Peserta"}
    >
      <form
        className={styles.dialogForm}
        id="participant-form"
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const now = new Date().toISOString();
          const wishlist = String(formData.get("wishlist") ?? "").trim();

          onSave({
            id: participant?.id ?? `gift-participant-${Date.now()}`,
            exchangeId,
            name: String(formData.get("name") ?? "").trim(),
            pin: String(formData.get("pin") ?? "").trim(),
            wishlist,
            hasSubmittedWishlist: wishlist.length > 0,
            createdAt: participant?.createdAt ?? now,
            updatedAt: now
          });
        }}
      >
        <FormField label="Name">
          <input defaultValue={participant?.name} name="name" placeholder="Nama peserta" required />
        </FormField>

        <FormField label="PIN">
          <input defaultValue={participant?.pin} inputMode="numeric" name="pin" placeholder="4821" required />
        </FormField>

        <FormField label="Wishlist, optional">
          <textarea defaultValue={participant?.wishlist} name="wishlist" rows={4} />
        </FormField>
      </form>
    </DialogShell>
  );
}
