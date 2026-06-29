import { Button } from "@/components/ui/Button";
import { DialogShell } from "@/components/ui/DialogShell";
import { FormField } from "@/components/ui/FormField";
import type { GiftExchange } from "@/types/gift-exchange";
import styles from "../TukarHadiahPage.module.css";

type GiftSetupDialogProps = {
  exchange: GiftExchange;
  onClose: () => void;
  onSave: (exchange: GiftExchange) => void;
  open: boolean;
};

export function GiftSetupDialog({ exchange, onClose, onSave, open }: GiftSetupDialogProps) {
  return (
    <DialogShell
      footer={
        <>
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button form="gift-setup-form" type="submit">
            Save Setup
          </Button>
        </>
      }
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          onClose();
        }
      }}
      open={open}
      title="Edit Info"
    >
      <form
        className={styles.dialogForm}
        id="gift-setup-form"
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          onSave({
            ...exchange,
            budgetText: String(formData.get("budgetText") ?? ""),
            description: String(formData.get("description") ?? ""),
            picNames: String(formData.get("picNames") ?? "")
              .split(",")
              .map((name) => name.trim())
              .filter(Boolean)
          });
        }}
      >
        <FormField label="Budget">
          <input defaultValue={exchange.budgetText} name="budgetText" placeholder="RM50-RM80" />
        </FormField>

        <FormField label="Instructions">
          <textarea defaultValue={exchange.description} name="description" rows={4} />
        </FormField>

        <FormField hint="Pisahkan nama dengan koma." label="PIC names">
          <input defaultValue={exchange.picNames.join(", ")} name="picNames" placeholder="Aina, Mira" />
        </FormField>
      </form>
    </DialogShell>
  );
}
