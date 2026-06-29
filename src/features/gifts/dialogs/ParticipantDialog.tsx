import { Button } from "@/components/ui/Button";
import { DialogShell } from "@/components/ui/DialogShell";
import { FormField } from "@/components/ui/FormField";
import type { AdminParticipant } from "@/types/gift-exchange";
import styles from "../TukarHadiahPage.module.css";

type ParticipantDialogProps = {
  onClose: () => void;
  onSave: (values: { name: string; email: string; pin?: string }) => void;
  open: boolean;
  participant?: AdminParticipant;
};

export function ParticipantDialog({ onClose, onSave, open, participant }: ParticipantDialogProps) {
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
          const pin = String(formData.get("pin") ?? "").trim();
          onSave({
            name: String(formData.get("name") ?? "").trim(),
            email: String(formData.get("email") ?? "").trim(),
            pin: pin.length > 0 ? pin : undefined
          });
        }}
      >
        <FormField label="Name">
          <input defaultValue={participant?.name} name="name" placeholder="Nama peserta" required />
        </FormField>

        <FormField label="Email">
          <input
            defaultValue={participant?.email}
            name="email"
            placeholder="nama@email.com"
            required
            type="email"
          />
        </FormField>

        {isEditing ? null : (
          <FormField hint="Biar kosong untuk jana PIN automatik (4 digit)." label="PIN, optional">
            <input inputMode="numeric" name="pin" placeholder="4821" />
          </FormField>
        )}
      </form>
    </DialogShell>
  );
}
