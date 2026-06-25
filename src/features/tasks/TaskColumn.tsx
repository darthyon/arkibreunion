"use client";

import { Plus } from "lucide-react";
import type { ReunionTask, TaskStatus } from "@/types/tasks";
import { statusMeta } from "./status-meta";
import { TaskCard } from "./TaskCard";
import styles from "./TaskColumn.module.css";

type TaskColumnProps = {
  status: TaskStatus;
  tasks: ReunionTask[];
  isAdmin: boolean;
  onAddTask: (status: TaskStatus) => void;
  onEditTask: (task: ReunionTask) => void;
  onDeleteTask: (task: ReunionTask) => void;
  onStatusChange: (task: ReunionTask, status: TaskStatus) => void;
};

export function TaskColumn({
  status,
  tasks,
  isAdmin,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onStatusChange
}: TaskColumnProps) {
  const meta = statusMeta[status];

  return (
    <section className={styles.column} aria-label={meta.label}>
      <header className={styles.header}>
        <div className={styles.headingRow}>
          <h2 className={styles.heading}>{meta.label}</h2>
          <span className={styles.count}>{tasks.length}</span>
        </div>
        <p className={styles.helper}>{meta.helper}</p>
      </header>

      <div className={styles.cards}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              isAdmin={isAdmin}
              key={task.id}
              onDelete={onDeleteTask}
              onEdit={onEditTask}
              onStatusChange={onStatusChange}
              task={task}
            />
          ))
        ) : (
          <p className={styles.empty}>{meta.emptyCopy}</p>
        )}
      </div>

      {isAdmin ? (
        <button className={styles.addButton} onClick={() => onAddTask(status)} type="button">
          <Plus size={16} aria-hidden="true" />
          Tambah tugas
        </button>
      ) : null}
    </section>
  );
}
