"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/Button";
import { DialogShell } from "@/components/ui/DialogShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { reunionTasks } from "@/data/tasks";
import { useAdmin } from "@/hooks/useAdmin";
import { usePreview } from "@/components/PreviewProvider";
import type { ReunionTask, TaskStatus } from "@/types/tasks";
import { TaskBoard } from "./TaskBoard";
import { TaskDialog } from "./dialogs/TaskDialog";
import styles from "./GerakKerjaPage.module.css";

export function GerakKerjaPage() {
  const [tasks, setTasks] = useState<ReunionTask[]>(reunionTasks);
  const [activeStatus, setActiveStatus] = useState<TaskStatus>("todo");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<ReunionTask>();
  const [dialogStatus, setDialogStatus] = useState<TaskStatus>("todo");
  const [pendingDelete, setPendingDelete] = useState<ReunionTask>();
  const [toast, setToast] = useState<string>();

  const { isAdmin: isAuthedAdmin } = useAdmin();
  const { isPreviewing } = usePreview();
  const isAdmin = isAuthedAdmin && !isPreviewing;
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

  function handleSaveTask(task: ReunionTask) {
    const existingTask = tasks.find((item) => item.id === task.id);

    if (existingTask) {
      setTasks((currentTasks) => currentTasks.map((item) => (item.id === task.id ? task : item)));
    } else {
      setTasks((currentTasks) => [...currentTasks, task]);
    }

    setEditingTask(undefined);
    setIsDialogOpen(false);
    showToast(existingTask ? "Tugas dikemaskini." : "Tugas ditambah. Negara bergerak sedikit.");
  }

  function handleConfirmDelete() {
    if (!pendingDelete) {
      return;
    }

    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== pendingDelete.id));
    setPendingDelete(undefined);
    showToast("Tugas dipadam.");
  }

  function handleStatusChange(task: ReunionTask, status: TaskStatus) {
    if (task.status === status) {
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.map((item) =>
        item.id === task.id ? { ...item, status, updatedAt: new Date().toISOString() } : item
      )
    );
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

        {isBoardEmpty ? (
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
