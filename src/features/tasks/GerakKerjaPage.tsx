"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { ArrowLeft, Plus } from "lucide-react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/Button";
import { DialogShell } from "@/components/ui/DialogShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { useAdmin } from "@/hooks/useAdmin";
import { usePreview } from "@/components/PreviewProvider";
import type { ReunionTask, TaskStatus } from "@/types/tasks";
import { TaskBoard } from "./TaskBoard";
import { TaskDialog } from "./dialogs/TaskDialog";
import styles from "./GerakKerjaPage.module.css";

export function GerakKerjaPage() {
  const taskDocs = useQuery(api.tasks.list);
  const createTask = useMutation(api.tasks.create);
  const updateTask = useMutation(api.tasks.update);
  const setTaskStatus = useMutation(api.tasks.setStatus);
  const removeTask = useMutation(api.tasks.remove);

  // Convex is the source of truth; the board derives straight from the query.
  const tasks: ReunionTask[] = useMemo(
    () =>
      (taskDocs ?? []).map((doc) => ({
        id: doc._id,
        title: doc.title,
        description: doc.description,
        ownerName: doc.ownerName,
        picNames: doc.picNames,
        status: doc.status,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt
      })),
    [taskDocs]
  );

  const [activeStatus, setActiveStatus] = useState<TaskStatus>("todo");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<ReunionTask>();
  const [dialogStatus, setDialogStatus] = useState<TaskStatus>("todo");
  const [pendingDelete, setPendingDelete] = useState<ReunionTask>();
  const [toast, setToast] = useState<string>();

  const { isAdmin: isAuthedAdmin } = useAdmin();
  const { isPreviewing } = usePreview();
  const isAdmin = isAuthedAdmin && !isPreviewing;
  const isLoading = taskDocs === undefined;
  const isBoardEmpty = tasks.length === 0;

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(undefined), 3200);
  }

  function openAddDialog(status: TaskStatus) {
    setEditingTask(undefined);
    setDialogStatus(status);
    setIsDialogOpen(true);
  }

  function openEditDialog(task: ReunionTask) {
    setEditingTask(task);
    setDialogStatus(task.status);
    setIsDialogOpen(true);
  }

  async function handleSaveTask(task: ReunionTask) {
    const isEditing = Boolean(editingTask);
    const payload = {
      title: task.title,
      description: task.description,
      ownerName: task.ownerName ?? "",
      picNames: task.picNames,
      status: task.status
    };

    if (isEditing && editingTask) {
      await updateTask({ id: editingTask.id as Id<"tasks">, ...payload });
    } else {
      await createTask(payload);
    }

    setEditingTask(undefined);
    setIsDialogOpen(false);
    showToast(isEditing ? "Tugas dikemaskini." : "Tugas ditambah. Negara bergerak sedikit.");
  }

  async function handleConfirmDelete() {
    if (!pendingDelete) {
      return;
    }

    await removeTask({ id: pendingDelete.id as Id<"tasks"> });
    setPendingDelete(undefined);
    showToast("Tugas dipadam.");
  }

  async function handleStatusChange(task: ReunionTask, status: TaskStatus) {
    if (task.status === status) {
      return;
    }

    await setTaskStatus({ id: task.id as Id<"tasks">, status });
    showToast("Status tugas dikemaskini.");
  }

  return (
    <PageContainer size="page">
      <div className={styles.page}>
        <Link className={styles.backLink} href="/">
          <ArrowLeft size={18} aria-hidden="true" />
          <span>Balik ke Arkib</span>
        </Link>

        <PageHeader
          action={
            isAdmin ? (
              <div className={styles.headerAction}>
                <Button onClick={() => openAddDialog(activeStatus)}>
                  <Plus size={17} aria-hidden="true" />
                  Tambah Tugas
                </Button>
              </div>
            ) : undefined
          }
          description={
            isAdmin ? "Kemaskini tugasan yang orang akan pura-pura tak nampak." : "Siapa buat apa, apa dah siap."
          }
          title="Gerak Kerja"
        />

        {isLoading ? (
          <div className={styles.boardEmpty}>
            <h2>Memuatkan gerak kerja…</h2>
          </div>
        ) : isBoardEmpty ? (
          <div className={styles.boardEmpty}>
            <h2>
              {isAdmin
                ? "Tambah tugas pertama sebelum semua yakin orang lain tengah buat."
                : "Belum ada gerak kerja direkodkan."}
            </h2>
            {isAdmin ? (
              <Button onClick={() => openAddDialog("todo")}>
                <Plus size={17} aria-hidden="true" />
                Tambah Tugas
              </Button>
            ) : null}
          </div>
        ) : (
          <TaskBoard
            activeStatus={activeStatus}
            isAdmin={isAdmin}
            onActiveStatusChange={setActiveStatus}
            onAddTask={openAddDialog}
            onDeleteTask={setPendingDelete}
            onEditTask={openEditDialog}
            onStatusChange={handleStatusChange}
            tasks={tasks}
          />
        )}

        {isAdmin && !isBoardEmpty ? (
          <button className={styles.mobileAdd} onClick={() => openAddDialog(activeStatus)} type="button">
            <Plus size={18} aria-hidden="true" />
            Tambah Tugas
          </button>
        ) : null}

        {toast ? <p className={styles.toast}>{toast}</p> : null}

        <TaskDialog
          defaultStatus={dialogStatus}
          onClose={() => {
            setEditingTask(undefined);
            setIsDialogOpen(false);
          }}
          onSave={handleSaveTask}
          open={isDialogOpen}
          task={editingTask}
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
            if (!open) {
              setPendingDelete(undefined);
            }
          }}
          open={Boolean(pendingDelete)}
          title="Padam tugas ini?"
        >
          <p className={styles.deleteText}>
            Tugas ini akan dibuang dari Gerak Kerja. Pastikan memang tak perlu, bukan sekadar malas tengok.
          </p>
        </DialogShell>
      </div>
    </PageContainer>
  );
}
