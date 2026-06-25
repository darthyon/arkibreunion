"use client";

import { Tabs } from "@/components/ui/Tabs";
import type { ReunionTask, TaskStatus } from "@/types/tasks";
import { statusMeta, statusOrder } from "./status-meta";
import { TaskColumn } from "./TaskColumn";
import styles from "./TaskBoard.module.css";

type TaskBoardProps = {
  tasks: ReunionTask[];
  isAdmin: boolean;
  activeStatus: TaskStatus;
  onActiveStatusChange: (status: TaskStatus) => void;
  onAddTask: (status: TaskStatus) => void;
  onEditTask: (task: ReunionTask) => void;
  onDeleteTask: (task: ReunionTask) => void;
  onStatusChange: (task: ReunionTask, status: TaskStatus) => void;
};

export function TaskBoard({
  tasks,
  isAdmin,
  activeStatus,
  onActiveStatusChange,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onStatusChange
}: TaskBoardProps) {
  const tabItems = statusOrder.map((status) => {
    const meta = statusMeta[status];
    return {
      value: status,
      label: meta.label,
      icon: <meta.Icon size={16} aria-hidden="true" />
    };
  });

  return (
    <div className={styles.board}>
      <div className={styles.tabRow}>
        <Tabs
          aria-label="Tapis tugas mengikut status"
          items={tabItems}
          onValueChange={onActiveStatusChange}
          value={activeStatus}
        />
      </div>

      <div className={styles.columns}>
        {statusOrder.map((status) => (
          <div
            className={styles.columnSlot}
            data-active={status === activeStatus ? "true" : undefined}
            key={status}
          >
            <TaskColumn
              isAdmin={isAdmin}
              onAddTask={onAddTask}
              onDeleteTask={onDeleteTask}
              onEditTask={onEditTask}
              onStatusChange={onStatusChange}
              status={status}
              tasks={tasks.filter((task) => task.status === status)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
