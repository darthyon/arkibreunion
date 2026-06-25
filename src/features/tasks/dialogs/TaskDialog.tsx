"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DialogShell } from "@/components/ui/DialogShell";
import { FormField } from "@/components/ui/FormField";
import { Select } from "@/components/ui/Select";
import type { ReunionTask, TaskStatus } from "@/types/tasks";
import { statusOptions } from "../status-meta";
import styles from "../GerakKerjaPage.module.css";

type TaskDialogProps = {
  open: boolean;
  task?: ReunionTask;
  defaultStatus: TaskStatus;
  onClose: () => void;
  onSave: (task: ReunionTask) => void;
};

type FieldErrors = {
  title?: string;
  owner?: string;
};

export function TaskDialog({ open, task, defaultStatus, onClose, onSave }: TaskDialogProps) {
  const isEditing = Boolean(task);
  const [errors, setErrors] = useState<FieldErrors>({});

  function handleClose() {
    setErrors({});
    onClose();
  }

  return (
    <DialogShell
      footer={
        <>
          <Button onClick={handleClose} variant="secondary">
            Cancel
          </Button>
          <Button form="task-form" type="submit">
            {isEditing ? "Save Changes" : "Save Task"}
          </Button>
        </>
      }
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          handleClose();
        }
      }}
      open={open}
      title={isEditing ? "Edit Tugas" : "Tambah Tugas"}
    >
      <p className={styles.dialogDescription}>
        {isEditing
          ? "Kemaskini tugasan ini sebelum ia menjadi legenda group chat."
          : "Tambah kerja yang perlu dibuat supaya ia tak hidup dalam kepala seorang saja."}
      </p>

      <form
        className={styles.dialogForm}
        id="task-form"
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const title = String(formData.get("title") ?? "").trim();
          const owner = String(formData.get("owner") ?? "").trim();
          const description = String(formData.get("description") ?? "").trim();
          const status = String(formData.get("status") ?? defaultStatus) as TaskStatus;
          const picNames = String(formData.get("picNames") ?? "")
            .split(",")
            .map((name) => name.trim())
            .filter((name) => name.length > 0);

          const nextErrors: FieldErrors = {};
          if (!title) {
            nextErrors.title = "Masukkan nama tugas.";
          }
          if (!owner) {
            nextErrors.owner = "Masukkan owner.";
          }

          if (nextErrors.title || nextErrors.owner) {
            setErrors(nextErrors);
            return;
          }

          const now = new Date().toISOString();
          onSave({
            id: task?.id ?? `task-${Date.now()}`,
            title,
            ownerName: owner,
            description: description.length > 0 ? description : undefined,
            picNames: picNames.length > 0 ? picNames : undefined,
            status,
            createdAt: task?.createdAt ?? now,
            updatedAt: now
          });
          setErrors({});
        }}
      >
        <FormField error={errors.title} label="Task title">
          <input defaultValue={task?.title} name="title" placeholder="Nama tugas" />
        </FormField>

        <FormField error={errors.owner} label="Owner">
          <input defaultValue={task?.ownerName} name="owner" placeholder="Siapa pegang" />
        </FormField>

        <FormField label="Description, optional">
          <textarea defaultValue={task?.description} name="description" rows={3} />
        </FormField>

        <FormField label="Status">
          <Select
            aria-label="Status tugas"
            defaultValue={task?.status ?? defaultStatus}
            name="status"
            options={statusOptions}
          />
        </FormField>

        <FormField hint="Pisahkan dengan koma." label="PIC names, optional">
          <input defaultValue={task?.picNames?.join(", ")} name="picNames" placeholder="Aina, Faris" />
        </FormField>
      </form>
    </DialogShell>
  );
}
