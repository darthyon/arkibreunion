"use client";

import { useState } from "react";
import { KeyRound, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DialogShell } from "@/components/ui/DialogShell";
import { FormField } from "@/components/ui/FormField";
import type { AdminParticipant } from "@/types/gift-exchange";
import styles from "../TukarHadiahPage.module.css";

type ParticipantDialogProps = {
  onClose: () => void;
  onResetPin: (participant: AdminParticipant) => Promise<string>;
  onSave: (values: { name: string; email: string; pin?: string }) => void;
  onSendPin: (participant: AdminParticipant) => Promise<string>;
  open: boolean;
  participant?: AdminParticipant;
};

export function ParticipantDialog({
  onClose,
  onResetPin,
  onSave,
  onSendPin,
  open,
  participant
}: ParticipantDialogProps) {
  const isEditing = Boolean(participant);
  const [pinStatus, setPinStatus] = useState<string>();
  const [busy, setBusy] = useState(false);

  function handleClose() {
    setPinStatus(undefined);
    onClose();
  }

  async function handleResetPin() {
    if (!participant) return;
    setBusy(true);
    try {
      const pin = await onResetPin(participant);
      setPinStatus(`PIN baru: ${pin}`);
    } catch (error) {
      setPinStatus(error instanceof Error ? error.message : "Gagal reset PIN.");
    } finally {
      setBusy(false);
    }
  }

  async function handleSendPin() {
    if (!participant) return;
    setBusy(true);
    try {
      const email = await onSendPin(participant);
      setPinStatus(`PIN baru dihantar ke ${email}.`);
    } catch (error) {
      setPinStatus(error instanceof Error ? error.message : "Gagal hantar PIN.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <DialogShell
      footer={
        <>
          <Button onClick={handleClose} variant="secondary">
            Cancel
          </Button>
          <Button form="participant-form" type="submit">
            {isEditing ? "Save Changes" : "Save Participant"}
          </Button>
        </>
      }
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          handleClose();
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

      {isEditing && participant ? (
        <div className={styles.pinControls}>
          <div className={styles.pinControlButtons}>
            <Button disabled={busy} onClick={handleResetPin} variant="secondary">
              <KeyRound size={16} aria-hidden="true" />
              Reset PIN
            </Button>
            <Button disabled={busy || !participant.email} onClick={handleSendPin} variant="secondary">
              <Mail size={16} aria-hidden="true" />
              Hantar PIN
            </Button>
          </div>
          {pinStatus ? <p className={styles.pinStatus}>{pinStatus}</p> : null}
        </div>
      ) : null}
    </DialogShell>
  );
}
