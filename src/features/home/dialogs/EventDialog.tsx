"use client";

import { Button } from "@/components/ui/Button";
import { DialogShell } from "@/components/ui/DialogShell";
import { FormField } from "@/components/ui/FormField";

export type EventFormValues = {
  name: string;
  dateText: string;
  durationText: string;
  location: string;
  participantCount: number;
  note?: string;
};

type EventDialogProps = {
  open: boolean;
  event?: EventFormValues;
  onClose: () => void;
  onSave: (values: EventFormValues) => void;
};

export function EventDialog({ open, event, onClose, onSave }: EventDialogProps) {
  return (
    <DialogShell
      footer={
        <>
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button form="event-form" type="submit">
            Save Changes
          </Button>
        </>
      }
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose();
      }}
      open={open}
      title="Edit Ringkasan"
    >
      <form
        id="event-form"
        style={{ display: "grid", gap: 16 }}
        onSubmit={(formEvent) => {
          formEvent.preventDefault();
          const formData = new FormData(formEvent.currentTarget);
          const note = String(formData.get("note") ?? "").trim();
          onSave({
            name: String(formData.get("name") ?? "").trim(),
            dateText: String(formData.get("dateText") ?? "").trim(),
            durationText: String(formData.get("durationText") ?? "").trim(),
            location: String(formData.get("location") ?? "").trim(),
            participantCount: Number(formData.get("participantCount") ?? 0),
            note: note.length > 0 ? note : undefined
          });
        }}
      >
        <FormField label="Nama event">
          <input defaultValue={event?.name} name="name" placeholder="Gathering Ayam 2026" required />
        </FormField>
        <FormField label="Tarikh">
          <input defaultValue={event?.dateText} name="dateText" placeholder="31 Jul - 2 Aug 2026" required />
        </FormField>
        <FormField label="Tempoh">
          <input defaultValue={event?.durationText} name="durationText" placeholder="3 Hari 2 Malam" required />
        </FormField>
        <FormField label="Lokasi">
          <input defaultValue={event?.location} name="location" placeholder="Villa Sajuri" required />
        </FormField>
        <FormField label="Bilangan peserta">
          <input
            defaultValue={event?.participantCount}
            inputMode="numeric"
            min={0}
            name="participantCount"
            type="number"
            required
          />
        </FormField>
        <FormField hint="Optional." label="Nota">
          <textarea defaultValue={event?.note} name="note" rows={2} />
        </FormField>
      </form>
    </DialogShell>
  );
}
