"use client";

import { Pencil, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import type { ReunionTask, TaskStatus } from "@/types/tasks";
import { statusMeta, statusOptions } from "./status-meta";
import styles from "./TaskCard.module.css";

const dateFormatter = new Intl.DateTimeFormat("ms-MY", {
  day: "numeric",
  month: "short"
});

type TaskCardProps = {
  task: ReunionTask;
  isAdmin: boolean;
  onEdit: (task: ReunionTask) => void;
  onDelete: (task: ReunionTask) => void;
  onStatusChange: (task: ReunionTask, status: TaskStatus) => void;
};

export function TaskCard({ task, isAdmin, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const meta = statusMeta[task.status];
  const updatedLabel = dateFormatter.format(new Date(task.updatedAt));

  return (
    <article className={styles.card}>
      <header className={styles.cardHeader}>
        <h3 className={styles.title}>{task.title}</h3>
        {isAdmin ? (
          <Select
            aria-label={`Tukar status untuk ${task.title}`}
            onValueChange={(status) => onStatusChange(task, status)}
            options={statusOptions}
            size="chip"
            triggerClassName={`${styles.chip} ${styles[`tone_${meta.tone}`]}`}
            value={task.status}
          />
        ) : (
          <span className={`${styles.chip} ${styles[`tone_${meta.tone}`]}`}>{meta.label}</span>
        )}
      </header>

      {task.ownerName ? (
        <p className={styles.metaRow}>
          <span className={styles.metaLabel}>Owner</span>
          <span className={styles.metaValue}>{task.ownerName}</span>
        </p>
      ) : null}

      {task.description ? <p className={styles.description}>{task.description}</p> : null}

      {task.picNames && task.picNames.length > 0 ? (
        <p className={styles.picRow}>
          <Users size={14} aria-hidden="true" />
          <span>{task.picNames.join(", ")}</span>
        </p>
      ) : null}

      <footer className={styles.cardFooter}>
        <span className={styles.date}>Dikemaskini {updatedLabel}</span>

        {isAdmin ? (
          <div className={styles.adminActions}>
            <Button aria-label={`Edit ${task.title}`} onClick={() => onEdit(task)} variant="secondary">
              <Pencil size={15} aria-hidden="true" />
              Edit
            </Button>
            <Button aria-label={`Padam ${task.title}`} onClick={() => onDelete(task)} variant="secondary">
              <Trash2 size={15} aria-hidden="true" />
              Delete
            </Button>
          </div>
        ) : null}
      </footer>
    </article>
  );
}
