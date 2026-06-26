"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { api } from "@convex/_generated/api";
import type { Doc, Id } from "@convex/_generated/dataModel";
import { Button } from "@/components/ui/Button";
import { DialogShell } from "@/components/ui/DialogShell";
import { useAdmin } from "@/hooks/useAdmin";
import { usePreview } from "@/components/PreviewProvider";
import { ArchiveDialog, type ArchiveFormValues } from "./dialogs/ArchiveDialog";
import styles from "./PreviousReunionStrip.module.css";

export function PreviousReunionStrip() {
  const items = useQuery(api.archive.list) ?? [];
  const createArchive = useMutation(api.archive.create);
  const updateArchive = useMutation(api.archive.update);
  const removeArchive = useMutation(api.archive.remove);

  const { isAdmin: isAuthedAdmin } = useAdmin();
  const { isPreviewing } = usePreview();
  const isAdmin = isAuthedAdmin && !isPreviewing;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Doc<"archive">>();
  const [pendingDelete, setPendingDelete] = useState<Doc<"archive">>();

  async function handleSave(values: ArchiveFormValues) {
    if (editing) {
      await updateArchive({ id: editing._id, ...values });
    } else {
      await createArchive(values);
    }
    setEditing(undefined);
    setIsDialogOpen(false);
  }

  async function handleConfirmDelete() {
    if (!pendingDelete) return;
    await removeArchive({ id: pendingDelete._id as Id<"archive"> });
    setPendingDelete(undefined);
  }

  return (
    <section className={styles.strip}>
      <header>
        <h2>Reunion Terdahulu</h2>
        <p>Arkib untuk tahun-tahun yang lepas. Bukti reunion memang pernah berlaku.</p>
      </header>

      {isAdmin ? (
        <div className={styles.adminBar}>
          <Button
            onClick={() => {
              setEditing(undefined);
              setIsDialogOpen(true);
            }}
            variant="secondary"
          >
            <Plus size={16} aria-hidden="true" />
            Tambah Arkib Lepas
          </Button>
        </div>
      ) : null}

      <div className={styles.list}>
        {items.map((item) =>
          isAdmin ? (
            <div className={styles.adminCard} key={item.year}>
              <strong>{item.title}</strong>
              <span>{item.description}</span>
              <div className={styles.cardActions}>
                <Button
                  onClick={() => {
                    setEditing(item);
                    setIsDialogOpen(true);
                  }}
                  variant="secondary"
                >
                  <Pencil size={15} aria-hidden="true" />
                  Edit
                </Button>
                <Button onClick={() => setPendingDelete(item)} variant="secondary">
                  <Trash2 size={15} aria-hidden="true" />
                  Delete
                </Button>
              </div>
            </div>
          ) : (
            <a key={item.year} href={`/arkib/${item.year}`}>
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </a>
          )
        )}
      </div>

      <ArchiveDialog
        item={editing ? { year: editing.year, title: editing.title, description: editing.description } : undefined}
        onClose={() => {
          setEditing(undefined);
          setIsDialogOpen(false);
        }}
        onSave={handleSave}
        open={isDialogOpen}
      />

      <DialogShell
        footer={
          <>
            <Button onClick={() => setPendingDelete(undefined)} variant="secondary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete}>Padam</Button>
          </>
        }
        onOpenChange={(open) => {
          if (!open) setPendingDelete(undefined);
        }}
        open={Boolean(pendingDelete)}
        title="Padam arkib ini?"
      >
        <p>Rekod reunion ini akan dibuang dari senarai. Pastikan memang patut.</p>
      </DialogShell>
    </section>
  );
}
