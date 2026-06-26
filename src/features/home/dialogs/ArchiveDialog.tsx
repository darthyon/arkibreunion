"use client";

import { Button } from "@/components/ui/Button";
import { DialogShell } from "@/components/ui/DialogShell";
import { FormField } from "@/components/ui/FormField";

export type ArchiveFormValues = {
  year: string;
  title: string;
  description: string;
};

type ArchiveDialogProps = {
  open: boolean;
  item?: ArchiveFormValues;
  onClose: () => void;
  onSave: (values: ArchiveFormValues) => void;
};

export function ArchiveDialog({ open, item, onClose, onSave }: ArchiveDialogProps) {
  const isEditing = Boolean(item);

  return (
    <DialogShell
      footer={
        <>
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button form="archive-form" type="submit">
            {isEditing ? "Save Changes" : "Tambah"}
          </Button>
        </>
      }
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose();
      }}
      open={open}
      title={isEditing ? "Edit Arkib Lepas" : "Tambah Arkib Lepas"}
    >
      <form
        id="archive-form"
        style={{ display: "grid", gap: 16 }}
        onSubmit={(formEvent) => {
          formEvent.preventDefault();
          const formData = new FormData(formEvent.currentTarget);
          onSave({
            year: String(formData.get("year") ?? "").trim(),
            title: String(formData.get("title") ?? "").trim(),
            description: String(formData.get("description") ?? "").trim()
          });
        }}
      >
        <FormField label="Tahun">
          <input defaultValue={item?.year} inputMode="numeric" name="year" placeholder="2025" required />
        </FormField>
        <FormField label="Tajuk">
          <input defaultValue={item?.title} name="title" placeholder="Asmarian Gathering 2025" required />
        </FormField>
        <FormField label="Penerangan">
          <textarea
            defaultValue={item?.description}
            name="description"
            placeholder="Setiap tahun, alasan yang sama."
            rows={3}
            required
          />
        </FormField>
      </form>
    </DialogShell>
  );
}
